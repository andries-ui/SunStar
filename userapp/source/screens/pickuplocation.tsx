import React, { useContext, useEffect, useRef, useState } from "react";
import { Platform, ScrollView, StatusBar, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../theme/themeProvider";
import MapView, { DirectionsRenderer, Marker, MarkerAnimated, PROVIDER_GOOGLE } from 'react-native-maps'; 
import { Divider, Icon, Text } from "react-native-elements";
import Constance from "../theme/const";
import ImageComponent from "../components/image";
import ButtonComponent from "../components/button";
import ActionBar from "../components/actionbar";
import style from '../styles/screens/card';
import Modal from "react-native-modalbox";
import modal from '../styles/components/modal';
import { Formik } from 'formik';
import * as yup from 'yup';
import TextComponent from '../components/text';
import * as Animatable from 'react-native-animatable';
import InputComponent from "../components/input";
import { TextInput } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import { requestForegroundPermissionsAsync } from "expo-location";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Autocomplete from "react-google-autocomplete";
import MapViewDirections from 'react-native-maps-directions';

const cardSchema = yup.object({
    names: yup.string().required('Required').min(3)
        .matches(/^(?![\s.]+$)[a-zA-Z\s.]*$/, "Only characters are allowed."),
    cardnumber: yup.string().required('Required').length(16).matches(/^(?:(?<visa>4[0-9]{12}(?:[0-9]{3})?)|(?<mastercard>5[1-5][0-9]{14})|(?<discover>6(?:011|5[0-9]{2})[0-9]{12})|(?<amex>3[47][0-9]{13})|(?<diners>3(?:0[0-5]|[68][0-9])[0-9]{11})|(?<jcb>(?:2131|1800|35[0-9]{3})[0-9]{11}))$/, "Invalid card number"),
    expdate: yup.string().required('Required').matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "invalid date"),
    cvv: yup.string().required('Required').length(4).matches(/[0-9]{4}/, "Invalid pin")
});

