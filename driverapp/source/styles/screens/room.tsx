import { Dimensions, StyleSheet } from "react-native";
import Constance from "../../theme/const";


const style = StyleSheet.create({

    map:{
        height:200,
        borderBottomRightRadius:12,
        borderBottomLeftRadius:12
    },
    content:{
        height:Constance.height - 190,
        position:'absolute',
        bottom:0,
        marginHorizontal:10,
        width:Constance.width - 20,
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        padding:10
    },

});
export default style;