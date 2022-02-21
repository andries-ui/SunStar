import { Formik } from 'formik';
import React, { useContext, useState } from 'react'
import { Image, ScrollView, StatusBar, Text, View } from 'react-native'
import { Snackbar, TextInput } from 'react-native-paper';
import ButtonComponent from '../components/button';
import InputComponent from '../components/input';
import TextComponent from '../components/text';
import style from '../styles/screens/login';
import Constance from '../theme/const';
import { ThemeContext } from '../theme/themeProvider';
import * as yup from 'yup';
import * as Animatable from 'react-native-animatable';
import Progress from '../components/indicator';
import Anim from '../components/anim';
import { useFonts, NotoSans_400Regular, NotoSans_700Bold, NotoSans_400Regular_Italic } from '@expo-google-fonts/noto-sans';



const loginSchema = yup.object({
  name: yup.string().required("Required").min(3).matches(/^(?![\s.]+$)[a-zA-Z\s.]*$/, "Invalid name"),
  username: yup.string().required("Required").min(3).matches(/^[a-zA-Z0-9]+$/, "Invalid username"),
  contact: yup.string().required("Required").min(10).matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "Invalid contact"),
  email: yup.string().required("Required").matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email"),
  password: yup.string().required("Required").min(8).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Invalid password"),
  confirmpassword: yup.string().required("Required").min(8).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Invalid password")
})


const Register = ({ navigation }) => {

  const [visible, setVisible] = useState(true);
  const [invalid, setinvalid] = useState(false);
  const [load, setload] = useState(false)

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
            <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', padding: 90 }}>
              <Anim json={require('../../assets/lottie/15413-registro.json')} autoplay={true} autosize={true} loop={true} speed={1} style={{ height: '100%', width: '100%' }} />
            </View>
          </View>


          <View style={style.bottomcontainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View >

                <TextComponent style={{ fontSize: Constance.medium, marginVertical: 15, fontFamily:'NotoSans_700Bold' }} text='Register' />

                <Formik
                  initialValues={{ name: '', username: '', contact: '', email: '', password: '', confirmpassword: '' }}
                  onSubmit={(values, action) => {
                    handleSignIn(values)
                  }}
                  validationSchema={loginSchema}
                >

                  {(props) => (
                    <View>
                      <InputComponent hint='Names'
                        left={<TextInput.Icon name="account" />}
                        changeText={props.handleChange("name")}
                        value={props.values.name}
                        style={{
                          borderColor: Constance.light_border,
                          borderWidth: 1, borderRadius: 5,
                          fontFamily:'Roboto_400Regular'
                        }}
                      />
                      {props.errors.name || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.name} /></Animatable.View> : null}

                      <InputComponent hint='Username'
                        left={<TextInput.Icon name="account-box" />}
                        changeText={props.handleChange("username")}
                        value={props.values.username}
                        style={{
                          borderColor: Constance.light_border,
                          borderWidth: 1, borderRadius: 5, marginTop: 5,
                          fontFamily:'Roboto_400Regular'
                        }}
                      />
                      {props.errors.username || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.username} /></Animatable.View> : null}

                      <InputComponent hint='Contact'
                        left={<TextInput.Icon name="phone" />}
                        changeText={props.handleChange("contact")}
                        value={props.values.contact}
                        style={{
                          borderColor: Constance.light_border,
                          borderWidth: 1, borderRadius: 5, marginTop: 5,
                          fontFamily:'Roboto_400Regular'
                        }}
                      />
                      {props.errors.contact || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.contact} /></Animatable.View> : null}

                      <InputComponent hint='E-mail'
                        left={<TextInput.Icon name="at" />}
                        changeText={props.handleChange("email")}
                        value={props.values.email}
                        style={{
                          borderColor: Constance.light_border,
                          borderWidth: 1, borderRadius: 5, marginTop: 5,
                          fontFamily:'Roboto_400Regular'
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
                          borderWidth: 1,
                          marginTop: 5,
                          fontFamily:'Roboto_400Regular'
                        }}
                      />
                      {props.errors.password ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.password} /></Animatable.View> : null}


                      <InputComponent hint='Confirm password'
                        secured={visible}
                        left={<TextInput.Icon name="lock" />}
                        right={<TextInput.Icon name={visible ? "eye" : "eye-off"} onPress={() => visible ? setVisible(false) : setVisible(true)} />}
                        changeText={props.handleChange("password")}
                        value={props.values.password}
                        style={{
                          borderColor: Constance.light_border,
                          borderRadius: 5,
                          borderWidth: 1, marginTop: 5,
                          fontFamily:'Roboto_400Regular'
                        }}
                      />
                      {props.errors.password ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red, }} text={props.errors.password} /></Animatable.View> : null}

                      <ButtonComponent mode='contained' btnstyle={{ marginTop: 40, backgroundColor: Constance.Yellow, }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Register' press={handleSignIn} />

                    </View>
                  )}
                </Formik>

                <ButtonComponent mode='text' btnstyle={{ marginTop: 20, alignSelf: 'center' }} lblstyle={{ color: Constance.Black, textTransform: 'capitalize' }} text='Sign-in' press={() => { navigation.navigate('loginscreen') }} />

              </View>
            </ScrollView>
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


        {load ? <View style={{ height: '100%', width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
          <Progress />
        </View> : null}
      </View >
    )
  }
}

export default Register
