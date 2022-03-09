import { Dimensions, StyleSheet } from "react-native";
import Constance from "../../theme/const";

const width = Dimensions.get('window').width;

const style = StyleSheet.create({
    parent: {
        height: 180,
        borderRadius: 10,
        padding:0,
        width:'115%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
    },
    details:{
        marginTop:20,
        width:'90%',
        height: 160,
        paddingHorizontal:30,
        borderRadius: 10,
        padding:0,
        position:'absolute',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
    },
    names: {
        fontSize: Constance.x_larger,
        fontWeight: 'bold'
    },
    cardnumber: {
        fontSize: Constance.large,

    },
    container: {
        position: 'absolute',
        bottom: 10,
        padding: 5, 
        marginLeft: 5,
        paddingHorizontal:30,
    },
    master: {
        fontSize: Constance.medium
    },
    image: {
        width: 40,
        height: 20,
    },
    expdate: {
        position: 'absolute',
        bottom: 15,
        right: -20,
        paddingHorizontal:30,
    },
    date: {
    }
});
export default style;