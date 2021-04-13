import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';


import Slides from '../components/Slides';

const SLIDE_DATA = [
    { 
        text: "Job finder will help you find a local job!",
        color: '#F44336'
    },
    {
        text: "Set your location, then swipe away.",
        color: '#9C27B0'
    }
];

const WelcomeScreen = ({ navigation }) => {

    const onSlidesComplete = () => {
        navigation.navigate('Signin')
    };

    return (
        <View>
            <Slides data={ SLIDE_DATA } onComplete={ onSlidesComplete }/>
        </View>
    );
};

export default WelcomeScreen;