import { useEffect, useState } from 'react';
import { 
    KeyboardAvoidingView,
    Platform,
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native';

import Colors from '../../utils/ColorPallete/Colors';
import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Header from '../../components/Header/HeaderComponent';
import Axios from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastComponent from '../../components/Toast/ToastComponent';
import InputTextComponent from '../../components/InputText/InputTextComponent';
import Messages from '../../utils/Messages';

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
                ToastComponent(Messages.USER_CREATED);
            }
    
            if(routeParams.params.deletedUser) {
                ToastComponent(Messages.USER_DELETED);
            }

            if(routeParams.params.passwordRecovered) {
                ToastComponent(Messages.USER_UPDATED);
            }
        }
    }, []);

    async function loginUser() {
        setError('');
        setIsLoading(true);
        setSubmited(true);

        if(!email || !password) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await Axios.post('/Login', {
                email,
                password
            });

            if(response.data.userInfo) {
                await AsyncStorage.setItem('@User', JSON.stringify(response.data.userInfo.user));
                await AsyncStorage.setItem('@Token', response.data.userInfo.token);

                setIsLoading(false);
                navigation.navigate('BottomTabComponent');
            }
        } catch(e) {
            setError(e.response.data.message);
        }
        setIsLoading(false);
    }

    function goToForgotPasswordEmail() {
        navigation.navigate('ForgotPasswordEmail');
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.allPagesCode}> 
            <Header backArrow={true} navigation={navigation} screenToReturn={() => navigation.navigate('Home')} />
            
            <View style={styles.principalView}>
                <Text style={styles.titleLogo}>Get MagiCode</Text>

                <Text style={styles.titlePage}>Login</Text>

                <InputTextComponent
                    onChangeText={setEmail}
                    value={email}
                    icon='mail'
                    placeholder='E-mail'
                    autoComplete="email"
                    keyboardType="email-address"
                    textContentType='emailAddress'
                    autoCapitalize='none'
                >
                    {
                        (email.trim() === '' && submited) && (
                            <Text style={styles.errorText}>{Messages.EMAIL_IS_REQUIRED}</Text>
                        )
                    }
                </InputTextComponent>

                <InputTextComponent
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder='Senha'
                    icon='lock'
                >
                    {
                        (password.trim() === '' && submited) && (
                            <Text style={styles.errorText}>{Messages.PASSWORD_IS_REQUIRED}</Text>
                        )
                    }
                </InputTextComponent>

                <Text style={styles.errorText}>{error}</Text>

                <ButtonComponent newStyle={styles.button} onPress={loginUser} isLoading={isLoading}>
                    <Text style={styles.textButton}>Entrar</Text>
                </ButtonComponent>
                <TouchableOpacity style={styles.buttonForgotPassword} onPress={goToForgotPasswordEmail}>
                    <Text style={styles.textForgotPassword}>Esqueci a senha</Text>
                </TouchableOpacity>
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

    button: {
        width: 200,
        height: 46,
        borderRadius: 40,
        alignSelf: 'center',
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