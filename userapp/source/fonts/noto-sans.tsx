import {useFonts, NotoSans_400Regular, NotoSans_700Bold, NotoSans_400Regular_Italic} from '@expo-google-fonts/noto-sans';

const NotoSans = {

    regular: useFonts({NotoSans_400Regular}),
    regular_italic: useFonts({NotoSans_400Regular_Italic}),
    bold: useFonts({NotoSans_700Bold})

}

export default NotoSans;