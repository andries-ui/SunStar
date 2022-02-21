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

const PlaceItemComponent = (props: props) => {

    const { theme } = useContext(ThemeContext)
    const { key, image, name, address, price, press, ratings } = props;
    return (
        <TouchableOpacity onPress={press} style={{ marginBottom: 7, borderColor: theme.border, borderWidth: 1 }}>
            <View style={{ backgroundColor: theme.background, width: '100%', height: 80, borderRadius: 12, flexDirection: 'row', }}>
                <View style={{ paddingHorizontal: 5, width: '100%', backgroundColor: theme.backgroundAlt, borderTopRightRadius: 12, borderBottomRightRadius: 12 }}>
                    <TextComponent text={name} style={{ fontSize: Constance.semi_large, color: theme.text, fontWeight: 'bold' }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <TextComponent text={address} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '900' }} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <TextComponent text={ratings} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '900' }} />
                        </View>
                        <TextComponent text={price} style={{ fontSize: Constance.small, color: theme.text, fontWeight: 'bold' }} />
                    </View>
                </View>
                <Icon type="material-community" name="chevron-right" size={36} color={theme.text} style={{right:10}} />

            </View>
        </TouchableOpacity>
    )
}
export default PlaceItemComponent;
