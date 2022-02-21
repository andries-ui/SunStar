
import  {useFonts, Roboto_300Light, Roboto_400Regular,Roboto_700Bold, Roboto_300Light_Italic} from '@expo-google-fonts/roboto';

const Roboto = {

    light: useFonts({Roboto_300Light}),
    regular: useFonts({Roboto_400Regular}),
    bold: useFonts({Roboto_700Bold}),
    light_italic: useFonts({Roboto_300Light_Italic})

}

export default Roboto;