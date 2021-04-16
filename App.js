import 'react-native-gesture-handler';
import React, { useReducer, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppLoading from 'expo-app-loading';
/* import AsyncStorage from '@react-native-async-storage/async-storage'; */

import { fetchToken } from './actions/auth';
import JobsReducer from './reducers/JobsReducer';
import JobsContext from './context/JobsContext';
import AuthReducer from './reducers/AuthReducer';
import AuthContext from './context/AuthContext';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MainScreen from './screens/MainScreen'

const RootStack = ({ initialScreen }) => {
  const WelcomeMain = createBottomTabNavigator();

  return (
    <NavigationContainer>
        <WelcomeMain.Navigator 
          lazy 
          initialRouteName={ initialScreen }
          screenOptions={{ tabBarVisible: false }}
        >
          <WelcomeMain.Screen name="Welcome" component={ WelcomeScreen } />
          <WelcomeMain.Screen name="Signin" component={ AuthScreen } />
          <WelcomeMain.Screen name="Main" component={ MainScreen} />
        </WelcomeMain.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [auth, authDispatch] = useReducer(AuthReducer, {token : null});
  const [jobs, jobsDispatch] = useReducer(JobsReducer, []);
  const [initScreen, setInitScreen] = useState('');
  const [loading, setLoading]  = useState(true);

  useEffect(() => {
    /* AsyncStorage.removeItem('fb_token'); */

    (async () => {
      const token = await fetchToken();

      if(token) {
        authDispatch({ type: 'FACEBOOK_LOGIN_SUCCESS', payload: token });
        setInitScreen('Main');
      } else {
        setInitScreen('Welcome');
      }

      setLoading(false);
    })();

  }, []);

  return (
    <AuthContext.Provider value={{ auth, authDispatch }}>
      <JobsContext.Provider value={{ jobs, jobsDispatch }}>
        { loading ? <AppLoading /> :  <RootStack initialScreen={ initScreen }/> }
      </JobsContext.Provider>
    </AuthContext.Provider>
  );
};