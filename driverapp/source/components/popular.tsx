import React, { Component, useContext } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import { Icon, Image } from 'react-native-elements';
import Constance from '../theme/const';
import { ThemeContext } from '../theme/themeProvider';
import TextComponent from './text';


interface props {
    key: any,
    image: any,
    name: any,
    address: any,
    price: any,
    press: any,
    ratings: any,

}

const PopularItemComponent = (props: props) => {

    const {theme} = useContext(ThemeContext)
    const width = Dimensions.get('window').width;
    const { key, image, name, address, price, press, ratings } = props;
    return (
        <TouchableOpacity onPress={press}>
            <View style={{ width: width, height: 80, borderRadius: 12, paddingHorizontal: 20, marginVertical: 10, flexDirection: 'row' }}>
                <Image style={{ height: 80, width: 80, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }} source={image} resizeMode='cover' />
                <View style={{paddingHorizontal:5, backgroundColor:theme.backgroundAlt, width:width - 120, borderTopRightRadius:12, borderBottomRightRadius:12}}>
                    <TextComponent text={name} style={{ fontSize: Constance.semi_large, color: theme.text, fontWeight: 'bold' }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Icon type='ionicon' name='location' color={theme.text} size={16} />
                        <TextComponent text={address} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '900' }} />
                    </View>

                    <View style={{  flexDirection: 'row', justifyContent: 'space-between', marginVertical:5}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center'  }}>
                        <Icon type='ionicon' name='star' color={theme.gold} size={16}/>
                         <TextComponent text={ratings} style={{ fontSize: Constance.small, color:theme.text, fontWeight: '900' }} />
                    </View>
                    <TextComponent text={'R ' + price + ' /N'} style={{ fontSize: Constance.small, color: theme.text, fontWeight: 'bold' }} />
                </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}
export default PopularItemComponent;
