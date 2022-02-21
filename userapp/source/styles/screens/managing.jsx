import { StyleSheet } from "react-native";
import Constance from "../../theme/const";

const style = StyleSheet.create({
    lblheader:{
        fontSize: Constance.large,
        fontWeight: 'bold',
    },

    lblButton:{
        fontSize: Constance.small,
        fontWeight: 'bold',
        color: Constance.White,
    }
    ,lblcaption:{
        fontSize: Constance.medium,
    }
})

export default style;