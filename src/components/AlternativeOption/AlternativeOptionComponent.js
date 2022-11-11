import { 
    StyleSheet, 
    TouchableOpacity,
    Text,
    View
} from "react-native";

import { RadioButton } from 'react-native-paper';

import Colors from '../../utils/ColorPallete/Colors';

export default function AlternativeOptionComponent({ value, label, status, changeChecked, alternativeText, disabled }) {
    return (
        <TouchableOpacity activeOpacity={0.5} style={styles.goalRadio} onPress={() => changeChecked(value)}>
            <RadioButton
                disabled={disabled}
                value={value}
                label={label}
                status={status}
                onPress={() => changeChecked(value)}
            />
            <Text style={styles.alternativeText}>{alternativeText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    goalRadio: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 5
    },

    alternativeText: {
        fontSize: 18,
        color:Colors.TEXT_COLOR,
        textAlign: 'auto',
        flexWrap: 'wrap',
        maxWidth: '90%'
   }
})