import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycode.herokuapp/api/tokens'

export default async (notifyDispatch) => 
{
    let previousToken = await AsyncStorage.getItem('pushToken');
    if(previousToken) return;

    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      notifyDispatch({ type: 'NEW_NOTIFICATION', payload: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
};

//Old code
/* {
    let previousToken = await AsyncStorage.getItem('pushToken');
    console.log(previousToken);

    if(previousToken) {
        return;
    } else {
        let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if(status !== 'granted')  return;

        let token = await Notifications.getExpoPushTokenAsync();
        try {
            await axios.post(PUSH_ENDPOINT, { token: { token }});
            AsyncStorage.setItem('pushToken', token)
        } catch (e) {
            console.log('error: ', e);
        }
    }
}; */