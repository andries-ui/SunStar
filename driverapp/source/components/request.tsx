import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Constance from '../theme/const';
import { ThemeContext } from '../theme/themeProvider';
import ButtonComponent from './button';

interface props {
    names?: any,
    address?: any,
    distance?: any,
    acceptRequest?: any,
    date?: any,
    createdAT?: any,
    price?: any,
    status?: any
}

const RequestComponent = (props: props) => {

    const { names, address, distance, acceptRequest, date, createdAt, price, status } = props;
    const [days, setdays] = useState('');
    
    const { theme, dark } = useContext(ThemeContext)

    const handleDaysCalculation = () => {

        var one_day = 1000 * 60 * 60 * 24;
        let today = new Date();
        let dateSent = new Date(date)

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
            } else if (days > 1 && days < 29) {
                let daycount = days.toString();
                setdays(`${daycount.substring(0, daycount.indexOf('.'))} days ago`);
            } else if (days > 30) {

                let daycount = (days / 30).toString();
                setdays(`${daycount.substring(0, daycount.indexOf('.'))} days ago`);
            }
        }
        console.log(date);
    }

    useEffect(() => {
        handleDaysCalculation();
    }, [])

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{names}</Text>
                <Text>{days}</Text>
            </View>

            <Text>{address} ({distance})</Text>
            <Text>{date.substring(0,16)}</Text>
            <Text>{price}</Text>
            {status == "Pending"?
                <ButtonComponent btnstyle={{backgroundColor:Constance.Green}} text={"Accept Request"} lblstyle={{ color: 'white' }} />:
                <Text>Request accepted</Text>
            }
        </View>
    );
}

export default RequestComponent
