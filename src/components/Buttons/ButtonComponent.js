import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native"
import Colors from "../../utils/ColorPallete/Colors"

export default function ButtonComponent({ newStyle, onPress, children, isLoading = false, disabled }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, newStyle]} disabled={isLoading | disabled}>
        {
            isLoading && (
                <ActivityIndicator />
            )
        }
        {
            !isLoading && (
                {...children}
            )
        }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 42,
        marginBottom: 5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        backgroundColor: Colors.PRIMARY_COLOR
    },
})