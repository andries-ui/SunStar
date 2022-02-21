import React, { useContext, useState } from "react";
import { FlatList, Platform, StatusBar, TouchableOpacity, View } from "react-native";
import { Icon, Image, Text } from "react-native-elements";
import { TextInput } from "react-native-paper";
import ActionBar from "../components/actionbar";
import InputComponent from "../components/input";
import Separator from "../components/separater";
import TextComponent from "../components/text";
import Constance from "../theme/const";
import { ThemeContext } from "../theme/themeProvider";

const Search = ({ navigation }) => {

    const history = [
        {
            id: 1,
            name: "suit name",
        },
        {
            id: 2,
            name: "suit name1fgh",
        },
        {
            id: 3,
            name: "suit name2",
        },
        {
            id: 4,
            name: "suit name3",
        },
        {
            id: 5,
            name: "suit name6",
        },

    ];
    const [search, setsearch] = useState('');

   
    

    const [results, setresults] = useState([]);

    const { theme , dark} = useContext(ThemeContext)
    return (
        <View style={{backgroundColor:theme.background}}>
            <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />

            <View style={[{
                height: 60, width: '100%', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-evenly'
            }]}>

                <Icon style={{ marginHorizontal: 10 }} type="ionicon" name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} size={28} color={theme.text} onPress={() => navigation.goBack()} />

                <InputComponent value={search} left={<TextInput.Icon name="magnify" />} hint="Find accomodation" style={{ width: '80%', backgroundColor: theme.border }} />
            </View>


            <View style={[{
                height: 60, width: '100%', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'space-evenly', paddingHorizontal:10
            }]}>

                <Icon style={{ marginHorizontal: 10 }} type="material-community" name= 'history' size={28} color={theme.text} onPress={() => navigation.goBack()} />

                <FlatList showsHorizontalScrollIndicator={false} ItemSeparatorComponent={Separator} horizontal data={history} renderItem={({ item, index }) => (

                    <TouchableOpacity onPress={() => { setsearch(item.name) }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            backgroundColor: Constance.Black,
                            marginHorizontal: 5,
                            borderRadius: 12, paddingHorizontal: 10, paddingVertical: 2
                        }}>
                            <TextComponent text={item.name} key={item.id} style={{ fontSize: Constance.small, color: Constance.White }} />
                            <Icon onPress={() => { }} type="ionicon" name="close" color={Constance.White} />
                        </View>
                    </TouchableOpacity>
                )} />
            </View>


            {results.length > 0 ? null:
          <View style={{height: Constance.height- 130, justifyContent: 'center', alignItems:'center'}}>
            <Image source={require('../../assets/images/search.png')} style={{width:150, height:150}}/>
            <Text style={{ fontSize:Constance.medium, color:Constance.Grey }}>No results found</Text>
          </View>}

          
        </View>
    )
}

export default Search;