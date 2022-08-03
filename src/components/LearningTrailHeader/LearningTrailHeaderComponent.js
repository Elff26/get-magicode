import {
    StyleSheet,
    View
} from 'react-native';

import ChooseTechnologieComponent from '../ChooseTechnologie/ChooseTechnologieComponent';
import LifeCompoenent from '../Life/LifeComponent'

export default function LearningTrailHeaderComponent({ navigation }) {
    return (
        <View style={styles.header}>
            <ChooseTechnologieComponent navigation={navigation} />
            <LifeCompoenent />
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