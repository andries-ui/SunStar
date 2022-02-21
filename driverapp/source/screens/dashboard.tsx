import React, { useContext, useEffect, useState } from "react";
import { Image, PermissionsAndroid, Platform, StatusBar, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../theme/themeProvider";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Divider, Icon, Text } from "react-native-elements";
import Constance from "../theme/const";
import style from '../styles/screens/card';
import Modal from "react-native-modalbox";
import Drawer from '../styles/components/drawer';
import modal from '../styles/components/modal';
import * as yup from 'yup';
import TextComponent from '../components/text';
import * as ImagePicker from 'expo-image-picker';
import { requestForegroundPermissionsAsync } from "expo-location";
import * as Location from 'expo-location';
import { useFonts, NotoSans_400Regular, NotoSans_700Bold, NotoSans_400Regular_Italic } from '@expo-google-fonts/noto-sans';

const cardSchema = yup.object({
  names: yup.string().required('Required').min(3)
    .matches(/^(?![\s.]+$)[a-zA-Z\s.]*$/, "Only characters are allowed."),
  cardnumber: yup.string().required('Required').length(16).matches(/^(?:(?<visa>4[0-9]{12}(?:[0-9]{3})?)|(?<mastercard>5[1-5][0-9]{14})|(?<discover>6(?:011|5[0-9]{2})[0-9]{12})|(?<amex>3[47][0-9]{13})|(?<diners>3(?:0[0-5]|[68][0-9])[0-9]{11})|(?<jcb>(?:2131|1800|35[0-9]{3})[0-9]{11}))$/, "Invalid card number"),
  expdate: yup.string().required('Required').matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "invalid date"),
  cvv: yup.string().required('Required').length(4).matches(/[0-9]{4}/, "Invalid pin")
});


