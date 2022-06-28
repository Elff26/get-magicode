import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo } from '@expo/vector-icons'; 
import Colors from "../ColorPallete/Colors";

export default function Header({ backArrow, children, navigation }) {
    function previousScreen() {
        navigation.goBack()
    } 

    return (
        <View style={styles.header}>
            {backArrow && (
                <TouchableOpacity style={styles.backArrouButton} onPress={previousScreen}>
                    <Entypo name="chevron-left" size={32} color={Colors.PRIMARY_COLOR} />
                </TouchableOpacity>
            )}
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        maxWidth: '400px',
        flexDirection: 'row',
        alignItems: 'center'
    }, 

    backArrouButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50px',
        height: '50px'
    }
})