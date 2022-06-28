import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../components/ColorPallete/Colors';

export default function Login() {
    return (
        <View style={styles.principalView}>
            <Text style={styles.titleLogo}>Get MagiCode</Text>
            <View>
                <Text style={styles.titlePage}>Login</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='E-mail'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonForgotPassword}>
                    <Text style={styles.textForgotPassword}>Esqueci a senha</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    principalView: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

    titleLogo: {
        fontSize: 48,
        fontWeight: '400',
        color: Colors.PRIMARY_COLOR
    },

    titlePage: {
        fontSize: 36,
        fontWeight: 400,
        textAlign: 'center',
        marginTop: -100
    },

    textInput: {
        width: 232,
        height: 35,
        borderWidth: 1,
        borderColor: Colors.PRIMARY_COLOR,
        borderRadius: 50,
        textAlign: 'center',
        marginTop: 25,
        backgroundColor: '#E9E9E9'
    },

    button: {
        width: 198,
        height: 46,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY_COLOR,
        marginTop: 50,
        marginLeft: 16
    },

    textButton: {
        color: '#FFFFFF'
    },

    buttonForgotPassword: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        fontSize: 18
    },

    textForgotPassword: {
        color: Colors.TEXT_COLOR
    }
})