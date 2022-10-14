import { 
    StyleSheet,
    View
} from "react-native";
import Colors from "../../utils/ColorPallete/Colors";
import AlternativeOptionComponent from "../AlternativeOption/AlternativeOptionComponent";

export default function RenderAlternativesComponent({ alternatives, checked, setChecked, answered, show, disabled }) {
    return (
        <>
            {
                show && (
                    <View style={styles.goalItem}>
                        {
                            alternatives.map((item) => (
                                <View key={item.alternativeID} style={answered ? (item.isCorrect ? styles.correctAlternative : styles.wrongAlternative) : styles.defaultAlternative}>
                                    <AlternativeOptionComponent
                                        disabled={disabled}
                                        value={item.alternativeID}
                                        label={item.alternativeID}
                                        status={(checked === item.alternativeID) ? 'checked' : 'unchecked'} 
                                        changeChecked={setChecked}
                                        alternativeText={item.description}
                                    />
                                </View>
                            ))
                        }
                    </View>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    goalItem: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    defaultAlternative: {
        width: '100%',
        marginVertical: 5,
        borderRadius: 5,
        borderColor: Colors.TEXT_COLOR,
        borderWidth: 1,
    },

    correctAlternative: {
        width: '100%',
        marginVertical: 5,
        borderRadius: 5,
        borderColor: Colors.GREEN_BUTTON_CONFIRM,
        backgroundColor: Colors.GREEN_BUTTON_CONFIRM,
        borderWidth: 1,
    },

    wrongAlternative: {
        width: '100%',
        marginVertical: 5,
        borderRadius: 5,
        borderColor: Colors.CANCEL_BUTTON,
        backgroundColor: Colors.CANCEL_BUTTON,
        borderWidth: 1,
    }
})