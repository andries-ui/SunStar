import React, { Component } from 'react'
import { Button } from 'react-native-paper';
import style from '../styles/components/button'

interface props{
  btnstyle:any,
  lblstyle:any,
    text:String,
    mode:any,
    press:any,

}

const ButtonComponent =(props:props)=> {

    const {btnstyle, lblstyle, text, mode, press}=props;

    return (
      <Button mode={mode} onPress={press} style={[style.default, btnstyle]} labelStyle={[style.label, lblstyle ]}>
        {text}
      </Button>
    )
  }

  export default ButtonComponent
