import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GameBoard = ({ squares, winner, handleClick, status }) => {

    const RenderSquare = ({ index }) => {
        const squareValue = squares[index];

        return (
            <TouchableOpacity
                key={index}
                style={styles.square}
                onPress={() => handleClick(index)}
                // disabled={squareValue || winner}
            >
                <Text style={styles.squareText}>{squareValue}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <>
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

            <View style={styles.status}>
                <Text style={styles.statusText}>{status}</Text>
            </View>

        </>

    )
}

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

export default GameBoard;