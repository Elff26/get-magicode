import { StyleSheet, TouchableOpacity } from "react-native"
import colors from "./colors/colors"

export default function ButtonComponent({ newStyle, children }) {
    return (
        <TouchableOpacity style={[styles.button, newStyle]}>
          {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: '42px',
        marginBottom: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        backgroundColor: colors.PRIMARY_COLOR
    },
})