import { 
    StyleSheet, 
    View 
} from 'react-native';

import Colors from '../../utils/ColorPallete/Colors';
import { Feather } from '@expo/vector-icons';
import MaskInput from 'react-native-mask-input';

export default function MaskTextComponent({ children, ...props }) {
    return (
        <>
            <View style={styles.textInputContent}>
                <View style={styles.inputIcon}>
                    <Feather name={props.icon} color={Colors.TEXT_COLOR} size={24} />
                </View>
                <View style={styles.inputData}>
                    <MaskInput
                        style={styles.textInput}
                        {...props}
                    />
                </View>
            </View>
            {children}
        </>
    );
}

const styles = StyleSheet.create({
    textInputContent: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 5,
        borderWidth: 1,
        borderColor: Colors.PRIMARY_COLOR,
        backgroundColor: Colors.TEXT_INPUT_BACKGROUND,
        borderRadius: 10,
        padding: 5
    },

    inputIcon: {
        marginHorizontal: 5
    },

    textInput: {
        width: '100%',
        height: 42
    },

    inputData: {
        width: '80%'
    },

    errorText: {
        color: Colors.ERROR_COLOR,
        textAlign: 'center'
    }
})