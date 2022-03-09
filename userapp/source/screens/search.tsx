import React, { useContext, useEffect, useState } from "react";
import { FlatList, Platform, StatusBar, TouchableOpacity, View } from "react-native";
import { Icon, Image, Text, SearchBar } from "react-native-elements";
import { TextInput } from "react-native-paper";
import ActionBar from "../components/actionbar";
import InputComponent from "../components/input";
import Separator from "../components/separater";
import TextComponent from "../components/text";
import Constance from "../theme/const";
import { ThemeContext } from "../theme/themeProvider";
import NearestItemComponent from './../components/nearest';
import axios from 'axios';

const Search = ({ navigation }) => {

    const [roomhistory, setroomhistory] = useState([]);
    const [history, sethistory] = useState([]);
    const { theme, dark } = useContext(ThemeContext);
    const [rooms, setrooms] = useState<any>([]);
    const [locations, setlocations] = useState<any>([]);
    const [hotels, sethotels] = useState<any>([]);
    const [query, setquery] = useState('');
    const [searching, setsearching] = useState(false)
    const [FilteredRoomList, setFilteredRoomList] = useState([]);

    const GetRooms = (query: any) => {

        setquery(query);
        setrooms([])
        sethotels([]);
        setsearching(true);
        axios.post(`https://sunstarapi.herokuapp.com/room/searchRooms`, { value: query }).then((res) => {
            const roomdata: any = [];

            res.data.forEach((room: any) => {
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
                    setsearching(false);
                }).catch((err) => {
                    console.log(err);
                    setsearching(false);
                })
            })

        }).catch((err) => {
            console.log(err);
            setsearching(false);
        })

        axios.post(`https://sunstarapi.herokuapp.com/hotel/searchHotels`, { value: query }).then((res) => {
            const roomdata: any = [];

            res.data.forEach((hotel: any) => {
                const url = `https://sunstarapi.herokuapp.com/room/rooms/${hotel._id}`;

                axios.get(url).then((res) => {

                    res.data.forEach((room: any) => {

                        axios.get(`https://sunstarapi.herokuapp.com/roomRating/ratings/${room._id}`).then((rating_res) => {

                            let total: any = rating_res.data.length * 5;
                            let ratings: any = 0.0;
                            for (let item in rating_res.data) {
                                ratings = ratings + parseInt(rating_res.data[item].ratedStar.toString()).substring(0, 3);
                                // console.log(ratings, "===>>>>>>");
                            }

                            let totalRates: any = 0;
                            if (total) {
                                totalRates = ratings / total * 5;
                                //console.log(totalRates);
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
                                    hotelname: hotel.name,
                                    parking: property_res.data.parking,
                                    numberOfBed: property_res.data.numberOfBed,
                                    images: property_res.data.images[0],
                                    roomId: property_res.data.roomId,
                                }

                                roomdata.push(data);
                                sethotels(roomdata);
                                setsearching(false);

                            }).catch((err) => {
                                console.log(err);
                                setsearching(false);
                            })

                        }).catch((err) => {
                            console.log(err);
                            setsearching(false);
                        })
                    })


                }).catch((err) => {
                    console.log(err);
                    setsearching(false);
                })
            })


        }).catch((err) => {
            console.log(err);
            setsearching(false);
        })
    }

    const SearchAndFilter = (query: any) => {
        const lowerCaseQuery = query.toLowerCase();
        if (lowerCaseQuery === '') {
            setFilteredRoomList([]);
            return;
        }
        const newrooms = rooms
            .filter((room) => room.price.includes(lowerCaseQuery))
            .map((room) => ({
                ...room,
                rank: room.price.indexOf(lowerCaseQuery),
            }))
            .sort((a, b) => a.rank - b.rank);

        setFilteredRoomList(newrooms);
    }

    const Hotels = () => {
        axios.get(`https://sunstarapi.herokuapp.com/hotel`).then((res) => {
            const hotelsdata: any = [];

            res.data.forEach((hotel) => {
                hotelsdata.push({ id: hotel._id, name: hotel.name });
            })
            sethistory(hotelsdata);

        }).catch((err) => {
            console.log(err);
            setsearching(false);
        })
    }

    const Rooms = () => {
        axios.get(`https://sunstarapi.herokuapp.com/room/`).then((res) => {
            const roomdata: any = [];

            res.data.forEach((room: any) => {
                roomdata.push({ id: room._id, name: room.type });
            })
            setroomhistory(roomdata);

        }).catch((err) => {
            console.log(err);
            setsearching(false);
        })
    }

    useEffect(() => {
        Hotels();
        Rooms();
        SearchAndFilter(query)
    }, [query]);

    return (
        <View style={{ height: '100%', backgroundColor: theme.background }}>
            <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />

            <View style={[{
                height: 60, width: '100%', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-evenly'
            }]}>

                <Icon style={{ marginHorizontal: 10 }} type="ionicon" name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} size={28} color={theme.text} onPress={() => navigation.goBack()} />

                <InputComponent changeText={(e) => { GetRooms(e) }} value={query} left={<TextInput.Icon name="magnify" />} hint="Find accomodation" style={{ width: '80%', backgroundColor: theme.border }} />
            </View>

            <View style={{
                height: 60, width: '100%', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'flex-start', paddingHorizontal: 10
            }}>

                <View style={{ width: 50}}>
                    <Icon style={{ marginHorizontal: 10 }} type="material-community" name='history' size={28} color={theme.text} onPress={() => navigation.goBack()} />
                </View>
                <View>
                    <FlatList showsHorizontalScrollIndicator={false} ItemSeparatorComponent={Separator} horizontal data={history} renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => { GetRooms(item.name); setquery(item.name) }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                backgroundColor: Constance.Black,
                                marginHorizontal: 5,
                                borderRadius: 12, paddingHorizontal: 10, paddingVertical: 2
                            }}>
                                <TextComponent text={item.name} key={item.id} style={{ fontSize: Constance.small, color: Constance.White }} />
                                <Icon onPress={() => { }} type="ionicon" name="close" color={Constance.White} />
                            </View>
                        </TouchableOpacity>
                    )} />
                    <FlatList style={{ marginTop: 5 }} showsHorizontalScrollIndicator={false} ItemSeparatorComponent={Separator} horizontal data={roomhistory} renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => { GetRooms(item.name); setquery(item.name) }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                backgroundColor: Constance.Black,
                                marginHorizontal: 5,
                                borderRadius: 12, paddingHorizontal: 10, paddingVertical: 2
                            }}>
                                <TextComponent text={item.name} key={item.id} style={{ fontSize: Constance.small, color: Constance.White }} />
                            </View>
                        </TouchableOpacity>
                    )} />
                </View>

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, }}>
                <TextComponent text={'Room results'} style={{ fontSize: Constance.medium, color: theme.text, fontWeight: 'bold' }} />
                <TextComponent text={`${rooms.length} total`} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '900' }} />
            </View>
            {rooms.length > 0 ?
                <View>

                    <FlatList alwaysBounceHorizontal horizontal showsVerticalScrollIndicator={false} ItemSeparatorComponent={Separator} data={rooms} renderItem={({ item, index }) => (
                        <NearestItemComponent image={{ uri: item.images }} address={item.location}
                            name={item.type} price={item.price} ratings={item.rates}
                            key={item.roomId} press={() => { navigation.navigate('roomscreen', { key: item.key }); }} />
                    )} />
                </View> :
                <View style={{ height: "30%", marginVertical: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/images/search.png')} style={{ width: 150, height: 150 }} />
                    {searching ?
                        <Text style={{ fontSize: Constance.medium, color: Constance.Grey, fontWeight: 'bold' }}>Finding rooms...</Text> :
                        <Text style={{ fontSize: Constance.medium, color: Constance.Grey }}>No results found</Text>}
                </View>}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, }}>
                <TextComponent text={'Hotel results'} style={{ fontSize: Constance.medium, color: theme.text, fontWeight: 'bold' }} />
                <TextComponent text={`${hotels.length} total`} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '900' }} />
            </View>
            {hotels.length > 0 ?
                <View>

                    <FlatList alwaysBounceHorizontal horizontal showsVerticalScrollIndicator={false} ItemSeparatorComponent={Separator} data={hotels} renderItem={({ item, index }) => (
                        <NearestItemComponent image={{ uri: item.images }} address={item.location}
                            name={item.hotelname} price={''} ratings={item.rates}
                            key={item.roomId} press={() => { navigation.navigate('roomscreen', { key: item.key }); }} />
                    )} />
                </View> :
                <View style={{ height: "30%", marginVertical: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/images/search.png')} style={{ width: 150, height: 150 }} />
                    {searching ?
                        <Text style={{ fontSize: Constance.medium, color: Constance.Grey, fontWeight: 'bold' }}>Finding hotels...</Text> :
                        <Text style={{ fontSize: Constance.medium, color: Constance.Grey }}>No results found</Text>}
                </View>}
        </View>
    )
}

export default Search;