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
import axios from 'axios';
import Progress from '../components/indicator';


const loginSchema = yup.object({
  email: yup.string().required().email(),
  username: yup.string().required("Required").min(3).matches(/^[a-zA-Z0-9]+$/, "Invalid username"),
})


const ComfirmAccount = ({ navigation }) => {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [visible, setVisible] = useState(true);
  const [load, setload] = useState(false);
  const [message, setmessage] = useState('');



  const [invalid, setinvalid] = useState(false);

  const handleComfirmUser = (values: any) => {
    setload(true);
    
    axios.post("https://sunstarapi.herokuapp.com/login/verify/account", values).then(res=>{
        
        setmessage(res.data.message)
        setinvalid(true);
        setload(false);
        navigation.navigate('verifyscreen', {
          email: values.email,
          password: values.password,
          key: res.data.key,
          task:'reset'
        });
    }).catch(err=>{
      console.log(err);
      setmessage("Process failed, please try again.")
    setinvalid(true);
    })
  }

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Constance.White}/>

      <View style={style.parent}>

        <View style={[style.topcontainer, { justifyContent: 'center', alignItems: 'center' }]}>
          <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', padding: 40 }}>
            <Anim json={require('../../assets/lottie/75988-forgot-password.json')} autoplay={true} autosize={true} loop={true} speed={1} style={{ height: '100%', width: '100%' }} />
          </View>
        </View>

        <View style={style.bottomcontainer}>
          <TextComponent style={{ fontSize: Constance.medium, marginVertical: 15 }} text='Reset password' />

          <Formik
            initialValues={{ email: '', username: '' }}
            onSubmit={(values, action) => {
              handleComfirmUser(values)
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
                    borderWidth: 1, borderRadius: 5
                  }}
                />

                {props.errors.email || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.email} /></Animatable.View> : null}
                <InputComponent hint='username'
                  left={<TextInput.Icon name="account-box" />}
                  changeText={props.handleChange("username")}
                  value={props.values.username}
                  style={{
                    borderColor: Constance.light_border,
                    borderRadius: 5,
                    borderWidth: 1, top: 5
                  }}
                />
                {props.errors.username ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.username} /></Animatable.View> : null}


                <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginTop: 30 }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Reset Password' press={props.handleSubmit} />

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
          {message}
        </Snackbar>

        {load ? <View style={{ height: '100%', width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
          <Progress />
        </View> : null}
      </View>

    </View>
  )
}

export default ComfirmAccount
