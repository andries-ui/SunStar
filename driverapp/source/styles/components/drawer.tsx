import { StyleSheet } from "react-native";
import Constance from "../../theme/const";

const modal = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalBox: {
        overflow: "hidden",
        position: 'absolute',
        backgroundColor: "transparent",
    },
    content: {
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: "white",
        paddingHorizontal: 7,
        paddingBottom: 10,
        paddingTop: 10,
        width:300,
        height: '100%',
        position: 'absolute',
    },
    modelContainerChild: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical:10
    },
    textStyle: {
        fontSize: Constance.large,
        fontWeight: 'bold'
    }
});

export default modal;