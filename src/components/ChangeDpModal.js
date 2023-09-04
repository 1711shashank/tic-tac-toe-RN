import { Modal, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { requestCameraPermission, uploadImage } from '../utilities/helperFunction';



const ChangeDpModal = ({ changeDPModal, setChangeDPModal, setProfilePicture }) => {

    const cameraRef = useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);


    useEffect(() => {
        requestCameraPermission(setHasPermission);
    }, []);

    const toggleCameraType = () => {
        setCameraType((prevCameraType) =>
            prevCameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
        );
    }

    const updateDP = async () => {

        if (cameraRef.current) {

            const photo = await cameraRef.current.takePictureAsync();

            setProfilePicture(photo.uri);
            setChangeDPModal(false);
            setIsCameraOpen(false);

        }
    };

    const handleCamera = async () => {
        if (!hasPermission) {
            console.log('Camera permission not granted');
            return;
        }
        setIsCameraOpen(true);
        setChangeDPModal(false);
    }

    const deleteDP = () => {
        setProfilePicture(null);
        setChangeDPModal(false);

    }

    const handleGallery = async () => {
        uploadImage(setProfilePicture, setChangeDPModal);
    };

    const OptionModal = () => {
        return (
            <>
                <View style={dpSection.modalTitleContainer}>
                    <Text style={dpSection.modalTitle}>Profile photo</Text>
                    <TouchableOpacity onPress={deleteDP}>
                        <MaterialIcons name="delete" size={24} color="lightgray" />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ alignItems: 'center', }} onPress={() => setIsCameraOpen(true)}>
                        <MaterialIcons name="photo-camera" size={24} style={dpSection.modalIcon} />
                        <Text style={dpSection.modalIconText}> Camera </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', marginLeft: 30 }} onPress={handleGallery}>
                        <MaterialIcons name="image" size={24} style={dpSection.modalIcon} />
                        <Text style={dpSection.modalIconText}> Gallery </Text>
                    </TouchableOpacity>
                </View>
            </>

        )
    }

    const CameraModal = () => {
        return (
            <>
                <View style={dpSection.modalTitleContainer}>
                    <Text style={dpSection.modalTitle}> Camera </Text>
                </View>

                <View style={{ marginBottom: 70, height: '100%' }}>
                    <Camera
                        ref={cameraRef}
                        style={{ width: '100%', height: '70%' }}
                        type={cameraType}
                    />

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>

                        <TouchableOpacity style={{ flex: 1 }} onPress={updateDP} >
                            <Text style={{ padding: 16, color: 'white', backgroundColor: '#00A884', textAlign: 'center' }}>Take Picture</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ alignItems: 'center', marginLeft: 30 }} onPress={toggleCameraType}>
                            <MaterialIcons name="flip-camera-android" size={24} style={dpSection.modalIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </>

        )
    }


    return (
        <>
            <Modal animationType="slide" transparent={true} visible={changeDPModal} onRequestClose={handleCamera}>

                <TouchableOpacity style={{ flex: 1 }} onPress={() => setChangeDPModal(false)} />

                <View style={dpSection.centeredView}>
                    <View style={dpSection.modalView}>

                        {
                            !isCameraOpen
                                ? <OptionModal />
                                : <CameraModal />
                        }

                    </View>
                </View>
            </Modal>
        </>
    );
};

















const dpSection = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalView: {
        backgroundColor: '#1F2C33',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 25,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    modalTitle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'left',
    },
    modalIcon: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#313D45',
        borderRadius: 50,
        color: "#00A884",
    },
    modalIconText: {
        color: 'lightgray',
        marginTop: 10,
    },

});

export default ChangeDpModal;
