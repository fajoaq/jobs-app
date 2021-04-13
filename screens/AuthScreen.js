import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';

import { facebookLogin } from '../actions/auth';
import AuthContext from '../context/AuthContext';

const AuthScreen = () => {
    const { auth, authDispatch } = useContext(AuthContext);


    useEffect(() => {
        facebookLogin(authDispatch);
    }, []);


    return (
        <View>
            <Text>AuthScresen</Text>
            <Text>AuthScreen</Text>
            <Text>AuthScreen</Text>
            <Text>AuthScreen</Text>
            <Text>AuthScreen</Text>
        </View>
    );
};

export default AuthScreen;