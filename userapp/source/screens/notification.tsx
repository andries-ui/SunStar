import React, { useContext, useEffect, useState } from "react";
import { FlatList, Platform, StatusBar } from "react-native";
import { View } from "react-native-animatable";
import ActionBar from "../components/actionbar";
import NotificationComponent from "../components/notification";
import Separator from "../components/separater";
import style from "../styles/screens/profile";
import * as SecureStore from 'expo-secure-store'
import { ThemeContext } from "../theme/themeProvider";
import axios from 'axios';
import { SwipeListView } from "react-native-swipe-list-view";
import Constance from "../theme/const";
import { Text } from "react-native-paper";
import { Icon } from "react-native-elements";
import { useRoute } from '@react-navigation/native';
import Progress from "../components/indicator";

const Notification = ({ navigation }) => {

    const { theme, dark } = useContext(ThemeContext);
    const params = useRoute().params;

    const [dropped, setdropped] = useState(false);
    const [load, setload] = useState(false);
    const [notif, setnotif] = useState([]);
    const [hotelNotif, sethotelNotif] = useState([]);

    const GetNotifications = async () => {

        if (params.indiNotif) {
            let key = await SecureStore.getItemAsync('key') || 'null';
            axios.get(`https://sunstarapi.herokuapp.com/userNotifications/notifications/${key}`).then(async (notifications) => {

            
                let data = notifications.data;

                  
                setnotif(data);
                console.log(data, ">>>>");
            }).catch((err) => {
                console.log(err + " ==");
            });
        }
        else {
            axios.get(`https://sunstarapi.herokuapp.com/hotelNotifications/notifications/${params.key}`).then((notifications) => {

                let data = notifications.data;

                setnotif(data[0]);
                console.log(data[3], ">>>>");
                

            }).catch((err) => {
                console.log(err + " ==");
            });
        }


    }


    const DeleteNotif = async (data: any) => {

        console.log(data._id);
        
        setload(true);
        axios.delete(`https://sunstarapi.herokuapp.com/userNotifications/${data._id}`).then(async (notifications) => {

       console.log("Success");
       
            setload(false);

        }).catch((err) => {
            console.log(err + " ==>>");
            setload(false);
        });



    }

    const handledropped=(data:any)=>{

        console.log(data);

        axios.patch(`https://sunstarapi.herokuapp.com/userNotifications/${data._id}`, { active: false }).then((notifications) => {

            console.log(notifications.data);
            dropped ? setdropped(false) : setdropped(true);
            
        }).catch((err) => {
            console.log(err + " ==");
        });
    }

    useEffect(() => {
        GetNotifications();
    }, [])

    return (
        <View style={{ backgroundColor: theme.background, height: '100%' }}>
            <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
            <ActionBar text='Notification' onBackPress={() => navigation.goBack()} textStyle={[style.lblProfile, { color: theme.text }]} iconBack={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} backgroundColor={theme.background} />


            <SwipeListView
                data={notif}
                renderItem={(data, rowMap) => (

                    <NotificationComponent press={()=>handledropped(data.item)} dropped={dropped} time={data.item.createdAt} title={data.item.title} message={data.item.message} key={data.index.toString()} status={data.item.status} />

                )}

                bounces
                bouncesZoom
                disableRightSwipe
                ItemSeparatorComponent={Separator}
                renderHiddenItem={(data, rowMap) => (
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Icon type="material-community" name="delete" size={26} color={Constance.Red} />
                                <Icon type="material-community" name="eye-check" style={{ marginLeft: 5 }} size={26} />
                            </View>
                        </View>
                        <View >

                            {load ? <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15 }}>
                                <Progress />
                            </View>
                                :
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                                    <Icon type="material-community" name="delete" size={26} onPress={() => DeleteNotif(data.item)} color={Constance.Red} />
                                    <Icon type="material-community" name="eye-check" style={{ marginLeft: 5 }} size={26} />
                                </View>}


                        </View>
                    </View>
                )}
                leftOpenValue={65}
                rightOpenValue={-65}
            />
            {/* <FlatList showsVerticalScrollIndicator={false} ItemSeparatorComponent={Separator} data={notif} renderItem={({ item, index }) => (
        
            <NotificationComponent dropped={dropped? true : false } time={item.createdAt} title={item.title} message={item.message} key={item._id} status={item.status}/>
            )} /> */}

        </View>
    )
}

export default Notification;