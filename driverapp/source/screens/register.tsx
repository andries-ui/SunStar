import { Formik } from 'formik';
import React, { useContext, useState } from 'react'
import { Image, ScrollView, StatusBar, View } from 'react-native'
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
import axios from 'axios';


const loginSchema = yup.object({
  names: yup.string().required("Required").min(3).matches(/^(?![\s.]+$)[a-zA-Z\s.]*$/, "Invalid name"),
  username: yup.string().required("Required").min(3).matches(/^[a-zA-Z0-9]+$/, "Invalid username"),
  contact: yup.string().required("Required").min(10).matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "Invalid contact"),
  email: yup.string().required("Required").matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email"),
  password: yup.string().required("Required").min(8).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Invalid password"),
  confirmpassword: yup.string().required("Required").min(8).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Invalid password")
})


const Register = ({ navigation }) => {

  const [visible, setVisible] = useState(true);
  const [confirmVisible, setconfirmVisible] = useState(true)
  const [invalid, setinvalid] = useState(false);
  const [load, setload] = useState(false);
  const [message, setmessage] = useState('');


  const handleSignIn = (values: any) => {
    setinvalid(true)
  }


  const handleRegistration = (values: any) => {

    setload(true);
    const url = "https://sunstarapi.herokuapp.com/user/";

    try {
      axios.post(url, values)
        .then((res) => {

          if(res.data.status === "Pending"){
           
           setload(false); 
            navigation.navigate('verifyscreen', {
              email: values.email,
              password: values.password,
              key: res.data.key,
              task:'registration'
            });
       
          }else{
          setmessage(res.data.message + ".");
          console.log(res.data.details);
          setinvalid(true);
          setload(false);}
        })
        .catch((err) => {
          setmessage(err + ".");
          console.log(err);
          setinvalid(true);
          setload(false);
        })
    } catch (err) {
      console.log(err + ".");
      console.log(values);
      setload(false);
    }
  }



  return (
    <View style={{ height: '100%', width: '100%' }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Constance.White} />

      <View style={style.parent}>

        <View style={[style.topcontainer, { justifyContent: 'center', alignItems: 'center' }]}>
          <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', padding: 90 }}>
            <Anim json={require('../../assets/lottie/15413-registro.json')} autoplay={true} autosize={true} loop={true} speed={1} style={{ height: '100%', width: '100%' }} />
          </View>
        </View>

        <View style={style.bottomcontainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View >

              <TextComponent style={{ fontSize: Constance.medium, marginVertical: 15 }} text='Register' />

              <Formik
                initialValues={{ names: '', username: '', contact: '', email: '', password: '', confirmpassword: '' }}
                onSubmit={(values, action) => {
                  if (values.confirmpassword === values.password) {
                    let data = {
                      names: values.names,
                      username: values.username.trim(),
                      contact: values.contact.trim(),
                      email: values.email.toLowerCase().trim(),
                      password: values.password.trim(),
                      type: 'driver'
                    };
                    handleRegistration(data);
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
                    <InputComponent hint='Names'
                      left={<TextInput.Icon name="account" />}
                      changeText={props.handleChange("names")}
                      value={props.values.names}
                      style={{
                        borderColor: Constance.light_border,
                        borderWidth: 1, borderRadius: 5
                      }}
                    />
                    {props.errors.names || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.name} /></Animatable.View> : null}

                    <InputComponent hint='Username'
                      left={<TextInput.Icon name="account-box" />}
                      changeText={props.handleChange("username")}
                      value={props.values.username}
                      style={{
                        borderColor: Constance.light_border,
                        borderWidth: 1, borderRadius: 5, marginTop: 5
                      }}
                    />
                    {props.errors.username || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.username} /></Animatable.View> : null}

                    <InputComponent hint='Contact'
                      left={<TextInput.Icon name="phone" />}
                      changeText={props.handleChange("contact")}
                      keyboard={"phone-pad"}
                      value={props.values.contact}
                      style={{
                        borderColor: Constance.light_border,
                        borderWidth: 1, borderRadius: 5, marginTop: 5
                      }}
                    />
                    {props.errors.contact || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.contact} /></Animatable.View> : null}

                    <InputComponent hint='E-mail'
                      left={<TextInput.Icon name="at" />}
                      changeText={props.handleChange("email")}
                      keyboard={"default"}
                      value={props.values.email}
                      style={{
                        borderColor: Constance.light_border,
                        borderWidth: 1, borderRadius: 5, marginTop: 5
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
                        marginTop: 5
                      }}
                    />
                    {props.errors.password ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.password} /></Animatable.View> : null}


                    <InputComponent hint='Confirm password'
                      secured={confirmVisible}
                      left={<TextInput.Icon name="lock" />}
                      right={<TextInput.Icon name={visible ? "eye" : "eye-off"} onPress={() => visible ? setconfirmVisible(false) : setconfirmVisible(true)} />}
                      changeText={props.handleChange("confirmpassword")}
                      value={props.values.confirmpassword}
                      style={{
                        borderColor: Constance.light_border,
                        borderRadius: 5,
                        borderWidth: 1, marginTop: 5
                      }}
                    />
                    {props.errors.confirmpassword ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red, }} text={props.errors.confirmpassword} /></Animatable.View> : null}

                    <ButtonComponent mode='contained' btnstyle={{ marginTop: 40, backgroundColor: Constance.Yellow, }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Register' press={props.handleSubmit} />

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
        >
          {message}
        </Snackbar>
      </View>


      {load ? <View style={{ height: '100%', width: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
        <Progress />
      </View> : null}
    </View >
  )
}

export default Register
