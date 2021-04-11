import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthReducer from './reducers/AuthReducer';
import AuthContext from './context/AuthContext';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MainScreen from './screens/MainScreen'

const RootStack = () => {
  const WelcomeMain = createBottomTabNavigator();

  return (
    <NavigationContainer>
        <WelcomeMain.Navigator>
          <WelcomeMain.Screen name="Welcome" component={ WelcomeScreen } />
          <WelcomeMain.Screen name="Signin" component={ AuthScreen } />
          <WelcomeMain.Screen name="Main" component={ MainScreen} />
        </WelcomeMain.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const authenticated = true;

  return (
    <AuthContext.Provider value={{authenticated}}>
      <RootStack />
    </AuthContext.Provider>
  );
};