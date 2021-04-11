import AsyncStorage from '@react-native-async-storage/async-storage';

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if(token) {
        console.log(token);
    } else {
        console.log('no token!');
    }
}
