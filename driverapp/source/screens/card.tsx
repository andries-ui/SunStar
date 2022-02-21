import React, { useContext, useState } from 'react'
import { Dimensions, Platform, ScrollView, View } from 'react-native'
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view'
import ActionBar from '../components/actionbar'
import CreditCardComponent from '../components/creditcard'
import style from '../styles/screens/card'
import Constance from '../theme/const'
import {
    PagerTabIndicator,
    IndicatorViewPager,
    PagerTitleIndicator,
    PagerDotIndicator,
} from '@shankarmorwal/rn-viewpager';
import { Divider, Icon, Text } from 'react-native-elements'
import InputComponent from '../components/input'
import { ThemeContext } from '../theme/themeProvider'
import ButtonComponent from '../components/button'
import Modal from "react-native-modalbox";
import modal from '../styles/components/modal';
import { Formik } from 'formik';
import * as yup from 'yup';
import TextComponent from '../components/text';
import * as Animatable from 'react-native-animatable';
import { TextInput } from 'react-native-paper';
import { useRoute } from "@react-navigation/native";

const cardSchema = yup.object({
    names: yup.string().required('Required').min(3)
        .matches(/^(?![\s.]+$)[a-zA-Z\s.]*$/, "Only characters are allowed."),
    cardnumber: yup.string().required('Required').length(16).matches(/^(?:(?<visa>4[0-9]{12}(?:[0-9]{3})?)|(?<mastercard>5[1-5][0-9]{14})|(?<discover>6(?:011|5[0-9]{2})[0-9]{12})|(?<amex>3[47][0-9]{13})|(?<diners>3(?:0[0-5]|[68][0-9])[0-9]{11})|(?<jcb>(?:2131|1800|35[0-9]{3})[0-9]{11}))$/, "Invalid card number"),
    expdate: yup.string().required('Required').matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "invalid date"),
    cvv: yup.string().required('Required').length(4).matches(/[0-9]{4}/, "Invalid pin")
})

