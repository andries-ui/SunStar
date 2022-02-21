import React from 'react'
import { TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-paper';
import inputstyle from '../styles/components/input'

interface props{
hint?:string,
left?:any,
right?:any,
style?:any,
changeText?:any,
value?:string,
secured?:any,
editable?:any,
press?:any
}

const InputComponent=(props:props)=> {

    const {hint, left, right, style, changeText,value,secured,editable,press} = props

    return (
       <TextInput
      secureTextEntry={secured}
      placeholder={hint}
      left={left}
      right={right}
      style={[style, inputstyle.parent]}
      onChangeText={changeText}
      value={value}
      editable={editable}  
      />
    )
  }

  export default InputComponent;
