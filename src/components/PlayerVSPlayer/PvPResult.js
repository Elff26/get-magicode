import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Colors from '../../utils/ColorPallete/Colors';
import UserScoreFinishedComponent from './UserScoreFinishedCompoment';

export default function ({ user, userAnswers, opponentLeave, winner, userXp, drawXp }) {
    return (
        <View style={styles.result}>
            <View style={styles.backgroundVictory}>
                <View style={styles.whiteBackground}>
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
                </View>
                {
                    opponentLeave && (
                        <Text style={styles.opponentLeave}>O seu oponente desistiu!</Text>
                    )
                }
            </View>
           
            
            <View style={styles.scoreContent}>
                <UserScoreFinishedComponent
                    user={user}
                    userAnswers={userAnswers}
                    totalXp={winner === 1 ? (userXp <= 0 ? 10 : userXp) : (winner === 0 ? 0 : drawXp)}
                    winner={winner}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    result: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%',
        backgroundColor: Colors.PRIMARY_COLOR
    }, 

    backgroundVictory: {
        width: '100%'
    },

    whiteBackground: {
        width: '100%',
        backgroundColor: Colors.WHITE_SAFE_COLOR
    },

    finishedResultLost: {
        fontSize: 50,
        color: Colors.RED_ERROR_ICON,
        textAlign: 'center'
    },

    finishedResultWin: {
        fontSize: 50,
        color: Colors.GREEN_CHECK_ICON,
        textAlign: 'center'
    },

    finishedResultDraw: {
        fontSize: 50,
        color: Colors.TEXT_COLOR,
        textAlign: 'center'
    },

    scoreContent: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%'
    },

    opponentLeave: {
        fontSize: 18,
        color: Colors.WHITE_SAFE_COLOR,
        textAlign: 'center'
    }
})