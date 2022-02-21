import { StyleSheet } from "react-native";

const modal = StyleSheet.create({
    container: {
        height:'100%',
        width:'100%'
    },
    modalBox: {
        overflow: "hidden",
        position: 'absolute',
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent:'flex-end',  
        height:'100%',
        width:'100%'  

    },
    content: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: "white",
        paddingHorizontal: 7,
        paddingBottom: 10,
        paddingTop: 10,
        width:'100%',
    },
    modelContainerChild: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical:10
    },
    textStyle: {
        fontSize: 18
    }
});

export default modal;