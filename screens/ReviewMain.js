import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ReviewScreen from './ReviewScreen';
import SettingsScreen from './SettingsScreen';

const ReviewMain = () => {
    const ReviewStack = createStackNavigator();
    return (
        <ReviewStack.Navigator>
            <ReviewStack.Screen name="Review" component={ ReviewScreen } />
            <ReviewStack.Screen name="Settings" component={ SettingsScreen } />
        </ReviewStack.Navigator>
    );
};

export default ReviewMain;