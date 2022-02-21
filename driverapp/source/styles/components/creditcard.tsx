import { Dimensions, StyleSheet } from "react-native";
import Constance from "../../theme/const";

const width = Dimensions.get('window').width;

const style = StyleSheet.create({
    parent:{
        
    },
    card:{
        borderRadius:10,
        backgroundColor:Constance.Blue,
        padding: 10,
        height:180,
        width:'100%',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.64,
        shadowRadius: 10,
        shadowColor: Constance.Blue,
        elevation: 16,
    },
    names:{
        fontSize:Constance.large,
        fontWeight:'900'
    },
    cardnumber:{
        fontSize:Constance.medium,
        
    },
    container:{
        position:'absolute',
        bottom:10,
        padding:5,
        marginLeft:5
    },
    master:{
        fontSize:Constance.medium
    },
    image:{
        width:40,
        height:20,
    },
    expdate:{
        position:'absolute',
        bottom:15,
        right:-20
    },
    date:{
    }
});
export default style;