import React, { Component, useContext, useEffect, useState } from 'react'
import { Alert, Platform, StatusBar, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Divider, Icon, Image, Text } from 'react-native-elements';
import ActionBar from '../components/actionbar';
import style from '../styles/screens/profile';
import Constance from '../theme/const';
import { ThemeContext } from '../theme/themeProvider';
import Modal from "react-native-modalbox";
import ButtonComponent from '../components/button';
import InputComponent from '../components/input';
import modal from '../styles/components/modal';
import axios from 'axios';
import * as yup from 'yup';
import { Snackbar, TextInput } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { Formik } from 'formik';
import TextComponent from '../components/text';
import * as Animatable from 'react-native-animatable';
import Progress from '../components/indicator';
import { requestCameraPermissionsAsync } from "expo-camera";
import * as requestPermissionsAsync from "expo-image-picker";
import Cam from '../components/camera';


const passwordSchema = yup.object({
    password: yup.string().required("Required").min(8).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Invalid password"),
})

const profileSchema = yup.object({
    names: yup.string().required("Required").min(3).matches(/^(?![\s.]+$)[a-zA-Z\s.]*$/, "Invalid name"),
    username: yup.string().required("Required").min(3).matches(/^[a-zA-Z0-9]+$/, "Invalid username"),
    contact: yup.string().required("Required").min(10).matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "Invalid contact"),
})

const emailSchema = yup.object({
    email: yup.string().required("Required").matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email"),
})

const resetPasswordSchema = yup.object({
    password: yup.string().required("Required").min(8).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Invalid password"),
    confirmpassword: yup.string().required("Required").min(8).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Invalid password")
})

