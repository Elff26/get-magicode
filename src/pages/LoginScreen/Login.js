import { useState } from 'react';
import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View 
} from 'react-native';

import Colors from '../../utils/ColorPallete/Colors';
import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Header from '../../components/Header/HeaderComponent';
import Axios from '../../api/api';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function loginUser() {
        setError('');

        const user = {
            email,
            password
        }

        try {
            const response = await Axios.post('/Login', {
                email,
                password
            });

            if(response.data.user) {
                navigation.navigate('BottomTabComponent');
            }
        } catch(e) {
            
            setError(e.response.data.message);
        }
    }

    function goToForgotPasswordEmail() {
        navigation.navigate('ForgotPasswordEmail');
    }

    function goToHomeScreen() {
        navigation.navigate('BottomTabComponent')
    }

    return (
        <SafeAreaView style={styles.allPagesCode}> 
            <Header backArrow={true} navigation={navigation} />
            <View style={styles.principalView}>
                <Text style={styles.titleLogo}>Get MagiCode</Text>
                <View>
                    <Text style={styles.titlePage}>Login</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setEmail}
                        value={email}
                        placeholder='E-mail'
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setPassword}
                        value={password}
                        placeholder='Password'
                    />

                    <Text>{error}</Text>

                    <ButtonComponent newStyle={styles.button}>
                        <Text style={styles.textButton} onPress={loginUser}>Entrar</Text>
                    </ButtonComponent>
                    <TouchableOpacity style={styles.buttonForgotPassword} onPress={goToForgotPasswordEmail}>
                        <Text style={styles.textForgotPassword}>Esqueci a senha</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    allPagesCode:{
        flex: 1,
        backgroundColor: '#fff'
   },
    principalView: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleLogo: {
        fontSize: 48,
        fontWeight: 'bold',
        color: Colors.PRIMARY_COLOR,
        marginBottom: 20
    },
    titlePage: {
        fontSize: 36,
        textAlign: 'center',
        color: Colors.TEXT_COLOR
    },
    textInput: {
        width: 232,
        height: 35,
        borderWidth: 1,
        borderColor: Colors.PRIMARY_COLOR,
        borderRadius: 50,
        textAlign: 'center',
        marginTop: 25,
        backgroundColor: Colors.TEXT_INPUT_BACKGROUND
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
        color: Colors.TEXT_COLOR,
        textAlign: 'center'
    }
})