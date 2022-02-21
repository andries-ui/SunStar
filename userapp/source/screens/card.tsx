import React, { useContext, useEffect, useRef, useState } from 'react'
import { Dimensions, Platform, ScrollView, View } from 'react-native'
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view'
import ActionBar from '../components/actionbar'
import CreditCardComponent from '../components/creditcard'
import style from '../styles/screens/card'
import Constance from '../theme/const'
import {
    PagerTabIndicator,
    IndicatorViewPager,
    PagerTitleIndicator,
    PagerDotIndicator,
} from '@shankarmorwal/rn-viewpager';
import { Divider, Icon, Text } from 'react-native-elements'
import InputComponent from '../components/input'
import { ThemeContext } from '../theme/themeProvider'
import ButtonComponent from '../components/button'
import Modal from "react-native-modalbox";
import modal from '../styles/components/modal';
import { Formik } from 'formik';
import * as yup from 'yup';
import TextComponent from '../components/text';
import * as Animatable from 'react-native-animatable';
import { TextInput } from 'react-native-paper';
import { useRoute } from "@react-navigation/native";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Progress from '../components/indicator'

Notifications.setNotificationHandler({ handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: false, }) });
async function registerForPushNotificationsAsync() { let token; if (Constants.isDevice) { const { status: existingStatus } = await Notifications.getPermissionsAsync(); let finalStatus = existingStatus; if (existingStatus !== 'granted') { const { status } = await Notifications.requestPermissionsAsync(); finalStatus = status; } token = (await Notifications.getExpoPushTokenAsync()).data; } else { console.log('Must use physical device for Push Notifications'); } if (Platform.OS === 'android') { Notifications.setNotificationChannelAsync('default', { name: 'default', importance: Notifications.AndroidImportance.MAX, vibrationPattern: [0, 250, 250, 250], lightColor: '#FF231F7C', }); } return token; }

const cardSchema = yup.object({
    names: yup.string().required('Required').min(3)
        .matches(/^(?![\s.]+$)[a-zA-Z\s.]*$/, "Only characters are allowed."),
    cardnumber: yup.string().required('Required').length(16).matches(/^(?:(?<visa>4[0-9]{12}(?:[0-9]{3})?)|(?<mastercard>5[1-5][0-9]{14})|(?<discover>6(?:011|5[0-9]{2})[0-9]{12})|(?<amex>3[47][0-9]{13})|(?<diners>3(?:0[0-5]|[68][0-9])[0-9]{11})|(?<jcb>(?:2131|1800|35[0-9]{3})[0-9]{11}))$/, "Invalid card number"),
    expdate: yup.string().required('Required').matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "invalid date"),
    cvv: yup.string().required('Required').length(4).matches(/[0-9]{4}/, "Invalid pin")
});

const passwordSchema = yup.object({
    password: yup.string().required("Required").min(8).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Invalid password"),
})

