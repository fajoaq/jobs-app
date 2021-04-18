import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
/* import AsyncStorage from '@react-native-async-storage/async-storage'; */

import { facebookLogin } from '../actions/auth';
import Spinner from '../components/Spinner';
import AuthContext from '../context/AuthContext';

const AuthScreen = ({ navigation }) => {
    const { auth, authDispatch } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /* AsyncStorage.removeItem('fb_token'); */
        (async () => {
            const isLoading = await facebookLogin(authDispatch);
            setLoading(isLoading);
        })();
    }, []);


    useEffect(() => {
        const token = auth.token;
        if(token) {
            navigation.navigate('Main');
        }
    }, [auth])

    return (
        <View>
            { loading ?
                <Spinner />
                :
                <React.Fragment />
            }
        </View>
    );
};

export default AuthScreen;