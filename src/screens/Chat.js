import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text, FlatList, StyleSheet } from "react-native";
import { io } from "socket.io-client";

const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [user, setUser] = useState("");
    const [room, setRoom] = useState("");
    const [chatIsVisible, setChatIsVisible] = useState(false);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        
        const newSocket = io("http://localhost:3001");

        newSocket.on("connect", () => {
            setIsConnected(true);
        });

        newSocket.on("disconnect", () => {
            setIsConnected(false);
        });

        setSocket(newSocket);

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("receive_msg", ({ user, message }) => {
                const msg = `${user} sent: ${message}`;
                setMessages((prevState) => [msg, ...prevState]);
            });
        }
    }, [socket]);

    const handleEnterChatRoom = () => {
        if (user !== "" && room !== "") {
            setChatIsVisible(true);
            socket.emit("join room", { user, room });
        }
    };

    const handleSendMessage = () => {
        if (newMessage !== "") {
            const messageData = {
                room: room,
                user: user,
                message: newMessage,
            };

            socket.emit("send_msg", messageData);
            setNewMessage(""); 
        }
    };

    const SenderMessage = ({ message }) => (
        <View style={styles.senderMessageContainer}>
            <Text style={styles.senderMessageText}>{message}</Text>
        </View>
    );

    const ReceiverMessage = ({ message }) => (
        <View style={styles.receiverMessageContainer}>
            <Text style={styles.receiverMessageText}>{message}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {!chatIsVisible ?
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        value={user}
                        onChangeText={(text) => setUser(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter the room name"
                        value={room}
                        onChangeText={(text) => setRoom(text)}
                    />
                    <Button title="Enter Chat Room" onPress={handleEnterChatRoom} color="blue" />
                </View>
                :
                <View style={styles.messageContainer}>
                    <Text>{room}</Text>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => {
                            const isSenderMessage = item.includes(user);

                            if (isSenderMessage) {
                                return <SenderMessage message={item} />;
                            } else {
                                return <ReceiverMessage message={item} />;
                            }
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        inverted={true}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Type your message..."
                        value={newMessage}
                        onChangeText={(text) => setNewMessage(text)}
                    />
                    <Button title="Send" onPress={handleSendMessage} color="blue" />
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    button: {
        backgroundColor: "blue",
        color: "white",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    messageContainer: {
        flex: 1,
        marginBottom: 10,
    },
    senderMessageContainer: {
        alignSelf: "flex-end",
        backgroundColor: "#DCF8C6",
        padding: 8,
        borderRadius: 5,
        marginBottom: 5,
    },
    receiverMessageContainer: {
        alignSelf: "flex-start",
        backgroundColor: "#EAEAEA",
        padding: 8,
        borderRadius: 5,
        marginBottom: 5,
    },
    senderMessageText: {
        color: "black", // Customize text color
    },
    receiverMessageText: {
        color: "black", // Customize text color
    },
});

export default Chat;
