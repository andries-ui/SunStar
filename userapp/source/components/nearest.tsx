import React, { Component } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import { Icon, Image } from 'react-native-elements';
import Constance from '../theme/const';
import TextComponent from './text';


interface props{
    key:any,
    image:any,
    name:any,
    address:any,
    price:any,
    press:any,
    ratings:any,
    
}

const NearestItemComponent = (props:props) => {

    const width = Dimensions.get('window').width;
    const {key, image, name, address, price, press, ratings} = props;
    return (
        <TouchableOpacity  onPress={press}>
        <View style={{ width:width, height: 190, borderRadius: 12, paddingHorizontal: 20, marginVertical: 10 }}>
            <Image style={{ height: 190, borderRadius: 12 }} source={image} resizeMode='cover' />

            <View style={{ height: 60, backgroundColor: Constance.Black, position: 'absolute', width: '100%', bottom: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 , alignSelf:'center', left:20, opacity:0.8}}>
            </View>
            <View style={{paddingHorizontal: 5, height: 60, position: 'absolute', width: '100%', bottom: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12,left:20 }}>
                <TextComponent text={name} style={{ fontSize: Constance.semi_large, color: Constance.White, fontWeight: 'bold' }} />

                <View style={{  flexDirection: 'row', justifyContent: 'space-between', marginVertical:5}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center'  }}>
                        <Icon type='ionicon' name='location' color={Constance.White} size={16}/>
                         <TextComponent text={address} style={{ fontSize: Constance.small, color: Constance.White, fontWeight: '900' }} />
                    </View>
                    <TextComponent text={'R ' + price + ' /N'} style={{ fontSize: Constance.small, color: Constance.White, fontWeight: '900' }} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', position:'absolute',right:25,top:5 ,alignItems:'center'}}>
                        <Icon type='ionicon' name='star' color={Constance.Gold} size={20}/>
                         <TextComponent text={ratings} style={{ marginHorizontal:5, fontSize: Constance.small, color: Constance.Black, fontWeight: 'bold' }} />
                    </View>
        </View>
        </TouchableOpacity>
    )
}
export default NearestItemComponent;
