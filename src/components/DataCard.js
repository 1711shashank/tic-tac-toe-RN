import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const DataCard = ({ icon, title, content, setText, isEditable, setIsEditable }) => {


    return (
        <View style={styles.infoContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', }}>
                <View style={{ color: 'gray', margin: 12 }}>
                    {icon}
                </View>

                <View>
                    {
                        isEditable ?
                            <View style={{ margin: 10 }}>
                                <Text style={styles.title}>{title}</Text>
                                <TextInput
                                    style={styles.input}
                                    value={content}
                                    onChangeText={(newValue) => setText(newValue)}
                                />
                            </View>
                            :
                            <View style={{ margin: 10 }}>
                                <Text style={styles.title}>{title}</Text>
                                <Text style={{ fontSize: 16, color: 'white', width: 280 }}>{content}</Text>
                            </View>
                    }
                </View>
            </View>

            <TouchableOpacity style={{ marginRight: 5 }} onPress={() => setIsEditable(!isEditable)}>
                {
                    isEditable
                        ? <MaterialIcons name="check" size={24} color="#00A884" />
                        : <MaterialIcons name="edit" size={24} color="#00A884" />
                }
            </TouchableOpacity>
        </View>
    );
};

















const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    title: {
        fontSize: 12,
        color: 'gray',
    },
    input: {
        width: 280,
        fontSize: 16,
        color: 'white',
        borderWidth: 0,
        borderBottomWidth: 2,
        borderBottomColor: '#00A884',
        outlineStyle: 'none',
    },
    editContainer: {
        marginRight: 100,
    }
});

export default DataCard;
