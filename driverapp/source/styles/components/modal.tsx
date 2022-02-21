import { StyleSheet } from "react-native";

const modal = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalBox: {
        overflow: "hidden",
        position: 'absolute',
        backgroundColor: "transparent",
   
        alignItems: "center",
    },
    content: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: "white",
        paddingHorizontal: 7,
        paddingBottom: 10,
        paddingTop: 10,
        width:'100%',
        position: 'absolute',
         bottom:0
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