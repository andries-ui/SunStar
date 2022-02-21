import React, { useContext, useEffect, useState } from "react"
import { TouchableOpacity, Platform, StatusBar, Alert, Text, View, ScrollView } from "react-native"
import { Icon } from "react-native-elements"
import ActionBar from "../components/actionbar"
import Constance from "../theme/const"
import { ThemeContext } from "../theme/themeProvider"
import CalendarPicker from 'react-native-calendar-picker';
import style from './../styles/screens/managing';
import Modal from "react-native-modalbox";
import modal from "../styles/components/modal"
import { Divider, Snackbar } from "react-native-paper";
import StarRating from 'react-native-star-rating';
import * as Animatable from 'react-native-animatable';
import InputComponent from "../components/input"
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import Progress from "../components/indicator"
import Reservation from './reservations';

const Managing = ({ navigation }) => {

    const params = useRoute().params;
    const { theme, dark, toggle } = useContext(ThemeContext);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [amountDue, setamountDue] = useState<any>();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [year, setyear] = useState<any>();
    const [month, setmonth] = useState<any>();
    const [day, setday] = useState<any>();
    const [price, setprice] = useState('');
    const [pickdates, setpickdates] = useState(false);
    const [modalroomrating, setmodalroomrating] = useState(false)
    const [modalhotelrating, setmodalhotelrating] = useState(false)
    const [modalsystemrating, setmodalsystemrating] = useState(false)
    const [roomrating, setroomrating] = useState<any>()
    const [hotelrating, sethotelrating] = useState<any>()
    const [systemrating, setsystemrating] = useState<any>()
    const [roomcomment, setroomcomment] = useState<any>()
    const [hotelcomment, sethotelcomment] = useState<any>()
    const [systemcomment, setsystemcomment] = useState<any>()
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [days, setdays] = useState('');
    const [load, setload] = useState(false);
    const [activelyCheckedIn, setactivelyCheckedIn] = useState(true)
    const [service, setservice] = useState('');
    const [details, setdetails] = useState([]);
    const [invalid, setinvalid] = useState(false);
    const [message, setmessage] = useState('');
    const [timer, settimer] = useState<any>();

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handlePriceCalculation = (startdate: any, enddate: any) => {

        var one_day = 1000 * 60 * 60 * 24;
        let days = Math.round(enddate - startdate) / (one_day);
        setamountDue((parseInt(price) * days).toString())
        setday(days);
    }


    const CountDown = (updateDate: any) => {
        // Find the distance between now and the count down date

        // Time calculations for days, hours, minutes and seconds
        for (let i = 0; i > 5; i++) {
            setTimeout(() => {

                let now = new Date().getTime();
                let update = new Date(updateDate).getTime();
                let distance = now - update;

                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                settimer(`${hours}:${minutes}:${seconds} `);

            }, 100);
        }
    }

    const GetSesshionNotification = async () => {

        setload(true);

        console.log(params.data._id);

        axios.patch(`https://sunstarapi.herokuapp.com/roomReservation/${params.data._id}`, {}).then(async (res) => {

            let date = new Date();
            let key = await SecureStore.getItemAsync('key') || 'null';
            let title = `Cheched out.`;
            let message = `You have successfully checked out, The hotel will alergebly accept you only withing the upcoming 60 min counting down from ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            let notification = {
                userId: key,
                title: title,
                message: message
            }

            axios.post(`https://sunstarapi.herokuapp.com/userNotifications`, notification).then(async (notificationRes) => {
                if (notificationRes.data.status === "Success") {

                    axios.post(`https://app.nativenotify.com/api/indie/notification`, {
                        subID: key,
                        appId: 910,
                        appToken: 'IBzo5MJJB46vcD3JGfjwRf',
                        title: title,
                        message: `${message}`,
                        pushData: { screen: "notivationscreen" }
                    }).then((res) => {

                        setinvalid(true);
                        GetReservations();
                        setmessage('Request sent successfully');
                        setload(false);
                    }).catch((err) => {

                        setload(false);
                        console.log(err + "===");

                    })

                } else {

                    setinvalid(true);
                    setmessage('Request was not sent');
                    setload(false);
                    console.log(notificationRes.data.details);
                }
            }).catch((err) => {

                setinvalid(true);
                setmessage('Request was not sent');
                setload(false);
                console.log(err + "======");
            })

        }).catch((err) => {
            console.log(err);

        })

    }

    const ExtendStayingPerion = async () => {

        navigation.navigate('creditcardscreen', { data: { checkoutDate: selectedStartDate.toString(), amount: amountDue }, status: 'update' })
        // setload(true);

        // console.log(params.data._id);

        // axios.patch(`https://sunstarapi.herokuapp.com/roomReservation/${params.data._id}`, {checkoutDate:selectedStartDate}).then(async (res) => {

        //     let date = new Date();
        //     let key = await SecureStore.getItemAsync('key') || 'null';
        //     let title = `Rental extention.`;
        //     let message = `You have successfully updated you extention period by ${2} days. The administration will keep contact with you `
        //     let notification = {
        //         userId: key,
        //         title: title,
        //         message: message
        //     }

        //     axios.post(`https://sunstarapi.herokuapp.com/userNotifications`, notification).then(async (notificationRes) => {
        //         if (notificationRes.data.status === "Success") {

        //             axios.post(`https://app.nativenotify.com/api/indie/notification`, {
        //                 subID: key,
        //                 appId: 910,
        //                 appToken: 'IBzo5MJJB46vcD3JGfjwRf',
        //                 title: title,
        //                 message: `${message}`,
        //                 pushData: { screen: "notivationscreen" }
        //             }).then((res) => {

        //                 setinvalid(true);
        //                 GetReservations();
        //                 setmessage('Request sent successfully');
        //                 setload(false);
        //             }).catch((err) => {

        //                 setload(false);
        //                 console.log(err + "===");

        //             })

        //         } else {

        //             setinvalid(true);
        //             setmessage('Request was not sent');
        //             setload(false);
        //             console.log(notificationRes.data.details);
        //         }
        //     }).catch((err) => {

        //         setinvalid(true);
        //         setmessage('Request was not sent');
        //         setload(false);
        //         console.log(err + "======");
        //     })

        // }).catch((err) => {
        //     console.log(err);

        // })

    }

    const SendServiceNotification = async () => {

        setload(true);

        let date = new Date();
        let key = await SecureStore.getItemAsync('key') || 'null';
        let title = `Service request`;
        let message = `The respected guest at room no ${details[0].roomNumber} floor ${details[0].floor} is need need of a service labeled ${service}.`
        let notification = {
            userId: details[0].hotelId,
            title: title,
            message: message
        }
        axios.post(`https://sunstarapi.herokuapp.com/hotelNotifications`, notification).then(async (notificationRes) => {
            if (notificationRes.data.status === "Success") {

                axios.post(`https://app.nativenotify.com/api/indie/notification`, {
                    subID: key,
                    appId: 910,
                    appToken: 'IBzo5MJJB46vcD3JGfjwRf',
                    title: title,
                    message: `${message}`,
                    pushData: { screen: "notivationscreen" }
                }).then((res) => {
                    setinvalid(true);
                    setmessage('Request sent successfully');
                    setload(false);
                }).catch((err) => {

                    setinvalid(true);
                    setmessage('Request was not sent');
                    setload(false);
                    console.log(err + "===");

                })

            } else {

                setinvalid(true);
                setmessage('Request was not sent');
                setload(false);
                console.log(notificationRes.data.details);
            }
        }).catch((err) => {

            setinvalid(true);
            setmessage('Request was not sent');
            setload(false);
            console.log(err + "======");
        })
    }

    const SendEmergencyeNotification = async () => {

        setload(true);

        let date = new Date();
        let key = await SecureStore.getItemAsync('key') || 'null';
        let title = `Emergency alert `;
        let message = `The respected guest at room no ${details[0].roomNumber} floor ${details[0].floor} is need need of emergency assistance . please attend to the premise imidiatly.`
        let notification = {
            userId: details[0].hotelId,
            title: title,
            message: message
        }
        axios.post(`https://sunstarapi.herokuapp.com/hotelNotifications`, notification).then(async (notificationRes) => {
            if (notificationRes.data.status === "Success") {

                axios.post(`https://app.nativenotify.com/api/indie/notification`, {
                    subID: key,
                    appId: 910,
                    appToken: 'IBzo5MJJB46vcD3JGfjwRf',
                    title: title,
                    message: `${message}`,
                    pushData: { screen: "notivationscreen" }
                }).then((res) => {
                    setinvalid(true);
                    setmessage('Request sent successfully');
                    setload(false);
                }).catch((err) => {

                    setinvalid(true);
                    setmessage('Request was not sent');
                    setload(false);
                    console.log(err + "===");

                })

            } else {

                setinvalid(true);
                setmessage('Request was not sent');
                setload(false);
                console.log(notificationRes.data.details);
            }
        }).catch((err) => {

            setinvalid(true);
            setmessage('Request was not sent');
            setload(false);
            console.log(err + "======");
        })
    }

    const onDateChange = (date: any, type: any) => {
        //function to handle the date change

        handlePriceCalculation(startDate, endDate);
        setSelectedStartDate(date);
        // setamountDue(price);

    };

    const HandleDates = () => {
        var one_day = 1000 * 60 * 60 * 24;

        let endDate = new Date(params.data.checkoutDate);
        let startDate = new Date(params.data.checkinDate);

        let days = Math.round(endDate - startDate) / (one_day);

        setdays(days);

        setstartDate(params.data.checkinDate);
        setendDate(params.data.checkoutDate)

    }

    const HandleServiceAlert = () => {
        Alert.alert('Service request', `The special services may come with extra charges depending on the type of service requested, the bill for "${service}" wiil be sent to you if there is any
 Would you like to proceed?`, [
            {
                text: 'No thanks',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Yes, please', onPress: () => SendServiceNotification(),
            },
        ]);
    }

    const HandleExtendAlert = () => {
        Alert.alert('Exiting the session beforehand', `Extending your period of staying me require more funds, A R ${"selectedStartDate"} will be required for your staying session of until ${new Date(selectedStartDate)} to be successful. 
Would you like to proceed with the payment?`, [
            {
                text: 'No thanks',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Yes, please', onPress: () => GetSesshionNotification(),
            },
        ]);
    }

    const HandleAlert = () => {
        Alert.alert('Exiting the session beforehand', `You are prompting to exit the your premise before the agreed time,
Be alert that this option initiates your premise imidiate exiting, you will be granted maximum of 60 min to recheck in and this will be a once of opportunity. 
 Would you like to proceed?`, [
            {
                text: 'No thanks',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Yes, please', onPress: () => GetSesshionNotification(),
            },
        ]);
    }

    const GetUserData = async () => {
        let token = await SecureStore.getItemAsync('token') || 'null';
        let key = await SecureStore.getItemAsync('key') || 'null';

        axios.get('https://sunstarapi.herokuapp.com/user/'.concat(key)).then((results) => {

            let data = results.data;


        }).catch((err) => {

            console.log(err + '.');

        });

    }

    const GetReservations = async () => {

        let key = await SecureStore.getItemAsync('key') || 'null';
        axios.get(`https://sunstarapi.herokuapp.com/roomReservation/${params.data._id}`).then((notifications) => {

            const roomdata: any = [];

            let reserve = notifications.data;
            if (reserve.updatedAt !== null) {
                CountDown(reserve.updatedAt);
            }

            axios.get(`https://sunstarapi.herokuapp.com/room/${reserve.roomId}`).then((room: any) => {

                const locationUrl = "https://sunstarapi.herokuapp.com/property/" + reserve.roomId;
                axios.get(locationUrl)
                    .then((property_res) => {

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
                                    hotelId: hotel_res.data._id,
                                    roomNumber: room.data.roomNumber,
                                    hotelName: hotel_res.data.name,
                                    bedtype: property_res.data.bedtype,
                                    tv: property_res.data.tv,
                                    wifi: property_res.data.wifi,
                                    parking: property_res.data.parking,
                                    numberOfBed: property_res.data.numberOfBed,
                                }

                                roomdata.push(data);

                                setdetails(roomdata);

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
        }).catch((err) => {
            console.log(err + " ==");
        });

    }

    const HandleSystemRating = () => {
      
        setinvalid(true);
        setmessage(`Feature not implemented yet! Please stay put.`);
    }

    const HandleHotelRating = () => {
        setload(true);
        axios.post(`https://sunstarapi.herokuapp.com/hotelRating`, { hotelId: params.data.hotelId, ratedStar: roomrating, comment: roomcomment }).then((res) => {
            setload(false);
            setinvalid(true);
            setmessage(`You have rated the room successfully`);
        })
            .catch((err) => {
                setload(false);
                console.log('====================================');
                console.log(err);
                console.log('====================================');
            })
    }

    const HandleRoomRating = () => {
        setload(true);
        axios.post(`https://sunstarapi.herokuapp.com/roomRating`, { roomId: params.data.roomId, ratedStar: roomrating, comment: roomcomment }).then((res) => {
            setload(false);
            setinvalid(true);
            setmessage(`You have rated the room successfully`);
        })
            .catch((err) => {
                setload(false);
                console.log('====================================');
                console.log(err);
                console.log('====================================');
            })
    }

    useEffect(() => {
        HandleDates();
        GetReservations();

    }, [])

    return (
        <View style={{ backgroundColor: theme.background, height: '100%', width: '100%', paddingHorizontal: 10 }}>
            <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
            <ActionBar textStyle={[{ color: theme.text }]} onBackPress={() => navigation.goBack()} iconBack={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} text={'Service Monitor'} />
            <ScrollView>
                <View>
                    <View style={{ backgroundColor: Constance.Green, borderRadius: 15, justifyContent: 'space-between', alignItems: 'center', padding: 15, marginVertical: 15 }}>
                        <Text style={[style.lblButton, { color: Constance.White }]}>
                            This session has been scheduled from {startDate.substring(0, 16)} to {endDate.substring(0, 16)} ({days} day(s)) ,Have a nice stay.
                        </Text>
                        {timer ? <Text style={[style.lblButton, { color: Constance.Red, fontSize: Constance.medium }]}>
                            {timer} <Text style={[style.lblButton, { color: Constance.White }]}>min Left to recheck in.</Text>
                        </Text> : null}
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Text style={[style.lblheader, { color: theme.text }]}>Extend Period</Text>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, marginVertical: 15 }}>
                                <Text style={[style.lblcaption, { color: theme.text }]}>
                                    Select session last dates
                                </Text>
                                <Icon type="ionicon" name="calendar" color={theme.text} onPress={() => { pickdates ? setpickdates(false) : setpickdates(true) }} />
                            </View>
                            {pickdates ?
                                <View>
                                    <CalendarPicker
                                        style={{
                                            borderWidth: 1, borderColor: theme.border
                                        }}

                                        startFromMonday={true}
                                        allowRangeSelection={false}
                                        minDate={new Date(year, 1, month)}
                                        maxDate={new Date(2070, 6, 3)}
                                        weekdays={
                                            [
                                                'Mon',
                                                'Tue',
                                                'Wed',
                                                'Thur',
                                                'Fri',
                                                'Sat',
                                                'Sun'
                                            ]}
                                        months={[
                                            'January',
                                            'Febraury',
                                            'March',
                                            'April',
                                            'May',
                                            'June',
                                            'July',
                                            'August',
                                            'September',
                                            'October',
                                            'November',
                                            'December',
                                        ]}
                                        previousTitle="Previous"
                                        nextTitle="Next"
                                        todayBackgroundColor={Constance.GreyLight}
                                        selectedDayColor={Constance.White}
                                        selectedDayTextColor="#000000"
                                        scaleFactor={375}
                                        textStyle={{
                                            color: theme.text,
                                        }}
                                        onDateChange={onDateChange}
                                    />
                                    <TouchableOpacity onPress={ExtendStayingPerion} style={{ marginVertical: 10 }}>
                                        <View style={{ backgroundColor: Constance.Blue, paddingVertical: 10, paddingHorizontal: 5, borderRadius: 7 }}>
                                            <Text style={[style.lblButton, { textAlign: 'center' }]}>Rate the Room</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View> : null}

                        </View>
                    </View>

                    <Divider style={{ backgroundColor: theme.borderAlt, height: Constance.mediumDivider }} />
                    <View style={{ marginTop: 10 }}>
                        <Text style={[style.lblheader, { color: theme.text }]}>Request Service</Text>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, marginVertical: 15 }}>
                                <Text style={[style.lblcaption, { color: theme.text }]}>
                                    specify the service you are in need of
                                </Text>
                            </View>
                            <InputComponent changeText={(e) => setservice(e)} value={service} />
                            <TouchableOpacity style={{ marginVertical: 10 }} onPress={HandleServiceAlert}>
                                <View style={{ backgroundColor: Constance.Blue, width: '100%', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 7 }}>
                                    <Text style={[style.lblButton, { color: theme.text, textAlign: 'center' }]}>Send Request</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Divider style={{ backgroundColor: theme.borderAlt, height: Constance.mediumDivider }} />
                    <View style={{ marginTop: 10 }}>
                        <Text style={[style.lblheader, { color: theme.text }]}>Emergency service</Text>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, marginVertical: 15 }}>
                                <Text style={[style.lblcaption, { color: theme.text }]}>
                                    An emergemcy alert feature
                                </Text>
                            </View>

                            <TouchableOpacity style={{ marginVertical: 10 }} onPress={SendEmergencyeNotification}>
                                <View style={{ backgroundColor: Constance.Red, width: '100%', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 7 }}>
                                    <Text style={[style.lblButton, { color: theme.text, textAlign: 'center' }]}>Panic Button</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Divider style={{ backgroundColor: theme.borderAlt, height: Constance.mediumDivider }} />
                    <View style={{ marginTop: 10 }}>
                        <Text style={[style.lblheader, { color: theme.text }]}>End Session</Text>
                        <View>
                            <View style={{ alignItems: 'center', paddingHorizontal: 10, marginVertical: 15 }}>
                                <View>
                                    <Text style={[style.lblcaption, { color: Constance.Red }]}>Be alert that this option initiates your premise imidiate exiting, you will be granted maximum of 60 min to recheck in and this will be a once of opportunity. </Text>
                                </View>
                                <TouchableOpacity style={{ marginVertical: 10 }} onPress={HandleAlert}>
                                    <View style={{ backgroundColor: Constance.Red, width: '100%', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 7 }}>
                                        <Text style={[style.lblButton]}>End Session</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>

                    <Divider style={{ backgroundColor: theme.borderAlt, height: Constance.mediumDivider }} />
                    <View style={[{ width: '100%', marginTop: 10 }]}>
                        <Text style={[style.lblheader, { color: theme.text }]}>Ratings</Text>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, marginVertical: 15 }}>

                                <View style={[{ backgroundColor: theme.border, maxWidth: '33%', borderRadius: 7 }]}>
                                    <Text style={[style.lblcaption, { fontSize: Constance.small, paddingHorizontal: 7, paddingVertical: 5 }, { color: theme.text }]}>Help the hotel improve their room setup and service</Text>
                                    <TouchableOpacity onPress={() => setmodalroomrating(true)}>
                                        <View style={{ backgroundColor: Constance.GoldDark, paddingVertical: 10, paddingHorizontal: 5, borderRadius: 7 }}>
                                            <Text style={[style.lblButton, { textAlign: 'center' }]}>Rate the Room</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={[{ backgroundColor: theme.border, maxWidth: '33%', borderRadius: 7 }]}>
                                    <Text style={[style.lblcaption, { fontSize: Constance.small, paddingHorizontal: 7, paddingVertical: 5 }, { color: theme.text }]}>Help the hotel improve their service by rating</Text>

                                    <TouchableOpacity onPress={() => setmodalhotelrating(true)}>
                                        <View style={{ backgroundColor: Constance.GoldDark, paddingVertical: 10, paddingHorizontal: 5, borderRadius: 7 }}>
                                            <Text style={[style.lblButton, { textAlign: 'center' }, { color: theme.text }]}>Rate The hotel</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={[{ backgroundColor: theme.border, maxWidth: '33%', borderRadius: 7 }]}>
                                    <Text style={[style.lblcaption, { fontSize: Constance.small, paddingHorizontal: 7, paddingVertical: 5 }, { color: theme.text }]}>Rate the SunStar yeam improve to impro this product</Text>
                                    <TouchableOpacity onPress={HandleSystemRating}>
                                        <View style={{ backgroundColor: Constance.GoldDark, paddingVertical: 10, paddingHorizontal: 5, borderRadius: 7 }}>
                                            <Text style={[style.lblButton, { textAlign: 'center' }]}>Rate the US :)</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>

            <Snackbar
                visible={invalid}
                onDismiss={() => setinvalid(false)}>
                {message}
            </Snackbar>

            {load ? <View style={{ height: '100%', width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                <Progress />
            </View> : null}
            {/* bottonsheet implementation */}

            {/* Update card model  */}
            <Modal
                entry="bottom"
                backdropPressToClose={true}
                isOpen={modalroomrating}
                style={[modal.modalBox]}
                onClosed={() => setmodalroomrating(false)}
            >
                <View style={[modal.content, { backgroundColor: theme.background, height: 300 }]}>

                    <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />
                    <View style={modal.modelContainerChild}>
                        <Text style={style.lblheader}>Rating room</Text>
                        <Icon type="ionicon" name="close" onPress={() => { setmodalroomrating(false) }} />
                    </View>


                    <View style={{ paddingVertical: 15, paddingHorizontal: 80, justifyContent: 'center' }}>
                        <StarRating
                            disabled={false}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            containerStyle={{ height: 40 }}
                            rating={roomrating}
                            selectedStar={(rating) => setroomrating(rating)}
                            fullStarColor={Constance.GoldDark}

                        />
                    </View>
                    <InputComponent keyboard={"default"} style={{ height: 60, marginVertical: 20, }} changeText={(e) => setroomcomment(e)} value={hotelcomment} hint={'Comment'} />

                    <TouchableOpacity style={{ marginVertical: 10 }} onPress={HandleRoomRating}>
                        <View style={{ backgroundColor: Constance.Blue, width: '100%', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 7 }}>
                            <Text style={[style.lblButton, { color: theme.text, textAlign: 'center' }]}>Rate the room</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </Modal>

            <Modal
                entry="bottom"
                backdropPressToClose={true}
                isOpen={modalhotelrating}
                style={[modal.modalBox]}
                onClosed={() => setmodalhotelrating(false)}
            >
                <View style={[modal.content, { backgroundColor: theme.background }]}>

                    <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />
                    <View style={modal.modelContainerChild}>
                        <Text style={style.lblheader}>Hotel rating</Text>
                        <Icon type="ionicon" name="close" onPress={() => { setmodalhotelrating(false) }} />
                    </View>
                    <View style={{ paddingVertical: 15, paddingHorizontal: 80, justifyContent: 'center' }}>
                        <StarRating
                            disabled={false}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            containerStyle={{ width: '60%' }}
                            rating={hotelrating}
                            selectedStar={(rating) => sethotelrating(rating)}
                            fullStarColor={Constance.GoldDark}
                        />
                    </View>
                    <InputComponent keyboard={"default"} style={{ height: 60, marginVertical: 20, }} changeText={(e) => sethotelcomment(e)} value={hotelcomment} hint={'Comment'} />

                    <TouchableOpacity style={{ marginVertical: 10 }} onPress={HandleHotelRating}>
                        <View style={{ backgroundColor: Constance.Blue, width: '100%', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 7 }}>
                            <Text style={[style.lblButton, { color: theme.text, textAlign: 'center' }]}>Rate hotel</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                entry="bottom"
                backdropPressToClose={true}
                isOpen={modalsystemrating}
                style={[modal.modalBox]}
                onClosed={() => setmodalsystemrating(false)}
            >
                <View style={[modal.content, { backgroundColor: theme.background }]}>

                    <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />
                    <View style={modal.modelContainerChild}>
                        <Text style={style.lblheader}>System rating</Text>
                        <Icon type="ionicon" name="close" onPress={() => { setmodalsystemrating(false) }} />
                    </View>
                    <View style={{ paddingVertical: 15, paddingHorizontal: 80, justifyContent: 'center' }}>
                        <StarRating
                            disabled={false}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            containerStyle={{ width: '60%' }}
                            rating={systemrating}
                            selectedStar={(rating) => setsystemrating(rating)}
                            fullStarColor={Constance.GoldDark}
                        />
                    </View>
                    <InputComponent keyboard={"default"} style={{ height: 60, marginVertical: 20, }} changeText={(e) => setsystemcomment(e)} value={systemcomment} hint={'Comment'} />

                    <TouchableOpacity style={{ marginVertical: 10 }} onPress={HandleServiceAlert}>
                        <View style={{ backgroundColor: Constance.Blue, width: '100%', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 7 }}>
                            <Text style={[style.lblButton, { color: theme.text, textAlign: 'center' }]}>Rate the app</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </Modal>

        </View>
    )
}

export default Managing