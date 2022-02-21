import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Button, Switch, StatusBar, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Anim from '../components/anim';
import ButtonComponent from '../components/button';
import Constance from '../theme/const';
import { ThemeContext } from '../theme/themeProvider';
import { useRoute } from '@react-navigation/native';

const Paid = ({ navigation }) => {
    const { theme, dark, toggle } = useContext(ThemeContext);
    const params = useRoute().params

    return (
        <View style={{ paddingHorizontal: 50, backgroundColor: theme.background, height: '100%', justifyContent: 'center', alignItems: 'center' }} >
            <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />

            <View style={[{ height: 150, width: 350, justifyContent: 'center', alignItems: 'center' }]}>
                <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
                    <Anim json={require('../../assets/lottie/68064-success-celebration.json')} autoplay={true} autosize={true} loop={true} speed={1} style={{ height: '100%', width: '100%' }} />
                </View>

                <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
                    <Anim json={require('../../assets/lottie/79568-success.json')} autoplay={true} autosize={true} loop={true} speed={1} style={{ height: '80%', width: '80%' }} />
                </View>

                <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
                    <Anim json={require('../../assets/lottie/69021-success-interaction.json')} autoplay={true} autosize={true} loop={false} speed={1} style={{ height: '80%', width: '80%' }} />
                </View>
            </View>
            <Text style={{ textAlign: 'center', color: theme.text, fontSize: Constance.x_small, marginTop: 30 }}>You have booked
                <Text style={{ textAlign: 'center', color: theme.text, fontSize: Constance.small, fontWeight: 'bold' }}> {params.room} </Text> at
                <Text style={{ textAlign: 'center', color: theme.text, fontSize: Constance.small, fontWeight: 'bold' }}> {params.hotelname} </Text></Text>

            <Text style={{ marginTop: 10, textAlign: 'center', color: theme.text, fontSize: Constance.x_small }}>check in date-time:
                <Text style={{ textAlign: 'center', color: theme.text, fontSize: Constance.small, marginTop: 10, fontWeight: 'bold' }}>{params.data.checkinDate} </Text>
            </Text>

            <Text style={{ textAlign: 'center', color: theme.text, fontSize: Constance.x_small }}>check out date-time:
                <Text style={{ textAlign: 'center', color: theme.text, fontSize: Constance.small, marginTop: 10, fontWeight: 'bold' }}>{params.data.checkoutDate}
                </Text>
            </Text>

            <TouchableOpacity style={{ marginTop: 20 }}>
                <View style={{ paddingHorizontal: 10, width: 250, borderRadius: 9, backgroundColor: Constance.Blue, height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', color: Constance.White, fontSize: Constance.medium }}>Booking details </Text>
                    <Icon type="ionicon" name='chevron-forward' size={28} color={Constance.White} />
                </View>
            </TouchableOpacity>

            <ButtonComponent mode='contained' btnstyle={{ position: 'absolute', bottom: 20, right: 20, backgroundColor: Constance.Grey, }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Done' press={() => navigation.navigate('dashboardscreen')} />


        </View>
    );
}


export default Paid;