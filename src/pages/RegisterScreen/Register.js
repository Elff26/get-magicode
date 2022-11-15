import { useState } from 'react';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { 
    Dimensions,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity
} from 'react-native'

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Header from '../../components/Header/HeaderComponent';
import Colors from '../../utils/ColorPallete/Colors'
import Axios from '../../api/api';
import InputTextComponent from '../../components/InputText/InputTextComponent';
import MaskTextComponent from '../../components/InputText/MaskTextComponent';
import GoogleAuth from '../../utils/ThirdAuth/GoogleAuth';
import FacebookAuth from '../../utils/ThirdAuth/FacebookAuth';
import { LogBox } from "react-native";
import DateUtils from '../../utils/DateUtils';
import Messages from '../../utils/Messages';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const heightScreen = Dimensions.get('screen').height;

const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submited, setSubmited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function registerUser() {
        setError('');
        setIsLoading(true);
        setSubmited(true);

        if(!name || !email || !birthday || birthday.length !== 10 || !phone || phone.length !== 11 || !regPassword(password) || !regEmail(email)) {
            setIsLoading(false);
            return;
        }

        const user = {
            name,
            email,
            birthday: DateUtils.dateConvertToEUA(birthday),
            phone,
            password
        }

        try {
            const response = await Axios.post('/CreateUser', {
                user
            });

            if(response.data.user) {
                let user = response.data.user;

                const userStatisticsResponse = await Axios.post(`/CreateUserStatistics/${user.userID}`);

                if(userStatisticsResponse.data.user) {
                    setIsLoading(false);
                    navigation.navigate('Login', {
                        userRegistered: true
                    });
                }
            }
            setIsLoading(false);
        } catch(e) {
            setIsLoading(false);
            setError(e.response.data.message);
        }
    }

    
    const onGoogleAuthentication = async () => {
        setError("");
        GoogleAuth(navigation, setError)
    }

    const onFacebookAuthentication = async () => {
        setError("");
        FacebookAuth(navigation, setError);
    }

    function regEmail(email) {
        return (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi).test(email);
    }

    function regPassword(password) {
        return RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$').test(password);
    }

    return(
        <KeyboardAvoidingView enabled={false} style={styles.main}>
            <ScrollView behavior={Platform.OS === "ios" ? "padding" : "height"} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps={'handled'}>
                <View style={styles.header}>
                    <Header backArrow={true} navigation={navigation} />

                    <Text style={styles.title}>Cadastre-se</Text>
                </View>
            
                <View style={styles.formRegister}>
                    <InputTextComponent
                        placeholder='Nome Completo'
                        onChangeText={setName}
                        value={name}
                        icon='user'
                    >
                        {
                            (name.trim() === '' && submited) && (
                                <Text style={styles.errorText}>{Messages.NAME_IS_REQUIRED}</Text>
                            )
                        }
                    </InputTextComponent>     

                    <InputTextComponent
                        placeholder='Email'
                        onChangeText={setEmail}
                        value={email}
                        autoComplete="email"
                        keyboardType="email-address"
                        textContentType='emailAddress'
                        autoCapitalize='none'
                        icon='mail'
                    >
                        {
                            (email.trim() === '' && submited) && (
                                <Text style={styles.errorText}>{Messages.EMAIL_IS_REQUIRED}</Text>
                            )
                        }
                        {
                            (email.trim() !== '' && !(regEmail(email)) && submited) && (
                                <Text style={styles.errorText}>{Messages.INVALID_EMAIL}</Text>
                            )
                        }
                    </InputTextComponent>      

                    <MaskTextComponent 
                        placeholder='Data de Nascimento'
                        onChangeText={(masked, unmasked) => setBirthday(masked)}
                        value={birthday}
                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                        icon='calendar'
                    >
                        {
                            (birthday.trim() === '' && submited) && (
                                <Text style={styles.errorText}>{Messages.BIRTHDAY_IS_REQUIRED}</Text>
                            )
                        }
                        {
                            (birthday.trim() !== '' && birthday.length !== 10 && submited) && (
                                <Text style={styles.errorText}>{Messages.BIRTHDAY_MINIMUM_DIGITS}</Text>
                            )
                        }
                    </MaskTextComponent>

                    <MaskTextComponent 
                        placeholder='Celular'
                        onChangeText={(masked, unmasked) => setPhone(unmasked)}
                        value={phone}
                        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        keyboardType="phone-pad"
                        icon='phone'
                    >
                        {
                            (phone.trim() === '' && submited) && (
                                <Text style={styles.errorText}>{Messages.PHONE_IS_REQUIRED}</Text>
                            )
                        }
                        {
                            (phone.trim() !== '' && phone.length !== 11 && submited) && (
                                <Text style={styles.errorText}>{Messages.PHONE_MINIMUM_DIGITS}</Text>
                            )
                        }
                    </MaskTextComponent>            

                    <InputTextComponent
                        placeholder='Senha'
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                        icon='lock'
                    >
                        {
                            (password.trim() === '' && submited) && (
                                <Text style={styles.errorText}>{Messages.PASSWORD_IS_REQUIRED}</Text>
                            )
                        }
                        {
                            (password.trim() !== '' && !(regPassword(password)) && submited) && (
                                <Text style={styles.errorText}>{Messages.PASSWORD_WEAK_TEXT}</Text>
                            )
                        }
                    </InputTextComponent>   

                    <ButtonComponent newStyle={styles.button} onPress={registerUser} isLoading={isLoading}>
                        <Text style={styles.buttonText}>Criar Conta</Text>
                    </ButtonComponent>

                    <Text style={styles.errorText}>{error}</Text>
                </View>

                <View>
                    <Text style={styles.simpleText}>Ou entre com: </Text>
                    <View style={styles.loginOptions}>
                        <TouchableOpacity onPress={onFacebookAuthentication}>
                            <FontAwesome5 name='facebook' size={24} color={Colors.BLUE_FACEBOOK_ICON} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onGoogleAuthentication}>
                            <MaterialCommunityIcons name='gmail' size={24} color={Colors.RED_GMAIL_ICON} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    main:{
        flex: 1,       
        backgroundColor: Colors.WHITE_SAFE_COLOR,
    },

    scrollContent: {
        height: heightScreen - 30,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 30
    },

    header: {
        width: '100%'
    },

    title:{
        alignSelf: 'center',
        fontSize: 34,
        color: Colors.PRIMARY_COLOR
    },

    formRegister: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        width: 198,
        height: 49,
        margin: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        backgroundColor: Colors.PRIMARY_COLOR
    },

    buttonText:{
        color: Colors.WHITE_SAFE_COLOR,
        fontSize: 18
    },

    simpleText: {
        color: Colors.TEXT_COLOR,
        fontSize: 18
    },

    loginOptions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    
    errorText: {
        color: Colors.ERROR_COLOR,
        textAlign: 'center'
    }
})