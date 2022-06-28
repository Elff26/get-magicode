import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import Colors from "../ColorPallete/Colors";

export default function Header({ backArrow, children, navigation, title }) {
    function previousScreen() {
        navigation.goBack()
    } 

    return (
        <View style={styles.header}>
            {backArrow && (
                <TouchableOpacity style={styles.backArrouButton} onPress={previousScreen}>
                    <MaterialIcons name="keyboard-arrow-left" size={42} color={Colors.PRIMARY_COLOR} />
                </TouchableOpacity>
            )}
            {children}
            <Text style={styles.textHeader}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        maxWidth: '500px',
        flexDirection: 'row',
        alignItems: 'center',
    }, 

    backArrouButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50px',
        height: '50px'
    },

    textHeader: {
        fontSize: 18,
        color: Colors.PRIMARY_COLOR,
        fontWeight: 'bold'
    }
})