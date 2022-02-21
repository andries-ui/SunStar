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
import { ThemeContext } from '../theme/themeProvider'



const OnBoarding = ({ navigation }) => {

  const { theme } = useContext(ThemeContext)

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [key, setKey] = useState<number>(1);

  let [fontsLoaded] = useFonts({ NotoSans_400Regular_Italic, NotoSans_400Regular, NotoSans_700Bold })
  if (!fontsLoaded) {
    return (<></>
    );
  } else {
    return (
      <View >

        <StatusBar barStyle={'dark-content'} backgroundColor={Constance.White} />


        <View
          style={style.containerTop}  >

      
            <View key={"1"} style={{ justifyContent: "center" }}>
              <Bording
                json={require('../../assets/lottie/34273-mercedes.json')}
                caption={
                  "SunDrive: Hotels guest Inservice transportation"
                }
                style={{ fontFamily: 'NotoSans_400Regular', fontWeight: "900" }}
                loop={false}
              />
              <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginVertical: 40, marginHorizontal: 30 }}
                lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} press={() => navigation.navigate("loginscreen")} text='Get started' />

            </View>


          <View
            style={style.bottom}  >

            {currentPage >= 2 ? null :
              <TextComponent style={{ color: Constance.Grey, textAlign: 'center' }} text= {'SunDrive'} />
            }

          </View>

        </View>
  
      </View>
    )
  }
}

export default OnBoarding