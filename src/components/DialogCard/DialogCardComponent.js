import { ScrollView, StyleSheet } from 'react-native';
import { Dialog, Text, Button } from 'react-native-paper';
import Colors from "../../utils/ColorPallete/Colors";

export default function DialogCardComponent({ title, description, onPressToClose, visible }) {
    return (
        <Dialog visible={visible} onDismiss={onPressToClose}>
            <Dialog.ScrollArea>
                <ScrollView>                            
                    <Dialog.Title style={styles.achievementName}>{title}</Dialog.Title>
                    
                    <Dialog.Content>
                        <Text style={styles.achievementXp}>20 XP</Text>

                        <Text style={styles.achievementDescription}>{description}</Text>
                    </Dialog.Content>
                </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions>
                <Button onPress={onPressToClose} color={Colors.PRIMARY_COLOR}>OK</Button>
            </Dialog.Actions>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    achievementName: {
        fontSize: 28,
        color: Colors.PRIMARY_COLOR,
        textAlign: 'center'
    },

    achievementDescription: {
        fontSize: 18,
        color: Colors.TEXT_COLOR,
        textAlign: 'justify'
    },

    achievementXp: {
        fontSize: 22,
        color: Colors.PRIMARY_COLOR,
        textAlign: 'center'
    }
})