import { Feather } from '@expo/vector-icons';
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View
} from "react-native";

import Colors from "../../utils/ColorPallete/Colors";

export default function InfoComponent({ title, total, backgroundColor, icon, iconColor, newStyle, onPress }) {
    return (
        <TouchableOpacity style={styles.infoComponent} disabled={!onPress ? true : false} onPress={!onPress ? () => {} : onPress}>
            <View style={[styles.infoIconComponent, { backgroundColor }]}>
                <Feather name={icon} color={iconColor} size={45} />
            </View>
            <Text style={styles.infoText}>{title}</Text>
            <Text style={styles.infoText}>{total}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    infoComponent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        width: 120
    },  

    infoIconComponent: {
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    infoText: {
        color: Colors.TEXT_COLOR,
        fontSize: 22,
        textAlign: 'center'
    }
})