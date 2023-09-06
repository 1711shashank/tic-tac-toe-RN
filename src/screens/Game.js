import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { calculateWinner, isBoardFull } from "../utilities/helperFunction";
import { io } from "socket.io-client";
import RoomScreenModal from "../components/RoomScreenModal";
import GameBoard from "../components/GameBoard";


const Game = () => {
    const [roomScreenModal, setRoomScreenModal] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [myTurn, setMyTurn] = useState(true);
    const [winner, setWinner] = useState('');
    const [status, setStatus] = useState(`Let's Play`);

    const [room, setRoom] = useState();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://192.168.184.1:3001", { transports: ['websocket'] });
        setSocket(newSocket);

        return () => {
            if (newSocket) newSocket.disconnect();
        };

    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("receive_data", (data) => {

                const { myTurn, index } = data;

                const newSquares = squares;
                newSquares[index] = myTurn ? "X" : "O";
                setSquares(newSquares);
                setMyTurn(!myTurn);


                const calculatedWinner = calculateWinner(newSquares);
                if (calculatedWinner) {
                    setWinner(calculatedWinner);
                    setStatus(`Winner: ${calculatedWinner}`);
                } else if (isBoardFull(newSquares)) {
                    setStatus("It's a draw!");
                } else {
                    setStatus(`Next player: ${myTurn ? "O" : "X"}`);
                }
            });

            return;
        }
    }, [socket, squares]);


    useEffect(() => {

        if (socket) {
            socket.on("receive_resetRequest", () => {
                setSquares(Array(9).fill(null));
                setMyTurn(true);
                setWinner(null);
                setStatus(`Let's Play`);

                setRoom(null);
                setRoomScreenModal(true);

            })
        }
        return;
    }, [socket, winner]);


    const handleEnterGameRoom = () => {
        setRoomScreenModal(false);
        socket.emit("join room", { room });
    }


    const handleClick = (index) => {

        if (room !== "" && squares[index] === null) {
            socket.emit("send_data", { myTurn, room, index });
        }
    };


    const resetGame = () => {
        if (room !== "") {
            socket.emit("send_resetRequest", { room });
        }
    };


    return (
        <View style={styles.container}>

            {
                roomScreenModal
                    ? <RoomScreenModal room={room} setRoom={setRoom} roomScreenModal={roomScreenModal} handleEnterGameRoom={handleEnterGameRoom} />
                    : <>
                        <GameBoard squares={squares} winner={winner} handleClick={handleClick} status={status} />

                        {(winner || isBoardFull(squares)) && (
                            <TouchableOpacity
                                style={styles.playAgainButton}
                                onPress={resetGame}
                            >
                                <Text style={styles.buttonText}>Play Again</Text>
                            </TouchableOpacity>
                        )}
                    </>
            }
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111B21",
        justifyContent: "center",
    },
    status: {
        marginTop: 20,
        alignItems: "center",
    },
    playAgainButton: {
        backgroundColor: "#00A884",
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        borderRadius: 6,
        marginTop: 20,
        marginHorizontal: '25%'
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
    },

});

export default Game;
