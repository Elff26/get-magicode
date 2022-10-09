import { ScrollView, StyleSheet } from 'react-native';
import { Dialog, Text, Button } from 'react-native-paper';
import Colors from "../../utils/ColorPallete/Colors";

export default function DialogCardComponent({ title, description, onPressToClose, visible }) {
    return (
        <Dialog visible={visible} onDismiss={onPressToClose}>
            <Dialog.ScrollArea>
                <ScrollView contentContainerStyle={{padding: 24}}>                            
                    <Dialog.Title style={styles.achievementName}>{title}</Dialog.Title>

                    <Text style={styles.achievementDescription}>{description}</Text>
                </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions>
                <Button onPress={onPressToClose}>OK</Button>
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
})