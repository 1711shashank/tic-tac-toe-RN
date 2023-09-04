import React, { useState } from 'react';
import DataCard from './DataCard';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const InfoSection = () => {

    const [nameEditing, setNameEditing] = useState(false);
    const [aboutEditing, setAboutEditing] = useState(false);
    const [phoneEditing, setPhoneEditing] = useState(false);

    const [name, setName] = useState('Kumar Shashank');
    const [about, setAbout] = useState('Add your bio here...');
    const [phone, setPhone] = useState('+91 9876 543 210');


    const profileInfo = [
        {
            icon: <MaterialIcons name="person-outline" size={30} color="gray" />,
            title: 'Name',
            content: name,
            setText: setName,
            isEditable: nameEditing,
            setIsEditable: setNameEditing
        },
        {
            icon: <MaterialIcons name="info-outline" size={25} color="gray" />,
            title: 'About',
            content: about,
            setText: setAbout,
            isEditable: aboutEditing,
            setIsEditable: setAboutEditing
        },
        {
            icon: <Feather name="phone" size={25} color="gray" />,
            title: 'Phone',
            content: phone,
            setText: setPhone,
            isEditable: phoneEditing,
            setIsEditable: setPhoneEditing
        },
    ];


    return (
        <>
            {
                profileInfo.map((item, index) => (
                    <DataCard
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        content={item.content}
                        setText={item.setText}
                        isEditable={item.isEditable}
                        setIsEditable={item.setIsEditable}
                    />
                ))
            }
        </>
    );
};


export default InfoSection;
