import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "../screens/onboardin";
import Login from "../screens/login";
import Register from "../screens/register";
import ResetPassword from "../screens/reset";
import Dashboard from "../screens/dashboard";
import Account from "../screens/account";
import CreditCard from "../screens/card";
import Room from "../screens/room";
import Booking from "../screens/booking";
import Managing from "../screens/managing";
import BottomNavigation from "./bottomStack";
import PickupLocation from "../screens/pickuplocation";
import Search from "../screens/search";
import Notification from "../screens/notification";
import Reservation from "../screens/reservations";
import Hotel from "../screens/hotel";
import Paid from "../screens/successfullypaid";
import Verify from './../screens/verify';
import App from './../../App';

const Stack = createNativeStackNavigator();

const Route = ({ navigation }) => {

  const [firstTimeLaunch, setfirstTimeLaunch] = useState(true)
  const [token, settoken] = useState(true);

  const IsFirstTimeLaunch = async () => {
    await SecureStore.getItemAsync('launched')
      .then((value) => {
        if (value == null) {
          setfirstTimeLaunch(true);
          hasToken();
        } else {
          setfirstTimeLaunch(false);
        }
      });
  }

  const hasToken = async () => {
    await SecureStore.getItemAsync('token')
      .then((value) => {
        if (value == null) {
          settoken(false);
          console.log(token + ' nn--' + value);
        } else {
          settoken(true);
          console.log(token + ' ggg--' + value);

        }
      });
  }
  useEffect(() => {
    IsFirstTimeLaunch();
  }, [])


  if (firstTimeLaunch == true) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"onbordingscreen"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name={"onbordingscreen"} component={OnBoarding} />
          <Stack.Screen name={"loginscreen"} component={Login} />
          <Stack.Screen name={"registerscreen"} component={Register} />
          <Stack.Screen name={"resetscreen"} component={ResetPassword} />
          <Stack.Screen name={"bottonstackscreen"} component={BottomNavigation} />
          <Stack.Screen name={"dashboardscreen"} component={Dashboard} />
          <Stack.Screen name={"accountscreen"} component={Account} />
          <Stack.Screen name={"creditcardscreen"} component={CreditCard} />
          <Stack.Screen name={"roomscreen"} component={Room} />
          <Stack.Screen name={"managingscreen"} component={Managing} />
          <Stack.Screen name={"bookingscreen"} component={Booking} />
          <Stack.Screen name={"pickuplocationscreen"} component={PickupLocation} />
          <Stack.Screen name={"searchscreen"} component={Search} />
          <Stack.Screen name={"notivationscreen"} component={Notification} />
          <Stack.Screen name={"reservationscreen"} component={Reservation} />
          <Stack.Screen name={"hotelscreen"} component={Hotel} />
          <Stack.Screen name={"paidscreen"} component={Paid} />
          <Stack.Screen name={"appscreen"} component={App} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {

    if (token == false) {
      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={"loginscreen"}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name={"loginscreen"} component={Login} />
            <Stack.Screen name={"registerscreen"} component={Register} />
            <Stack.Screen name={"resetscreen"} component={ResetPassword} />
            <Stack.Screen name={"bottonstackscreen"} component={BottomNavigation} />
            <Stack.Screen name={"dashboardscreen"} component={Dashboard} />
            <Stack.Screen name={"accountscreen"} component={Account} />
            <Stack.Screen name={"creditcardscreen"} component={CreditCard} />
            <Stack.Screen name={"roomscreen"} component={Room} />
            <Stack.Screen name={"managingscreen"} component={Managing} />
            <Stack.Screen name={"bookingscreen"} component={Booking} />
            <Stack.Screen name={"pickuplocationscreen"} component={PickupLocation} />
            <Stack.Screen name={"searchscreen"} component={Search} />
            <Stack.Screen name={"notivationscreen"} component={Notification} />
            <Stack.Screen name={"reservationscreen"} component={Reservation} />
            <Stack.Screen name={"hotelscreen"} component={Hotel} />
            <Stack.Screen name={"paidscreen"} component={Paid} />
            <Stack.Screen name={"verifyscreen"} component={Verify} />
            <Stack.Screen name={"appscreen"} component={App} />

          </Stack.Navigator>
        </NavigationContainer>
      )
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={"loginscreen"}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name={"dashboardscreen"} component={Dashboard} />
            <Stack.Screen name={"loginscreen"} component={Login} />
            <Stack.Screen name={"registerscreen"} component={Register} />
            <Stack.Screen name={"resetscreen"} component={ResetPassword} />
            <Stack.Screen name={"bottonstackscreen"} component={BottomNavigation} />
            <Stack.Screen name={"accountscreen"} component={Account} />
            <Stack.Screen name={"creditcardscreen"} component={CreditCard} />
            <Stack.Screen name={"roomscreen"} component={Room} />
            <Stack.Screen name={"managingscreen"} component={Managing} />
            <Stack.Screen name={"bookingscreen"} component={Booking} />
            <Stack.Screen name={"pickuplocationscreen"} component={PickupLocation} />
            <Stack.Screen name={"searchscreen"} component={Search} />
            <Stack.Screen name={"notivationscreen"} component={Notification} />
            <Stack.Screen name={"reservationscreen"} component={Reservation} />
            <Stack.Screen name={"hotelscreen"} component={Hotel} />
            <Stack.Screen name={"paidscreen"} component={Paid} />
            <Stack.Screen name={"appscreen"} component={App} />
            <Stack.Screen name={"verifyscreen"} component={Verify} />

          </Stack.Navigator>
        </NavigationContainer>
      )
    }
  }
};

export default Route
