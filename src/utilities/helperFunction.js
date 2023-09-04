import * as ImagePicker from 'expo-image-picker';

export const requestCameraPermission = async (setHasPermission) => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
}

export const uploadImage = async (setProfilePicture, setChangeDPModal) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setProfilePicture(selectedAsset.uri);
        setChangeDPModal(false);
    }
}