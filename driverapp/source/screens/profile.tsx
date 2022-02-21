import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, ScrollView, StatusBar, Text, TouchableHighlight, View } from "react-native";
import { BottomNavigation, Divider } from "react-native-paper";
import { ThemeContext } from "../theme/themeProvider";
import style from "../styles/screens/profile";
import Modal from "react-native-modalbox";
import Constance from "../theme/const";
import { Icon } from "react-native-elements";
import { requestCameraPermissionsAsync } from "expo-camera";
import * as requestPermissionsAsync from "expo-image-picker";
import modal from "../styles/components/modal";
import Cam from "../components/camera";



const Tab = createBottomTabNavigator();

const Profile = ({ navigation }) => {

    const { theme, dark, toggle } = useContext(ThemeContext);
    const [err, seterr] = useState('');
    const [openCamera, setopenCamera] = useState(false);


    return (

        <View style={[style.parent, { backgroundColor: theme.background }]}>

            <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.border} />
            <View style={[style.topcontainer, { backgroundColor: theme.borderAlt }]}>
                <Text style={[style.lblProfile, { color: theme.text }]}>Profile</Text>
            </View>


            <View style={[style.content, { backgroundColor: theme.backgroundAlt, }]}>
                <View style={[style.flexContainer, { justifyContent: 'space-between' }]}>
                    <Icon type='material-community' name='bookmark-check' color={theme.gold} onPress={() => { navigation.navigate('reservationscreen') }} />
                    <Icon type='ionicon' name={dark ? 'contrast' : 'moon'} color={theme.text} onPress={toggle} />
                </View>
                <Text style={[style.lblcenterlined, { fontWeight: 'bold', fontSize: Constance.semi_large, color: theme.text, marginTop: 10 }]}> Andries sebola</Text>
                <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text }]}> andries@gmail.com</Text>

                <Divider style={{ height: Constance.smallDivider, backgroundColor: theme.borderAlt, marginTop: 10 }} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <TouchableHighlight onPress={() => navigation.navigate('accountscreen')}>
                            <View>
                                <View style={[style.flexContainer, { justifyContent: 'space-between', height: 50, alignItems: 'center', marginTop: 5 }]}>
                                    <View style={[style.flexContainer,]}>
                                        <Icon type='ionicon' name='person-circle' color={theme.text} />
                                        <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text }]}> Account </Text>
                                    </View>
                                    <Icon type='ionicon' name='chevron-forward' color={theme.text} />
                                </View>
                                <Divider style={{ height: Constance.smallDivider, backgroundColor: theme.borderAlt, }} />
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => { }}>
                            <View>
                                <View style={[style.flexContainer, { justifyContent: 'space-between', height: 50, alignItems: 'center', marginTop: 5 }]}>
                                    <View style={[style.flexContainer,]}>
                                        <Icon type='ionicon' name='star' color={theme.text} />
                                        <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text }]}> Reviews </Text>
                                    </View>
                                    <Icon type='ionicon' name='chevron-forward' color={theme.text} />
                                </View>
                                <Divider style={{ height: Constance.smallDivider, backgroundColor: theme.borderAlt, }} />
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => { }}>
                            <View>
                                <View style={[style.flexContainer, { justifyContent: 'space-between', height: 50, alignItems: 'center', marginTop: 5 }]}>
                                    <View style={[style.flexContainer,]}>
                                        <Icon type='ionicon' name='share' color={theme.text} />
                                        <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text }]}> Share </Text>
                                    </View>
                                    <Icon type='ionicon' name='chevron-forward' color={theme.text} />
                                </View>
                                <Divider style={{ height: Constance.smallDivider, backgroundColor: theme.borderAlt, }} />
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => navigation.navigate('creditcardscreen', { payment: false })}>
                            <View>
                                <View style={[style.flexContainer, { justifyContent: 'space-between', height: 50, alignItems: 'center', marginTop: 5 }]}>
                                    <View style={[style.flexContainer,]}>
                                        <Icon type='ionicon' name='card' color={theme.text} />
                                        <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text }]}> My cards </Text>
                                    </View>
                                    <Icon type='ionicon' name='chevron-forward' color={theme.text} />
                                </View>
                                <Divider style={{ height: Constance.smallDivider, backgroundColor: theme.borderAlt, }} />
                            </View>
                        </TouchableHighlight>

                        <View style={[style.flexContainer, { justifyContent: 'space-between', marginTop: 20 }]}>
                            <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text }]}>Places you hace been</Text>
                            <Icon type='material-community' name={dark ? 'delete-forever' : 'delete-off'} color={theme.text} onPress={toggle} />
                        </View>


                    </View>
                </ScrollView>

                <View style={[style.image, {
                    shadowColor: theme.text,
                    top: -35,
                    alignSelf: 'center',
                    position: 'absolute',
                }]}>
                    <Image style={[{ height: 70, width: 70 }]} source={require('../../assets/images/user.png')} />

                    <View style={{ position: 'absolute', right: 5, bottom: 0, backgroundColor: theme.background, height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>
                        <Icon type='ionicon' name='camera' style={{ bottom: 2.5, right: 0.5, height: 16, width: 16 }} color={theme.text} size={18} onPress={() => { setopenCamera(true) }} />
                    </View>
                </View>
            </View>




            {openCamera ? <View style={{ position: 'absolute', height: '100%', width: '100%' }}>
                <Cam onClose={() => { setopenCamera(false) }} />
            </View> : null}


        </View>

    )
}

export default Profile;