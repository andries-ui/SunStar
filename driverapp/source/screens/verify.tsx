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
import { useRoute } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';


const loginSchema = yup.object({
  pin: yup.string().required("Required").min(3).matches(/[0-9]{5,6}/, "Invalid pin")

})


const Verify = ({ navigation }) => {

  const props = useRoute();
  console.log(props.params);

  const [visible, setVisible] = useState(true);
  const [confirmVisible, setconfirmVisible] = useState(true)
  const [invalid, setinvalid] = useState(false);
  const [load, setload] = useState(false);
  const [message, setmessage] = useState('');


  const handleSignIn = (values: any) => {
    setinvalid(true)
  }


  const handleSuccessfulRegistration = () => {

    const data = {
      email: props.params.email,
      password: props.params.password,
      type: 'client'
    }

    setload(true);
    const url = `https://sunstarapi.herokuapp.com/login/`
    axios.post(url, data).then(async (res) => {
      const results = res.data;
      if (results.status == 'Success') {
        setload(false);
        await SecureStore.setItemAsync('token', results.token);
        await SecureStore.setItemAsync('key', results.key);
        navigation.navigate('dashboardscreen', { key: results.key });
        setload(false);
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


  const handleRegistration = (values: any) => {

    console.log(values, "BACKEND");

    setload(true);
    const url = `https://sunstarapi.herokuapp.com/user/verify/${props.params.key}`;
    try {
      axios.post(url, values)
        .then((res) => {

          if (res.data.status === "Success") {

            if (props.params.task == "registration") {
              handleSuccessfulRegistration()
            } else {
              navigation.navigate('resetscreen', {
                key: props.params.key,
              });
            }
          } else {
            setmessage(res.data.message + ".");
            console.log(res.data.details, "++>>++>>");
            setinvalid(true);
            setload(false);
          }
        })
        .catch((err) => {
          setmessage(err + ".==>>");
          console.log(err, "===>>>>>");
          setinvalid(true);
          setload(false);
        })
    } catch (err) {
      console.log(err + ".");
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
                initialValues={{ pin: '' }}
                onSubmit={(values, action) => {
                  let data = {
                    pin: values.pin
                  };
                  handleRegistration(data);

                }}
                validationSchema={loginSchema}
              >

                {(props) => (
                  <View>
                    <InputComponent hint='OTP'
                      left={<TextInput.Icon name="account" />}
                      changeText={props.handleChange("pin")}
                      value={props.values.pin}
                      keyboard={"number-pad"}
                      style={{
                        borderColor: Constance.light_border,
                        borderWidth: 1, borderRadius: 5
                      }}
                    />
                    {props.errors.pin || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.pin} /></Animatable.View> : null}


                    <ButtonComponent mode='contained' btnstyle={{ marginTop: 40, backgroundColor: Constance.Yellow, }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Verify' press={props.handleSubmit} />

                  </View>
                )}
              </Formik>

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

export default Verify
