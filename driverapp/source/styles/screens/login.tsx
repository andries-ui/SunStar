import { StyleSheet } from "react-native";
import Constance from "../../theme/const";

const style = StyleSheet.create({
    parent: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    topcontainer: {
        width: '100%',
        height: '30%',
        padding: 30
    },
    bottomcontainer: {
        width: '100%',
        height: '70%',
        backgroundColor: Constance.light_backgroundAlt,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
    },
    test: {

    }
})

export default style