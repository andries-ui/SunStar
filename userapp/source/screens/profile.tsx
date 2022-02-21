import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FlatList, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { BottomNavigation, Divider } from "react-native-paper";
import { ThemeContext } from "../theme/themeProvider";
import style from "../styles/screens/profile";
import Constance from "../theme/const";
import { Icon } from "react-native-elements";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { UrlTile } from "react-native-maps";
import Separator from "../components/separater";
import PlaceItemComponent from "../components/places";
import { SwipeListView } from 'react-native-swipe-list-view';
import Hotel from './hotel';
import ButtonComponent from "../components/button";
import Progress from "../components/indicator";



const Profile = ({ navigation }) => {

    const { theme, dark, toggle } = useContext(ThemeContext);
    const [token, settoken] = useState('');
    const [key, setkey] = useState('');
    const [names, setnames] = useState('--');
    const [email, setemail] = useState('==');
    const [res, setres] = useState([]);
    const [image, setimage] = useState('');
    const [places, setplaces] = useState([]);
    const [load, setload] = useState(false);


    const GetUserData = async () => {
        let token = await SecureStore.getItemAsync('token') || 'null';
        let key = await SecureStore.getItemAsync('key') || 'null';


        setkey(key);

        axios.get('https://sunstarapi.herokuapp.com/user/'.concat(key)).then((results) => {

            let data = results.data;

            setnames(data.names);
            setemail(data.email);

            let buff = Buffer.from(data.url.data, 'base64');
            setimage(buff.toString('base64'))
            console.log(data.details);
        }).catch((err) => {

            console.log(err + '.');

        });

    }

    const GetReservations = async () => {

        let key = await SecureStore.getItemAsync('key') || 'null';
        axios.get(`https://sunstarapi.herokuapp.com/roomReservation/reservation/${key}`).then((notifications) => {

            const roomdata: any = [];
            notifications.data.forEach((reserve: any) => {

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

                                    setplaces(roomdata);
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
            })
        }).catch((err) => {
            console.log(err + " ==");
        });

    }

    const DeleteNotif = async (key: any) => {
        console.log(key, "===");

        setload(true);
        axios.delete(`https://sunstarapi.herokuapp.com/roomReservation/${key}`).then(async (notifications) => {

            setload(false);

        }).catch((err) => {
            console.log(err + " ==");
            setload(false);
        });

    }



    useEffect(() => {

        GetUserData();
        GetReservations();
    }, [])



    return (

        <View style={[style.parent, { backgroundColor: theme.background }]}>

            <View style={[style.topcontainer, { backgroundColor: theme.borderAlt }]}>
                <Text style={[style.lblProfile, { color: theme.text }]}>Profile</Text>
            </View>

            <View style={[style.image, {
                shadowColor: theme.text,
                top: 75,
                alignSelf: 'center',
                position: 'absolute',
            }]}>
                <Image style={[{ height: 70, width: 70 }]} source={{
                    uri:
                        image
                }} />
            </View>
            <View style={[style.content, { backgroundColor: theme.backgroundAlt, }]}>
                <View style={[style.flexContainer, { justifyContent: 'space-between' }]}>
                    <Icon type='material-community' name='bookmark-check' color={theme.gold} onPress={() => { navigation.navigate('reservationscreen') }} />
                    <Icon type='ionicon' name={dark ? 'contrast' : 'moon'} color={theme.text} onPress={toggle} />
                </View>
                <Text style={[style.lblcenterlined, { fontWeight: 'bold', fontSize: Constance.semi_large, color: theme.text, marginTop: 10 }]}> {names}</Text>
                <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text }]}>{email}</Text>

                <Divider style={{ height: Constance.smallDivider, backgroundColor: theme.borderAlt, marginTop: 10 }} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>


                        <TouchableOpacity onPress={() => navigation.navigate('accountscreen')}>
                            <View>
                                <View style={[style.flexContainer, { justifyContent: 'space-between', height: 50, alignItems: 'center', marginTop: 5 }]}>
                                    <View style={[style.flexContainer,]}>
                                        <Icon type='ionicon' name='person-circle' color={theme.text} />
                                        <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text }]}> Account </Text>
                                    </View>
                                    <Icon type='ionicon' name='chevron-forward' color={theme.text} />
                                </View>
                                <Divider style={{ height: Constance.smallDivider, backgroundColor: theme.borderAlt, }} />
                            </View>
                        </TouchableOpacity>



                        <TouchableOpacity onPress={() => navigation.navigate('creditcardscreen', { payment: false })}>
                            <View>
                                <View style={[style.flexContainer, { justifyContent: 'space-between', height: 50, alignItems: 'center', marginTop: 5 }]}>
                                    <View style={[style.flexContainer,]}>
                                        <Icon type='ionicon' name='card' color={theme.text} />
                                        <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text }]}> My cards </Text>
                                    </View>
                                    <Icon type='ionicon' name='chevron-forward' color={theme.text} />
                                </View>
                                <Divider style={{ height: Constance.smallDivider, backgroundColor: theme.borderAlt, }} />
                            </View>
                        </TouchableOpacity>

                        <View style={[style.flexContainer, { justifyContent: 'space-between', marginTop: 20 }]}>
                            <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text }]}>Places you stayed</Text>
                            <Icon type='material-community' name={dark ? 'delete-forever' : 'delete-off'} color={theme.text} onPress={toggle} />
                        </View>

                        <SwipeListView
                            data={places}
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
                                                <TouchableOpacity onPress={() => navigation.navigate('roomscreen', { key: data.item.roomId })} style={{ paddingHorizontal: 5, marginVertical:6 }} >
                                                    <Text style={{ fontSize: Constance.medium, fontWeight: 'bold', color: theme.text, backgroundColor: Constance.Blue, borderRadius: 7, padding: 5, }}>
                                                        Book
                                                    </Text>
                                                </TouchableOpacity>
                                                <Divider />
                                                <Icon type="material-community" name="delete" onPress={() => DeleteNotif(data.item.key)} size={26} style={{ marginLeft: 5, marginTop: 5 }} color={Constance.Red} />
                                            </View>}
                                    </View>
                                </View>
                            )}
                            leftOpenValue={75}
                            rightOpenValue={-75}
                        />

                    </View>
                </ScrollView>


            </View>



        </View>

    )
}

export default Profile;