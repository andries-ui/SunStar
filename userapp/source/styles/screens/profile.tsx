import { useContext } from "react";
import { StyleSheet } from "react-native";
import Constance from "../../theme/const";
import { ThemeContext } from "../../theme/themeProvider";


//const {theme,dark, toggle} = useContext(ThemeContext);

const style = StyleSheet.create({
    parent: {
        height: '100%',
        width: '100%'
    },
    topcontainer: {
        height: 160,
        width: '100%',
        borderBottomRightRadius: 35,
        paddingHorizontal: 10,
        paddingVertical: 30
    },
    content: {
        top: 110,
        height: ' 65%',
        width: '80%',
        alignSelf: 'center',
        position: 'absolute',
        borderRadius: 12,
        paddingVertical: 10

    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 60,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.64,
        shadowRadius: 5.32,

        elevation: 16,
    },
    flexContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },


    // Text styles

    lblProfile: {
        fontSize: Constance.xx_larger,
        fontWeight: 'bold',
    },
    lblcenterlined: {
        textAlign: 'center',
    },





    //Account

    container:{
        marginHorizontal:30
    }
});
export default style