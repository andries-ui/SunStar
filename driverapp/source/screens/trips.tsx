import React, { useContext } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar, View } from "react-native";
import { ThemeContext } from "../theme/themeProvider";
import ActionBar from "../components/actionbar";
import style from "../styles/screens/profile";

const Tab = createBottomTabNavigator();

const TripsScreen =({navigation}) =>{

    const {theme,dark,toggle} = useContext(ThemeContext)
    return (
           
        <View style={{backgroundColor:theme.background, height:'100%', width:'100%'}}>
            <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
            <ActionBar text='Notification' onBackPress={() => navigation.goBack()} textStyle={[style.lblProfile, { color: theme.text }]} iconBack={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}  backgroundColor={theme.background} />
           
            
        </View>   
        
    )
}

export default TripsScreen;