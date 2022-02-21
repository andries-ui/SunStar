import { Dimensions, StyleSheet } from "react-native";

const style = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30
 },
 containerSwitch:{
    marginBottom:50,
 },
 containerCard: {
    width: Dimensions.get('window').width - 50,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
       height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
 },
 text: {
   fontSize: 20,
   padding: 20,
 },
 img: {
    width: Dimensions.get('window').width - 50,
    height: 240,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
 }
 });

 export default style