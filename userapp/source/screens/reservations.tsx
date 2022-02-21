import React, { useContext, useEffect, useState } from "react";
import { FlatList, Platform, StatusBar, TouchableOpacity, View } from "react-native";
import { Icon, Image, Text, Divider } from "react-native-elements";
import { TextInput } from "react-native-paper";
import ActionBar from "../components/actionbar";
import InputComponent from "../components/input";
import Separator from "../components/separater";
import TextComponent from "../components/text";
import Constance from "../theme/const";
import { ThemeContext } from "../theme/themeProvider";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { SwipeListView } from 'react-native-swipe-list-view';
import Progress from "../components/indicator";
import PlaceItemComponent from "../components/places";

const Reservation = ({ navigation }) => {

    const history = [
        {
            id: 1,
            name: "price",
        },
        {
            id: 2,
            name: "location",
        },
        {
            id: 3,
            name: "cancelled",
        },
        {
            id: 4,
            name: "pending",
        },

    ];
    const [search, setsearch] = useState('');
    const [results, setresults] = useState([]);
    const { theme, dark } = useContext(ThemeContext)
    const [booking, setbooking] = useState('');
    const [load, setload] = useState(false);

    const GetReservations = async () => {

        let key = await SecureStore.getItemAsync('key') || 'null';
        axios.get(`https://sunstarapi.herokuapp.com/roomReservation/reservation/${key}`).then((notifications) => {

            const roomdata: any = [];
            notifications.data.forEach((reserve: any) => {

                if (reserve.active === true) {
                    axios.get(`https://sunstarapi.herokuapp.com/room/${reserve.roomId}`).then((room: any) => {

                        const locationUrl = "https://sunstarapi.herokuapp.com/property/" + reserve.roomId;
                        axios.get(locationUrl)
                            .then((property_res) => {


                                var one_day = 1000 * 60 * 60 * 24;

                                let endDate = new Date(reserve.checkoutDate);
                                let startDate = new Date(reserve.checkinDate);

                                let days = Math.round(endDate - startDate) / (one_day);

                                let price = (parseInt(room.data.price) * days).toString();


                                axios.get(`https://sunstarapi.herokuapp.com/hotel/${reserve.hotelId}`)
                                    .then((hotel_res) => {

                                        const data = {
                                            key: reserve._id,
                                            roomId: reserve.roomId,
                                            type: room.data.type,
                                            status: room.data.status,
                                            floor: room.data.floor,
                                            days: days,
                                            price: price,
                                            roomNumber: room.data.roomNumber,
                                            hotelName: hotel_res.data.name,
                                            bedtype: property_res.data.bedtype,
                                            tv: property_res.data.tv,
                                            wifi: property_res.data.wifi,
                                            parking: property_res.data.parking,
                                            numberOfBed: property_res.data.numberOfBed,
                                        }

                                        roomdata.push(data);

                                        setbooking(roomdata);
                                        // console.log(roomdata);

                                    }).catch((err) => {
                                        console.log(err + "--------------");
                                    })
                            }).catch((err) => {
                                console.log(err);
                            })
                    }).catch((err) => {
                        console.log(err + "========");

                    })
                }else{
                    console.log("+>>>>>===>>>>>>===>>>>");
                    
                }
            })
        }).catch((err) => {
            console.log(err + " ==");
        });

    }

    useEffect(() => {

        GetReservations();
    }, [])

    return (
        <View style={{ backgroundColor: theme.background , height:'100%', width:'100%'}}>
            <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />

            <View style={{ padding: 12 }}>
                <Text>Active bookings</Text>
            </View>
            <SwipeListView
                data={booking}
                renderItem={(data, rowMap) => (
                    <PlaceItemComponent address={data.item.hotelName}
                        name={data.item.type} price={`${data.item.days} days for R ${data.item.price}`} ratings={data.item.bedtype}
                        key={data.item.roomId} />
                )}
                bounces
                bouncesZoom
                disableRightSwipe
                ItemSeparatorComponent={Separator}
                renderHiddenItem={(data, rowMap) => (
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <View style={{ paddingHorizontal: 12, paddingVertical: 12 }}>
                            {load ? <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15 }}>
                                <Progress />
                            </View>
                                : <View>
                                    <TouchableOpacity onPress={() => navigation.navigate('roomscreen', { key: data.item.roomId })} style={{ paddingHorizontal: 5, marginVertical: 6 }} >
                                        <Text style={{ fontSize: Constance.medium, fontWeight: 'bold', color: theme.text, backgroundColor: Constance.Blue, borderRadius: 7, padding: 5, }}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                    <Divider />
                                       </View>}
                        </View>
                    </View>
                )}
                leftOpenValue={85}
                rightOpenValue={-85}
            />



        </View>
    )
}

export default Reservation;