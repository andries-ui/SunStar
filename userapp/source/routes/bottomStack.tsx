import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Icon } from "react-native-elements";
import { StatusBar, TouchableOpacity, View } from "react-native";
import Constance from "../theme/const";
import Profile from "../screens/profile";
import FavouriteScreen from "../screens/favourite";
import HomeScreen from "../screens/home";
import { ThemeContext } from "../theme/themeProvider";


const Tab = createBottomTabNavigator();

const BottomNavigation = () => {

  const { theme, dark, toggle } = useContext(ThemeContext)
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          //sytling the Tab
          tabBarStyle: {
            backgroundColor: theme.navigation,
            position: "absolute",
            height: 60,
            borderRadius: 12,
            shadowColor: Constance.Blue,
            shadowOpacity: 0.08,
            shadowOffset: {
              width: 20,
              height: 10,
            },
            marginHorizontal: 15,
            marginVertical: 10,
            padding: 0,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => (
              <View style={{ position: "absolute", top: "30%" }}>
                <Icon
                  name={focused ? "home" : "home"}
                  size={focused ? 26 : 20}
                  type="ionicon"
                  color={focused ? Constance.Blue : "gray"}
                ></Icon>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Favourites"
          component={FavouriteScreen}
          options={{
            tabBarLabel: "Favourites",
            tabBarIcon: ({ focused }) => (
              <View style={{ position: "absolute", top: "30%" }}>
                <Icon
                  name={focused ? "heart" : "heart"}
                  size={focused ? 26 : 20}
                  type="ionicon"
                  color={focused ? Constance.Blue : "gray"}
                ></Icon>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ focused }) => (
              <View style={{ position: "absolute", top: "30%" }}>
                <Icon
                  name={focused ? "person" : "person"}
                  size={focused ? 26 : 20}
                  type="ionicon"
                  color={focused ? Constance.Blue : "gray"}
                ></Icon>
              </View>
            ),
          }}
        />


      </Tab.Navigator>
    
  );
}

export default BottomNavigation;