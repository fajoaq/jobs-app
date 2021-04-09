import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MainScreen from './screens/MainScreen'

export default function App() {
  const WelcomeMain = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <WelcomeMain.Navigator>
        <WelcomeMain.Screen name="Welcome" component={ WelcomeScreen } />
        <WelcomeMain.Screen name="Sign In" component={ AuthScreen } />
        <WelcomeMain.Screen name="Main" component={ MainScreen} />
      </WelcomeMain.Navigator>
    </NavigationContainer>
  );
}