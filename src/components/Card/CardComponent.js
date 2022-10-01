import { 
    StyleSheet,
    Text,
    View
} from "react-native";

import Colors from '../../utils/ColorPallete/Colors';
import ButtonComponent from '../../components/Buttons/ButtonComponent';
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

export default function CardComponent({ title, subtitle, message, xp, showCard, buttonText, onPressButton }) {
    return (
        <>
            {
                showCard && (
                    <View style={styles.card}>
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
                    </View>
                )
            }
        </>
    )
} 

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        top: windowHeight / 3,
        backgroundColor: Colors.WHITE_SAFE_COLOR,
        padding: 20,
        borderColor: Colors.TEXT_COLOR,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center'
    },

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