import React, { useContext } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar, View } from "react-native";
import { ThemeContext } from "../theme/themeProvider";

const Tab = createBottomTabNavigator();

const FavouriteScreen =() =>{

    const {theme,dark,toggle} = useContext(ThemeContext);

    // const GetReservations = async () => {

    //     let key = await SecureStore.getItemAsync('key') || 'null';
    //     axios.get(`https://sunstarapi.herokuapp.com/roomReservation/reservation/${key}`).then((notifications) => {

    //         const roomdata: any = [];
    //         notifications.data.forEach((reserve: any) => {

    //             axios.get(`https://sunstarapi.herokuapp.com/room/${reserve.roomId}`).then((room: any) => {

    //                 const locationUrl = "https://sunstarapi.herokuapp.com/property/" + reserve.roomId;
    //                 axios.get(locationUrl)
    //                     .then((property_res) => {


    //                         var one_day = 1000 * 60 * 60 * 24;

    //                         let endDate = new Date(reserve.checkoutDate);
    //                         let startDate = new Date(reserve.checkinDate);

    //                         let days = Math.round(endDate - startDate) / (one_day);

    //                         let price = (parseInt(room.data.price) * days).toString();


    //                         axios.get(`https://sunstarapi.herokuapp.com/hotel/${reserve.hotelId}`)
    //                             .then((hotel_res) => {

    //                                 const data = {
    //                                     key: reserve._id,
    //                                     roomId: reserve.roomId,
    //                                     type: room.data.type,
    //                                     status: room.data.status,
    //                                     floor: room.data.floor,
    //                                     days: days,
    //                                     price: price,
    //                                     roomNumber: room.data.roomNumber,
    //                                     hotelName: hotel_res.data.name,
    //                                     bedtype: property_res.data.bedtype,
    //                                     tv: property_res.data.tv,
    //                                     wifi: property_res.data.wifi,
    //                                     parking: property_res.data.parking,
    //                                     numberOfBed: property_res.data.numberOfBed,
    //                                 }

    //                                 roomdata.push(data);

    //                                 setplaces(roomdata);
    //                                 // console.log(roomdata);

    //                             }).catch((err) => {
    //                                 console.log(err + "--------------");
    //                             })
    //                     }).catch((err) => {
    //                         console.log(err);
    //                     })
    //             }).catch((err) => {
    //                 console.log(err + "========");

    //             })
    //         })
    //     }).catch((err) => {
    //         console.log(err + " ==");
    //     });

    // }

    return (
           
        <View style={{backgroundColor:theme.background, height:'100%', width:'100%'}}>
            
                   
        </View>   
        
    )
}

export default FavouriteScreen;