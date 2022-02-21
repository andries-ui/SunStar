import React, { useContext, useEffect, useState } from "react";
import { FlatList, Platform, StatusBar, TouchableOpacity, View } from "react-native";
import { Icon, Image, Text } from "react-native-elements";
import { Switch, TextInput } from "react-native-paper";
import ActionBar from "../components/actionbar";
import InputComponent from "../components/input";
import Separator from "../components/separater";
import TextComponent from "../components/text";
import Constance from "../theme/const";
import { ThemeContext } from "../theme/themeProvider";
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import * as notify from 'native-notify';
import NearestItemComponent from './../components/nearest';

const Hotel = ({ navigation }) => {

    const params = useRoute().params;
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

    const [rooms, setrooms] = useState([]);
    const [hotelname, sethotelname] = useState('');
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const { theme, dark } = useContext(ThemeContext)

    const GetHotel = () => {
        axios.get(`https://sunstarapi.herokuapp.com/hotel/${params.key}`)
            .then(async (hotel_res) => {
                let hotel = hotel_res.data;
                sethotelname(hotel.name);


            })
            .catch((err) => {
                console.log(err);
            })
    }

    const GetRooms = () => {
        axios.get(`https://sunstarapi.herokuapp.com/room/hotel/${params.key}`)
            .then(async (hotel_res) => {
                const roomdata: any = [];
                hotel_res.data.forEach((room: any) => {
                    const locationUrl = "https://sunstarapi.herokuapp.com/property/" + room._id;
                    axios.get(locationUrl).then((property_res) => {

                        const data = {
                            key: room._id,
                            type: room.type,
                            price: room.price,
                            status: room.status,
                            floor: room.floor,
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

                        setrooms(roomdata);

                    }).catch((err) => {
                        console.log(err);
                    })
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onToggleSwitch = async () => {
        if (isSwitchOn) {
            setIsSwitchOn(false);
            await notify.registerIndieID(`${params.key}`, 910, 'IBzo5MJJB46vcD3JGfjwRf');
        } else {
            await notify.registerIndieID(`${params.key}`, 910, 'IBzo5MJJB46vcD3JGfjwRf');
            setIsSwitchOn(true);
        }
    };
    useEffect(() => {
        GetHotel();
        GetRooms();
    }, [])


    return (
        <View style={{ backgroundColor: theme.background }}>
            <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />

            <View style={{ height: 200, width: '100%' }}>
                <Image style={{ height: 200, width: '100%' }} source={require('../../assets/images/room.png')} resizeMode='cover' />

                <View style={{ opacity: 0.7, position: 'absolute', bottom: 0, height: 60, width: '100%', backgroundColor: theme.borderAlt, justifyContent: 'center', alignItems: 'center' }}>
                </View>
                <View style={{ position: 'absolute', bottom: 0, height: 60, width: '100%', justifyContent: 'center', }}>

                    <View style={{ paddingHorizontal: 10, height: 60, position: 'absolute', width: '100%', bottom: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Icon type='ionicon' name='location' color={theme.text} size={16} />
                                <TextComponent text={'address'} style={{ fontSize: Constance.medium, color: theme.text, fontWeight: '900' }} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', position: 'absolute', right: 0, top: 0, alignItems: 'center' }}>
                                <Icon type='ionicon' name='star' color={Constance.Gold} size={20} />
                                <TextComponent text={'4.5'} style={{ marginHorizontal: 0, fontSize: Constance.small, color: theme.text, fontWeight: 'bold' }} />
                            </View>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <TextComponent text={hotelname} style={{ color: theme.text, fontSize: Constance.semi_large, fontWeight: 'bold' }} />
                            <Switch value={isSwitchOn} style={{ marginTop: -15 }} onChange={onToggleSwitch} />
                        </View>
                    </View>

                </View>
            </View>



            {rooms.length > 0 ?
                <FlatList showsHorizontalScrollIndicator={false} ItemSeparatorComponent={Separator} data={rooms} renderItem={({ item, index }) => (
                    <NearestItemComponent image={{ uri: item.images }} address={item.location}
                        name={item.type} price={item.price} ratings={item.rates}
                        key={item.roomId} press={() => { navigation.navigate('roomscreen', { key: item.key }); }} />
                )} /> :
                <View style={{ height: Constance.height - 200, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/images/search.png')} style={{ width: 150, height: 150 }} />
                    <Text style={{ fontSize: Constance.medium, color: Constance.Grey }}>No reservations found yet</Text>
                </View>}


            <View style={[{
                height: 60, width: '100%', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-between', paddingHorizontal: 10, position: 'absolute'
            }]}>
                <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>

                    <View style={{ opacity: 0.6, height: 40, width: 40, backgroundColor: theme.borderAlt, justifyContent: 'center', alignItems: 'center', borderRadius: 12, position: 'absolute' }}>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 12, position: 'absolute' }}>
                        <Icon style={{ marginHorizontal: 10 }} type="ionicon" name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} size={28} color={theme.text} onPress={() => navigation.goBack()} />
                    </View>
                </View>
                <View style={{ backgroundColor: theme.borderAlt, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>
                    <Icon type='Ionicon' name='notifications' color={theme.text} onPress={() => navigation.navigate('notivationscreen', { indiNotif: false, key: params.key })} />
                </View>
            </View>

        </View>
    )
}

export default Hotel;