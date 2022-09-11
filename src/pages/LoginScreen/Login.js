import { useEffect, useState } from 'react';
import { 
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastComponent from '../../components/Toast/ToastComponent';


export default function Login({ route, navigation }) {
    const routeParams = route;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submited, setSubmited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(routeParams.params) {
            if(routeParams.params.userRegistered) {
                ToastComponent('Usuário criado com sucesso!');
            }
    
            if(routeParams.params.deletedUser) {
                ToastComponent('Usuário deletado com sucesso!');
            }

            if(routeParams.params.passwordRecovered) {
                ToastComponent('Senha atualizada com sucesso!');
            }
        }
    }, []);

    async function loginUser() {
        setError('');
        setIsLoading(true);
        setSubmited(true);

        if(!email || !password) {
            return;
        }

        try {
            const response = await Axios.post('/Login', {
                email,
                password
            });

            if(response.data.user) {
                await AsyncStorage.setItem('@User', JSON.stringify(response.data.user));
                setIsLoading(false);
                navigation.navigate('BottomTabComponent');
            }
            setIsLoading(false);
        } catch(e) {
            setIsLoading(false);
            setError(e.response.data.message);
        }
        setIsLoading(false);
    }

    function goToForgotPasswordEmail() {
        navigation.navigate('ForgotPasswordEmail');
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.allPagesCode}> 
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
                        autoComplete="email"
                        keyboardType="email-address"
                        textContentType='emailAddress'
                    />
                    {
                        (email.trim() === '' && submited) && (
                            <Text style={styles.errorText}>Email is required</Text>
                        )
                    }

                    <TextInput
                        style={styles.textInput}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={true}
                        placeholder='Password'
                    />
                    {
                        (password.trim() === '' && submited) && (
                            <Text style={styles.errorText}>Password is required</Text>
                        )
                    }

                    <Text style={styles.errorText}>{error}</Text>

                    <ButtonComponent newStyle={styles.button} onPress={loginUser} isLoading={isLoading}>
                        <Text style={styles.textButton}>Entrar</Text>
                    </ButtonComponent>
                    <TouchableOpacity style={styles.buttonForgotPassword} onPress={goToForgotPasswordEmail}>
                        <Text style={styles.textForgotPassword}>Esqueci a senha</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    allPagesCode:{
        flex: 1,
        backgroundColor:  Colors.WHITE_SAFE_COLOR
   },

    principalView: {
        flex: 1,
        backgroundColor: Colors.WHITE_SAFE_COLOR,
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
        color:  Colors.WHITE_SAFE_COLOR
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
    },

    errorText: {
        color: Colors.ERROR_COLOR,
        textAlign: 'center'
    }
})