const CreditCard = ({ navigation }) => {

    const cards = [
        {
            id: 1,
            name: "Sebola AM",
            cardnumber: "1546 6546 5454 7365",
            expdate: '12/24',
        },
        {
            id: 2,
            name: "Sebola AM",
            cardnumber: "1546 6675 6577 5545",
            expdate: '07/26',
        },
        {
            id: 1,
            name: "Sebola AM",
            cardnumber: "1546 6546 5454 4115",
            expdate: '08/24',
        },
        {
            id: 1,
            name: "Sebola AM",
            cardnumber: "1546 6546 4585 4157",
            expdate: '05/28',
        },

    ];

    const route = useRoute();

    const payment = route.params.payment;
    const [modalComfirmVisible, setModalComfirmVisible] = useState(false);
    const [visiblepassword, setvisiblepassword] = useState(true);
    const [oldPassword, setoldPassword] = useState('');
    const [action, setaction] = useState('');

    const [modalNewCard, setmodalNewCard] = useState(false);
    const [modalUpdateCard, setmodalUpdateCard] = useState(false);
    const [current, setcurrent] = useState<number>(0);

    const { theme } = useContext(ThemeContext);

    const handleConfirmPassword = () => {
 
                navigation.navigate('paidscreen')
              
        
    }

    return (
        <View style={{ backgroundColor: theme.background, height: '100%' }} >
            <ActionBar textStyle={{ color: theme.text, fontSize: Constance.large, fontWeight: 'bold' }} onBackPress={() => navigation.goBack()} backgroundColor={theme.background} text='Cards' iconBack={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingBottom: 30 }}>
                    <View style={{ paddingHorizontal: 30, height: 190, padding: 20, flexWrap: 'nowrap' }}
                    >
                        <PagerView
                            initialPage={0}
                            scrollEnabled
                            pageMargin={10}
                            style={{ paddingHorizontal: 20, height: 190, padding: 20 }}
                            showPageIndicator={true}
                            onPageSelected={(e: PagerViewOnPageSelectedEvent) => {
                                setcurrent(e.nativeEvent.position);
                            }}

                        >
                            {cards.map((card, index) =>

                                <CreditCardComponent key={card.id} names={card.name} cardnumber={card.cardnumber} expdate={card.expdate} />
                            )}
                        </PagerView>
                    </View>

                    <View style={[{ marginTop: 40 }]}>
                        <View style={[style.flexContainer, { width: '85%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, alignItems: 'center', borderRadius: 12, height: 40, marginTop: 10 }]}>
                            <Text style={[{ width: '40%', color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center' }]}>Name on card</Text>
                            <Text style={[{ width: '50%', marginLeft: 10 }]}>{cards[current].name}</Text>
                        </View>
                        <View style={[style.flexContainer, { width: '85%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, alignItems: 'center', borderRadius: 12, height: 40, marginTop: 10 }]}>
                            <Text style={[{ width: '40%', color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>Cardnumber</Text>
                            <Text style={[{ width: '50%', marginLeft: 10 }]}>{cards[current].cardnumber}</Text>
                        </View>

                        <View style={[style.flexContainer, { alignItems: 'center', borderRadius: 12, height: 40, justifyContent: 'space-around', marginTop: 10 }]}>
                            <View style={[style.flexContainer, { width: '47%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40, alignItems: 'center' }]}>
                                <Text style={[{ color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>EXP date</Text>
                                <Text style={[{ width: 110, marginLeft: 10 }]}>{cards[current].expdate}21</Text>
                            </View>
                            <View style={[style.flexContainer, { width: '30%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40, alignItems: 'center' }]}>
                                <Text style={[{ color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>CVV</Text>
                                <Text style={[{ width: 40, marginLeft: 10 }]}> **** </Text>
                            </View>
                        </View>

                        <View style={[style.flexContainer, { alignItems: 'center', borderRadius: 12, height: 40, justifyContent: 'space-around', marginTop: 10, marginHorizontal: 15 }]}>

                            <ButtonComponent press={() => { setmodalNewCard(true) }} lblstyle={{ color: theme.text }} mode={'text'} text={'New '} btnstyle={{ width: '40%', borderColor: Constance.Blue, borderWidth: 1, borderRadius: 7, height: 40, }} />

                            <ButtonComponent press={() => { setmodalUpdateCard(true) }} lblstyle={{ color: theme.text }} mode={'text'} text={'Update'} btnstyle={{ backgroundColor: Constance.Blue, width: '40%', borderColor: theme.borderAlt, borderWidth: 1, borderRadius: 7, height: 40 }} />

                        </View>
                    </View>

                   { payment ? <View style={{ marginHorizontal: 20, height: 80 }}>
                        <ButtonComponent press={() => { setModalComfirmVisible(true) }} lblstyle={{ color: theme.text }} mode={''} text={'Make payment'} btnstyle={{ width: '100%', marginTop: 40, backgroundColor: Constance.Blue, borderColor: theme.borderAlt, borderWidth: 1, borderRadius: 7, height: 40, alignItems: 'center', }} />
                    </View> :null}
                </View>
            </ScrollView>


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
                    <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />
                    <View style={[modal.modelContainerChild, { marginVertical: 10 }]}>
                        <Text style={modal.textStyle}>Enter your recent password</Text>
                        <Icon type="ionicon" name="close" onPress={() => { setModalComfirmVisible(false) }} />
                    </View>


                    <InputComponent style={{ marginTop: 15 }} right={<TextInput.Icon name={visiblepassword ? "eye" : "eye-off"} onPress={() => visiblepassword ? setvisiblepassword(false) : setvisiblepassword(true)} />} secured={visiblepassword} left={<TextInput.Icon name="lock" />} hint='Password' changeText={(e: any) => setoldPassword(e)} value={oldPassword} />
                   
                        <ButtonComponent mode='contained' btnstyle={{ backgroundColor: Constance.Yellow, marginTop: 20, marginBottom: 30 }} lblstyle={{ color: Constance.White, textTransform: 'capitalize' }} text='Proceed' press={handleConfirmPassword} />
                     

                </View>
            </Modal>

            {/* new card model  */}
            <Modal
                entry="bottom"
                backdropPressToClose={true}
                isOpen={modalNewCard}
                style={[modal.modalBox]}
                onClosed={() => setmodalNewCard(false)}
            >
                <View style={[modal.content, { backgroundColor: theme.background }]}>

                    <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />
                    <View style={modal.modelContainerChild}>
                        <Text style={modal.textStyle}>Add new card</Text>
                        <Icon type="ionicon" name="close" onPress={() => { setmodalNewCard(false) }} />
                    </View>

                    <Formik initialValues={{ names: '', cardnumber: '', expdate: '', cvv: '' }}
                        onSubmit={(values, action) => {

                        }}
                        validationSchema={cardSchema}
                    >
                        {(props) => (
                            <View style={[{ marginTop: 0 }]}>
                                <View style={[style.flexContainer, { width: '100%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, alignItems: 'center', borderRadius: 12, height: 40, marginTop: 10 }]}>
                                    <Text style={[{ width: '40%', color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center' }]}>Name on card</Text>
                                    <View style={{ height: 40, left: 5, width: '58%' }}>
                                        <InputComponent hint='Names on card' changeText={props.handleChange("names")}
                                            value={props.values.names} style={{ height: 40, left: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderRadius: 12 }} />

                                    </View>
                                </View>
                                {props.errors.names || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.names} /></Animatable.View> : null}

                                <View style={[style.flexContainer, { width: '100%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, alignItems: 'center', borderRadius: 12, height: 40, marginTop: 10 }]}>
                                    <Text style={[{ width: '40%', color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>Cardnumber</Text>
                                    <View style={{ height: 40, left: 5, width: '58%' }}>
                                        <InputComponent hint='Card number' changeText={props.handleChange("cardnumber")}
                                            value={props.values.cardnumber} style={{ height: 40, left: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderRadius: 12 }} />
                                    </View>
                                </View>
                                {props.errors.cardnumber || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.cardnumber} /></Animatable.View> : null}

                                <View style={[style.flexContainer, { alignItems: 'center', borderRadius: 12, height: 40, justifyContent: 'space-around', marginTop: 10 }]}>

                                    <View style={[{ width: '59%', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40 }]}>
                                        <View style={[style.flexContainer, { width: '100%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40, alignItems: 'center' }]}>
                                            <Text style={[{ color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>EXP date</Text>
                                            <View style={{ height: 40, left: 5, width: '58%' }}>
                                                <InputComponent hint='12/2026' changeText={props.handleChange("expdate")}
                                                    value={props.values.expdate.length === 2 ? props.values.expdate + "/" : props.values.expdate} style={{ height: 40, left: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderRadius: 12 }} />

                                            </View>

                                        </View>
                                        {props.errors.expdate || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.expdate} /></Animatable.View> : null}

                                    </View>

                                    <View style={[{ width: '39%', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40 }]}>
                                        <View style={[style.flexContainer, { width: '100%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40, alignItems: 'center' }]}>
                                            <Text style={[{ color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>CVV</Text>

                                            <View style={{ height: 40, left: 5, width: '58%' }}>
                                                <InputComponent hint='1234' changeText={props.handleChange("cvv")}
                                                    value={props.values.cvv} style={{ height: 40, left: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderRadius: 12 }} />

                                            </View>
                                        </View>
                                        {props.errors.cvv || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.cvv} /></Animatable.View> : null}

                                    </View>

                                </View>

                                <ButtonComponent press={() => { }} lblstyle={{ color: theme.text }} mode={''} text={'Update'} btnstyle={{ width: '100%', marginTop: 40, backgroundColor: Constance.Blue, borderColor: theme.borderAlt, borderWidth: 1, borderRadius: 7, height: 40, alignItems: 'center' }} />

                            </View>
                        )}
                    </Formik>

                </View>
            </Modal>

            {/* Update card model  */}
            <Modal
                entry="bottom"
                backdropPressToClose={true}
                isOpen={modalUpdateCard}
                style={[modal.modalBox]}
                onClosed={() => setmodalUpdateCard(false)}
            >
                <View style={[modal.content, { backgroundColor: theme.background }]}>

                    <Divider style={{ borderRadius: 12, height: Constance.largeDivider, width: 100, backgroundColor: theme.borderAlt, alignSelf: 'center' }} />
                    <View style={modal.modelContainerChild}>
                        <Text style={modal.textStyle}>Update card</Text>
                        <Icon type="ionicon" name="close" onPress={() => { setmodalUpdateCard(false) }} />
                    </View>

                    <Formik initialValues={{ names: '', cardnumber: '', expdate: '', cvv: '' }}
                        onSubmit={(values, action) => {

                        }}
                        validationSchema={cardSchema}
                    >
                        {(props) => (
                            <View style={[{ marginTop: 0 }]}>
                                <View style={[style.flexContainer, { width: '100%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, alignItems: 'center', borderRadius: 12, height: 40, marginTop: 10 }]}>
                                    <Text style={[{ width: '40%', color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center' }]}>Name on card</Text>
                                    <View style={{ height: 40, left: 5, width: '58%' }}>
                                        <InputComponent hint='Names on card' changeText={props.handleChange("names")}
                                            value={props.values.names} style={{ height: 40, left: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderRadius: 12 }} />

                                    </View>
                                </View>
                                {props.errors.names || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.names} /></Animatable.View> : null}

                                <View style={[style.flexContainer, { width: '100%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, alignItems: 'center', borderRadius: 12, height: 40, marginTop: 10 }]}>
                                    <Text style={[{ width: '40%', color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>Cardnumber</Text>
                                    <View style={{ height: 40, left: 5, width: '58%' }}>
                                        <InputComponent hint='Card number' changeText={props.handleChange("cardnumber")}
                                            value={props.values.cardnumber} style={{ height: 40, left: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderRadius: 12 }} />
                                    </View>
                                </View>
                                {props.errors.cardnumber || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.cardnumber} /></Animatable.View> : null}

                                <View style={[style.flexContainer, { alignItems: 'center', borderRadius: 12, height: 40, justifyContent: 'space-around', marginTop: 10 }]}>

                                    <View style={[{ width: '59%', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40 }]}>
                                        <View style={[style.flexContainer, { width: '100%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40, alignItems: 'center' }]}>
                                            <Text style={[{ color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>EXP date</Text>
                                            <View style={{ height: 40, left: 5, width: '58%' }}>
                                                <InputComponent hint='12/2026' changeText={props.handleChange("expdate")}
                                                    value={props.values.expdate.length === 2 ? props.values.expdate + "/" : props.values.expdate} style={{ height: 40, left: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderRadius: 12 }} />

                                            </View>

                                        </View>
                                        {props.errors.expdate || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.expdate} /></Animatable.View> : null}

                                    </View>

                                    <View style={[{ width: '39%', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40 }]}>
                                        <View style={[style.flexContainer, { width: '100%', alignSelf: 'center', backgroundColor: theme.backgroundAlt, borderRadius: 12, height: 40, alignItems: 'center' }]}>
                                            <Text style={[{ color: theme.text, backgroundColor: theme.borderAlt, borderRadius: 10, height: 35, textAlign: 'center', textAlignVertical: 'center', padding: 5 }]}>CVV</Text>

                                            <View style={{ height: 40, left: 5, width: '58%' }}>
                                                <InputComponent hint='1234' changeText={props.handleChange("cvv")}
                                                    value={props.values.cvv} style={{ height: 40, left: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderRadius: 12 }} />

                                            </View>
                                        </View>
                                        {props.errors.cvv || null ? <Animatable.View animation="pulse" easing="ease-out"><TextComponent style={{ color: Constance.Red }} text={props.errors.cvv} /></Animatable.View> : null}

                                    </View>

                                </View>

                                <ButtonComponent press={() => { }} lblstyle={{ color: theme.text }} mode={''} text={'Update'} btnstyle={{ width: '100%', marginTop: 40, backgroundColor: Constance.Blue, borderColor: theme.borderAlt, borderWidth: 1, borderRadius: 7, height: 40, alignItems: 'center' }} />

                            </View>
                        )}
                    </Formik>




                </View>
            </Modal>
        </View>
    )
}

export default CreditCard
