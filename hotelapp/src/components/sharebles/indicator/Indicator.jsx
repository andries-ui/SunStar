import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export default function Indicator() {

    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../../assets/lottiefiles/93461-loading.json'),
        })
    }, [])


    return (
 
        <div className='indicator' ref={container}></div>
  
    )
}
