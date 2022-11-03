import {
    StyleSheet,
    View
} from 'react-native';
import ChooseTechnologyComponent from '../ChooseTechnology/ChooseTechnologyComponent';
import LifeCompoenent from '../Life/LifeComponent'

export default function ChallengesHeaderComponent({ navigation, openBottomSheet, setOpenBottomSheet, currentTechnology, userID, numberOfLifes }) {
    return (
        <View style={styles.header}>
            <ChooseTechnologyComponent navigation={navigation} openBottomSheet={openBottomSheet} setOpenBottomSheet={setOpenBottomSheet} currentTechnology={currentTechnology} />
            <LifeCompoenent userID={userID} numberOfLifes={numberOfLifes} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});