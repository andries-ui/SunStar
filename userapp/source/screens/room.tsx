import React, { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Platform, ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../theme/themeProvider";
import style from "../styles/screens/room";
import MapView, { DirectionsRenderer, Marker, MarkerAnimated, PROVIDER_GOOGLE } from 'react-native-maps';
import TextComponent from "../components/text";
import { Divider, Icon } from "react-native-elements";
import Constance from "../theme/const";
import ImageComponent from "../components/image";
import ButtonComponent from "../components/button";
import ActionBar from "../components/actionbar";
import Separator from "../components/separater";
import NearestItemComponent from "../components/nearest";
import { useRoute } from '@react-navigation/native';
import * as TaskManager from 'expo-task-manager';
import axios from "axios";
import * as Location from 'expo-location';
import { requestForegroundPermissionsAsync } from "expo-location";
import MapViewDirections from 'react-native-maps-directions';
import { registerIndieID } from 'native-notify';

const Room = ({ navigation }) => {

    const { theme, dark, toggle } = useContext(ThemeContext)

    const params = useRoute().params;
    const [images, setimages] = useState();
    const [tv, settv] = useState();
    const [parking, setparking] = useState();
    const [wifi, setwifi] = useState();
    const [hotelname, sethotelname] = useState('');
    const [hotelKey, sethotelKey] = useState('');
    const [bedtype, setbedtype] = useState('');
    const [numOfBeds, setnumOfBeds] = useState('');
    const [price, setprice] = useState('');
    const [err, seterr] = useState('');
    const [latitude, setlatitude] = useState<number>(0);
    const [longitude, setlongitude] = useState<number>(0);
    const [coordinates, setcoordinates] = useState<any>([]);
    const [mapview, setmapview] = useState<any>();
    const [floor, setfloor] = useState('');

    const { width, height } = Dimensions.get('window');

    const handleSelect = (key) => {
        navigation.navigate('roomscreen');
    }

    const GetProperty = () => {
        const locationUrl = `https://sunstarapi.herokuapp.com/property/${params.key}`;
        axios.get(locationUrl).then((property_res) => {

            settv(property_res.data.tv);
            setparking(property_res.data.parking)
            setwifi(property_res.data.wifi);
            setimages(property_res.data.images);
            setbedtype(property_res.data.bedtype);
            setnumOfBeds(property_res.data.numberOfBed)

        }).catch((err) => {
            console.log(err);
        })
    }

    const GetRoom = () => {
        axios.get(`https://sunstarapi.herokuapp.com/room/${params.key}`).then((room_res) => {
            let room = room_res.data;
            setprice(room.price);
            sethotelKey(room.hotelId);
            setfloor(room.floor)
            console.log(room.hotelId, "=====>>>>>>");

            axios.get(`https://sunstarapi.herokuapp.com/hotel/${room.hotelId}`).then(async (hotel_res) => {
                let room = hotel_res.data;
                sethotelname(room.name);

            }).catch((err) => {
                console.log(err, ">>>>>>>>>")
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    // const LOCATION_TASK_NAME = 'background-location-task';
    // TaskManager.defineTask(LOCATION_TASK_NAME, ( data:any, error:any ) => {
    //     if (error) {
    //         console.log(error);

    //         return;
    //     }
    //     if (data) {
    //         const { locations } = data;
    //         setlatitude(locations.coords.latitude);
    //         setlongitude(locations.coords.longitude);
    //         // do something with the locations captured in the background
    //     }
    // });

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

            let location = await Location.watchPositionAsync({
                accuracy: Location.Accuracy.High,
                timeInterval: 10000,
                distanceInterval: 80,
            }, (location: any) => {

                setlatitude(location.coords.latitude);
                setlongitude(location.coords.longitude);
                setcoordinates([{ latitude: location.coords.latitude, longitude: location.coords.longitude }, { latitude: -23.900163, longitude: 29.449058 }])

            })


            console.log(coordinates);

            let rigion = await Location.reverseGeocodeAsync({
                longitude,
                latitude
            });



        } catch (err) {

        }


    }



    useEffect(() => {
        GetRoom();
        GetProperty();

        starWarching();
        updateState();
    }, [])

    return (
        <View style={{ backgroundColor: theme.background, height: '100%', width: '100%' }}>
            <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />

            <View style={style.map}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={style.map}
                    key={"AIzaSyCSdP5YSrTZGe56so60mGDMdE9h4Rp-sR0"}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.0185,
                        longitudeDelta: 0.0185,
                    }}
                    ref={mapview}
                    zoomControlEnabled
                    focusable
                    hasTVPreferredFocus
                >
                    {coordinates.map((marker) =>
                        <MarkerAnimated
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            title={"params.address"}
                            image={require('../../assets/images/pin.png')}
                            onDragEnd={(e) => console.log({ x: e.nativeEvent.coordinate, at: "sdfhjk" })}
                        />)}


                    <MapViewDirections
                        origin={coordinates[0]}
                        lineDashPattern={[10]}
                        waypoints={coordinates}
                        destination={coordinates[1]}
                        splitWaypoints={true}

                        apikey={"AIzaSyCSdP5YSrTZGe56so60mGDMdE9h4Rp-sR0"}
                        strokeWidth={5}
                        strokeColor={Constance.Green}
                        optimizeWaypoints={true}
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}

                        onReady={result => {
                            console.log(`Distance: ${result.distance} km`);
                            console.log(`Duration: ${result.duration} min.`);



                        }}
                        onError={(errorMessage) => {
                            console.log(errorMessage);
                        }}
                    />
                </MapView>
                <ActionBar backOpacity={theme.borderAlt} barStyle={{ position: 'absolute' }} backgroundColor={null} onBackPress={() => navigation.goBack()} iconBack={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} />

            </View>


            <View style={[style.content, { backgroundColor: theme.borderAlt }]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View >

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Icon type='ionicon' name='star' color={theme.gold} size={16} />
                                <TextComponent text={3.6} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '900' }} />
                            </View>
                            <TextComponent text={'views'} style={{ fontSize: Constance.small, color: theme.text, fontWeight: 'bold' }} />
                        </View>
                        <TouchableOpacity onPress={() => { navigation.navigate('hotelscreen', { key: hotelKey }) }}>
                            <TextComponent text={hotelname} style={{ fontSize: Constance.large, color: theme.text, fontWeight: 'bold' }} />
                        </TouchableOpacity>

                        <FlatList pagingEnabled ItemSeparatorComponent={Separator} horizontal data={images} renderItem={({ item, index }) => (
                            <ImageComponent key={index} image={{ uri: item }} text={item.name} />
                        )} />


                        <View style={[{ flexDirection: 'row', paddingBottom: 20, marginTop: 10, justifyContent: "space-between" }]}>
                            <View style={[{ width: '50%', paddingHorizontal: 2 }]}>
                                <TextComponent text={'Room setting'} style={{ fontSize: Constance.semi_large, color: theme.text, fontWeight: 'bold' }} />
                                <Divider style={[{ height: Constance.smallDivider, marginHorizontal: 2, backgroundColor: theme.background }]} />
                                <TextComponent text={`${numOfBeds} beds`} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '600' }} />
                                <TextComponent text={`${bedtype} bed`} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '600' }} />
                                <TextComponent text={`Level ${floor}`} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '600' }} />
                                <TextComponent text={'Internal bathroom'} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '600' }} />

                            </View>
                            <View style={[{ width: '50%', paddingHorizontal: 2, }]}>
                                <TextComponent text={'Services'} style={{ fontSize: Constance.semi_large, color: theme.text, fontWeight: 'bold' }} />
                                <Divider style={[{ height: Constance.smallDivider, marginHorizontal: 2, backgroundColor: theme.background }]} />
                                <TextComponent text={'breakfast'} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '600' }} />
                                <TextComponent text={'lunch'} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '600' }} />

                            </View>

                            <TextComponent text={`R ${price}`} style={{ textAlign: 'right', fontSize: Constance.small, color: theme.text, fontWeight: 'bold', position: 'absolute', right: 12, bottom: 0, borderTopWidth: 2, borderTopColor: theme.backgroundAlt }} />

                        </View>

                        <View style={{
                            paddingHorizontal: 30,
                            height: 50, marginHorizontal: 20, borderRadius: 12, marginTop: 20,
                            shadowOpacity: 0.08,
                            shadowOffset: {
                                width: 20,
                                height: 10,
                            }, backgroundColor: theme.backgroundAlt, shadowColor: theme.text, justifyContent: 'space-between', flexDirection: 'row'
                        }}>
                            <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon type="material-community" name="parking" color={parking == "true" ? Constance.Green : Constance.Red} />
                            </View>
                            <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon type="material-community" name="wifi" color={wifi == "true" ? Constance.Green : Constance.Red} />
                            </View>
                            <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon type="material-community" name="television" color={tv == "true" ? Constance.Green : Constance.Red} />
                            </View>
                            <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon type="material-community" name="security" color={Constance.Green} />
                            </View>
                        </View>

                        <View style={{ height: 80 }}>
                            <ButtonComponent btnstyle={{ position: 'absolute', right: 5, bottom: 5, borderRadius: 12, backgroundColor: Constance.Gold }}
                                text={"Book"}
                                lblstyle={{ color: Constance.White }}
                                mode={'text'}
                                press={() => { navigation.navigate('bookingscreen', { key: params.key, hotelKey: hotelKey, roomkey: params.key }) }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>

    )
}

export default Room;