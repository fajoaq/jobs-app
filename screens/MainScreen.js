import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapScreen from './MapScreen';
import DeckScreen from './DeckScreen';
import ReviewMain from './ReviewMain';

const MainScreen = () => {
    const MainTab = createBottomTabNavigator();

    return (
        <MainTab.Navigator>
            <MainTab.Screen name="Map" component={ MapScreen } />
            <MainTab.Screen name="Deck" component={ DeckScreen } />
            <MainTab.Screen name="Review" component={ ReviewMain } />
        </MainTab.Navigator>
    );
};

export default MainScreen;