import 'react-native-gesture-handler';
import React, { useReducer, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import registerForPushNotificationsAsync from './services/push_notifications';
import { fetchToken } from './actions/auth';
import JobsReducer from './reducers/JobsReducer';
import JobsContext from './context/JobsContext';
import AuthReducer from './reducers/AuthReducer';
import AuthContext from './context/AuthContext';
import NotificationsReducer from './reducers/NotificationsReducer';
import NotificationsContext from './context/NotificationsContext';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MainScreen from './screens/MainScreen'


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


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
  const [notification, notifyDispatch] = useReducer(NotificationsReducer);
  const [auth, authDispatch] = useReducer(AuthReducer, {token : null});
  const [jobsData, jobsDispatch] = useReducer(JobsReducer);
  const [initScreen, setInitScreen] = useState('');
  const [loading, setLoading]  = useState(true);

  const handleNotification = notification => {
    notifyDispatch({ type: 'NEW_NOTIFICATION', payload: notification });
  };

  const handleNotificationResponse = response => {
    console.log(response);
  };

  useEffect(() => {
    /* AsyncStorage.removeItem('fb_token'); */

    (async () => {
      let token = await fetchToken();

      registerForPushNotificationsAsync(notifyDispatch);
      Notifications.addNotificationReceivedListener(handleNotification);
      Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

//old cold
/*       await registerNotifications();

      Notifications.addNotificationReceivedListener((notification) => {
        const { data: { text }, origin } = notification;

        if(origin === 'received' && text) {
          Alert.alert(
            'New Push Notification',
            text,
            [{ text: 'OK' }]
          );
        }
}); */

      if(token) {
        const data = await AsyncStorage.getItem('likedJobs');
        if(data) jobsDispatch({ type: 'REHYDRATE', payload: data });

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
      <NotificationsContext.Provider value={{ notification, notifyDispatch }} >
        <JobsContext.Provider value={{ jobsData, jobsDispatch }}>
          { loading ? <AppLoading /> :  <RootStack initialScreen={ initScreen }/> }
        </JobsContext.Provider>
      </NotificationsContext.Provider>
    </AuthContext.Provider>
  );
};