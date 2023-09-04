import * as ImagePicker from 'expo-image-picker';

//Game
export function calculateWinner(squares) {
    const straightLine = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (let i = 0; i < straightLine.length; i++) {
        const [a, b, c] = straightLine[i];

        // a!= null and a===b and a===c
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export function isBoardFull(squares) {
    return squares.every((square) => square);
}


//Profile
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