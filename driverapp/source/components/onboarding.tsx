import React, { Component } from 'react'
import { View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import Constance from '../theme/const';
import Anim from './anim';

interface props {
     json: any,
     caption: String,
     style:any,
     loop?:any
}

const Bording = (props: props) => {
     const { json, caption, style , loop} = props;
     return (
          <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, height: 260, borderRadius: 12 }}>

               <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', padding: 10, position: 'absolute' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                         <Anim json={json} autoplay={true} autosize={true} loop={loop} speed={1} style={{ height: '90%', width: '90%' }} />
                    </View>
                    <Text style={[{ bottom:20, color: Constance.light_text, fontSize: Constance.medium, fontWeight: '900', textAlign: 'center', marginHorizontal: 40, marginVertical: 10 }, style]}>{caption}</Text>
               </View>

          </View>
     )
}

export default Bording;