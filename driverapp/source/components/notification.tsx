import { TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import Constance from "../theme/const";
import { Divider, Icon } from "react-native-elements";
import TextComponent from "./text";
import { ThemeContext } from "../theme/themeProvider";

interface props {
    title: any,
    message: any,
    date: any,
    time: any,
    icon: any,
    status: any,
    dropped: any,
    press: any
}

const NotificationComponent = (props: props) => {

    const { title, message, date, time, icon, status, dropped } = props;
    const [dropp, setdropp] = useState(false);
    const {theme,dark} = useContext(ThemeContext);
    return (
        <TouchableOpacity onPress={() => { dropp ? setdropp(false) : setdropp(true) }}>
            <View style={{ backgroundColor: theme.border, height: dropp ? null : 63 , paddingHorizontal: 5,paddingVertical:3}}>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Icon type='material-community' name='bell-alert' color={theme.text} size={16} />
                        <TextComponent text={"Notice"} style={{ left: 5, fontSize: Constance.medium, color: theme.text, fontWeight: '900' }} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <TextComponent text={"time"} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '900' }} />
                        <Icon type="material-community" name={dropp ? 'menu-up' : 'menu-down'} color={theme.text} />
                    </View>
                </View>

                <Divider style={{ height: Constance.smallDivider }} />
                <TextComponent text={"message ghfgyfhguyhuhu /n ybhuiu \n  \n fytg7y"} style={{ fontSize: Constance.small, color: theme.text, fontWeight: '400' }} />
                        
                        
                <Divider style={{ height: Constance.smallDivider , marginTop:5,}} />
            </View>
        </TouchableOpacity>
    );
}

export default NotificationComponent;