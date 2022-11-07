import { useContext } from 'react';
import { 
    StyleSheet, 
    Text, 
    View 
} from "react-native";

import { AntDesign } from '@expo/vector-icons';
import Colors from "../../utils/ColorPallete/Colors";
import { LifeContext } from '../../utils/contexts/LifeContext';
import CardComponent from "./CardComponent";

export default function CardLifeComponent({ showCard, setShowCard }) {
    const { life, setLife } = useContext(LifeContext);

    return (
        <CardComponent showCard={showCard} setShowCard={setShowCard}>
            <Text style={styles.numberOfLifes}>{life} vidas</Text>
            <View>
                <Text style={styles.info}>
                    20 min = + <AntDesign style={styles.lifeComponent} name="heart" size={16} color={Colors.RED_COLOR_DEFAULT} />
                </Text>
            </View>
        </CardComponent>
    )
}

const styles = StyleSheet.create({
    numberOfLifes: {
        fontSize: 32,
        textAlign: 'center',
        color: Colors.PRIMARY_COLOR,
        fontWeight: 'bold'
    },

    info: {
        fontSize: 18,
        color: Colors.TEXT_COLOR,
        textAlign: 'center'
    },

    lifeComponent: {
        marginHorizontal: 2
    }
});