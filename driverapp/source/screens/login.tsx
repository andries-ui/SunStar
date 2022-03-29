import { Formik } from 'formik';
import React, { Component, useContext, useEffect, useRef, useState } from 'react'
import { Animated, Image, StatusBar, View } from 'react-native'
import { BottomNavigation, Snackbar, TextInput } from 'react-native-paper';
import ButtonComponent from '../components/button';
import InputComponent from '../components/input';
import TextComponent from '../components/text';
import style from '../styles/screens/login';
import Constance from '../theme/const';
import { NavigationContainer } from "@react-navigation/native";
import * as yup from 'yup';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Progress from '../components/indicator';
import Anim from '../components/anim';
import * as SecureStore from 'expo-secure-store';
import Dashboard from './dashboard';
import { registerIndieID } from 'native-notify';


const loginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
})


const url = "https://sunstarapi.herokuapp.com/login";

const Login = ({ navigation }) => {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [visible, setVisible] = useState(true);
  const [message, setmessage] = useState('');
  const [load, setload] = useState(false);
  const [invalid, setinvalid] = useState(false);
  const [token, settoken] = useState(false);

  const handleSignIn = (values: any) => {

    console.log(values);
    setload(true);
    const url = "https://sunstarapi.herokuapp.com/login/driverLogin"
    axios.post(url, values).then(async (res) => {
      const results = res.data;
      if (results.status == 'Success') {
        setload(false);

        await SecureStore.setItemAsync('token', results.token);
        await SecureStore.setItemAsync('key', `${results.key}`);
          
        await registerIndieID(`${results.key}`, 910, 'IBzo5MJJB46vcD3JGfjwRf');
        
        await registerIndieID(`${"drivertoken{accgccac-1234567}"}`, 910, 'IBzo5MJJB46vcD3JGfjwRf');
        navigation.navigate('dashboardscreen', { key: results.key });

      } else {
        setmessage(results.message);
        setinvalid(true);
        setload(false);
      }
    }).catch((err) => {
      setinvalid(true);
      setmessage(err);
      console.log(err);
      setload(false);

    })


  }

    return (
      <View style={{ height: '100%', width: '100%' }}>
        <StatusBar barStyle={'dark-content'} />


        <View style={style.parent}>

          <View style={[style.topcontainer, { justifyContent: 'center', alignItems: 'center' }]}>
            <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', padding: 90 }}>
              <Anim json={require('../../assets/lottie/81243-login-successfully.json')} autoplay={true} autosize={true} loop={true} speed={1} style={{ height: '100%', width: '100%' }} />
            </View>
          </View>

          <View style={style.bottomcontainer}>
            <TextComponent style={{ fontSize: Constance.medium, marginVertical: 15 }} text='Sign-in' />

            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={(values, action) => {

                let data = {
                  email: values.email,
                  password: values.password,
                  type: 'client'
                };

                handleSignIn(data)
              }}
              validationSchema={loginSchema}
            >

              {(props) => (
                <View>
                  <InputComponent hint='E-mail'
                    left={<TextInput.Icon name="at" />}
                    changeText={props.handleChange("email")}
                    keyboard={"email-address"}
                    value={props.values.email}
                    style={{
                      borderColor: Constance.light_border,
                      borderWidth: 1, borderRadius: 5, marginTop: 10
                    }}
                  />

                  {props.errors.email || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.email} /></Animatable.View> : null}
                  <InputComponent hint='Password'
                    secured={visible}
                    keyboard={"default"}
                    left={<TextInput.Icon name="lock" />}
                    right={<TextInput.Icon name={visible ? "eye" : "eye-off"} onPress={() => visible ? setVisible(false) : setVisible(true)} />}
                    changeText={props.handleChange("password")}
                    value={props.values.password}
                    style={{
                      borderColor: Constance.light_border,
                      borderRadius: 5,
                      borderWidth: 1, marginTop: 5
                    }}
                  />
                  {props.errors.password ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.password} /></Animatable.View> : null}

                  <TextComponent
                    style={{ textAlign: 'right', marginVertical: 5, height: 30, marginTop: 10 , fontWeight:'bold'}} text='Forgot Password?' press={() => navigation.navigate('comfirmscreen')} />


                  <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginTop: 0 }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Sign-in' press={props.handleSubmit} />

                </View>
              )}
            </Formik>
            <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Grey, }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Register' press={() => { navigation.navigate('registerscreen') }} />
            {/* <ButtonComponent mode='text' btnstyle={{ position: 'absolute', bottom: 0, alignSelf: 'center' }} lblstyle={{ color: Constance.Black, textTransform: 'capitalize' }} text='Browse the app' press={() => navigation.navigate('dashboardscreen')} /> */}

          </View>


          <Snackbar
            visible={invalid}
            onDismiss={() => setinvalid(false)}
            style={{backgroundColor: Constance.Red}}>
            {message}
          </Snackbar>
        </View>

        {load ? <View style={{ height: '100%', width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
          <Progress />
        </View> : null}

      </View>
    )
  
}

export default Login
