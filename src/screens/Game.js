import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { calculateWinner, isBoardFull } from "../utilities/helperFunction";

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [status, setStatus] = useState(`Let's Play`);

    const handleClick = (index) => {
        if (squares[index] || winner) return;

        const newSquares = [...squares];
        newSquares[index] = isXNext ? "X" : "O";

        setSquares(newSquares);
        setIsXNext(!isXNext);

        const calculatedWinner = calculateWinner(newSquares);

        if (calculatedWinner) {
            setWinner(calculatedWinner);
            setStatus(`Winner: ${calculatedWinner}`);
        } else if (isBoardFull(newSquares)) {
            setStatus("It's a draw!");
        } else {
            setStatus(`Next player: ${isXNext ? "O" : "X"}`);
        }
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

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setStatus(`Let's Play`);
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

});

export default Game;
