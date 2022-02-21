import React, { Component, useContext, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StatusBar, Text, View } from 'react-native'
import { Icon, Image } from 'react-native-elements'
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view'
import ButtonComponent from '../components/button'
import Bording from '../components/onboarding'
import TextComponent from '../components/text'
import style from '../styles/screens/onboarding'
import Constance from '../theme/const';
import { useFonts, NotoSans_400Regular, NotoSans_700Bold, NotoSans_400Regular_Italic } from '@expo-google-fonts/noto-sans';
import { ThemeContext } from '../theme/themeProvider';
import * as SecureStore from 'expo-secure-store';



const OnBoarding = ({ navigation }) => {

  const {theme} = useContext(ThemeContext)

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [key, setKey] = useState<number>(1);


  let [fontsLoaded] = useFonts({ NotoSans_400Regular_Italic, NotoSans_400Regular, NotoSans_700Bold })
  
  if (!fontsLoaded) {
    return (
     <View/>
    );
  } else {
  return (
    <View >

      <StatusBar barStyle={'dark-content'} backgroundColor={Constance.White}/>
   

      <View
        style={style.containerTop}  >

        <PagerView
          initialPage={0}
          scrollEnabled
          style={{ flex: 1, }}
          showPageIndicator={true}
          onPageSelected={(e: PagerViewOnPageSelectedEvent) => {
            setCurrentPage(e.nativeEvent.position);
          }}

        >
          <View key={"1"} style={{ justifyContent: "center" }}>
            <Bording
              json={require('../../assets/lottie/85406-data-loading.json')}
              caption={
                "Browse availabe hotes in your area"
              }
              style={{ fontFamily: 'NotoSans_400Regular', fontWeight:"900"}}
            />
          </View>
          <View key="2" style={{ justifyContent: "center" }}>
            <Bording
              json={require('../../assets/lottie/14521-hotel-booking.json')}
              caption={
                "Book a room at your favourite hotel"
              }
              style={{ fontFamily: 'NotoSans_400Regular', fontWeight:"900"}}
            />
          </View>
          <View key="3" style={{ justifyContent: "center" }}>
            <Bording
              json={require('../../assets/lottie/76686-driver-management.json')}
              caption={
                "Manage your stay"
              }
              style={{ fontFamily: 'NotoSans_400Regular', fontWeight:"900"}}
            />
            {currentPage >= 2 ?
              <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginVertical: 40, marginHorizontal: 30 }}
                lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} press={async() =>{ navigation.navigate("loginscreen"); await SecureStore.setItemAsync('launched', 'false');
              }} text='Get started' />
              : null
            }
          </View>
        </PagerView>


        <View
          style={style.bottom}  >

          {currentPage >= 2 ? null :
            <TextComponent style={{ color: Constance.Grey, textAlign:'center'}} text={currentPage >= 1 ? "Scroll again" : 'Scroll right'} />

          }
          <View
            style={style.header}  >
            <View style={{
              backgroundColor: currentPage >= 0 ? theme.text : Constance.Grey,
              flexGrow: 1,
              height: 4,
              borderRadius: 4, marginHorizontal: 2
            }}>

            </View>
            <View style={{
              backgroundColor: currentPage >= 1 ? theme.text : Constance.Grey,
              flexGrow: 1,
              height: 4, borderRadius: 4, marginHorizontal: 2
            }}>

            </View>
            <View style={{
              backgroundColor: currentPage >= 2 ? theme.text : Constance.Grey,
              flexGrow: 1, height: 4, borderRadius: 4, marginHorizontal: 2
            }}>

            </View>


            <View style={{ width: 30, borderRadius: 4 }}>
              {
                currentPage >= 2 ? null : <Icon type='ionicon'
                  name='chevron-forward-outline'
                  size={34}
                  color={Constance.light_text}
                  onPress={async() =>{ navigation.navigate("loginscreen"); await SecureStore.setItemAsync('launched', 'false');
                }} />
              }
            </View>

          </View>
        </View>

      </View>
      {
                currentPage >= 2 ? 
                 <View style={style.info}>
              <Icon type='ionicon'
                  name='information'
                  size={34}
                  color={Constance.Black}
                  onPress={() => navigation.navigate("loginscreen")} />
            
            </View>  :null}
    </View>
  )
      }
}

export default OnBoarding