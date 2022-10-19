import { StyleSheet, Text, View } from "react-native";
import Colors from "../../utils/ColorPallete/Colors";
import CardComponent from "./CardComponent";

export default function CardLifeComponent({ showCard, setShowCard, numberOfLifes }) {
    return (
        <CardComponent showCard={showCard} setShowCard={setShowCard}>
            <Text style={styles.numberOfLifes}>{numberOfLifes} vidas</Text>
            <View>
                <Text style={styles.info}>
                    Próxima vida em: 1:00
                </Text>
            </View>
        </CardComponent>
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
    }
});