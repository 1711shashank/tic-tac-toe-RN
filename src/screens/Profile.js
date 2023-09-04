import { View } from 'react-native';
import InfoSection from '../components/InfoSection';
import DPSection from '../components/DPSection';

const Profile = () => {

    return (

        <View style={{ height: '100%', width: '100%', flex: 1, backgroundColor: '#111B21' }}>
            <DPSection />
            <InfoSection />
        </View>

    );
};


export default Profile;
