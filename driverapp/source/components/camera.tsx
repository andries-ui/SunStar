import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Camera from 'expo-camera';
import Constance from '../theme/const';
import { Icon } from 'react-native-elements';
import { ThemeContext } from '../theme/themeProvider';
import * as ImagePicker from 'expo-image-picker';


interface props {
  onClose: any
}

const Cam = (props: props) => {

  const { onClose } = props;

  let cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState('');
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [err, seterr] = useState('');
  const { theme, dark } = useContext(ThemeContext);
  const [captureColor, setcaptureColor] = useState(Constance.White);
  const [rotatoColor, setrotatoColor] = useState(Constance.White);
  const [gallery, setgallery] = useState(Constance.White);
  const [flesh, setflesh] = useState(false);
  const [autofocus, setautofocus] = useState(0);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isPreview, setIsPreview] = useState(false);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }

  const starWarching = async () => {
    try {


      await Camera.requestCameraPermissionsAsync();
      await ImagePicker.requestMediaLibraryPermissionsAsync();

      const { status } = await Camera.Camera.requestCameraPermissionsAsync();

      setHasPermission(status)
    } catch (err: any) {
      seterr(err)
    }
  }

  const fleshLight = async () => {

    flesh ? setflesh(false) : setflesh(true);
  }

  const onCameraReady = () => {
    setIsCameraReady(true);
  };


  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;
  
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
      }

    }

      console.log(cameraRef);
    
    
  };
  

  useEffect(() => {
    starWarching();
  }, [])
 
  if (hasPermission === '') {
    return <Text>No access to camera</Text>;
  }
  if (hasPermission === 'not granted') {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera.Camera ref={cameraRef.current} onCameraReady={onCameraReady} style={styles.camera} type={type} flashMode={flesh ? 2 : 0} autoFocus={autofocus} focusDepth={1} onMagicTap={() => { setautofocus(3) }} pictureSize='1200*1200' >



        {/* =================================Preview================================= */}

        {isPreview && (
          <View style={{ height: 40, width: 40, borderRadius: 7, position: 'absolute', right: 5, top: 15, flexDirection: 'row' }}>

            <Icon type='material-community' name='close' onPress={cancelPreview} color={Constance.Green} size={30} style={{ position: 'absolute', bottom: 10 }} onPressIn={() => { setgallery(Constance.Red) }} onPressOut={() => { setgallery(Constance.White) }} />
          </View>
        )}


        {!isPreview && (
          <View style={{height:'100%', width:'100%'}} >

            <View style={{ height: 40, width: 40, borderRadius: 7, position: 'absolute', right: 5, top: 15, flexDirection: 'row' }}>

              <Icon type='material-community' name='close' onPress={onClose} color={gallery} size={30} style={{ position: 'absolute', bottom: 10 }} onPressIn={() => { setgallery(Constance.Red) }} onPressOut={() => { setgallery(Constance.White) }} />
            </View>

            <View style={{ height: 40, width: 40, borderRadius: 7, position: 'absolute', bottom: 90, alignSelf: 'center' }}>
              <Icon type='material-community' name={flesh ? 'flashlight-off' : 'flashlight'} onPress={fleshLight} color={gallery} size={30} style={{ position: 'absolute', bottom: 10 }} onPressIn={() => { setgallery(Constance.Red) }} onPressOut={() => { setgallery(Constance.White) }} />
            </View>


            <View  style={styles.buttonContainer}>

              <Icon type='material-community' name='folder-multiple-image' onPress={pickImage} color={gallery} size={30} style={{ position: 'absolute', bottom: 10 }} onPressIn={() => { setgallery(Constance.Red) }} onPressOut={() => { setgallery(Constance.White) }} />


              <Icon type='feather' name='aperture' onPress={onSnap} color={captureColor} size={50} style={{ position: 'absolute', bottom: 10 }} onPressIn={() => { setcaptureColor(Constance.Red) }} onPressOut={() => { setcaptureColor(Constance.White) }} />

              <Icon disabled={!isCameraReady} type='material-community' name='rotate-3d-variant' onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }} color={rotatoColor} size={30} style={{ position: 'absolute', bottom: 10 }} onPressIn={() => { setrotatoColor(Constance.Red) }} onPressOut={() => { setrotatoColor(Constance.White) }} />

            </View>
          </View>
        )}
        {/* =================================Preview================================= */}



      </Camera.Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Constance.GoldDark
  },
  camera: {
    height: '100%',
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 15,
    bottom: 20,
    position: 'absolute',
  },
  content: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',

  },
  button: {

  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    right: 10,
    color: Constance.White
  },
});

export default Cam