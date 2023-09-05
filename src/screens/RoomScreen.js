import { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native"

const RoomScreen = ({ socket,setRoom }) => {

    const [roomInput, setRoomInput] = useState('');

    const handleEnterChatRoom = () => {

        if (roomInput !== '') {
            socket.emit("join room", { roomInput });
        }

        setRoom(roomInput);

    }


    return (
        <>
            <View style={roomModal.centeredView}>
                <View style={roomModal.modalView}>
                    <TextInput
                        style={roomModal.roomInput}
                        placeholder="Enter the room name"
                        value={roomInput}
                        onChangeText={(text) => setRoomInput(text)}
                    />
                    <TouchableOpacity style={{ flex: 1 }} onPress={handleEnterChatRoom} >
                        <Text style={roomModal.enterRoomButton}>
                            Enter Room
                        </Text>
                    </TouchableOpacity>
                </View >
            </View >
        </>
    )
}


const roomModal = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: '#1F2C33',
        borderRadius: 15,
        padding: 25,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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


export default RoomScreen;