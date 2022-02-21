import React, { useContext, useState } from "react";
import { FlatList, Platform, StatusBar } from "react-native";
import { View } from "react-native-animatable";
import ActionBar from "../components/actionbar";
import NotificationComponent from "../components/notification";
import Separator from "../components/separater";
import style from "../styles/screens/profile";
import { ThemeContext } from "../theme/themeProvider";

const Notification=({navigation})=> {

    const { theme , dark} = useContext(ThemeContext);

    const [dropped, setdropped] = useState(false);

    const notif = [
        {
            id: 1,
            name: "suit name",
        },
        {
            id: 2,
            name: "suit name1fgh",
        },
        {
            id: 3,
            name: "suit name2",
        },
        {
            id: 4,
            name: "suit name3",
        },
        {
            id: 5,
            name: "suit name6",
        },

    ];

    return ( 
        <View style={{ backgroundColor:theme.background, height:'100%'}}>
             <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
            <ActionBar text='Notification' onBackPress={() => navigation.goBack()} textStyle={[style.lblProfile, { color: theme.text }]} iconBack={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}  backgroundColor={theme.background} />
           
            <FlatList showsVerticalScrollIndicator={false} ItemSeparatorComponent={Separator} data={notif} renderItem={({ item, index }) => (

<NotificationComponent dropped={dropped? true : false } title={item.name}/>
)} />
           
        </View>
     )
}

export default Notification;