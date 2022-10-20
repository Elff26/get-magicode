import { FontAwesome5 } from "@expo/vector-icons";

import { 
    Image,
    StyleSheet, 
    Text, 
    View 
} from "react-native";
import Colors from "../../utils/ColorPallete/Colors";

export default function UserScoreFinishedComponent({ user, userAnswers, totalXp, winner }) {
    return (
        <View style={styles.scoreComponent}>
            <View style={styles.userImages}>
                <View style={[styles.imageContent, winner === 1 
                    ? { borderColor: Colors.GREEN_CHECK_ICON } 
                    : winner === 0 
                        ? { borderColor: Colors.RED_ERROR_ICON } 
                        : { borderColor: Colors.SILVER_CROWN }]}
                >
                    {
                        totalXp > 0 && (
                            <FontAwesome5 name="crown" color={Colors.GOLDEN_CROWN} size={28} />
                        ) 
                    }
                    <Image style={styles.userImage} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' }} />
                </View>
            </View>
        <Text style={styles.userNameFinished}>{user.name}</Text>
        <Text style={styles.scoreFinished }>Acertos: {userAnswers.reduce((previousValue, answer) => answer.isCorrect ? previousValue + 1 : previousValue, 0)}</Text>
            {
                totalXp > 0 && (
                    <Text style={styles.xpText}>+ {totalXp}XP</Text>
                ) 
            }
        </View>
    )
}

const styles = StyleSheet.create({
    scoreComponent: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    imageContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 250,
        backgroundColor: Colors.WHITE_SAFE_COLOR,
        borderRadius: 125,
        borderWidth: 15
    },

    userImages: {
        flexDirection: "row"
    },

    userImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 1,
        borderColor: Colors.TEXT_COLOR,
    },

    userNameFinished: {
        fontSize: 28,
        textAlign: 'center',
        color: Colors.WHITE_SAFE_COLOR
    },

    scoreFinished: {
        fontSize: 22,
        textAlign: 'center',
        color: Colors.WHITE_SAFE_COLOR
    },

    xpText: {
        color: Colors.WHITE_SAFE_COLOR,
        fontSize: 24
    }
})
