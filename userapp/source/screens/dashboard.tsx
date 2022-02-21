import React, { useContext, useEffect, useState } from "react";
import BottomNavigation from "../routes/bottomStack";
import { StatusBar, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import TextComponent from "../components/text";
import Constance from "../theme/const";
import { ThemeContext } from "../theme/themeProvider";
import axios from 'axios';
import * as SecuredStore from 'expo-secure-store';

const Dashboard = ({ navigation }) => {

  const { theme, dark, toggle } = useContext(ThemeContext);
  const [checkedin, setcheckedin] = useState(false);
  const [data, setdata] = useState();

  const GuestCheckin = async () => {
    let key = await SecuredStore.getItemAsync('key') || 'null';
    axios.get(`https://sunstarapi.herokuapp.com/roomReservation/reservation/${key}`).then((res) => {

      res.data.forEach(async (data: any) => {
        let today = new Date();
        let checkindate = new Date(data.checkinDate);
        let checkoutDate = new Date(data.checkoutDate);

        if (data.active && today > checkoutDate) {
          await axios.patch(`https://sunstarapi.herokuapp.com/roomReservation/${data._id}`, { active: false }).then((res) => {

          }).catch((err) => {
            console.log(err);

          })

        }

        if (data.active && today >= checkindate && today <= checkoutDate) {

          setcheckedin(true);
          setdata(data);
          console.log(data);


          return;

        }
      })

    })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    GuestCheckin();
  }, [])

  return (

    <View style={{ height: '100%', width: '100%' }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={checkedin ? Constance.Green : theme.background} />

      {checkedin ? <TouchableOpacity onPress={() => { navigation.navigate('managingscreen', { data: data }) }}>
        <Animatable.View animation="pulse" easing="ease-out" style={{ marginTop: 0, height: 45, width: '100%', backgroundColor: Constance.Green, justifyContent: 'center', alignItems: 'center' }}>
          <TextComponent text={'Manage your stay'} style={{ color: Constance.White, fontSize: Constance.medium, fontWeight: '900' }} />
        </Animatable.View>
      </TouchableOpacity> : null}
      <BottomNavigation />
    </View>


  )
}

export default Dashboard;