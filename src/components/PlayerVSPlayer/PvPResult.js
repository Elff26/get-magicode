import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Colors from '../../utils/ColorPallete/Colors';
import UserScoreComponent from './UserScoreComponent';

export default function ({ user, userAnswers, opponent, opponentAnswers, questionNumber, winner, userXp, opponentXp, drawXp }) {
    return (
        <View style={styles.result}>
            <Text style={ 
                winner === 1 ? 
                    styles.finishedResultWin : 
                    (
                        winner === 0 ? 
                        styles.finishedResultLost : 
                        styles.finishedResultDraw
                    )
            }>
                { winner === 1 ? "Vitória" : (winner === 0 ? "Derrota" : "Empate") }
            </Text>
            <View style={styles.scoreContent}>
                <UserScoreComponent
                    user={user}
                    userAnswers={userAnswers}
                    questionNumber={questionNumber}
                    size={winner === 1 ? 2 : (winner === 0 ? 1 : 1.5)}
                    finished={true}
                    totalXp={winner === 1 ? userXp : (winner === 0 ? 0 : drawXp)}
                />

                <UserScoreComponent 
                    user={opponent}
                    userAnswers={opponentAnswers}
                    questionNumber={questionNumber}
                    size={winner === 1 ? 1 : (winner === 0 ? 2 : 1.5)}
                    finished={true}
                    totalXp={winner === 0 ? opponentXp : (winner === 1 ? 0 : drawXp)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    result: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%'
    }, 

    finishedResultLost: {
        fontSize: 50,
        color: Colors.RED_ERROR_ICON
    },

    finishedResultWin: {
        fontSize: 50,
        color: Colors.GREEN_CHECK_ICON
    },

    finishedResultDraw: {
        fontSize: 50,
        color: Colors.TEXT_COLOR
    },

    scoreContent: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%'
    },
})