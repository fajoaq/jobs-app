import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import MapScreen from './MapScreen';
import DeckScreen from './DeckScreen';
import ReviewMain from './ReviewMain';

const MainScreen = () => {
    const MainTab = createBottomTabNavigator();

    return (
        <MainTab.Navigator>
            <MainTab.Screen name="Map" component={ MapScreen } 
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name='my-location'
                            size={ 25 }
                            color={ focused ? '#009688' : '#999999'}
                        />
                    )
                }}
            />
            <MainTab.Screen name="Deck" component={ DeckScreen } />
            <MainTab.Screen name="Review" component={ ReviewMain } />
        </MainTab.Navigator>
    );
};

const styles = StyleSheet.create({
});

export default MainScreen;