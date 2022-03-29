import React from 'react'
import { TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-paper';
import inputstyle from '../styles/components/input'

interface props {
  hint?: string,
  left?: any,
  right?: any,
  style?: any,
  changeText?: any,
  value?: string,
  secured?: any,
  editable?: any,
  press?: any,
  keyboard?: any
}

const InputComponent = (props: props) => {

  const { hint, left, right, style, changeText, value, secured, editable, press, keyboard } = props

  
  return (
    <TextInput
      secureTextEntry={secured}
      placeholder={hint}
      left={left}
      right={right}
      keyboardType={keyboard}
      style={[style, inputstyle.parent]}
      onChangeText={changeText}
      value={value}
      editable={editable}
    />
  )
}

export default InputComponent;
