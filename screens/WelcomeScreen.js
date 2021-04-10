import React from 'react';
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

const WelcomeScreen = () => {
    return (
        <View>
            <Slides data={ SLIDE_DATA }/>
        </View>
    );
};

export default WelcomeScreen;