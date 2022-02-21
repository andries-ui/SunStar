import React, { Component, useContext, useState } from 'react'
import { Platform, ScrollView, StatusBar, TouchableHighlight, View } from 'react-native';
import { Divider, Icon, Image, Text } from 'react-native-elements';
import ActionBar from '../components/actionbar';
import style from '../styles/screens/profile';
import Constance from '../theme/const';
import { ThemeContext } from '../theme/themeProvider';
import Modal from "react-native-modalbox";
import ButtonComponent from '../components/button';
import InputComponent from '../components/input';
import { TextInput } from 'react-native-paper';
import modal from '../styles/components/modal';

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

    const { theme, dark } = useContext(ThemeContext)

    const handleConfirmPassword = () => {
        if (oldPassword) {
            if (action === "password") {
                setModalPasswordVisible(true);
                setModalComfirmVisible(false)
            }
            else { setModalUsernameVisible(true); setModalComfirmVisible(false) }
        } else {
            console.log('====================================');
            console.log("nonsonce!!!!!!!!:)");
            console.log('====================================');
        }
    }

    return (
        <View style={[{ backgroundColor: theme.background, height: '100%', width: '100%' }]}>
            <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
            <ActionBar text='Profile' onBackPress={() => navigation.goBack()} textStyle={[style.lblProfile, { color: theme.text }]} iconBack={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} bottomleftradius={35} backgroundColor={theme.borderAlt} />
            <View style={[style.image, {
                shadowColor: theme.text,
                top: 25, right: 20,
                alignSelf: 'flex-end',
            }]}>
                <Image style={[{ height: 70, width: 70 }]} source={require('../../assets/images/user.png')} />
            </View>
            <Text style={[style.lblcenterlined, { fontWeight: 'bold', fontSize: Constance.semi_large, color: theme.text, marginTop: 0 }]}> Andries sebola</Text>
            <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text }]}> andries@gmail.com</Text>

            <Divider style={{ height: Constance.smallDivider, backgroundColor: theme.borderAlt, marginTop: 5 }} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{ width: '85%', marginHorizontal: 30, backgroundColor: theme.borderAlt, paddingVertical: 20, borderRadius: 12, marginTop: 20 }}>
                        <View style={[style.flexContainer, { marginTop: 5 }]}>
                            <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text, width: '40%', textAlign: 'left' }]}> username </Text>
                            <Text style={[style.lblcenterlined, { fontWeight: 'bold', fontSize: Constance.small, color: theme.text }]}> Account </Text>
                        </View>

                        <View style={[style.flexContainer, { marginTop: 5 }]}>
                            <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text, width: '40%', textAlign: 'left' }]}> Contact </Text>
                            <Text style={[style.lblcenterlined, { fontWeight: 'bold', fontSize: Constance.small, color: theme.text }]}> Account </Text>
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

                    <View style={{ width: '85%', marginHorizontal: 30, backgroundColor: theme.borderAlt, paddingVertical: 20, borderRadius: 12, marginTop: 20 }}>
                        <View style={[style.flexContainer, { marginTop: 5 }]}>
                            <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text, width: '40%', textAlign: 'left' }]}> username </Text>
                            <Text style={[style.lblcenterlined, { fontWeight: 'bold', fontSize: Constance.small, color: theme.text }]}> Account </Text>
                        </View>

                        <View style={[style.flexContainer, { marginTop: 5 }]}>
                            <Text style={[style.lblcenterlined, { fontWeight: '100', fontSize: Constance.small, color: theme.text, width: '40%', textAlign: 'left' }]}> Contact </Text>
                            <Text style={[style.lblcenterlined, { fontWeight: 'bold', fontSize: Constance.small, color: theme.text }]}> Account </Text>
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

                    <TouchableHighlight onPress={() => { setModalComfirmVisible(true); setaction('password') }} style={{ alignSelf: 'center', width: '85%', borderRadius: 7, marginTop: 8 }}>
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
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => { setModalComfirmVisible(true); setaction('username') }} style={{ alignSelf: 'center', width: '85%', borderRadius: 7, marginTop: 8 }}>
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
                    </TouchableHighlight>

                </View>

            </ScrollView>
            <View style={{ backgroundColor: theme.borderAlt, paddingVertical: 5, alignSelf: 'center', width: '85%', borderRadius: 12, marginTop: 8, position: 'absolute', bottom: 15, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Text style={{ color: theme.text }}>Ts  Cs</Text>
                <View>
                    <Icon type='ionicon' name="alert-circle" color={Constance.Yellow} />
                    <Text style={{ color: theme.text }}>About</Text>
                </View>
                <View >
                    <Icon type='ionicon' name="exit-outline" color={Constance.Red} />
                    <Text style={{ color: theme.text }}>Exit</Text>
                </View>
            </View>

            {/* bottom sheet models */}
            {/* comfirm password model */}
            <Modal
                entry="bottom"
                backdropPressToClose={true}
                isOpen={modalComfirmVisible}
                style={[modal.modalBox]}
                onClosed={() => setModalComfirmVisible(false)}
            >
                <View style={[modal.content, { backgroundColor: theme.background }]}>
                    <View style={[modal.modelContainerChild, { marginVertical: 10 }]}>
                        <Text style={modal.textStyle}>Enter your recent password</Text>
                        <Icon type="ionicon" name="close" onPress={() => { setModalComfirmVisible(false) }} />
                    </View>


                    <InputComponent right={<TextInput.Icon name={visiblepassword ? "eye" : "eye-off"} onPress={() => visiblepassword ? setvisiblepassword(false) : setvisiblepassword(true)} />} secured={visiblepassword} left={<TextInput.Icon name="lock" />} hint='Password' changeText={(e: any) => setoldPassword(e)} value={oldPassword} />

                    <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginTop: 20, marginBottom: 30 }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Comfirm' press={handleConfirmPassword} />


                </View>
            </Modal>

            {/* new password model  */}
            <Modal
                entry="bottom"
                backdropPressToClose={true}
                isOpen={modalPasswordVisible}
                style={[modal.modalBox, { backgroundColor: theme.border }]}
                onClosed={() => setModalPasswordVisible(false)}
            >
                <View style={[modal.content, { backgroundColor: theme.background }]}>
                    <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />

                    <View style={modal.modelContainerChild}>
                        <Text style={modal.textStyle}>Enter your new password</Text>
                        <Icon type="ionicon" name="close" onPress={() => { setModalPasswordVisible(false) }} />
                    </View>


                    <InputComponent right={<TextInput.Icon name={visiblepassword ? "eye" : "eye-off"} onPress={() => visiblepassword ? setvisiblepassword(false) : setvisiblepassword(true)} />} secured={visiblepassword} left={<TextInput.Icon name="lock" />} hint='Password' changeText={(e: any) => setoldPassword(e)} value={oldPassword} />
                    <InputComponent right={<TextInput.Icon name={visibleComfirmPassword ? "eye" : "eye-off"} onPress={() => visibleComfirmPassword ? setvisibleComfirmPassword(false) : setvisibleComfirmPassword(true)} />} secured={visiblepassword} left={<TextInput.Icon name="lock" />} hint='Password' changeText={(e: any) => setoldPassword(e)} value={oldPassword} />

                    <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginTop: 20, marginBottom: 30 }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Proceed' press={handleConfirmPassword} />


                </View>
            </Modal>

            {/* new username model */}
            <Modal
                entry="bottom"
                backdropPressToClose={true}
                isOpen={modalUsernameVisible}
                style={[modal.modalBox, { backgroundColor: theme.border }]}
                onClosed={() => setModalUsernameVisible(false)}
            >
                <View style={[modal.content, { backgroundColor: theme.background }]}>
                    <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />
                    <View style={modal.modelContainerChild}>
                        <Text style={modal.textStyle}>Enter your new username</Text>
                        <Icon type="ionicon" name="close" onPress={() => { setModalUsernameVisible(false) }} />
                    </View>


                    <InputComponent left={<TextInput.Icon name="account-box" />} hint='E-mail' changeText={(e: any) => setoldPassword(e)} value={oldPassword} />

                    <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginTop: 20, marginBottom: 30 }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Proceed' press={() => { }} />


                </View>
            </Modal>

            {/* update model */}
            <Modal
                entry="bottom"
                backdropPressToClose={true}
                isOpen={modalUpdateVisible}
                style={modal.modalBox}
                onClosed={() => setModalUpdateVisible(false)}
            >
                <View style={[modal.content, { backgroundColor: theme.background }]}>
                    <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />
                    <View style={modal.modelContainerChild}>
                        <Text style={modal.textStyle}>Update your profile.</Text>
                        <Icon type="ionicon" name="close" onPress={() => { setModalUpdateVisible(false) }} />
                    </View>


                    <InputComponent left={<TextInput.Icon name="account-box" />} hint='Names' changeText={(e: any) => setoldPassword(e)} value={oldPassword} />
                    <InputComponent left={<TextInput.Icon name="phone" />} hint='Contact' changeText={(e: any) => setoldPassword(e)} value={oldPassword} />

                    <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginTop: 20, marginBottom: 30 }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Proceed' press={() => { }} />


                </View>
            </Modal>
        </View>
    )
}





export default Account
