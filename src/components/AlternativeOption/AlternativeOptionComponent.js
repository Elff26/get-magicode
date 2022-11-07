import { 
    StyleSheet, 
    Text,
    View
} from "react-native";

import { RadioButton } from 'react-native-paper';

import Colors from '../../utils/ColorPallete/Colors';

export default function AlternativeOptionComponent({ value, label, status, changeChecked, alternativeText, disabled }) {
    return (
        <View style={styles.goalRadio}>
            <RadioButton
                disabled={disabled}
                value={value}
                label={label}
                status={status}
                onPress={() => changeChecked(value)}
            />
            <Text style={styles.alternativeText}>{alternativeText}</Text>
        </View>
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