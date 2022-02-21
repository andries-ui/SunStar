import React from 'react';
import LottieView from 'lottie-react-native';

const Progress=()=> {
    return( <LottieView 
      source={require('../../assets/lottie/43400-progress-indicator.json')}
       autoPlay 
       loop 
       style={{height:30, width: 30}} 
       autoSize
       speed={2.5}/>)
  }
  export default  Progress