import { Feather, FontAwesome5 } from "@expo/vector-icons";

import { 
    Image,
    StyleSheet, 
    Text, 
    View 
} from "react-native";
import Colors from "../../utils/ColorPallete/Colors";

export default function UserScoreComponent({ user, userAnswers, questionNumber, size, finished, totalXp }) {
    return (
        <View style={styles.scoreComponent}>
            <View style={styles.userImages}>
                <View style={styles.imageContent}>
                    {
                        finished && !!totalXp && (
                            <FontAwesome5 name="crown" color={Colors.GOLDEN_CROWN} size={28} />
                        ) 
                    }
                    <Image style={[styles.userImage, size ? { width: 50 * size, height: 50 * size, borderRadius: 50 * size / 2 } : {}]} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' }} />
                </View>
                {
                    userAnswers.length - 1 === questionNumber && !finished && (
                        <View key={userAnswers.length} style={[styles.iconBackground, userAnswers[questionNumber].isCorrect ? { backgroundColor: Colors.LIGHT_GREEN } : { backgroundColor: Colors.LIGHT_RED }]}>
                            {
                                userAnswers[questionNumber].isCorrect ? (
                                    <Feather name="check-circle" size={22} color={Colors.GREEN_CHECK_ICON} />
                                ) : (
                                    <Feather name="x-circle" size={22} color={Colors.RED_ERROR_ICON} />
                                )
                            }
                        </View>
                    )
                }
            </View>
            <Text style={ !finished ? styles.userName : styles.userNameFinished}>{user.name}</Text>
            <Text style={ !finished ? styles.score : styles.scoreFinished }>Acertos: {userAnswers.reduce((previousValue, answer) => answer.isCorrect ? previousValue + 1 : previousValue, 0)}</Text>
            {
                finished && !!totalXp && (
                    <Text style={styles.xpText}>+ {totalXp}XP</Text>
                ) 
            }
        </View>
    )
}

const styles = StyleSheet.create({
    scoreComponent: {
        alignItems: 'center',
        height: 200,
        justifyContent: 'flex-end'
    },

    imageContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    userImages: {
        flexDirection: "row",
    },

    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.TEXT_COLOR,
    },

    iconBackground: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '60%',
        right: 0
    },

    userName: {
        fontSize: 18,
        textAlign: 'center'
    },

    score: {
        fontSize: 20,
        textAlign: 'center'
    },

    userNameFinished: {
        fontSize: 28,
        textAlign: 'center'
    },

    scoreFinished: {
        fontSize: 18,
        textAlign: 'center'
    },

    xpText: {
        color: Colors.GREEN_CHECK_ICON,
        fontSize: 24
    }
})
