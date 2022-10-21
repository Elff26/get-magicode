import { 
    StyleSheet,
    ScrollView,
    Text,
    View
} from "react-native"
import Colors from "../../utils/ColorPallete/Colors";
import ButtonComponent from "../Buttons/ButtonComponent";
import CardComponent from "./CardComponent"

export default function AchievementCardComponent({ showCard, setShowCard, title, description, xp }) {
    function closeCard() {
        setShowCard(false);
    }

    return (
        <CardComponent showCard={showCard} setShowCard={setShowCard}>
            <View>                        
                    <Text style={styles.achievementName}>{title}</Text>

                    <View style={styles.separator} />

                    <View>
                        <Text style={styles.achievementXp}>{xp} XP</Text>

                        <Text style={styles.achievementDescription}>{description}</Text>
                    </View>
            </View>

            <View style={styles.separator} />

            <ButtonComponent onPress={closeCard} color={Colors.PRIMARY_COLOR}>
                <Text style={styles.buttonText}>Fechar</Text>
            </ButtonComponent>
        </CardComponent>
    )
}

const styles = StyleSheet.create({
    achievementName: {
        fontSize: 28,
        color: Colors.PRIMARY_COLOR,
        textAlign: 'center'
    },

    achievementDescription: {
        fontSize: 18,
        color: Colors.TEXT_COLOR,
        textAlign: 'justify'
    },

    achievementXp: {
        fontSize: 22,
        color: Colors.PRIMARY_COLOR,
        textAlign: 'center'
    },

    separator: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: Colors.PRIMARY_COLOR,
        marginVertical: 10
    },

    buttonText: {
        color: Colors.WHITE_SAFE_COLOR,
        fontSize: 18
    }
})