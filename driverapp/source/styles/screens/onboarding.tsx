import { StyleSheet } from "react-native";
import NotoSans from "../../fonts/noto-sans";
import Constance from "../../theme/const";


const style = StyleSheet.create({

    image: {
        width: '100%',
        height: '100%',
    },
    container: {
        width: '100%',
        height: '100%',
        opacity: 0.3,
        position: 'absolute',
        justifyContent:'center'
    },
    containerTop: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        justifyContent:'center'
    },
    bottom: {
        width: '100%',
        position: 'absolute',
        bottom: 5,
        marginHorizontal: 9,
        paddingHorizontal: 10,
    },
    info: {
        position: 'absolute',
        right: 10,
        borderRadius: 30,
        backgroundColor:Constance.Grey,
        top:10,
    },
    header: {
        width: '100%',
        opacity: 0.8,
        bottom: 5,
        flexDirection: 'row',
        marginHorizontal: 3,
        height: 35,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center'
    },

})
export default style;