import { 
    StyleSheet,
    Text,
    View,
} from "react-native";
import Colors from "../../utils/ColorPallete/Colors";
import ButtonComponent from "../Buttons/ButtonComponent";
import CardComponent from "./CardComponent";

export default function CardTipComponent({ showCard, setShowCard, tip, tipNumber }) {    
    return (
        <>
            {
                tipNumber >= 0 && (
                    <CardComponent showCard={showCard} setShowCard={setShowCard}>
                        <Text style={styles.numberOfLifes}>{tipNumber + 1}ª Dica</Text>

                        <View style={styles.separator} />

                        <View>
                            <Text style={styles.info}>
                                {tip.tipDescription}
                            </Text>

                            <View style={styles.separator} />

                            <ButtonComponent onPress={() => setShowCard(false)}>
                                <Text style={styles.textButton}>Fechar</Text>
                            </ButtonComponent>
                        </View>
                    </CardComponent>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    numberOfLifes: {
        fontSize: 32,
        textAlign: 'center',
        color: Colors.PRIMARY_COLOR,
        fontWeight: 'bold'
    },

    info: {
        fontSize: 18,
        color: Colors.TEXT_COLOR,
        textAlign: 'center'
    },

    textButton: {
        color: Colors.WHITE_SAFE_COLOR
    },

    separator: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: Colors.PRIMARY_COLOR,
        marginVertical: 10
    }
});