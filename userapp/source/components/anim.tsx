import React from 'react';
import LottieView from 'lottie-react-native';

interface props{
  json?:any,
  loop?:any,
  autoplay?:any,
  autosize?:any,
  speed?:any,
  style?:any

}
const Anim=(props:props)=> {
  const {
    json,
    loop,
    autoplay,
    autosize,
    speed,
    style
  } = props;


    return( <LottieView 
      source={json}
       autoPlay={autoplay} 
       loop={loop} 
       style={[style]} 
       autoSize={autosize}
       speed={speed}
       resizeMode='cover'/>)
  }
  export default  Anim