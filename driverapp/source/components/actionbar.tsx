import React, { useContext } from 'react'
import { View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { ThemeContext } from '../theme/themeProvider';
import InputComponent from './input';

interface props {
    text?: string,
    textStyle?: any,
    iconBack?: string,
    bottomleftradius?: Number,
    editabe?: any,
    onBackPress?: any,
    backgroundColor?: any,
    barStyle?: any,
    iconStyle?: any,
    input?: any,
    backOpacity?: any

}
const ActionBar = (props: props) => {
    const { theme } = useContext(ThemeContext)
    const { text, textStyle, iconBack, bottomleftradius, onBackPress, backgroundColor, barStyle, iconStyle, input, backOpacity } = props
    return (
        <View style={[barStyle, {
            backgroundColor: backgroundColor, height: 60, width: '100%',
            borderBottomRightRadius: bottomleftradius ? bottomleftradius : 0, flexDirection: 'row', alignItems: 'center',
            justifyContent: 'flex-start'
        }]}>


            {iconBack ? <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>

                <View style={{ opacity: 0.6, height: 40, width: 40, backgroundColor: backOpacity? backOpacity : null, justifyContent: 'center', alignItems: 'center', borderRadius: 12, position: 'absolute' }}>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 12, position: 'absolute' }}>
                    <Icon style={{ marginHorizontal: 10 }} type="ionicon" name={iconBack} size={28} color={theme.text} onPress={onBackPress} />
                </View>
            </View> : null}

            {input ? <InputComponent /> : null}
            {text ? <Text style={textStyle}>{text}</Text> : null}


        </View>
    )
}

export default ActionBar
