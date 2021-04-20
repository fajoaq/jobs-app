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
        <MainTab.Navigator lazy={ false } tabBarOptions={{ labelStyle: styles.tabLabel }} >
            <MainTab.Screen name="map" component={ MapScreen } options={{tabBarLabel: ''}}/>
            <MainTab.Screen name="deck" component={ DeckScreen } options={{tabBarLabel: ''}}/>
            <MainTab.Screen name="review" component={ ReviewMain } 
                options={{
                    tabBarLabel: "Review Jobs",
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name='favorite'
                            size={ 25 }
                            color={ focused ? '#4876FF' : '#999999'}
                        />
                    )
                }}
            />
        </MainTab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabLabel: { fontSize: 12 }
});

export default MainScreen;