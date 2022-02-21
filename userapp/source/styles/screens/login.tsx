import { Roboto_100Thin } from "@expo-google-fonts/roboto";
import { StyleSheet } from "react-native";
import Roboto from "../../fonts/roboto";
import Constance from "../../theme/const";

const style = StyleSheet.create({
    parent: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: Constance.White
    },
    image: {
        width: '100%',
        height: '100%'
    },
    topcontainer: {
        width: '100%',
        height: '30%',
        padding: 30,
        backgroundColor: Constance.White
    },
    bottomcontainer: {
        width: '100%',
        height: '70%',
        backgroundColor: Constance.GreyLight,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
    },
    test: {
        fontFamily: 'Roboto_100Thin'
    }
})

export default style