import {
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

import ChooseTechnologieComponent from '../ChooseTechnologie/ChooseTechnologieComponent';
import LifeCompoenent from '../Life/LifeComponent'

export default function ChallengesHeaderComponent({ navigation, openBottomSheet, setOpenBottomSheet, currentTechnology, numberOfLifes }) {
    return (
        <View style={styles.header}>
            <ChooseTechnologieComponent navigation={navigation} openBottomSheet={openBottomSheet} setOpenBottomSheet={setOpenBottomSheet} currentTechnology={currentTechnology} />
            <LifeCompoenent numberOfLifes={numberOfLifes} />
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