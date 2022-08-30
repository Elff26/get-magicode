import { StyleSheet, TouchableOpacity } from "react-native"
import Colors from "../../utils/ColorPallete/Colors"

export default function ButtonComponent({ newStyle, onPress, children, disabled = false }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, newStyle]} disabled={disabled}>
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