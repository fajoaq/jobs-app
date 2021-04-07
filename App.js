import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet } from 'react-native';
/* import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator as tabNav} from 'react-navigation-tabs';
import { createStackNavigator as stackNav} from 'react-navigation-stack'; */


import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MainScreen from './screens/MainScreen'



export default function App() {
  const WelcomeTab = createBottomTabNavigator();


/*   const reviewStack = stackNav({
    review: ReviewScreen,
    settings: SettingsScreen
  });

  const mainTab = createAppContainer(tabNav({
    map: MapScreen,
    deck: DeckScreen,
    reviewFlow: reviewStack
  }));

  const MainNavigator = createAppContainer(tabNav({
      welcome: WelcomeScreen,
      auth: AuthScreen,
      mainFlow: mainTab
    })
  ); */

  return (
    <NavigationContainer>
      <WelcomeTab.Navigator>
        <WelcomeTab.Screen name="Welcome" component={ WelcomeScreen } />
        <WelcomeTab.Screen name="Sign In" component={ AuthScreen } />
        <WelcomeTab.Screen name="Main" component={ MainScreen} />
      </WelcomeTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});