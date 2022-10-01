import { 
    StyleSheet, 
    Text,
    View
} from "react-native";
import Colors from "../../utils/ColorPallete/Colors";

export default function OutputTerminal({ answer }) {
    return (
        <>
            <Text>Output: </Text>
            <View style={styles.terminal}>
                <Text style={styles.textTerminal}>{answer.output}</Text>

                <View style={styles.separator}></View>
                <Text style={styles.textTerminal}>Tempo de CPU: {answer.cpuTime}</Text>
                <Text style={styles.textTerminal}>Memória: {answer.memory}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    terminal: {
        width: "95%",
        backgroundColor: Colors.BLACK,
        borderRadius: 10,
        padding: 15,
        alignSelf: 'center'
    },

    textTerminal: {
        color: Colors.WHITE_SAFE_COLOR
    },

    separator: {
        marginVertical: 10
    }
})