const Dashboard = ({ navigation }) => {



  //permisions==================================================================
  //permisions==================================================================
  const [latitude, setlatitude] = useState<number>(0);
  const [longitude, setlongitude] = useState<number>(0);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(null);
  const [err, seterr] = useState('');

  const starWarching = async () => {
    try {
      await requestForegroundPermissionsAsync();
    } catch (err: any) {
      seterr(err)
    }
  }

  useEffect(() => {
    starWarching();
    updateState();
  }, [])


  // location ====================== ======================
  const updateState = async () => {

    try {

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') { return; }

      let location = await Location.getCurrentPositionAsync({});

      setlatitude(location.coords.latitude);
      setlongitude(location.coords.longitude);

    } catch (err) {

    }


  }




  // =========================== ===========================

  //permisions==================================================================
  //permisions==================================================================

  const { theme, dark } = useContext(ThemeContext);
  const [modalUpdateCard, setmodalUpdateCard] = useState(false);
  const [drawer, setdrawer] = useState(false)

  let [fontsLoaded] = useFonts({ NotoSans_400Regular_Italic, NotoSans_400Regular, NotoSans_700Bold })
  if (!fontsLoaded) {
    return (
     <View/>
    );
  } else {
     return (

    <View style={{ backgroundColor: theme.background, height: '100%', width: '100%' }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />

      <View style={[style.map, { height: '100%' }]}>
    <MapView
 
             provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={[style.map, { height: '100%' }]}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}>

        </MapView>


        <View style={{ position: 'absolute', width: '100%', height: 50, backgroundColor: theme.background }}>
        </View >

        <View style={{ position: 'absolute', width: '100%' }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, paddingHorizontal: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Icon type='ionicon' name='menu' color={theme.text} size={30} onPress={() => { setdrawer(true) }} />
              <TextComponent text={'SunDrive'} style={{fontFamily: 'NotoSans_400Regular', fontSize: Constance.large, color: theme.text, fontWeight: 'bold' }} />
            </View>

            <View style={{ backgroundColor: theme.background, height: 35, width: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>
              <Icon type='Ionicon' name='notifications' color={theme.text} onPress={() => navigation.navigate('notivationscreen')} />
            </View>
          </View>

        </View >



      </View>

      <View style={{ position:'absolute', right:20, bottom: 40, backgroundColor: theme.borderAlt, height: 35, width: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>
          <Icon type='ionicon' name='locate' color={theme.text} onPress={() => { updateState() }} />
        </View>

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
            <Text style={[modal.textStyle, { color: theme.text }]}>Ride Requests</Text>
            <Icon type="ionicon" name="close" color={theme.text} onPress={() => { setmodalUpdateCard(false) }} />
          </View>

          <View style={{ height: 250, backgroundColor: Constance.Grey }}>

          </View>



        </View>
      </Modal>


      <TouchableOpacity onPress={() => { setmodalUpdateCard(true) }} style={{ width: '100%', borderRadius: 7, height: 40, alignItems: 'center', position: 'absolute', bottom: -25 }}>
        <View style={{ height: 8, width: '40%', backgroundColor: theme.borderAlt, borderRadius: 7 }}>

        </View>
      </TouchableOpacity>



      <Modal
        entry="left"
        backdropPressToClose={true}
        isOpen={drawer}
        style={[Drawer.modalBox]}
        onClosed={() => setdrawer(false)}
      >
        <View style={[Drawer.content, { backgroundColor: theme.background }]}>

          <View style={Drawer.modelContainerChild}>
            <Text style={[Drawer.textStyle, { color: theme.text }]}>Menu</Text>
            <Icon type="ionicon" name="close" color={theme.text} onPress={() => { setdrawer(false) }} />
          </View>
          <Divider style={{ height: Constance.mediumDivider, backgroundColor: theme.borderAlt }} />


          <TouchableOpacity onPress={() => { navigation.navigate('profilescreen') }}>
            <View style={{ height: 50, backgroundColor: theme.background }}>
              <View style={{ height: 48, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ height: 48, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
                  <Icon type="ionicon" name="person-outline" color={theme.text} onPress={() => { setdrawer(false) }} />
                  <Text style={{ color: theme.text, marginHorizontal: 10, fontSize: Constance.medium }}>Profile</Text>
                </View>
                <Icon type="ionicon" name="chevron-forward" color={theme.text} onPress={() => { setdrawer(false) }} />

              </View>
              <Divider style={{ height: 1, backgroundColor: theme.borderAlt }} />
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => { navigation.navigate('tripscreen') }}>
            <View style={{ height: 50, backgroundColor: theme.background }}>
              <View style={{ height: 48, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ height: 48, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
                  <Icon type="ionicon" name="car-sport" color={theme.text} onPress={() => { setdrawer(false) }} />
                  <Text style={{ color: theme.text, marginHorizontal: 10, fontSize: Constance.medium }}>Trips</Text>
                </View>
                <Icon type="ionicon" name="chevron-forward" color={theme.text} onPress={() => { setdrawer(false) }} />

              </View>
              <Divider style={{ height: 1, backgroundColor: theme.borderAlt }} />
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => { navigation.navigate('historyscreen') }}>
            <View style={{ height: 50, backgroundColor: theme.background }}>
              <View style={{ height: 48, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ height: 48, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
                  <Icon type="Ionicon" name="history" color={theme.text} onPress={() => { setdrawer(false) }} />
                  <Text style={{ color: theme.text, marginHorizontal: 10, fontSize: Constance.medium }}>History</Text>
                </View>
                <Icon type="ionicon" name="chevron-forward" color={theme.text} onPress={() => { setdrawer(false) }} />

              </View>
              <Divider style={{ height: 1, backgroundColor: theme.borderAlt }} />
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => { navigation.navigate('profilescreen') }}>
            <View style={{ height: 50, backgroundColor: theme.background }}>
              <View style={{ height: 48, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ height: 48, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
                  <Icon type="Ionicon" name="support" color={theme.text} onPress={() => { setdrawer(false) }} />
                  <Text style={{ color: theme.text, marginHorizontal: 10, fontSize: Constance.medium }}>Support</Text>
                </View>
                <Icon type="ionicon" name="chevron-forward" color={theme.text} onPress={() => { setdrawer(false) }} />

              </View>
              <Divider style={{ height: 1, backgroundColor: theme.borderAlt }} />
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => { navigation.navigate('profilescreen') }}>

            <View style={{ height: 50, backgroundColor: theme.background }}>
              <View style={{ height: 48, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ height: 48, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 }}>
                  <Icon type="ionicon" name="exit-outline" color={Constance.Red} onPress={() => { setdrawer(false) }} />
                  <Text style={{ color: theme.text, marginHorizontal: 10, fontSize: Constance.medium }}>Log out</Text>
                </View>
                <Icon type="ionicon" name="chevron-forward" color={theme.text} onPress={() => { setdrawer(false) }} />

              </View>
              <Divider style={{ height: 1, backgroundColor: theme.borderAlt }} />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>





    </View>
  )
        }
}

export default Dashboard;
