import { Formik } from 'formik';
import React, { Component, useContext, useRef, useState } from 'react'
import { Animated, Image, StatusBar, Text, View } from 'react-native'
import { BottomNavigation, Snackbar, TextInput } from 'react-native-paper';
import ButtonComponent from '../components/button';
import InputComponent from '../components/input';
import TextComponent from '../components/text';
import style from '../styles/screens/login';
import Constance from '../theme/const';
import * as yup from 'yup';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Progress from '../components/indicator';
import Anim from '../components/anim';
import {useFonts, NotoSans_400Regular, NotoSans_700Bold, NotoSans_400Regular_Italic} from '@expo-google-fonts/noto-sans';



const loginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
})


const Login = ({ navigation }) => {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [visible, setVisible] = useState(true);
  const [message, setmessage] = useState('');

  const [load, setload] = useState(false);

  const [invalid, setinvalid] = useState(false);
  const handleSignIn = (values: any) => {

    const url = "https://sunstarapi.herokuapp.com/login"
    axios.post(url, values).then((res) => {
      const results = res.data;
      setmessage(results.token + "==")
      // setmessage(results.token)
    }).catch((err) => {
      setinvalid(true);
      setmessage(err.JSON() + " ==")
    })

  }

  let [fontsLoaded] = useFonts({ NotoSans_400Regular_Italic , NotoSans_400Regular, NotoSans_700Bold})
  if (!fontsLoaded) {
    return (
      <></>
    );
  }else{
  
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <StatusBar barStyle={'light-content'} />

     
      <View style={style.parent}>

        <View style={[style.topcontainer, { justifyContent: 'center', alignItems: 'center' }]}>
          <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' , padding:90}}>
            <Anim json={require('../../assets/lottie/81243-login-successfully.json')} autoplay={true} autosize={true} loop={true} speed={1} style={{ height: '100%', width: '100%' }} />
          </View>
        </View>

        <View style={style.bottomcontainer}>
          <TextComponent style={{ fontSize: Constance.medium, marginVertical: 15 , fontFamily: 'NotoSans_700Bold'}} text='Sign-in' />

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, action) => {
              handleSignIn(values)
            }}
            validationSchema={loginSchema}
          >

            {(props) => (
              <View>
                <InputComponent hint='E-mail'
                  left={<TextInput.Icon name="at" />}
                  changeText={props.handleChange("email")}
                  value={props.values.email}
                  style={{
                    borderColor: Constance.light_border,
                    borderWidth: 1, borderRadius: 5, marginTop: 10,
                    fontFamily:'NotoSans_400Regular'
                  }}
                />

                {props.errors.email || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.email} /></Animatable.View> : null}
                <InputComponent hint='Password'
                  secured={visible}
                  left={<TextInput.Icon name="lock" />}
                  right={<TextInput.Icon name={visible ? "eye" : "eye-off"} onPress={() => visible ? setVisible(false) : setVisible(true)} />}
                  changeText={props.handleChange("password")}
                  value={props.values.password}
                  style={{
                    borderColor: Constance.light_border,
                    borderRadius: 5,
                    borderWidth: 1, marginTop: 5,
                    fontFamily:'NotoSans_400Regular'
                  }}
                />
                {props.errors.password ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.password} /></Animatable.View> : null}

                <TextComponent
                  style={{ textAlign: 'right', marginVertical: 5, height: 30, marginTop: 10 ,
                  fontFamily:'NotoSans_400Regular_Italic'}} text='Forgot Password?' press={() => navigation.navigate('resetscreen')} />


                <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginTop: 0 }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Sign-in' press={handleSignIn} />

              </View>
            )}
          </Formik>
          <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Grey, }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Register' press={() => {navigation.navigate('registerscreen') }} />
          <ButtonComponent mode='text' btnstyle={{ position: 'absolute', bottom: 0, alignSelf: 'center' }} lblstyle={{ color: Constance.Black, textTransform: 'capitalize' }} text='Browse the app' press={() => navigation.navigate('dashboardscreen')} />

        </View>


        <Snackbar
          visible={invalid}
          onDismiss={() => setinvalid(false)}

          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}>
          {message}
        </Snackbar>
      </View>

      {load ? <View style={{ height: '100%', width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
        <Progress />
      </View> : null}

    </View>
  )
        }
}

export default Login
