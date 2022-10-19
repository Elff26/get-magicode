import { 
    StyleSheet,
    Text, 
    View
} from "react-native";
import ButtonComponent from "../Buttons/ButtonComponent";
import * as Clipboard from 'expo-clipboard';
import ToastComponent from "../Toast/ToastComponent";
import Colors from "../../utils/ColorPallete/Colors";

export default function PvPCreateRoom({ createdRoomNumber, setCreatedRoomNumber }) {
    async function returnToCode() {
        setCreatedRoomNumber("");
    }

    async function copyCodeToClipboard() {
        await Clipboard.setStringAsync(createdRoomNumber);
        ToastComponent('Copiado com sucesso');
    }

    return (
        <>
            <Text style={styles.normalText}>Código da sala</Text>
            <Text style={styles.textCode}>{createdRoomNumber}</Text>

            <View style={styles.buttonsGroup}>
                <ButtonComponent onPress={copyCodeToClipboard}>
                    <Text style={styles.textButton}>Copiar código</Text>
                </ButtonComponent>
                <ButtonComponent onPress={returnToCode}>
                    <Text style={styles.textButton}>Voltar</Text>
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

    textCode: {
        fontSize: 42,
        color: Colors.PRIMARY_COLOR
    },
 
    buttonsGroup: {
        marginTop: 5,
        width: '100%'
    },

    textButton: {
        color: Colors.WHITE_SAFE_COLOR
    }
});