import React, { useContext } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar, View } from "react-native";
import { ThemeContext } from "../theme/themeProvider";

const Tab = createBottomTabNavigator();

const FavouriteScreen =() =>{

    const {theme,dark,toggle} = useContext(ThemeContext)
    return (
           
        <View style={{backgroundColor:theme.background, height:'100%', width:'100%'}}>
            
                   
        </View>   
        
    )
}

export default FavouriteScreen;