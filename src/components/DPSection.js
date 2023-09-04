import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ChangeDpModal from './ChangeDpModal';
import DefaultDP from '../imges/dp.png'


const DPSection = () => {

    const [changeDPModal, setChangeDPModal] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);

    return (
        <>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>

                <View style={{ position: 'relative', marginTop: 100, width: 150, marginBottom: 50 }}>
                    {
                        <Image style={{ width: 150, height: 150, borderRadius: 75 }} source={profilePicture ? { uri: profilePicture } : DefaultDP} />
                    }
                    <TouchableOpacity onPress={() => setChangeDPModal(true)} style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: '#00A884', borderRadius: 50 }}>
                        <MaterialIcons name="photo-camera" size={24} color="white" style={{ padding: 8 }} />
                    </TouchableOpacity>
                </View>
            </View>

            <ChangeDpModal
                changeDPModal={changeDPModal}
                setChangeDPModal={setChangeDPModal}
                profilePicture={profilePicture}
                setProfilePicture={setProfilePicture}
            />
        </>
    );
};

export default DPSection;
