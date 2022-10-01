import { 
    StyleSheet, 
    Text,
    View
} from "react-native";

import { RadioButton } from 'react-native-paper';

import Colors from '../../utils/ColorPallete/Colors';

export default function AlternativeOptionComponent({ value, label, status, changeChecked, alternativeText }) {
    return (
        <View style={styles.goalRadio}>
            <RadioButton
                value={value}
                label={label}
                status={status}
                onPress={() => changeChecked(value)}
            />
            <Text style={styles.goalText}>{alternativeText}</Text>
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

    goalText: {
        fontSize: 18,
        color:Colors.TEXT_COLOR,
        textAlign: 'auto',
        flexWrap: 'wrap',
        maxWidth: '90%'
   },

   alternativeText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
   }
})