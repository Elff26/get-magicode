import {
    StyleSheet,
    Text, 
    TouchableOpacity,
    View
} from 'react-native';

import { AntDesign } from '@expo/vector-icons'; 
import Colors from '../../utils/ColorPallete/Colors';

export default function ChooseTechnologyComponent({ openBottomSheet, setOpenBottomSheet, currentTechnology }) { 
    const openChooseTech = () => {
        setOpenBottomSheet(!openBottomSheet);
    }

    return (
        <View>
            <TouchableOpacity style={styles.chooseTechnologieButton} onPress={openChooseTech}>
                <AntDesign name="edit" size={32} color={Colors.TEXT_COLOR} />
                <Text style={styles.languageName}>{currentTechnology.technology.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    chooseTechnologieButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    languageName: {
        marginLeft: 5,
        fontSize: 22,
        color: Colors.PRIMARY_COLOR
    }
});
