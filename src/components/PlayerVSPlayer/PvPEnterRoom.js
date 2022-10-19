import { 
    StyleSheet,
    Text, 
    TextInput,
    View
} from "react-native";
import Colors from "../../utils/ColorPallete/Colors";
import ButtonComponent from "../Buttons/ButtonComponent";

export default function PvPEnterRoom({ acceptChallenge, roomNumber, setRoomNumber, error }) {
    return (
        <>
            <Text style={styles.normalText}>Digite o código da sala</Text>
            <TextInput
                style={styles.codeInput}
                value={roomNumber}
                onChangeText={setRoomNumber}
                placeholder="Código"
            />

            <Text style={styles.errorText}>{error}</Text>
            <View style={styles.buttonsGroup}>
                <ButtonComponent onPress={acceptChallenge}>
                    <Text style={styles.textButton}>Entrar</Text>
                </ButtonComponent>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    normalText: {
        fontSize: 18,
        color: Colors.TEXT_COLOR
    },

    codeInput: {
        width: '100%',
        height: 35,
        borderWidth: 1,
        borderColor: Colors.PRIMARY_COLOR,
        borderRadius: 50,
        textAlign: 'center',
        marginTop: 25,
        backgroundColor: Colors.TEXT_INPUT_BACKGROUND,
        color: Colors.TEXT_COLOR
    },

    errorText: {
        color: Colors.ERROR_COLOR,
        textAlign: 'center'
    },

    buttonsGroup: {
        marginTop: 5,
        width: '100%'
    },

    textButton: {
        color: Colors.WHITE_SAFE_COLOR
    },
});