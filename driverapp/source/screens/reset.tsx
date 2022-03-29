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
import { useRoute } from '@react-navigation/native';
import Progress from '../components/indicator';


const loginSchema = yup.object({
  password: yup.string().required("Required").min(8).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Invalid password"),
  cpassword: yup.string().required("Required").min(8).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Invalid password"),
})


const ResetPassword = ({ navigation }) => {

  const props = useRoute().params;
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [visible, setVisible] = useState(true);
  const [load, setload] = useState(false);
  const [message, setmessage] = useState('');



  const [invalid, setinvalid] = useState(false);


  const UpdatePassword = async (values: any) => {

    setload(true);
    axios.patch(`https://sunstarapi.herokuapp.com/user/${props.key}`, values).then((res) => {

        const results = res.data;

        console.log('====================================');
        console.log(values, props.key, results);
        console.log('====================================');
        if (results.status == 'Success') {
            setinvalid(true);
            setmessage(results.message);
            setload(false);
            navigation.navigate('loginscreen'); 
        } else {
            setmessage(results.message);
            setinvalid(true);
            setload(false);
        }

    }).catch((err) => {

        setinvalid(true);
        setmessage(err);
        setload(false);

    });

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
            initialValues={{ password: '', cpassword: '' }}
            onSubmit={(values, action) => {

              if (values.password === values.cpassword) {
                UpdatePassword(values)
                }
              else {
                setmessage("Password does not match");
                setinvalid(true);
              }

              
            }}
            validationSchema={loginSchema}
          >

            {(props) => (
              <View>
                <InputComponent hint='Password'
                  left={<TextInput.Icon name="at" />}
                  changeText={props.handleChange("password")}
                  value={props.values.password}
                  style={{
                    borderColor: Constance.light_border,
                    borderWidth: 1, borderRadius: 5
                  }}
                />

                {props.errors.password || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.password} /></Animatable.View> : null}
                <InputComponent hint='Comfirm Password'
                  left={<TextInput.Icon name="account-box" />}
                  changeText={props.handleChange("cpassword")}
                  value={props.values.cpassword}
                  style={{
                    borderColor: Constance.light_border,
                    borderRadius: 5,
                    borderWidth: 1, top: 5
                  }}
                />
                {props.errors.cpassword ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.cpassword} /></Animatable.View> : null}


                <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginTop: 30 }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Reset Password' press={props.handleSubmit} />

              </View>
            )}
          </Formik>

        </View>


        <Snackbar
          visible={invalid}
          onDismiss={() => setinvalid(false)}
        >
          {message}
        </Snackbar>

        {load ? <View style={{ height: '100%', width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
          <Progress />
        </View> : null}
      </View>

    </View>
  )
}

export default ResetPassword
