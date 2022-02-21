import { Formik } from 'formik';
import React, { Component, useContext, useRef, useState } from 'react'
import { Animated, Image, StatusBar, View } from 'react-native'
import { BottomNavigation, Snackbar, TextInput } from 'react-native-paper';
import ButtonComponent from '../components/button';
import InputComponent from '../components/input';
import TextComponent from '../components/text';
import style from '../styles/screens/login';
import Constance from '../theme/const';
import { ThemeContext } from '../theme/themeProvider';
import * as yup from 'yup';
import * as Animatable from 'react-native-animatable';
import Anim from '../components/anim';
import { useFonts, NotoSans_400Regular, NotoSans_700Bold, NotoSans_400Regular_Italic } from '@expo-google-fonts/noto-sans';


const loginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
})


const ResetPassword = ({ navigation }) => {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [visible, setVisible] = useState(true);

  const [invalid, setinvalid] = useState(false);

  const handleSignIn = (values: any) => {

    setinvalid(true)
  }

  let [fontsLoaded] = useFonts({ NotoSans_400Regular_Italic, NotoSans_400Regular, NotoSans_700Bold })
  if (!fontsLoaded) {
    return (
      <View/>
    );
  } else {
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <StatusBar barStyle={'light-content'} />


      <View style={style.parent}>

      <View style={[style.topcontainer, { justifyContent: 'center', alignItems: 'center' }]}>
          <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' , padding:40}}>
            <Anim json={require('../../assets/lottie/75988-forgot-password.json')} autoplay={true} autosize={true} loop={true} speed={1} style={{ height: '100%', width: '100%' }} />
          </View>
        </View>

        <View style={style.bottomcontainer}>
          <TextComponent style={{ fontSize: Constance.medium, marginVertical: 15, fontFamily: 'NotoSans_700Bold' }} text='Reset password' />

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
                    borderWidth: 1, borderRadius: 5,
                    fontFamily: 'NotoSans_400Regular'
                  }}
                />

                {props.errors.email || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.email} /></Animatable.View> : null}
                <InputComponent hint='username'
                  left={<TextInput.Icon name="account-box" />}
                  changeText={props.handleChange("password")}
                  value={props.values.password}
                  style={{
                    borderColor: Constance.light_border,
                    borderRadius: 5,
                    borderWidth: 1, top: 5,
                    fontFamily: 'NotoSans_400Regular'
                  }}
                />
                {props.errors.password ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.password} /></Animatable.View> : null}


                <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginTop: 30 }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Reset Password' press={handleSignIn} />

              </View>
            )}
          </Formik>

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
          Hey there! I'm a Snackbar.
        </Snackbar>
      </View>

    </View>
  )
        }
}

export default ResetPassword
