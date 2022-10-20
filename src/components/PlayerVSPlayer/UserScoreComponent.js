import { Feather, FontAwesome5 } from "@expo/vector-icons";

import { 
    Image,
    StyleSheet, 
    Text, 
    View 
} from "react-native";
import Colors from "../../utils/ColorPallete/Colors";

export default function UserScoreComponent({ user, userAnswers, questionNumber }) {
    return (
        <View style={styles.scoreComponent}>
            <View style={styles.userImages}>
                <View style={styles.imageContent}>
                    <Image style={styles.userImage} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' }} />
                </View>
                {
                    userAnswers.length - 1 === questionNumber && (
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
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.score}>Acertos: {userAnswers.reduce((previousValue, answer) => answer.isCorrect ? previousValue + 1 : previousValue, 0)}</Text>
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
    }
})
