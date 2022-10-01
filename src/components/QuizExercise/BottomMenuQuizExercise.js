import { useEffect, useState } from "react"
import { Feather } from '@expo/vector-icons';
import { 
    ScrollView,
    StyleSheet, 
    Text,
    View
} from "react-native";

import Colors from '../../utils/ColorPallete/Colors';
import ButtonComponent from '../../components/Buttons/ButtonComponent';

export default function BottomMenuQuizExercise({ questionNumber, numberOfExercises, goToNextQuestion }) {
    return (
            <>
                {
                    questionNumber >= numberOfExercises && (
                        <ButtonComponent newStyle={styles.confirmButton} onPress={goToNextQuestion}>
                            <Text style={styles.textButton}>
                                <Feather name="check" color={Colors.WHITE_SAFE_COLOR} size={32} />
                            </Text>
                        </ButtonComponent>
                    )
                }
            </>
    )
}

const styles = StyleSheet.create({
    textButton: {
        color: Colors.WHITE_SAFE_COLOR
    },

    newStyleButton: {
        borderRadius: 50,
        width: 50,
        height: 50
    },

    newStyleButtonDisabled: {
        borderRadius: 50,
        width: 50,
        height: 50,
        backgroundColor: Colors.PRIMARY_COLOR_DISABLED
    },

    confirmButton: {
        borderRadius: 50,
        width: 50,
        height: 50,
        backgroundColor: Colors.GREEN_BUTTON_CONFIRM
    }
})