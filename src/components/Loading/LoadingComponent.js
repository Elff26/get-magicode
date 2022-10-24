import { 
    ActivityIndicator,
    Dimensions,
    Modal, 
    StyleSheet,
    View
} from "react-native";
import Colors from "../../utils/ColorPallete/Colors";

const widthScreen = Dimensions.get('screen').width;
const heightScreen = Dimensions.get('screen').height;

export default function LoadingComponent() {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={() => {}}

        >   
            <View style={styles.pvpCardBackground}>
                <View style={styles.pvpCard}>
                    <ActivityIndicator size={50} color={Colors.PRIMARY_COLOR} />
                </View>
            </View>
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
    },
})
