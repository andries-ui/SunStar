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

    const history = [
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
    const { theme, dark } = useContext(ThemeContext);
    const [rooms, setrooms] = useState<any>([]);
    const [query, setquery] = useState('');
    const [searching, setsearching] = useState(false)
    const [FilteredRoomList, setFilteredRoomList] = useState([]);

    const GetRooms = (query: any) => {
        const url = "https://sunstarapi.herokuapp.com/room/searchRooms";
        setquery(query);
        setrooms([])
        setsearching(true);
        axios.post(url, { value: query }).then((res) => {
            const roomdata: any = [];
            console.log(res.data);

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
                    console.log(roomdata);
                    
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

    useEffect(() => {

        SearchAndFilter(query)
    }, [query]);

    return (
        <View style={{ backgroundColor: theme.background }}>
            <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />

            <View style={[{
                height: 60, width: '100%', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-evenly'
            }]}>

                <Icon style={{ marginHorizontal: 10 }} type="ionicon" name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} size={28} color={theme.text} onPress={() => navigation.goBack()} />

                <InputComponent changeText={(e) =>{ GetRooms(e)}} value={query} left={<TextInput.Icon name="magnify" />} hint="Find accomodation" style={{ width: '80%', backgroundColor: theme.border }} />
            </View>

            <View style={[{
                height: 60, width: '100%', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-evenly', paddingHorizontal: 10
            }]}>

                <Icon style={{ marginHorizontal: 10 }} type="material-community" name='history' size={28} color={theme.text} onPress={() => navigation.goBack()} />

                <FlatList showsHorizontalScrollIndicator={false} ItemSeparatorComponent={Separator} horizontal data={history} renderItem={({ item, index }) => (

                    <TouchableOpacity onPress={() => { setquery(item.name) }}>
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
            </View>


            {rooms ?
                <FlatList showsVerticalScrollIndicator={false} ItemSeparatorComponent={Separator} data={rooms} renderItem={({ item, index }) => (
                    <NearestItemComponent image={{ uri: item.images }} address={item.location}
                        name={item.type} price={item.price} ratings={item.rates}
                        key={item.roomId} press={() => { navigation.navigate('roomscreen', { key: item.key }); }} />
                )} /> :
                <View style={{ height: Constance.height - 130, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/images/search.png')} style={{ width: 150, height: 150 }} />
                    {searching ?
                        <Text style={{ fontSize: Constance.medium, color: Constance.Grey, fontWeight: 'bold' }}>Finding data...</Text> :
                        <Text style={{ fontSize: Constance.medium, color: Constance.Grey }}>No results found</Text>}
                </View>}


        </View>
    )
}

export default Search;