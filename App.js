import React from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator as tabNav} from 'react-navigation-tabs';
import { createStackNavigator as stackNav} from 'react-navigation-stack';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default function App() {
  const reviewStack = stackNav({
    review: ReviewScreen,
    settings: SettingsScreen
  });

  const mainTab = createAppContainer(tabNav({
    map: MapScreen,
    deck: DeckScreen,
    reviewFlow: reviewStack
  }))

  const MainNavigator = createAppContainer(tabNav({
      welcome: WelcomeScreen,
      auth: AuthScreen,
      mainFlow: mainTab
    })
  );

  return (
    <MainNavigator />
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