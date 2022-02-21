import Route from './source/routes/systemroutes';
import { ThemeProvider } from './source/theme/themeProvider';

import React, { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

Notifications.setNotificationHandler({ handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: false, }) });
async function registerForPushNotificationsAsync() { let token; if (Constants.isDevice) { const { status: existingStatus } = await Notifications.getPermissionsAsync(); let finalStatus = existingStatus; if (existingStatus !== 'granted') { const { status } = await Notifications.requestPermissionsAsync(); finalStatus = status; } token = (await Notifications.getExpoPushTokenAsync()).data; } else { console.log('Must use physical device for Push Notifications'); } if (Platform.OS === 'android') { Notifications.setNotificationChannelAsync('default', { name: 'default', importance: Notifications.AndroidImportance.MAX, vibrationPattern: [0, 250, 250, 250], lightColor: '#FF231F7C', }); } return token; }

export default function App({navigation}) {

   const responseListener = useRef();
   useEffect(() => {

      NetInfo.fetch().then(state => {
         console.log('Connection type', state.type);
         console.log('Is connected?', state.isConnected);
       });

      if (Constants.isDevice && Platform.OS !== 'web') {
         registerForPushNotificationsAsync().then(token => {
            axios.post(`https://app.nativenotify.com/api/expo/key`, { appId: 910, appToken: 'IBzo5MJJB46vcD3JGfjwRf', expoToken: token })
         });
         responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response.notification.request.content.data.screen); 
            navigation.navigate(response.notification.request.content.data.screen )
            
         });
         return () => { Notifications.removeNotificationSubscription(responseListener); };
      }
   });
  
    

   return (
      <ThemeProvider>
         <Route />
      </ThemeProvider>
   );
}


