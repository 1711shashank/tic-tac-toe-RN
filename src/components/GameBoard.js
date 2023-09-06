import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GameBoard = ({ squares, handleClick, status }) => {

    const RenderSquare = ({ index }) => {
        const squareValue = squares[index];

        return (
            <TouchableOpacity
                key={index}
                style={styles.square}
                onPress={() => handleClick(index)}
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
    },
});

export default GameBoard;