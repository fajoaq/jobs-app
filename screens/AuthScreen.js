import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
/* import AsyncStorage from '@react-native-async-storage/async-storage'; */

import { facebookLogin } from '../actions/auth';
import AuthContext from '../context/AuthContext';

const AuthScreen = ({ navigation }) => {
    const { auth, authDispatch } = useContext(AuthContext);

    useEffect(() => {
        /* AsyncStorage.removeItem('fb_token'); */
        facebookLogin(authDispatch);
    }, []);


    useEffect(() => {
        const token = auth.token;
        if(token) {
            navigation.navigate('Main');
        }
    }, [auth])

    return <React.Fragment />;
};

export default AuthScreen;