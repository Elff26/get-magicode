import { StyleSheet, TouchableOpacity } from "react-native"
import Colors from "../ColorPallete/Colors"

export default function ButtonComponent({ newStyle, onPress, children }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, newStyle]}>
          {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 42,
        marginBottom: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        backgroundColor: Colors.PRIMARY_COLOR
    },
})