import { 
    Dimensions,
    Modal, 
    StyleSheet, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    View 
} from "react-native";
import Colors from "../../utils/ColorPallete/Colors";

const widthScreen = Dimensions.get('screen').width;
const heightScreen = Dimensions.get('screen').height;

export default function CardComponent({ showCard, setShowCard, children }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showCard}
            onRequestClose={() => setShowCard(!showCard)}

        >
            <TouchableOpacity style={styles.pvpCardBackground} onPressOut={() => setShowCard(!showCard)} activeOpacity={1}>
                <TouchableWithoutFeedback>
                    <View style={styles.pvpCard}>
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    pvpCardBackground: {
        width: widthScreen,
        height: heightScreen,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        position: 'absolute',
        justifyContent: 'center',  
        alignItems: 'center'
    },

    pvpCard: {
        backgroundColor: Colors.WHITE_SAFE_COLOR,
        padding: 20,
        borderRadius: 5,
        width: '70%'
    },
})
