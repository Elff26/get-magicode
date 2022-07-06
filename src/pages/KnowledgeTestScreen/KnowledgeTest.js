import { useState } from 'react';

import { 
    StyleSheet, 
    Text,
    View
} from "react-native";
import Colors from '../../components/ColorPallete/Colors';

import Header from '../../components/Header/HeaderComponent';

export default function ChooseTechnologias({ navigation }) {
    const [questionNumber, setQuestionNumber] = useState(1);

    return (
        <View style={styles.screenContainer}>
                <Header backArrow={true} navigation={navigation} />

                <View style={styles.content}>
                    <Text style={styles.title}>Questão { questionNumber }</Text>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },

    content: {
        paddingHorizontal: 10
    },

    title: {
        color: Colors.PRIMARY_COLOR,
        fontSize: '22px',
        textAlign: 'center'
    },

    contentText: {
        color: Colors.TEXT_COLOR,
        fontSize: '18px',
        textAlign: 'center'
    }
})