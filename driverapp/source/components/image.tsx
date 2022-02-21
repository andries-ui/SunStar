import React, { Component } from 'react'
import { Dimensions, View } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import Constance from '../theme/const';
import TextComponent from './text';

interface props {
    image: any,
    text?: any,
    key?: any,
    press?: any
}
const ImageComponent = (props: props) => {

    const width = Dimensions.get('window').width;
    const { image, text, key, press } = props;
    return (
        <View style={{ width:width, height: 190, borderRadius: 12, paddingHorizontal:10, marginVertical: 10 }}>


            <Image style={{ height: 190, borderRadius: 9 }} source={image} resizeMode='cover' />

            {text ?
                <View>
                    <View style={{ height: 50, backgroundColor: Constance.Black, position: 'absolute', width: '100%', bottom: 0, borderBottomLeftRadius: 9, borderBottomRightRadius: 9, alignSelf: 'center', left: 0, opacity: 0.8 }}>
                    </View>
                    <View style={{ paddingHorizontal: 5, height: 60, position: 'absolute', width: '100%', bottom: 0, justifyContent:'center', borderBottomLeftRadius: 9, borderBottomRightRadius: 9, left: 0 }}>
                        <TextComponent text={text} style={{ fontSize: Constance.semi_large, color: Constance.White, fontWeight: 'bold' }} />
                    </View>
                </View> : null}
        </View>
    )
}

export default ImageComponent;
