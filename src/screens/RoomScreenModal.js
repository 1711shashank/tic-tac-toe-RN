import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from "react-native"

const RoomScreenModal = ({ room, setRoom, roomScreen, handleEnterGameRoom }) => {

    return (
        <>
            <Modal transparent={true} visible={roomScreen} >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.roomInput}
                                placeholder="Enter the room name"
                                value={room}
                                onChangeText={(text) => setRoom(text)}
                            />
                            <TouchableOpacity style={styles.enterRoomButton} onPress={handleEnterGameRoom}>
                                <Text style={styles.buttonText}>Enter Room</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </Modal>
        </>
    )
}


const styles = StyleSheet.create({

    modalView: {
        backgroundColor: '#1F2C33',
        borderRadius: 15,
        padding: 25,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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


export default RoomScreenModal;