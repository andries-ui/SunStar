import React, { useContext, useEffect, useState } from "react"
import { Platform, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native"
import { Divider, Icon, Image } from "react-native-elements"
import { Provider, Snackbar, TextInput } from "react-native-paper"
import ActionBar from "../components/actionbar"
import ButtonComponent from "../components/button"
import InputComponent from "../components/input"
import TextComponent from "../components/text"
import modal from "../styles/components/modal"
import Constance from "../theme/const"
import { ThemeContext } from "../theme/themeProvider";
import Modal from "react-native-modalbox";
import Anim from "../components/anim";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRoute } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import DropdownMenu from 'react-native-dropdown-menu';
import OnBoarding from './onboardin';
import style from './../styles/screens/profile';
import DropDown from "react-native-paper-dropdown";


const Booking = ({ navigation }) => {

    const { theme, dark, toggle } = useContext(ThemeContext);
    let today = new Date(); const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const params = useRoute().params;
    const [modalComfirmVisible, setModalComfirmVisible] = useState(false);
    const [visiblepassword, setvisiblepassword] = useState(true);
    const [oldPassword, setoldPassword] = useState('');
    const [action, setaction] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [validDate, setvalidDate] = useState(true);
    const [date, setDate] = useState(monthNames[today.getMonth()] + ", " + today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear());


    const [tv, settv] = useState();
    const [parking, setparking] = useState();
    const [wifi, setwifi] = useState();
    const [hotelname, sethotelname] = useState('');
    const [hotelKey, sethotelKey] = useState('');
    const [bedtype, setbedtype] = useState('');
    const [numOfBeds, setnumOfBeds] = useState('');
    const [price, setprice] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [pickdates, setpickdates] = useState(false);
    const [text, settext] = useState('');
    const [year, setyear] = useState<any>();
    const [month, setmonth] = useState<any>();
    const [day, setday] = useState<any>();
    const [amountDue, setamountDue] = useState<any>();

    const [showDropDown, setShowDropDown] = useState(false);
    const [adult, setadult] = useState<string>("");
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
    const [invalid, setinvalid] = useState(false);
    const [children, setchildren] = useState<string>("");
    const [message, setmessage] = useState('');
    const adults = [
        {
            label: "1 Adult",
            value: "1 Adult",
        },
        {
            label: "2 Adults",
            value: "2 Adults",
        },
        {
            label: "3 Adults",
            value: "3 Adults",
        },
        {
            label: "4 Adults",
            value: "4 Adults",
        },
    ];
    const kids = [
        {
            label: "No child",
            value: "No child",
        },
        {
            label: "1 child",
            value: "1 child",
        },
        {
            label: "2 children",
            value: "2 children",
        },
        {
            label: "3 children",
            value: "3 children",
        },
        {
            label: "4 children",
            value: "4 children",
        },
    ];

    const handlePriceCalculation = (startdate: any, enddate: any) => {

        var one_day = 1000 * 60 * 60 * 24;
        let days = Math.round(enddate - startdate) / (one_day);
        setamountDue((parseInt(price) * days).toString())
        console.log(days);
    }


    const onDateChange = (date: any, type: any) => {
        //function to handle the date change
        if (type === 'END_DATE') {
            setSelectedEndDate(date);
            
            let new_date: any = new Date();
            handlePriceCalculation(selectedStartDate, date);

        } else {
            setSelectedEndDate(null);
            setSelectedStartDate(date);
            setamountDue(price);
        }

    };

    const HandleDates = () => {
        let date: any = new Date();

        setyear(date.getFullYear());
        setmonth((date.getMonth()));
        setday(date.getDay());

    }

    const handleBook = () => {

        if (selectedStartDate == null || selectedEndDate == null) {
            setmessage("Please select you checkin and checkout date.")
            setinvalid(true);
            
            return;
        }
        setModalComfirmVisible(true);
        setDatePickerVisibility(true);
        
        console.log(selectedStartDate);
        console.log(selectedEndDate);
    }

    const GetProperty = () => {
        const locationUrl = `https://sunstarapi.herokuapp.com/property/${params.key}`;
        axios.get(locationUrl).then((property_res) => {

            settv(property_res.data.tv);
            setparking(property_res.data.parking);
            setwifi(property_res.data.wifi);
            setbedtype(property_res.data.bedtype);
            setnumOfBeds(property_res.data.numberOfBed);

        }).catch((err) => {
            console.log(err);
        })
    }

    const GetRoom = () => {
        axios.get(`https://sunstarapi.herokuapp.com/room/${params.key}`).then((room_res) => {
            let room = room_res.data;
            setprice(room.price);
            setamountDue(room.price);
            sethotelKey(room.hotelId);

            axios.get(`https://sunstarapi.herokuapp.com/hotel/${room.hotelId}`).then((hotel_res) => {
                let room = hotel_res.data;
                sethotelname(room.name);

            })
                .catch((err) => {
                    console.log(err);
                })

        })
            .catch((err) => {
                console.log(err);
            })
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {

        if (today <= date) {
            setDate(monthNames[date.getMonth()] + ", " + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
            setvalidDate(true)
            hideDatePicker();
        } else {
            setvalidDate(false)
            setDate(monthNames[date.getMonth()] + ", " + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
            hideDatePicker();
        }
    };

    useEffect(() => {

        GetRoom();
        GetProperty();
        HandleDates();
    }, [])

    return (
        <Provider>
            <View style={{ backgroundColor: theme.background, height: '100%', width: '100%' }}>
                <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
                <ActionBar text="Booking" textStyle={{ color: theme.text }} backgroundColor={null} onBackPress={() => navigation.goBack()} iconBack={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} />

                <View>
                    <ScrollView>
                        <View>
                            <View style={[{
                                marginHorizontal: 20, backgroundColor: theme.borderAlt, padding: 10, paddingBottom: 45, borderRadius: 9, flexDirection: 'row', marginTop: 20, justifyContent: "space-between", shadowColor: "#000", shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.34,
                                shadowRadius: 6.27,
                                elevation: 10,
                            }]}>
                                <View style={[{ width: '50%', paddingHorizontal: 2, shadowColor: "#000", }]}>
                                    <TextComponent text={'Room setting'} style={{ fontSize: Constance.semi_large, color: theme.text, fontWeight: 'bold' }} />
                                    <Divider style={[{ height: Constance.smallDivider, marginHorizontal: 2, backgroundColor: theme.background }]} />
                                    <TextComponent text={numOfBeds} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '600' }} />
                                    <TextComponent text={bedtype} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '600' }} />
                                    <TextComponent text={'internal bathroom'} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '600' }} />
                                    <TextComponent text={'King bed type'} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '600' }} />

                                </View>
                                <View style={[{ width: '50%', paddingHorizontal: 2 }]}>
                                    <TextComponent text={'Services'} style={{ fontSize: Constance.semi_large, color: theme.text, fontWeight: 'bold' }} />
                                    <Divider style={[{ height: Constance.smallDivider, marginHorizontal: 2, backgroundColor: theme.background }]} />
                                    <TextComponent text={'breakfast'} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '600' }} />
                                    <TextComponent text={'lunch'} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '600' }} />

                                </View>
                                <TextComponent text={`R ${amountDue ? amountDue : price}`} style={{ textAlign: 'right', fontSize: Constance.small, color: theme.text, fontWeight: 'bold', position: 'absolute', right: 12, bottom: 23, borderTopWidth: 2, borderTopColor: theme.backgroundAlt }} />
                            </View>

                            <View style={{
                                paddingHorizontal: 30,
                                height: 50, marginHorizontal: 40, borderRadius: 12, bottom: 23,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.34,
                                shadowRadius: 6.27,
                                elevation: 10, backgroundColor: theme.backgroundAlt, shadowColor: theme.text, justifyContent: 'space-between', flexDirection: 'row'
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

                            <View style={styles.container}>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, marginVertical: 15 }}>
                                    <Text style={[styles.titleStyle, { color: theme.text }]}>
                                        Select session dates
                                    </Text>
                                    <Icon type="ionicon" name="calendar" color={theme.text} onPress={() => { pickdates ? setpickdates(false) : setpickdates(true) }} />
                                </View>
                                {pickdates ?
                                    <CalendarPicker
                                        style={{
                                            borderWidth: 1, borderColor: theme.border
                                        }}

                                        startFromMonday={true}
                                        allowRangeSelection={true}
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
                                    /> : null}
                                <View style={styles.textStyle}>
                                    <Text style={[styles.textStyle, { color: theme.text }]}>
                                        Checkin Date :
                                    </Text>
                                    <Text style={styles.dateStyle}>
                                        {selectedStartDate ? selectedStartDate.toString() : 'Not Picked'}
                                    </Text>
                                    <Text style={[styles.textStyle, { color: theme.text }]}>
                                        Checkout Date :
                                    </Text>
                                    <Text style={styles.dateStyle}>
                                        {selectedEndDate ? selectedEndDate.toString() : 'Not Picked'}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ paddingBottom: 120, marginTop: 5 }}>
                                <Text style={[{ color: theme.text, marginHorizontal: 10 }]}>
                                    Select the number of members onboarding.
                                </Text>

                                <View style={{ paddingHorizontal: 5 }}>
                                    <DropDown
                                        label={"Adults"}
                                        mode={"outlined"}
                                        visible={showDropDown}
                                        showDropDown={() => setShowDropDown(true)}
                                        onDismiss={() => setShowDropDown(false)}
                                        value={adult}
                                        setValue={setadult}
                                        list={adults}
                                    />

                                    <Text style={[{ color: theme.text, marginHorizontal: 10, height: 5 }]}>

                                    </Text>
                                    <DropDown
                                        visible={showMultiSelectDropDown}
                                        label={"Children"}
                                        mode={"outlined"}
                                        showDropDown={() => setShowMultiSelectDropDown(true)}
                                        onDismiss={() => { setShowMultiSelectDropDown(false); }}
                                        value={children}
                                        setValue={setchildren}
                                        list={kids}
                                    />
                                </View>

                            </View>


                        </View>
                    </ScrollView>
                </View>
                <ButtonComponent btnstyle={{ position: 'absolute', right: 20, bottom: 5, borderRadius: 12, backgroundColor: Constance.Gold }}
                    text={"Proceed"}
                    lblstyle={{ color: Constance.White }}
                    mode={'text'}
                    press={handleBook}
                />


                <Snackbar
                style={{backgroundColor:Constance.Red}}
                    visible={invalid}
                    onDismiss={() => setinvalid(false)}>
                    {message}
                </Snackbar>

                {/* bottom sheet models */}
                {/* comfirm password model */}
                <Modal
                    entry="bottom"
                    backdropPressToClose={true}
                    isOpen={modalComfirmVisible}
                    style={[modal.modalBox]}
                    onClosed={() => setModalComfirmVisible(false)}
                >


                    <View style={[modal.content, { backgroundColor: theme.background, justifyContent: "center" }]}>
                        <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />

                        <View style={[modal.modelContainerChild, { alignSelf: 'flex-end' }]}>
                            <Icon type="ionicon" name="close" onPress={() => { setModalComfirmVisible(false) }} color={theme.text} />
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={[{ height: 100, width: 300, justifyContent: 'center', alignItems: 'center' }]}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 0 }}>
                                    <Anim json={require('../../assets/lottie/70226-a-driver.json')} autoplay={true} autosize={true} loop={true} speed={1} style={{ height: '100%', width: '100%' }} />
                                </View>
                            </View>
                            <TextComponent text={'Would you like to request a ride ?'} style={{ color: theme.text, fontSize: Constance.medium }} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                                <ButtonComponent mode='text' btnstyle={{ borderWidth: 1, borderColor: Constance.Blue, marginTop: 20, marginBottom: 30 }} lblstyle={{ color: Constance.Blue, textTransform: 'capitalize' }} text='No thanks' press={() => { navigation.navigate('creditcardscreen', { payment: true, data: { checkinDate: selectedStartDate.toString(), checkoutDate: selectedEndDate.toString(), adults: adult.substring(0, 1), children: children.substring(0, 1), amount: amountDue }, rideRequest: false, hotelKey: params.hotelKey, roomKey: params.key }); setModalComfirmVisible(false) }} />
                                <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginTop: 20, marginBottom: 30 }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Yes,Please' press={() => { navigation.navigate('pickuplocationscreen', { data: { checkinDate: selectedStartDate.toString(), checkoutDate: selectedEndDate.toString(), adults: adult.substring(0, 1), children: children.substring(0, 1), amount: amountDue }, rideRequest: true, hotelKey: params.hotelKey, roomKey: params.key }); setModalComfirmVisible(false) }} />

                            </View>
                        </View>


                    </View>

                </Modal>

            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textStyle: {
        marginTop: 10,
        marginHorizontal: 5,
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 20,
    },
    dateStyle: {
        marginTop: 10,
        padding: 8,
        marginHorizontal: 10,
        borderRadius: 8,
        backgroundColor: Constance.White
    },
});

export default Booking;