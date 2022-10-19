import { 
    StyleSheet,
    Text,
    View
} from "react-native";

import Colors from '../../utils/ColorPallete/Colors';
import ButtonComponent from '../Buttons/ButtonComponent';
import CardComponent from "./CardComponent";

export default function CardChallengeFinishedComponent({ title, subtitle, message, xp, showCard, buttonText, onPressButton, setShowCard }) {
    return (
        <>
            {
                showCard && (
                    <CardComponent showCard={showCard} setShowCard={setShowCard}>
                        <Text style={styles.cardTitle}>{title}</Text>
                        <View style={styles.cardSeparator}></View>
                        <Text style={styles.cardSubtitle}>{subtitle}</Text>
                        <Text style={styles.cardMessage}>{message}</Text>
                        {
                            Number(xp) !== 0 && (
                                <Text style={styles.cardXp}>{`+ ${xp} XP`}</Text>
                            )
                        }
                    
                        <ButtonComponent disabled={false} isLoading={false} newStyle={styles.cardButton} onPress={onPressButton}>
                            <Text style={styles.cardButtonText}>{buttonText}</Text>
                        </ButtonComponent>
                    </CardComponent>
                )
            }
        </>
    )
} 

const styles = StyleSheet.create({
    cardTitle: {
        fontSize: 28,
        color: Colors.PRIMARY_COLOR,
        textAlign: 'center'
    },

    cardSeparator: {
        borderColor: Colors.TEXT_COLOR,
        borderWidth: .3
    },

    cardSubtitle: {
        fontSize: 24,
        color: Colors.PRIMARY_COLOR,
        textAlign: 'center'
    },

    cardMessage: {
        fontSize: 18,
        color: Colors.TEXT_COLOR,
        textAlign: 'center',
        marginBottom: 15
    },
    
    cardXp: {
        fontSize: 22,
        color: Colors.GREEN_TEXT,
        textAlign: 'center',
        marginBottom: 15
    },

    cardButton: {
        width: '50%',
        alignSelf: 'center'
    },

    cardButtonText: {
        color: Colors.WHITE_SAFE_COLOR
    }
})