const Account = ({ navigation }) => {
    const [modalComfirmVisible, setModalComfirmVisible] = useState(false);
    const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
    const [modalUsernameVisible, setModalUsernameVisible] = useState(false);
    const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
    const [visiblepassword, setvisiblepassword] = useState(true);
    const [visibleComfirmPassword, setvisibleComfirmPassword] = useState(true);
    const [action, setaction] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [newUsername, setnewUsername] = useState('');
    const [oldPassword, setoldPassword] = useState('');

    const [username, setusername] = useState('');
    const [contact, setcontact] = useState('');
    const [names, setnames] = useState('');
    const [email, setemail] = useState('');
    const [invalid, setinvalid] = useState(false);
    const [load, setload] = useState(false);
    const [message, setmessage] = useState('');

    const [openCamera, setopenCamera] = useState(false);
    const { theme, dark } = useContext(ThemeContext)

    const handleConfirmPassword = () => {
        if (oldPassword) {
            if (action === "password") {
                setModalPasswordVisible(true);
                setModalComfirmVisible(false)
            }
            else { setModalUsernameVisible(true); setModalComfirmVisible(false) }
        }
        else {
            console.log('====================================');
            console.log("nonsonce!!!!!!!!:)");
            console.log('====================================');
        }
    }

    const signOut = async () => {
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('key');
        navigation.navigate('loginscreen');
    }

    const HandleAlert=()=>{
        Alert.alert('Exiting app', 'You are prompting to exit the application, would you like to proceed?', [
            {
              text: 'No thanks',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'Yes, please', onPress: () => signOut() },
          ]);
    }

    const GetUserData = async () => {
        let token = await SecureStore.getItemAsync('token') || 'null';
        let key = await SecureStore.getItemAsync('key') || 'null';

        // setkey(key);

        axios.get('https://sunstarapi.herokuapp.com/user/'.concat(key)).then((results) => {

            let data = results.data;

            setnames(data.names);
            setemail(data.email);
            setusername(data.username);
            setcontact(data.contact)
            console.log(data.details);
        }).catch((err) => {

            console.log(err + '.');

        });

    }

    const ReAuthenticate = async (values: any) => {

        setload(true);
        let key = await SecureStore.getItemAsync('key') || 'null';

        axios.post('https://sunstarapi.herokuapp.com/login/'.concat(key), values).then((res) => {

            const results = res.data;

            if (results.status == 'Success') {
                setload(false);
                if (action === "password") {
                    setModalPasswordVisible(true);
                    setModalComfirmVisible(false);
                    setinvalid(true);
                    setmessage(results.message)
                }
                else {
                    setModalUsernameVisible(true);
                    setModalComfirmVisible(false);
                    setinvalid(true);
                    setmessage(results.message)
                }


            } else {
                setmessage(results.message);
                setinvalid(true);
                setload(false);
            }

        }).catch((err) => {

            console.log(err + '.');

        });

    }

    const UpdatePassword = async (values: any) => {

        setload(true);
        let key = await SecureStore.getItemAsync('key') || 'null';

        axios.patch('https://sunstarapi.herokuapp.com/user/'.concat(key), values).then((res) => {

            const results = res.data;

            if (results.status == 'Success') {

                setModalPasswordVisible(false);
                setinvalid(true);
                setmessage(results.message);
                setload(false);

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

    const UpdateEmail = async (values: any) => {

        setload(true);
        let key = await SecureStore.getItemAsync('key') || 'null';

        axios.patch('https://sunstarapi.herokuapp.com/user/'.concat(key), values).then((res) => {

            const results = res.data;

            if (results.status == 'Success') {

                setModalPasswordVisible(false);
                setinvalid(true);
                setmessage(results.message);
                setload(false);

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

    const UpdateProfile = async (values: any) => {

        setload(true);
        let key = await SecureStore.getItemAsync('key') || 'null';

        axios.patch('https://sunstarapi.herokuapp.com/user/'.concat(key), values).then((res) => {

            const results = res.data;

            if (results.status == 'Success') {

                setModalPasswordVisible(false);
                setinvalid(true);
                setmessage(results.message);
                setload(false);

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

    
    

    useEffect(() => {
        GetUserData();
    }, [])

    return (
        <View style={[{ backgroundColor: theme.background, height: '100%', width: '100%' }]}>
            <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />


            <ActionBar text='Profile' onBackPress={() => navigation.goBack()} textStyle={[style.lblProfile, { color: theme.text }]} iconBack={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} bottomleftradius={35} backgroundColor={theme.borderAlt} />

            <Text style={[style.lblcenterlined, { fontWeight: 'bold', fontSize: Constance.semi_large, color: theme.text, marginTop: 0 }]}> {names}</Text>
            <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text }]}>{email}</Text>


            <Divider style={{ height: Constance.smallDivider, backgroundColor: theme.borderAlt, marginTop: 5 }} />

            <View style={{ width: '85%', marginHorizontal: 30, backgroundColor: theme.borderAlt, paddingVertical: 20, borderRadius: 12, marginTop: 20 }}>
                <View style={[style.flexContainer, { marginTop: 5 }]}>
                    <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text, width: '40%', textAlign: 'left' }]}> username </Text>
                    <Text style={[style.lblcenterlined, { fontWeight: 'bold', fontSize: Constance.small, color: theme.text }]}> {username} </Text>
                </View>

                <View style={[style.flexContainer, { marginTop: 5 }]}>
                    <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text, width: '40%', textAlign: 'left' }]}> Contact </Text>
                    <Text style={[style.lblcenterlined, { fontWeight: 'bold', fontSize: Constance.small, color: theme.text }]}> {contact} </Text>
                </View>

                <View style={[style.flexContainer, { marginTop: 5 }]}>
                    <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text, width: '40%', textAlign: 'left' }]}> Id </Text>
                    <Text style={[style.lblcenterlined, { fontWeight: 'bold', fontSize: Constance.small, color: theme.text }]}> Account </Text>
                </View>

                <View style={[style.flexContainer, { marginTop: 5 }]}>
                    <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text, width: '40%', textAlign: 'left' }]}> Reservation ID </Text>
                    <Text style={[style.lblcenterlined, { fontWeight: 'bold', fontSize: Constance.small, color: theme.text }]}> Account </Text>
                </View>

                <View style={[{ position: 'absolute', right: 10, marginTop: 10 }]}>
                    <Icon type='material-community' name="pencil" color={theme.text} onPress={() => setModalUpdateVisible(true)} />
                </View>

            </View>

            <Text style={[style.lblProfile, { marginLeft: 20, fontWeight: 'bold', fontSize: Constance.small, color: theme.text, marginTop: 15 }]}> Account </Text>

            <TouchableOpacity onPress={() => { setModalComfirmVisible(true); setaction('password') }} style={{ alignSelf: 'center', width: '85%', borderRadius: 7, marginTop: 8 }}>
                <View>
                    <View style={[style.flexContainer, { justifyContent: 'space-between', height: 50, alignItems: 'center', marginTop: 5 }]}>
                        <View style={[style.flexContainer,]}>
                            <Icon type='ionicon' name='lock-closed' color={theme.text} />
                            <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text }]}> Change password </Text>
                        </View>
                        <Icon type='ionicon' name='chevron-forward' color={theme.text} />
                    </View>
                    <Divider style={{ height: Constance.smallDivider, backgroundColor: theme.borderAlt, }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setModalComfirmVisible(true); setaction('username') }} style={{ alignSelf: 'center', width: '85%', borderRadius: 7, marginTop: 8 }}>
                <View>
                    <View style={[style.flexContainer, { justifyContent: 'space-between', height: 50, alignItems: 'center', marginTop: 5 }]}>
                        <View style={[style.flexContainer,]}>
                            <Icon type='ionicon' name='person-circle' color={theme.text} />
                            <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text }]}> Change username </Text>
                        </View>
                        <Icon type='ionicon' name='chevron-forward' color={theme.text} />
                    </View>
                    <Divider style={{ height: Constance.smallDivider, backgroundColor: theme.borderAlt, }} />
                </View>
            </TouchableOpacity>

            <View style={{ backgroundColor: theme.borderAlt, paddingVertical: 5, alignSelf: 'center', width: '85%', borderRadius: 12, marginTop: 8, position: 'absolute', bottom: 15, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                <TouchableOpacity >
                    <Text style={{ color: theme.text }}>Ts {'&'} Cs</Text>
                </TouchableOpacity>

                <TouchableOpacity >
                    <View>
                        <Icon type='ionicon' name="alert-circle" color={Constance.Yellow} />
                        <Text style={{ color: theme.text }}>About</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={HandleAlert}>
                    <View >
                        <Icon type='ionicon' name="exit-outline" color={Constance.Red} />
                        <Text style={{ color: theme.text }}>Exit</Text>
                    </View>
                </TouchableOpacity>


            </View>


            <View style={{ height: '100%', width: '100%', position: 'absolute' }}>
                {/* bottom sheet models */}
                {/* comfirm password model */}
                <Modal
                    entry="bottom"
                    backdropPressToClose={true}
                    isOpen={modalComfirmVisible}
                    style={[modal.modalBox]}
                    onClosed={() => setModalComfirmVisible(false)}
                >
                    <Formik
                        initialValues={{ password: '' }}
                        onSubmit={(values, action) => {
                            let data = {
                                password: values.password.trim()
                            };
                            ReAuthenticate(data);


                        }}
                        validationSchema={passwordSchema}
                    >
                        {(props) => (
                            <View style={[modal.content, { backgroundColor: theme.background }]}>
                                <View style={[modal.modelContainerChild, { marginVertical: 10 }]}>
                                    <Text style={modal.textStyle}>Enter your recent password</Text>
                                    <Icon type="ionicon" name="close" onPress={() => { setModalComfirmVisible(false) }} />
                                </View>


                                <InputComponent right={<TextInput.Icon name={visiblepassword ? "eye" : "eye-off"} onPress={() => visiblepassword ? setvisiblepassword(false) : setvisiblepassword(true)} />} secured={visiblepassword} left={<TextInput.Icon name="lock" />} hint='Password'
                                    changeText={props.handleChange("password")}
                                    value={props.values.password} />
                                {props.errors.password ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.password} /></Animatable.View> : null}

                                <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginTop: 20, marginBottom: 30 }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Comfirm' press={props.handleSubmit} />


                            </View>
                        )}
                    </Formik>
                </Modal>

                {/* new password model  */}
                <Modal
                    entry="bottom"
                    backdropPressToClose={true}
                    isOpen={modalPasswordVisible}
                    style={[modal.modalBox]}
                    onClosed={() => setModalPasswordVisible(false)}
                >
                    <Formik
                        initialValues={{ password: '', confirmpassword: '' }}
                        onSubmit={(values, action) => {

                            if (values.confirmpassword === values.password) {
                                let data = {
                                    password: values.password.trim()
                                };
                                UpdatePassword(data);
                            }
                            else {
                                setmessage("Password does not match");
                                setinvalid(true);
                            }

                        }}
                        validationSchema={resetPasswordSchema}
                    >
                        {(props) => (
                            <View style={[modal.content, { backgroundColor: theme.background }]}>
                                <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />

                                <View style={modal.modelContainerChild}>
                                    <Text style={modal.textStyle}>Enter your new password</Text>
                                    <Icon type="ionicon" name="close" onPress={() => { setModalPasswordVisible(false) }} />
                                </View>

                                <InputComponent right={<TextInput.Icon name={visiblepassword ? "eye" : "eye-off"} onPress={() => visiblepassword ? setvisiblepassword(false) : setvisiblepassword(true)} />} secured={visiblepassword} left={<TextInput.Icon name="lock" />} hint='Password' changeText={props.handleChange("password")}
                                    value={props.values.password} />
                                <InputComponent right={<TextInput.Icon name={visibleComfirmPassword ? "eye" : "eye-off"} onPress={() => visibleComfirmPassword ? setvisibleComfirmPassword(false) : setvisibleComfirmPassword(true)} />} secured={visibleComfirmPassword} left={<TextInput.Icon name="lock" />} hint='confirm password' changeText={props.handleChange("confirmpassword")}
                                    value={props.values.confirmpassword} />

                                <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginTop: 20, marginBottom: 30 }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Proceed' press={props.handleSubmit} />

                            </View>
                        )}
                    </Formik>
                </Modal>

                {/* new username model */}
                <Modal
                    entry="bottom"
                    backdropPressToClose={true}
                    isOpen={modalUsernameVisible}
                    style={[modal.modalBox]}
                    onClosed={() => setModalUsernameVisible(false)}
                >
                    <Formik
                        initialValues={{ email: '' }}
                        onSubmit={(values, action) => {

                            let data = {
                                email: values.email.trim()
                            };
                            UpdateEmail(data);

                        }}
                        validationSchema={emailSchema}
                    >
                        {(props) => (
                            <View style={[modal.content, { backgroundColor: theme.background }]}>
                                <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />
                                <View style={modal.modelContainerChild}>
                                    <Text style={modal.textStyle}>Enter your new username</Text>
                                    <Icon type="ionicon" name="close" onPress={() => { setModalUsernameVisible(false) }} />
                                </View>


                                <InputComponent left={<TextInput.Icon name="email" />} hint='E-mail' changeText={props.handleChange("email")}
                                    value={props.values.email} />

                                <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginTop: 20, marginBottom: 30 }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Proceed' press={props.handleSubmit} />

                            </View>
                        )}
                    </Formik>
                </Modal>

                {/* update model */}
                <Modal
                    entry="bottom"
                    backdropPressToClose={true}
                    isOpen={modalUpdateVisible}
                    style={modal.modalBox}
                    onClosed={() => setModalUpdateVisible(false)}
                >
                    <Formik
                        initialValues={{ names: names, contact: contact, username: username }}
                        onSubmit={(values, action) => {

                            let data = {
                                names: values.names,
                                username: values.username,
                                contact: values.contact
                            };
                            UpdateProfile(data);

                        }}
                        validationSchema={profileSchema}
                    >
                        {(props) => (
                            <View style={[modal.content, { backgroundColor: theme.background }]}>
                                <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />
                                <View style={modal.modelContainerChild}>
                                    <Text style={modal.textStyle}>Update your profile.</Text>
                                    <Icon type="ionicon" name="close" onPress={() => { setModalUpdateVisible(false) }} />
                                </View>


                                <InputComponent left={<TextInput.Icon name="account" />} hint='Names' changeText={props.handleChange("names")}
                                    value={props.values.names} />
                                <InputComponent left={<TextInput.Icon name="account-box" />} hint='Username' changeText={props.handleChange("username")}
                                    value={props.values.username} />
                                <InputComponent left={<TextInput.Icon name="phone" />} hint='Contact' changeText={props.handleChange("contact")}
                                    value={props.values.contact} />

                                <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginTop: 20, marginBottom: 30 }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Proceed' press={props.handleSubmit} />


                            </View>
                        )}
                    </Formik>
                </Modal>

            </View>



            <View style={[style.image, {
                shadowColor: theme.text,
                top: 25, right: 20,
                position: 'absolute',
            }]} >
                <TouchableOpacity >
                    <Image style={[{ height: 70, width: 70 }]} source={require('../../assets/images/user.png')} />
                    <View style={{ position: 'absolute', right: 5, bottom: 0, backgroundColor: theme.background, height: 25, width: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>
                        <Icon onPress={() => { setopenCamera(true) }} type='ionicon' name='camera' style={{ bottom: 2.5, right: 0.5, height: 16, width: 16 }} color={theme.text} size={18} />
                    </View>
                </TouchableOpacity>
            </View> 
            
            {openCamera ? <View style={{ position: 'absolute', height: '100%', width: '100%' }}>
                <Cam onClose={() => { setopenCamera(false) }} />
            </View> : null}

            

            {/* Snackbar */}
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
    )
}





export default Account
