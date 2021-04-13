import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Facebook from 'expo-facebook';

import FB_APP_ID from '../api/facebook';
const FACEBOOK_LOGIN_SUCCESS = 'FACEBOOK_LOGIN_SUCCESS';
const FACEBOOK_LOGIN_FAIL = 'FACEBOOK_LOGIN_FAIL';

export const facebookLogin = (dispatch) => {
    (async (dispatch) => {
            let token = await AsyncStorage.getItem('fb_token');
            if(token) {
                console.log(token);
                dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
            } else {
                console.log('no token!');
                doFacebookLogin(dispatch);
            }
        } 
    )();
};

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

    if(type === 'cancel') {
       return dispatch({ type: FACEBOOK_LOGIN_FAIL, payload: {} });
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: 'FACEBOOK_LOGIN_SUCCESS', payload: token });
};
