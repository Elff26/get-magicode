import { Platform, StatusBar, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import Colors from "../../utils/ColorPallete/Colors";

export default function Header({ backArrow, children, navigation, title, arrowColor, screenToReturn }) {
    function previousScreen() {
        navigation.goBack()
    } 

    return (
        <View style={styles.header}>
            {backArrow && (
                <TouchableOpacity style={styles.backArrouButton} onPress={screenToReturn ? screenToReturn : previousScreen}>
                    <MaterialIcons name="keyboard-arrow-left" size={42} color={!arrowColor ? Colors.PRIMARY_COLOR : arrowColor} />
                </TouchableOpacity>
            )}
            <Text style={styles.textHeader}>{title}</Text>

            <View style={styles.icons}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        maxWidth: 500,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }, 

    backArrouButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50
    },

    textHeader: {
        fontSize: 18,
        color: Colors.PRIMARY_COLOR,
        fontWeight: 'bold'
    },

    icons: {
        marginLeft: 'auto',
        marginRight: 20,
        justifyContent: 'center'
    }
})