import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Facebook from 'expo-facebook';

import FB_APP_ID from '../api/facebook';
const FACEBOOK_LOGIN_SUCCESS = 'FACEBOOK_LOGIN_SUCCESS';
const FACEBOOK_LOGIN_FAIL = 'FACEBOOK_LOGIN_FAIL';

export const facebookLogin = async (dispatch) => {
    let token = await fetchToken();
    if(token) {
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        doFacebookLogin(dispatch);
    }
};

export const fetchToken = async () => {
    let token = await AsyncStorage.getItem('fb_token');

    if(token) {
        return token;
    } else {
        return undefined;
    }
}

const doFacebookLogin = async (dispatch) => {
    try {
        await Facebook.initializeAsync({appId: FB_APP_ID});
    } catch (e) {
        console.log(e);
    }
   
    let { type, token } = await Facebook.logInWithReadPermissionsAsync(
        {
            permissions: ['public_profile']
        }
    );

    if(type === 'cancel') dispatch({ type: FACEBOOK_LOGIN_FAIL });

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: 'FACEBOOK_LOGIN_SUCCESS', payload: token });
};