const PickupLocation = ({ navigation }) => {

    const GooglePlacesRef = useRef();
    const params = useRoute().params;
    const { theme, dark, toggle } = useContext(ThemeContext);
    const [modalUpdateCard, setmodalUpdateCard] = useState(false);
    const [err, seterr] = useState('');
    const [latitude, setlatitude] = useState<number>(0);
    const [longitude, setlongitude] = useState<number>(0);
    const [address, setaddress] = useState<any>();
    const [modalpickedAddress, setmodalpickedAddress] = useState(false);
    const [searchFocused, setsearchFocused] = useState();
    const [coordinates, setcoordinates] = useState<any>([]);
    const [mapview, setmapview] = useState<any>();
    const [distance, setdistance] = useState('');
    const [duration, setduration] = useState('');
    const [travelingMode, settravelingMode] = useState("DRIVING")
    const [ridecost, setridecost] = useState('');
    const [ammountDue, setammountDue] = useState('');
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


           
            let rigion = await Location.reverseGeocodeAsync({
                longitude,
                latitude
            });

        } catch (err) {

        }


    }

    const calculatePrice=(km:any,duration:any)=>{
        let price = ((km * 1.90) % ((duration*4))) * 5;
        
        let bookingWithRide = price + params.data.amount;
        setridecost(price);
        setammountDue(bookingWithRide);
    }

    const GetAddress = async (latitude: any, longitude: any) => {

        let local = await Location.reverseGeocodeAsync({ latitude: latitude, longitude: longitude }).then((local)=>{

            console.log(local);
            setcoordinates([{ latitude: latitude, longitude: longitude }, { latitude: -23.900163, longitude: 29.449058 }])

            setmodalpickedAddress(true);
            setaddress(`${local[0].name} ${local[0].street}, ${local[0].district}, ${local[0].city},  ${local[0].country}`);
            setlatitude(latitude);
            setlongitude(longitude);
        }).catch((err)=>{
            console.log(err);
            
        });
        
        if (local === null) {
            console.log("invalid coordinates");
            return;
        }

    }

    const GooglePlacesInput = () => {

        console.log(GooglePlacesRef.current);

    }

    useEffect(() => {
        starWarching();
        updateState();
        GooglePlacesInput();

    }, [])

    return (

        <View style={{ backgroundColor: theme.background, height: '100%', width: '100%' }}>
            <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />

            <View style={[style.map, { height: '100%' }]}>
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
                    {coordinates.map((marker, index) =>
                        <MarkerAnimated
                            coordinate={{ "latitude": marker.latitude, "longitude": marker.longitude }}
                            title={address}
                            draggable={index === 0 ? true : false}
                            image={require('../../assets/images/pin.png')}
                            onDragEnd={(e) => {

                                GetAddress(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)

                            }}
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
                        mode={travelingMode}
                        onReady={result => { 
                            setdistance(` ${result.distance} km`);
                            setduration(` ${result.duration} min.`);
                            calculatePrice(result.distance, result.duration);
                        }}
                        onError={(errorMessage) => {
                            console.log(errorMessage);
                        }}
                    />
                </MapView>
                <ActionBar barStyle={{ position: 'absolute' }} backgroundColor={null} onBackPress={() => navigation.goBack()} iconBack={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} />


                <TouchableOpacity onPress={() => { setmodalUpdateCard(true) }} style={{ width: '100%', borderRadius: 7, height: 40, alignItems: 'center', position: 'absolute', bottom: -25 }}>
                    <View style={{ height: 8, width: '40%', backgroundColor: theme.borderAlt, borderRadius: 7 }}>

                    </View>
                </TouchableOpacity>
            </View>


            {/* Update card model  */}
            <Modal
                entry="bottom"
                backdropPressToClose={true}
                isOpen={modalUpdateCard}
                style={[modal.modalBox]}
                onClosed={() => setmodalUpdateCard(false)}
            >
                <View style={[modal.content, { backgroundColor: theme.background, height: 300 }]}>

                    <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />
                    <View style={modal.modelContainerChild}>
                        <Text style={modal.textStyle}></Text>
                        <Icon type="ionicon" name="close" onPress={() => { setmodalUpdateCard(false) }} />
                    </View>



                    <GooglePlacesAutocomplete
                        ref={GooglePlacesRef}
                        placeholder="Find Address?"
                        placeholderTextColor="#222"
                        returnKeyType={'search'} // Can be left out for default return key 
                        onPress={(data, details ) => {
                            //setaddress(details.geometry.location)
                            GetAddress(details.geometry.location.lat, details.geometry.location.lng)
                            setcoordinates([{ latitude: latitude, longitude: longitude }, { latitude: details.geometry.location.lat, longitude: details.geometry.location.lng }])
                            console.log(details.geometry.location);
                            setmodalUpdateCard(false);

                        }}// 'details' is provided when fetchDetails = true
                        getDefaultValue={() => ''}
                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel={ address}
                        predefinedPlaces={address}
                        query={{
                            key: 'AIzaSyCSdP5YSrTZGe56so60mGDMdE9h4Rp-sR0',
                            language: 'en',
                        }}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={200}
                        textInputProps={{
                            onFocus: () => {
                                setsearchFocused(true);
                            },
                            onBlur: () => {
                                setsearchFocused(false);
                            },
                            autoCapitalize: "none",
                            autoCorrect: false
                        }}
                        listViewDisplayed={searchFocused}
                        fetchDetails={true}
                        enablePoweredByContainer={false}
                        styles={{
                            container: {
                                position: "absolute",
                                top: Platform.select({ ios: 50, android: 40 }),
                                width: "100%"
                            },
                            textInputContainer: {
                                flex: 1,
                                backgroundColor: "#e5e5e5",
                                height: 40,
                                marginHorizontal: 10,
                                borderTopWidth: 0,
                                borderRadius: 15,
                                borderBottomWidth: 0
                            },
                            textInput: {
                                height: 40,
                                margin: 0,
                                borderRadius: 5,
                                backgroundColor: "#e5e5e5",
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 20,
                                paddingRight: 20,
                                marginTop: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                elevation: 5,
                                shadowColor: "#000",
                                shadowOpacity: 0.1,
                                shadowOffset: { x: 0, y: 0 },
                                shadowRadius: 15,
                                borderWidth: 1,
                                borderColor: "#DDD",
                                fontSize: 15
                            },
                            listView: {
                                borderWidth: 1,
                                borderColor: "#DDD",
                                backgroundColor: "#e5e5e5",
                                marginHorizontal: 10,
                                elevation: 5,
                                shadowColor: "#000",
                                shadowOpacity: 0.1,
                                shadowOffset: { x: 0, y: 0 },
                                shadowRadius: 15,
                                marginTop: 5,
                                fontSize: 15
                            },
                            description: {
                                fontSize: 15
                            },
                            row: {
                                padding: 15,
                                height: 55
                            }
                        }}
                    />
                </View>
            </Modal>

            <Modal
                entry="bottom"
                backdropPressToClose={true}
                isOpen={modalpickedAddress}
                style={[modal.modalBox]}
                onClosed={() => setmodalpickedAddress(false)}
            >
                <View style={[modal.content, { backgroundColor: theme.background }]}>

                    <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />
                    <View style={modal.modelContainerChild}>
                        <Text style={modal.textStyle}></Text>
                        <Icon type="ionicon" name="close" onPress={() => { setmodalpickedAddress(false) }} />
                    </View>
  
                    <View style={{ height: 200 }}>

                    <Text style={[modal.textStyle,{fontSize:Constance.large,fontWeight:'bold'  }]}>Traveling Details</Text>
                    
                    <Text style={[modal.textStyle,{fontSize:Constance.medium, fontWeight:'bold' }]}>Address:</Text>
                        <Text style={[modal.textStyle,{fontSize:Constance.medium,fontWeight:'900'  }]}>{address}</Text>
                        
                        <Text style={[modal.textStyle,{fontSize:Constance.medium, fontWeight:'bold' }]}>Distance:</Text>
                        <View style={{ justifyContent: 'space-between', flexDirection:'row'}}>    
                        <Text style={[modal.textStyle,{fontSize:Constance.medium, fontWeight:'900' }]}>Distance: {distance}</Text>
                        <Icon type="ionicon" name="car" color={Constance.Blue} size={24}/>
                        </View>
                        <Text style={[modal.textStyle,{fontSize:Constance.medium, fontWeight:'bold' }]}>Duration:</Text>
                        
                        <Text style={[modal.textStyle,{fontSize:Constance.medium,fontWeight:'900'  }]}> {duration} </Text>
                    
                        <Text style={[modal.textStyle,{fontSize:Constance.medium,fontWeight:'bold'  }]}>Price </Text>
                        <Text style={[modal.textStyle,{fontSize:Constance.medium,fontWeight:'900' }]}>R {ridecost? ridecost.toString().substring(0, ridecost.toString().indexOf('.')+ 2):null}</Text>

                    </View>


                    <ButtonComponent press={() => { navigation.navigate('creditcardscreen', { payment: true,address:address, duration:duration, distance:distance, data: { checkinDate: params.data.checkinDate, checkoutDate: params.data.checkinDate, adults: params.data.checkinDate, children: params.data.checkinDate, amount: parseInt(ammountDue) , ridecost: ridecost}
                    , rideRequest: params.rideRequest, roomKey: params.roomKey, hotelKey: params.hotelKey, address: address }) }} lblstyle={{ color: theme.text }} mode={''} text={'Comfirm address'} btnstyle={{ width: '100%', marginTop: 10, backgroundColor: Constance.Blue, borderColor: theme.borderAlt, borderWidth: 1, borderRadius: 7, height: 40, alignItems: 'center' }} />

                </View>
            </Modal>
        </View>
    )
}

export default PickupLocation;
