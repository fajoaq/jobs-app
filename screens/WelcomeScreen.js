import React from 'react';
import { View, Text } from 'react-native';

import Slides from '../components/Slides';

const SLIDE_DATA = [
    { 
        id: 111,
        text: "Job finder will help you find a local job!"
    },
    {
        id: 222,
        text: "Set your location, then swipe away."
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