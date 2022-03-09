import { Dimensions, DynamicColorIOS, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Constance from "../theme/const";
import { Divider, Icon } from "react-native-elements";
import TextComponent from "./text";
import { ThemeContext } from "../theme/themeProvider";
import axios from "axios";

interface props {
    title?: any,
    message?: any,
    date?: any,
    time?: any,
    icon?: any,
    status?: any,
    dropped?: any,
    press?: any,
    key?: any
}

const NotificationComponent = (props: props) => {

    const width = Dimensions.get('window').width;
    const { title, message, date, time, icon, status, dropped, key,press } = props;
    const [dropp, setdropp] = useState(false);
    const { theme, dark } = useContext(ThemeContext);
    const [days, setdays] = useState<any>();

  

    const handleDaysCalculation = () => {

        var one_day = 1000 * 60 * 60 * 24;
        let today = new Date();
        let dateSent = new Date(time)

        var diff = today.getTime() - dateSent.getTime();
        //var hours = Math.floor(diff / 1000 / 60 / 60);
        // diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);

        var hours = Math.floor(diff / 36e5),
            minutes = Math.floor(diff % 36e5 / 60000),
            seconds = Math.floor(diff % 60000 / 1000);


        if (hours < 24 && hours > 1) {
            setdays(`${hours} h ago`);
        } else if (hours <= 1) {

            let days = hours / 24;
            setdays(`${minutes} min ago`);
        } else if (hours > 24) {

            let days = hours / 24;
            if (days < 2) {
                let daycount = days.toString()
                setdays(`${daycount.substring(0, daycount.indexOf('.'))} day ago`);
            }else if(days > 1 && days < 29){
                let daycount = days.toString();
                setdays(`${daycount.substring(0, daycount.indexOf('.'))} days ago`);
            }else if(days > 30){
                
                let daycount = (days/ 30).toString();
                setdays(`${daycount.substring(0,daycount.indexOf('.') )} days ago`);
            }
        }
        console.log(time);
    }
    useEffect(() => {
        handleDaysCalculation();
    }, [])

    return (
        <View style={{ backgroundColor: theme.backgroundAlt, height: dropped ? null : 95, paddingHorizontal: 5, paddingVertical: 5, paddingBottom: 10, marginHorizontal: 0, borderRadius: 1 }}>

            <TouchableOpacity onPress={press}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, backgroundColor: theme.border, padding: 5 }}>
                        <View style={{ width: width - 100, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Icon type='material-community' name='bell-alert' color={theme.text} size={16} />
                            <TextComponent text={key} style={{ height: 20, left: 5, fontSize: Constance.medium, color: theme.text, fontWeight: 'bold', paddingHorizontal: 5 }} />
                        </View>

                        <View style={{ width: 90, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <TextComponent text={days} style={{ height: 20, fontSize: Constance.x_small, color: theme.text, fontWeight: '900' }} />
                            <Icon type="material-community" name={dropped ? 'menu-up' : 'menu-down'} color={theme.text} />
                        </View>
                    </View>

                    <Divider style={{ height: Constance.smallDivider, backgroundColor: Constance.GreyLighter }} />
                    <TextComponent text={dropped ? message : message.substring(0, 60)} style={{ fontSize: Constance.x_small, color: theme.text, fontWeight: '200' }} />

                    <Divider style={{ height: Constance.smallDivider, marginTop: 5, backgroundColor: Constance.GreyLighter }} />
                </View>
            </TouchableOpacity>
        </View >
    );
}

export default NotificationComponent;