const CreditCard = ({ navigation }) => {

    const cards = [
        {
            id: 1,
            name: "Sebola AM",
            cardnumber: "1546 6546 5454 7365",
            expdate: '12/24',
        },
        {
            id: 2,
            name: "Sebola AM",
            cardnumber: "1546 6675 6577 5545",
            expdate: '07/26',
        },
        {
            id: 1,
            name: "Sebola AM",
            cardnumber: "1546 6546 5454 4115",
            expdate: '08/24',
        },
        {
            id: 1,
            name: "Sebola AM",
            cardnumber: "1546 6546 4585 4157",
            expdate: '05/28',
        },

    ];

    const params = useRoute().params;

    const payment = params.payment;
    const [modalComfirmVisible, setModalComfirmVisible] = useState(false);
    const [visiblepassword, setvisiblepassword] = useState(true);
    const [oldPassword, setoldPassword] = useState('');
    const [action, setaction] = useState('');

    const [modalNewCard, setmodalNewCard] = useState(false);
    const [modalUpdateCard, setmodalUpdateCard] = useState(false);
    const [current, setcurrent] = useState<number>(0);
    const [invalid, setinvalid] = useState(false);
    const [load, setload] = useState(false);
    const [message, setmessage] = useState('');
    const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
    const [names, setnames] = useState('');
    const [email, setemail] = useState('');

    const [roomtype, setroomtype] = useState('');
    const [hotelname, sethotelname] = useState('');
    const [roomNumber, setroomNumber] = useState('');
    const [floor, setfloor] = useState('');


    const { theme } = useContext(ThemeContext);

    const GetRoom = () => {

        axios.get(`https://sunstarapi.herokuapp.com/room/${params.roomKey}`).then((room_res) => {
            let room = room_res.data;

            console.log(room);
            setroomtype(room.type);
            setroomNumber(room.roomNumber);
            setfloor(room.floor);

            if (room.status === "Success") {
                axios.get(`https://sunstarapi.herokuapp.com/hotel/${room.hotelKey}`).then((hotel_res) => {
                    let room = hotel_res.data;
                    sethotelname(room.name);

                })
                    .catch((err) => {
                        console.log(err );
                    })
            } else {
                console.log(room.message);

            }

        })
            .catch((err) => {
                console.log(err );
            })
    }

    const ReAuthenticate = async (values: any) => {

        setload(true);
        let key = await SecureStore.getItemAsync('key') || 'null';
   
        axios.post('https://sunstarapi.herokuapp.com/login/'.concat(key), values).then(async (res) => {

            const results = res.data;

            if (results.status == 'Success') {

                let key = await SecureStore.getItemAsync('key') || 'null';
                 let title = "Congratulations! room is reserved.";
                let message = params.rideRequest ? `${roomtype} room has been reserved for your at the ${hotelname}\nPlease take note of the following booking details:\n\n Checkin Date: ${params.data.checkinDate.substring(0,16) } \nCheckout Date: ${params.data.checkoutDate.substring(0,16)}\nroom number: ${roomNumber} \nfloor:          ${floor}\n Reservation Amount R${params.data.amount} \n\n  A ride request has been sent to our drives and a responce wiil be communicated to you once your request hes been accepted.\n\n Please do note that canceling a booking wil cost you a sum adding upto 25% from you reservation fee and there will be no refund once the system initiates your checkin process.`
                :
                `${roomtype} room has been reserved for your at the ${hotelname}\nPlease take note of the following booking details:\n\nCheckin Date: ${params.data.checkinDate}  \nCheckout Date: ${params.data.checkoutDate}\nroom number: ${roomNumber} \nfloor:          ${floor}\nReservation Amount R${params.data.amount} \n\nPlease do note that canceling a booking wil cost you a fee of 25% from you reservation fee and there will be no refund once the system initiates your checkin process.`;


                let reserve = {
                    guestId: key,
                    hotelId: params.hotelKey,
                    roomId: params.roomKey,
                    transportation: params.rideRequest,
                    checkinDate: params.data.checkinDate,
                    checkoutDate: params.data.checkoutDate,
                    adults: params.data.adults,
                    children: params.data.children,
                    email: email,
                    names: names,
                    message:message,
                    title: title
                }

                console.log(reserve);

                axios.post(`https://sunstarapi.herokuapp.com/roomReservation/`, reserve).then(async (reservationRes) => {
                    if (reservationRes.data.status === "Success") {

                       
                        let notification = {
                            userId: key,
                            title: title,
                            message: message
                        }

                        if (params.rideRequest === true) {

                            let tripReservation = {
                                userId: key,
                                pickupDate: params.data.checkinDate,
                                pickupAddress: params.address,
                                status: "Pending",
                            }

                            axios.post(`https://sunstarapi.herokuapp.com/tripReservation`, tripReservation).then(async (notificationRes) => {
                                if (notificationRes.data.status === "Success") {

                                    axios.post(`https://sunstarapi.herokuapp.com/userNotifications`, notification).then(async (notificationRes) => {
                                        if (notificationRes.data.status === "Success") {

                                            axios.post(`https://app.nativenotify.com/api/indie/notification`, {
                                                subID: key,
                                                appId: 910,
                                                appToken: 'IBzo5MJJB46vcD3JGfjwRf',
                                                title: title,
                                                message: `${message} \n A comfirmation email will be sent to you shortly`,
                                                pushData: { screen: "notivationscreen" }
                                            }).then((res) => {


                                                navigation.navigate('paidscreen', { data: params.data , room: roomtype, hotelname: hotelname});
                                                setload(false);
                                            }).catch((err) => {

                                                setload(false);
                                                console.log(err + "===");

                                            })

                                        } else {

                                            setload(false);
                                            console.log(notificationRes.data.details);
                                        }
                                    }).catch((err) => {

                                        setload(false);
                                        console.log(err + "======");
                                    })

                                } else {

                                    setload(false);
                                    console.log(notificationRes.data.details);
                                }
                            }).catch((err) => {

                                setload(false);
                                console.log(err + "======");
                            })
                        } else {
                            axios.post(`https://sunstarapi.herokuapp.com/userNotifications`, notification).then(async (notificationRes) => {
                                if (notificationRes.data.status === "Success") {

                                    axios.post(`https://app.nativenotify.com/api/indie/notification`, {
                                        subID: key,
                                        appId: 910,
                                        appToken: 'IBzo5MJJB46vcD3JGfjwRf',
                                        title: title,
                                        message: `${message} \n A comfirmation email will be sent to you shortly`,
                                        pushData: { screen: "notivationscreen" }
                                    }).then((res) => {


                                        navigation.navigate('paidscreen', { data: params.data });
                                        setload(false);
                                    }).catch((err) => {

                                        setload(false);
                                        console.log(err + "===");

                                    })

                                } else {

                                    setload(false);
                                    console.log(notificationRes.data.details);
                                }
                            }).catch((err) => {

                                setload(false);
                                console.log(err + "======");
                            })
                        }

                    } else {
                        setload(false);
                        console.log(reservationRes.data.details + "======");
                    }
                }).catch((err) => {
                    setload(false);
                    console.log(err + "=>=>");
                })


            } else {
                setmessage(results.message);
                setinvalid(true);
                setload(false);
            }

        }).catch((err) => {

            console.log(err + '.');

        });

    }

    const GetUserData = async () => {
        let token = await SecureStore.getItemAsync('token') || 'null';
        let key = await SecureStore.getItemAsync('key') || 'null';


        axios.get('https://sunstarapi.herokuapp.com/user/'.concat(key)).then((results) => {

            let data = results.data;

            setnames(data.names);
            setemail(data.email);

        }).catch((err) => {

            console.log(err + '.');

        });

    }

    useEffect(() => {

        GetUserData();
        GetRoom();
    }, [])

    return (
        <View style={{ backgroundColor: theme.background, height: '100%' }} >
            <ActionBar textStyle={{ color: theme.text, fontSize: Constance.large, fontWeight: 'bold' }} onBackPress={() => navigation.goBack()} backgroundColor={theme.background} text='Cards' iconBack={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingBottom: 30 }}>
                    <View style={{ paddingHorizontal: 30, height: 190, padding: 20, flexWrap: 'nowrap' }}>
                        <PagerView
                            initialPage={0}
                            scrollEnabled
                            pageMargin={10}
                            style={{ paddingHorizontal: 20, height: 190, padding: 20 }}
                            showPageIndicator={true}
                            onPageSelected={(e: PagerViewOnPageSelectedEvent) => {
                                setcurrent(e.nativeEvent.position);
                            }}
                        >
                            {cards.map((card, index) =>

                                <CreditCardComponent key={card.id} names={card.name} cardnumber={card.cardnumber} expdate={card.expdate} />
                            )}
                        </PagerView>
                    </View>

                    <View style={[{ marginTop: 40 }]}>
                        <View style={[style.flexContainer, { width: '85%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, alignItems: 'center', borderRadius: 12, height: 40, marginTop: 10 }]}>
                            <Text style={[{ width: '40%', color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center' }]}>Name on card</Text>
                            <Text style={[{ width: '50%', marginLeft: 10 }]}>{cards[current].name}</Text>
                        </View>
                        <View style={[style.flexContainer, { width: '85%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, alignItems: 'center', borderRadius: 12, height: 40, marginTop: 10 }]}>
                            <Text style={[{ width: '40%', color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>Cardnumber</Text>
                            <Text style={[{ width: '50%', marginLeft: 10 }]}>{cards[current].cardnumber}</Text>
                        </View>

                        <View style={[style.flexContainer, { alignItems: 'center', borderRadius: 12, height: 40, justifyContent: 'space-around', marginTop: 10 }]}>
                            <View style={[style.flexContainer, { width: '47%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40, alignItems: 'center' }]}>
                                <Text style={[{ color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>EXP date</Text>
                                <Text style={[{ width: 110, marginLeft: 10 }]}>{cards[current].expdate}21</Text>
                            </View>
                            <View style={[style.flexContainer, { width: '30%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40, alignItems: 'center' }]}>
                                <Text style={[{ color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>CVV</Text>
                                <Text style={[{ width: 40, marginLeft: 10 }]}> **** </Text>
                            </View>
                        </View>

                        <View style={[style.flexContainer, { alignItems: 'center', borderRadius: 12, height: 40, justifyContent: 'space-around', marginTop: 10, marginHorizontal: 15 }]}>

                            <ButtonComponent press={() => { setmodalNewCard(true) }} lblstyle={{ color: theme.text }} mode={'text'} text={'New '} btnstyle={{ width: '40%', borderColor: Constance.Blue, borderWidth: 1, borderRadius: 7, height: 40, }} />

                            <ButtonComponent press={() => { setmodalUpdateCard(true) }} lblstyle={{ color: theme.text }} mode={'text'} text={'Update'} btnstyle={{ backgroundColor: Constance.Blue, width: '40%', borderColor: theme.borderAlt, borderWidth: 1, borderRadius: 7, height: 40 }} />

                        </View>
                    </View>

                    {payment ? <View style={{ marginHorizontal: 20, height: 80 }}>
                        <ButtonComponent press={() => { setModalComfirmVisible(true) }} lblstyle={{ color: theme.text }} mode={''} text={'Make payment'} btnstyle={{ width: '100%', marginTop: 40, backgroundColor: Constance.Blue, borderColor: theme.borderAlt, borderWidth: 1, borderRadius: 7, height: 40, alignItems: 'center', }} />
                    </View> : null}
                </View>
            </ScrollView>


            {/* bottom sheet models */}
            {/* comfirm password model */}
            <Modal
                entry="bottom"
                backdropPressToClose={true}
                isOpen={modalComfirmVisible}
                style={[modal.modalBox]}
                onClosed={() => setModalComfirmVisible(false)}
            >
                <Formik
                    initialValues={{ password: '' }}
                    onSubmit={(values, action) => {
                        let data = {
                            password: values.password.trim()
                        };
                        ReAuthenticate(data);


                    }}
                    validationSchema={passwordSchema}
                >
                    {(props) => (
                        <View style={[modal.content, { backgroundColor: theme.background }]}>
                            <View style={[modal.modelContainerChild, { marginVertical: 10 }]}>
                                <Text style={modal.textStyle}>Enter your recent password</Text>
                                <Icon type="ionicon" name="close" onPress={() => { setModalComfirmVisible(false) }} />
                            </View>


                            <InputComponent right={<TextInput.Icon name={visiblepassword ? "eye" : "eye-off"} onPress={() => visiblepassword ? setvisiblepassword(false) : setvisiblepassword(true)} />} secured={visiblepassword} left={<TextInput.Icon name="lock" />} hint='Password'
                                changeText={props.handleChange("password")}
                                value={props.values.password} />
                            {props.errors.password ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.password} /></Animatable.View> : null}

                            <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginTop: 20, marginBottom: 30 }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Comfirm' press={props.handleSubmit} />


                        </View>
                    )}
                </Formik>
            </Modal>

            {/* new card model  */}
            <Modal
                entry="bottom"
                backdropPressToClose={true}
                isOpen={modalNewCard}
                style={[modal.modalBox]}
                onClosed={() => setmodalNewCard(false)}
            >
                <View style={[modal.content, { backgroundColor: theme.background }]}>

                    <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />
                    <View style={modal.modelContainerChild}>
                        <Text style={modal.textStyle}>Add new card</Text>
                        <Icon type="ionicon" name="close" onPress={() => { setmodalNewCard(false) }} />
                    </View>

                    <Formik initialValues={{ names: '', cardnumber: '', expdate: '', cvv: '' }}
                        onSubmit={(values, action) => {

                        }}
                        validationSchema={cardSchema}
                    >
                        {(props) => (
                            <View style={[{ marginTop: 0 }]}>
                                <View style={[style.flexContainer, { width: '100%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, alignItems: 'center', borderRadius: 12, height: 40, marginTop: 10 }]}>
                                    <Text style={[{ width: '40%', color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center' }]}>Name on card</Text>
                                    <View style={{ height: 40, left: 5, width: '58%' }}>
                                        <InputComponent hint='Names on card' changeText={props.handleChange("names")}
                                            value={props.values.names} style={{ height: 40, left: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderRadius: 12 }} />

                                    </View>
                                </View>
                                {props.errors.names || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.names} /></Animatable.View> : null}

                                <View style={[style.flexContainer, { width: '100%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, alignItems: 'center', borderRadius: 12, height: 40, marginTop: 10 }]}>
                                    <Text style={[{ width: '40%', color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>Cardnumber</Text>
                                    <View style={{ height: 40, left: 5, width: '58%' }}>
                                        <InputComponent hint='Card number' changeText={props.handleChange("cardnumber")}
                                            value={props.values.cardnumber} style={{ height: 40, left: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderRadius: 12 }} />
                                    </View>
                                </View>
                                {props.errors.cardnumber || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.cardnumber} /></Animatable.View> : null}

                                <View style={[style.flexContainer, { alignItems: 'center', borderRadius: 12, height: 40, justifyContent: 'space-around', marginTop: 10 }]}>

                                    <View style={[{ width: '59%', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40 }]}>
                                        <View style={[style.flexContainer, { width: '100%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40, alignItems: 'center' }]}>
                                            <Text style={[{ color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>EXP date</Text>
                                            <View style={{ height: 40, left: 5, width: '58%' }}>
                                                <InputComponent hint='12/2026' changeText={props.handleChange("expdate")}
                                                    value={props.values.expdate.length === 2 ? props.values.expdate + "/" : props.values.expdate} style={{ height: 40, left: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderRadius: 12 }} />

                                            </View>

                                        </View>
                                        {props.errors.expdate || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.expdate} /></Animatable.View> : null}

                                    </View>

                                    <View style={[{ width: '39%', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40 }]}>
                                        <View style={[style.flexContainer, { width: '100%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40, alignItems: 'center' }]}>
                                            <Text style={[{ color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>CVV</Text>

                                            <View style={{ height: 40, left: 5, width: '58%' }}>
                                                <InputComponent hint='1234' changeText={props.handleChange("cvv")}
                                                    value={props.values.cvv} style={{ height: 40, left: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderRadius: 12 }} />

                                            </View>
                                        </View>
                                        {props.errors.cvv || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.cvv} /></Animatable.View> : null}

                                    </View>

                                </View>

                                <ButtonComponent press={() => { }} lblstyle={{ color: theme.text }} mode={''} text={'Update'} btnstyle={{ width: '100%', marginTop: 40, backgroundColor: Constance.Blue, borderColor: theme.borderAlt, borderWidth: 1, borderRadius: 7, height: 40, alignItems: 'center' }} />

                            </View>
                        )}
                    </Formik>

                </View>
            </Modal>

            {/* Update card model  */}
            <Modal
                entry="bottom"
                backdropPressToClose={true}
                isOpen={modalUpdateCard}
                style={[modal.modalBox]}
                onClosed={() => setmodalUpdateCard(false)}
            >
                <View style={[modal.content, { backgroundColor: theme.background }]}>

                    <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />
                    <View style={modal.modelContainerChild}>
                        <Text style={modal.textStyle}>Update card</Text>
                        <Icon type="ionicon" name="close" onPress={() => { setmodalUpdateCard(false) }} />
                    </View>

                    <Formik initialValues={{ names: '', cardnumber: '', expdate: '', cvv: '' }}
                        onSubmit={(values, action) => {

                        }}
                        validationSchema={cardSchema}
                    >
                        {(props) => (
                            <View style={[{ marginTop: 0 }]}>
                                <View style={[style.flexContainer, { width: '100%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, alignItems: 'center', borderRadius: 12, height: 40, marginTop: 10 }]}>
                                    <Text style={[{ width: '40%', color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center' }]}>Name on card</Text>
                                    <View style={{ height: 40, left: 5, width: '58%' }}>
                                        <InputComponent hint='Names on card' changeText={props.handleChange("names")}
                                            value={props.values.names} style={{ height: 40, left: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderRadius: 12 }} />

                                    </View>
                                </View>
                                {props.errors.names || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.names} /></Animatable.View> : null}

                                <View style={[style.flexContainer, { width: '100%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, alignItems: 'center', borderRadius: 12, height: 40, marginTop: 10 }]}>
                                    <Text style={[{ width: '40%', color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>Cardnumber</Text>
                                    <View style={{ height: 40, left: 5, width: '58%' }}>
                                        <InputComponent hint='Card number' changeText={props.handleChange("cardnumber")}
                                            value={props.values.cardnumber} style={{ height: 40, left: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderRadius: 12 }} />
                                    </View>
                                </View>
                                {props.errors.cardnumber || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.cardnumber} /></Animatable.View> : null}

                                <View style={[style.flexContainer, { alignItems: 'center', borderRadius: 12, height: 40, justifyContent: 'space-around', marginTop: 10 }]}>

                                    <View style={[{ width: '59%', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40 }]}>
                                        <View style={[style.flexContainer, { width: '100%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40, alignItems: 'center' }]}>
                                            <Text style={[{ color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>EXP date</Text>
                                            <View style={{ height: 40, left: 5, width: '58%' }}>
                                                <InputComponent hint='12/2026' changeText={props.handleChange("expdate")}
                                                    value={props.values.expdate.length === 2 ? props.values.expdate + "/" : props.values.expdate} style={{ height: 40, left: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderRadius: 12 }} />

                                            </View>

                                        </View>
                                        {props.errors.expdate || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.expdate} /></Animatable.View> : null}

                                    </View>

                                    <View style={[{ width: '39%', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40 }]}>
                                        <View style={[style.flexContainer, { width: '100%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40, alignItems: 'center' }]}>
                                            <Text style={[{ color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>CVV</Text>

                                            <View style={{ height: 40, left: 5, width: '58%' }}>
                                                <InputComponent hint='1234' changeText={props.handleChange("cvv")}
                                                    value={props.values.cvv} style={{ height: 40, left: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderRadius: 12 }} />

                                            </View>
                                        </View>
                                        {props.errors.cvv || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.cvv} /></Animatable.View> : null}

                                    </View>

                                </View>

                                <ButtonComponent press={() => { }} lblstyle={{ color: theme.text }} mode={''} text={'Update'} btnstyle={{ width: '100%', marginTop: 40, backgroundColor: Constance.Blue, borderColor: theme.borderAlt, borderWidth: 1, borderRadius: 7, height: 40, alignItems: 'center' }} />

                            </View>
                        )}
                    </Formik>




                </View>
            </Modal>

            {load ? <View style={{ height: '100%', width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                <Progress />
            </View> : null}
        </View>
    )
}

export default CreditCard
