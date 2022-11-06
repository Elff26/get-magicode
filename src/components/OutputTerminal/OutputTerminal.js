import { 
    Dimensions,
    ScrollView,
    StyleSheet, 
    Text,
    View
} from "react-native";
import Colors from "../../utils/ColorPallete/Colors";

const width = Dimensions.get('window').width;

export default function OutputTerminal({ answers }) {
    return (
        <>
        {
            answers && (
                <ScrollView contentContainerStyle={styles.outputs} horizontal={true}>
                    {
                        answers.jdoodleResponse.map((answer, index) => (
                            <View key={index}>
                                <Text style={styles.textStyle}>Output {index + 1}: </Text>
                                <View style={styles.terminal}>
                                    <Text style={styles.textTerminal}>{answer.output}</Text>
            
                                    <View style={styles.separator}></View>
                                    <Text style={styles.textTerminal}>Tempo de CPU: {answer.cpuTime}</Text>
                                    <Text style={styles.textTerminal}>Memória: {answer.memory}</Text>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
            )
        }
        </>
    )
}

const styles = StyleSheet.create({
    outputs: {
        flexDirection: 'row'
    },

    terminal: {
        width: width - 50,
        backgroundColor: Colors.BLACK,
        borderRadius: 5,
        padding: 15,
        alignSelf: 'center',
        marginHorizontal: 5
    },

    textTerminal: {
        color: Colors.WHITE_SAFE_COLOR
    },

    separator: {
        marginVertical: 10
    },

    textStyle: {
        color: Colors.TEXT_COLOR,
        fontSize: 18,
        marginLeft: 5
    },
})