import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";
import { calculateWinner, isBoardFull } from "../utilities/helperFunction";
import { io } from "socket.io-client";


const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [myTurn, setMyTurn] = useState(true);
    const [winner, setWinner] = useState(null);
    const [status, setStatus] = useState(`Let's Play`);

    const [roomInput, setRoomInput] = useState(0); 
    const [socket, setSocket] = useState(null);


    useEffect(() => {

        const newSocket = io("http://localhost:3001");

        setSocket(newSocket);

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("receive_data", (data) => {
                const { myTurn: receivedIsXNext, roomInput: receivedRoomInput, index } = data;

                if (roomInput === receivedRoomInput && squares[index] === null) {
                    const newSquares = [...squares];
                    newSquares[index] = receivedIsXNext ? "X" : "O";
                    setSquares(newSquares);
                    setMyTurn(!receivedIsXNext);
                }
            });
        }
    }, [socket, squares, roomInput]);



    const handleClick = (index) => {

        if (roomInput !== "") {
            socket.emit("send_data", { myTurn, roomInput, index });
        }

        if (squares[index] || winner) return;

        const newSquares = [...squares];
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
    };

    const handleEnterChatRoom = () => {

        console.log(myTurn, roomInput);
        if (roomInput !== '') {
            socket.emit("join room", { myTurn, roomInput });
        }

    }

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setMyTurn(true);
        setWinner(null);
        setStatus(`Let's Play`);
    };

    const RenderSquare = ({ index }) => {
        const squareValue = squares[index];

        return (
            <TouchableOpacity
                key={index}
                style={styles.square}
                onPress={() => handleClick(index)}
                disabled={squareValue || winner}
            >
                <Text style={styles.squareText}>{squareValue}</Text>
            </TouchableOpacity>
        );
    };

    const Board = () => {
        return (
            <View style={styles.board}>
                {Array(3).fill(null).map((_, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {Array(3).fill(null).map((_, colIndex) => {
                            const index = rowIndex * 3 + colIndex;
                            return <RenderSquare key={index} index={index} />;
                        })}
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.modalView}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.roomInput}
                        placeholder="Enter the room name"
                        value={roomInput}
                        onChangeText={(text) => setRoomInput(text)}
                    />
                    <TouchableOpacity style={styles.enterRoomButton} onPress={handleEnterChatRoom}>
                        <Text style={styles.buttonText}>Enter Room</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Board />

            <View style={styles.status}>
                <Text style={styles.statusText}>{status}</Text>
            </View>

            {(winner || isBoardFull(squares)) && (
                <TouchableOpacity
                    style={styles.playAgainButton}
                    onPress={resetGame}
                >
                    <Text style={styles.buttonText}>Play Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111B21",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
    },
    square: {
        width: '30%',
        aspectRatio: 1,
        margin: 3,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#00A884",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    squareText: {
        fontSize: 32,
        color: "#00A884",
    },
    status: {
        marginTop: 20,
        alignItems: "center",
    },
    statusText: {
        color: "#00A884",
        fontSize: 24,
        // fontWeight: "bold",
    },
    playAgainButton: {
        backgroundColor: "#00A884",
        paddingVertical: 10, // Adjust top and bottom padding
        paddingHorizontal: 20, // Adjust left and right padding
        borderRadius: 6,
        marginTop: 20,
        marginHorizontal: '25%'
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        textAlign: "center", // Center the text horizontally
    },


    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {

        padding: 25,

    },
    roomInput: {
        fontSize: 16,
        marginVertical: 15,
        padding: 15,
        color: 'white',
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 5,
    },
    enterRoomButton: {
        borderRadius: 5,
        padding: 16,
        color: 'white',
        backgroundColor: '#00A884',
        textAlign: 'center'
    }

});

export default Game;
