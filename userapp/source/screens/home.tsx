import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { requestForegroundPermissionsAsync } from "expo-location";
import { FontAwesome5 } from '@expo/vector-icons'
import { FlatList, Image, ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import BottomNavigation from "../routes/bottomStack";
import { ThemeContext } from "../theme/themeProvider";
import ActionBar from "../components/actionbar";
import InputComponent from "../components/input";
import Constance from "../theme/const";
import Progress from "../components/indicator";
import { Icon } from "react-native-elements";
import TextComponent from "../components/text";
import NearestItemComponent from "../components/nearest";
import Separator from "../components/separater";
import PopularItemComponent from "../components/popular";
import axios from "axios";
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'expo-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {

    const { theme, dark, toggle } = useContext(ThemeContext);
    const [hotels, sethotels] = useState([]);
    const [address, setaddress] = useState('');
    const [result, setresult] = useState('');
    const [err, seterr] = useState('');
    const [latitude, setlatitude] = useState<number>(0);
    const [longitude, setlongitude] = useState<number>(0);
    const [region, setregion] = useState<any>();

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [getLocation, setGetLocation] = useState(false);



    const getToken = async () => {
        let re = await SecureStore.getItemAsync('token') || 'null';

        setresult(re)

    }
    const handleSelect = (key) => {

        console.log(key);

        navigation.navigate('roomscreen', { key: key });
    }

    const GetHotels = () => {
        const url = "https://sunstarapi.herokuapp.com/room";

        axios.get(url).then((res) => {

            const roomdata: any = [];
            res.data.forEach((room: any) => {

                axios.get(`https://sunstarapi.herokuapp.com/roomRating/ratings/${room._id}`).then((rating_res) => {

                    let total: any = rating_res.data.length * 5;
                    let ratings: any = 5.0;
                    for (let item in rating_res.data) {
                        ratings = ratings + parseInt(rating_res.data[item].ratedStar.toString()).substring(0, 3);
                        // console.log(ratings, "===>>>>>>");
                    }

                    let totalRates: any = 5.0;
                    if (total) {
                        totalRates = ratings / total * 5;

                    }
                    axios.get(`https://sunstarapi.herokuapp.com/property/${room._id}`).then((property_res) => {

                        const data = {
                            key: room._id,
                            type: room.type,
                            price: room.price,
                            status: room.status,
                            floor: room.floor,
                            rates: totalRates.toString(),
                            roomNumber: room.roomNumber,
                            hotelId: room.hotelId,
                            bedtype: property_res.data.bedType,
                            tv: property_res.data.tv,
                            wifi: property_res.data.wifi,
                            parking: property_res.data.parking,
                            numberOfBed: property_res.data.numberOfBed,
                            images: property_res.data.images[0],
                            roomId: property_res.data.roomId,
                        }

                        roomdata.push(data);
                        sethotels(roomdata);

                    }).catch((err) => {
                        console.log(err);
                    })

                }).catch((err) => {
                    console.log(err);
                })
            })


        }).catch((err) => {
            console.log(err);

        })
    }

    const starWarching = async () => {
        try {
            await requestForegroundPermissionsAsync();

        } catch (err: any) {
            seterr(err)
        }
    }

    const updateState = async () => {

        try {

            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') { return; }

            let location = await Location.getCurrentPositionAsync({});

            setlatitude(location.coords.latitude);
            setlongitude(location.coords.longitude);

            let rigion = await Location.reverseGeocodeAsync({
                longitude,
                latitude
            });

            setaddress(rigion[0].isoCountryCode + ", " + rigion[0].region + ", " + rigion[0].city + ", " + rigion[0].street + ", " + rigion[0].postalCode)
            setregion(rigion[0]);
            //console.log(rigion[0]);


        } catch (err) {

        }


    }



    useEffect(() => {

        starWarching();
        updateState();
        getToken();
        GetHotels();
    }, [])


    return (

        <View style={{ backgroundColor: theme.background, height: '100%', width: '100%' }}>

            <View style={{ marginVertical: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>

                <View style={{ width: '85%', borderRadius: 15, backgroundColor: theme.background }}>
                    <TouchableOpacity onPress={() => navigation.navigate('searchscreen')}>
                        <InputComponent editable={false} left={<TextInput.Icon name="magnify" />} hint="Find accomodation" style={{ width: '95%', backgroundColor: theme.border }} />
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: theme.borderAlt, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>
                    <Icon type='Ionicon' name='notifications' color={theme.text} onPress={() => navigation.navigate('notivationscreen', { indiNotif: true })} />
                </View>
            </View>


            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ paddingBottom: 80 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, }}>
                        <TextComponent text={'Nearest accomodations'} style={{ fontSize: Constance.medium, color: theme.text, fontWeight: 'bold' }} />
                        <TextComponent text={'See all'} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '900' }} />
                    </View>

                    <View>
                        <FlatList pagingEnabled showsHorizontalScrollIndicator={false} ItemSeparatorComponent={Separator} horizontal data={hotels} renderItem={({ item, index }) => (

                            <NearestItemComponent image={{ uri: item.images }} address={item.location}
                                name={item.type} price={item.price} ratings={item.rates}
                                key={item.roomId} press={() => { navigation.navigate('roomscreen', { key: item.key }); }} />

                        )} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 5 }}>
                        <TextComponent text={'Popular'} style={{ fontSize: Constance.medium, color: theme.text, fontWeight: 'bold' }} />
                        <TextComponent text={''} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '900' }} />
                    </View>
                    <View>
                        <FlatList ItemSeparatorComponent={Separator} data={hotels} renderItem={({ item, index }) => (
                            <PopularItemComponent image={{ uri: item.images }} address={region ? region.city : "PLK"}
                                name={item.type} price={item.price} ratings={item.rates}
                                key={item.roomId} press={() => { navigation.navigate('roomscreen', { key: item.key, address: address }); }} />
                        )} />
                    </View>
                </View>
            </ScrollView>


        </View>

    )
}

export default HomeScreen;