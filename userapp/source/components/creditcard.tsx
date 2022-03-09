import React, { useContext } from 'react'
import { ImageBackground, View } from 'react-native'
import { Image, Text } from 'react-native-elements'
import style from '../styles/components/creditcard'
import Constance from '../theme/const'
import { ThemeContext } from '../theme/themeProvider'

interface props {
    key: any,
    names: any,
    cardnumber: any,
    expdate: any,
    press?: any,
}
const CreditCardComponent = (props: props) => {

    const { theme } = useContext(ThemeContext)
    const { key, names, cardnumber, expdate, press } = props;

    return (

            <Image style={style.parent} source={require('../../assets/images/card.png')} resizeMode='center'>
                <View  style={[style.details]}>
                <Text style={[style.cardnumber, { color: Constance.White, marginTop: 10, left:60 }]}>{cardnumber}</Text>

                <Text style={[style.names, { color: Constance.White ,top:10}]}>{names}</Text>
                
                <View style={style.container}>

                    <View style={style.image}>
                        <Image resizeMode='center' style={style.image} source={require('../../assets/images/visa.png')} />
                    </View>
                    <Text style={[style.master, { color: Constance.White }]}>master card</Text>
                </View>

                <Text style={[style.expdate, { color: Constance.White }]}>EXP <Text style={[style.date, { color: Constance.White }]}>{expdate}</Text></Text>
                </View>
            </Image >
    )
}

export default CreditCardComponent
