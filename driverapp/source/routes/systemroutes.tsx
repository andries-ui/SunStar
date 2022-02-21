import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "../screens/onboardin";
import Login from "../screens/login";
import Register from "../screens/register";
import ResetPassword from "../screens/reset";
import Dashboard from "../screens/dashboard";
import Account from "../screens/account";
import CreditCard from "../screens/card";
import Search from "../screens/search";
import Notification from "../screens/notification";
import Paid from "../screens/successfullypaid";
import Profile from "../screens/profile";
import TripsScreen from "../screens/trips";
import HistoryScreen from "../screens/history";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

const Route = () => {

  const [firstLaunched, setfirstLaunched] = useState(false)

  useEffect(() => {

    AsyncStorage.getItem('AlreadyLaunched').then((value:any)=>{

      if(value === null){
      AsyncStorage.setItem('AlreadyLaunched', 'true');
      setfirstLaunched(true);
      }else{
        setfirstLaunched(false)
      }
    })
    
  }, [])

 if(firstLaunched === false){

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
        <Stack.Screen name={"dashboardscreen"} component={Dashboard} />
        <Stack.Screen name={"profilescreen"} component={Profile} />
        <Stack.Screen name={"accountscreen"} component={Account} />
        <Stack.Screen name={"historyscreen"} component={HistoryScreen} />
        <Stack.Screen name={"tripscreen"} component={TripsScreen} />

        <Stack.Screen name={"creditcardscreen"} component={CreditCard} />
        <Stack.Screen name={"searchscreen"} component={Search} />
        <Stack.Screen name={"notivationscreen"} component={Notification} />
        <Stack.Screen name={"paidscreen"} component={Paid} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}else{
  return(
   <></>
  )
  
}
};

export default Route;
