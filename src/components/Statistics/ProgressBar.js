import { FontAwesome5 } from "@expo/vector-icons";
import {
    StyleSheet, 
    Text, 
    View
} from "react-native";
import Colors from "../../utils/ColorPallete/Colors";

export default function ProgressBar({ title, currentData, maxData, newStyle, showIcon, userLevel }) {
    return (
        <View style={[styles.progressBarComponent, newStyle]}>
            <Text style={styles.progressBarTitle}>{title}</Text>
            <View style={styles.progressBar}>
                {
                    showIcon && (
                        <View style={{ justifyContent: 'center', alignItems: 'center', zIndex: 2, position: 'absolute', margin: -20 }}>
                            <FontAwesome5 name="certificate" size={45} color={Colors.PRIMARY_COLOR} />
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: Colors.WHITE_SAFE_COLOR, position: 'absolute' }}>{userLevel}</Text>
                        </View>
                    )
                }
                <View style={[styles.progress, { width: (currentData / maxData) * 100 + "%" }]}></View>
                <Text style={styles.progressBarText}>{currentData}/{maxData}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    progressBarComponent: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    progressBarTitle: {
        alignSelf: 'center',
        fontSize: 20,
        color: Colors.PRIMARY_COLOR
    },

    progressBar: {
        backgroundColor: Colors.LIGHT_GRAY,
        width: '70%',
        borderRadius: 50,
        height: 25,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.BOTTOM_SHEET_SCREEN_BACKGROUND
    },

    progress: {
        backgroundColor: Colors.GREEN_PROGRESS_BAR,
        height: '100%',
        position: 'absolute',
        borderRadius: 50
    },

    progressBarText: {
        textAlign: 'center',
        color: Colors.TEXT_COLOR,
        fontSize: 17
    }
})