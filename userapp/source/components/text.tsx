import React from 'react'
import { Text } from 'react-native-elements';
import textStyle from '../styles/components/text'

interface props{
    style:any,
    text:String,
    press?:any
}

const TextComponent=( props:props)=>{
  const {style, text, press} = props

    return (
      <Text style={[textStyle.text ,style,{paddingHorizontal:3}]}  onPress={press}>
        {text}
      </Text>
    )
  }

  export default TextComponent
