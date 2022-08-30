import { useState } from 'react';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import MaskInput from 'react-native-mask-input';
import { 
    StyleSheet, 
    Text, 
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from 'react-native'

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Header from '../../components/Header/HeaderComponent';
import Colors from '../../utils/ColorPallete/Colors'
import Axios from '../../api/api';

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
        let reg = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

        if(!name || !email || !birthday || !phone || !password || !reg.test(email)) {
            setIsLoading(false);
            return;
        }

        const user = {
            name,
            email,
            birthday,
            phone,
            password
        }

        try {
            const response = await Axios.post('/CreateUser', {
                user
            });

            if(response.data.user) {
                setIsLoading(false);
                navigation.navigate('Login', {
                    userRegistered: true
                });
            }
            setIsLoading(false);
        } catch(e) {
            setIsLoading(false);
            setError(e.response.data.message);
        }
    }

    return(
        <View style={styles.main}>
            <ScrollView contentContainerStyle={styles.form}>
            <Header backArrow={true} navigation={navigation}/>
                <Text style={styles.title}>Cadastre-se</Text>
                <TextInput
                    placeholder='Nome Completo'
                    onChangeText={setName}
                    value={name}
                    style={styles.textInput}
                />
                {
                    (name.trim() === '' && submited) && (
                        <Text style={styles.errorText}>Name is required</Text>
                    )
                }
                

                <TextInput
                    placeholder='Email'
                    onChangeText={setEmail}
                    value={email}
                    style={styles.textInput}
                    autoComplete="email"
                    keyboardType="email-address"
                    textContentType='emailAddress'
                    
                />
                {
                    (email.trim() === '' && submited) && (
                        <Text style={styles.errorText}>Email is required</Text>
                    )
                }
                {
                    (email.trim() !== '' && !(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email)) && submited) && (
                        <Text style={styles.errorText}>Invalid email</Text>
                    )
                }

                <MaskInput
                    placeholder='Data de Nascimento'
                    onChangeText={(masked, unmasked) => setBirthday(masked)}
                    value={birthday}
                    style={styles.textInput}
                    mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                />
                {
                    (birthday.trim() === '' && submited) && (
                        <Text style={styles.errorText}>Birthday is required</Text>
                    )
                }

                <MaskInput
                    placeholder='Telefone'
                    onChangeText={(masked, unmasked) => setPhone(unmasked)}
                    value={phone}
                    style={styles.textInput}
                    mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    keyboardType="phone-pad"
                />
                {
                    (phone.trim() === '' && submited) && (
                        <Text style={styles.errorText}>Phone is required</Text>
                    )
                }

                <TextInput
                    placeholder='Senha'
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                    style={styles.textInput}
                />
                {
                    (password.trim() === '' && submited) && (
                        <Text style={styles.errorText}>Password is required</Text>
                    )
                }

                <ButtonComponent newStyle={styles.button} onPress={registerUser} disabled={isLoading}>
                    {
                        isLoading && (
                            <ActivityIndicator />
                        )
                    }
                    {
                        !isLoading && (
                            <Text style={styles.buttonText}>Criar Conta</Text>
                        )
                    }
                </ButtonComponent>

                <Text style={styles.errorText}>{error}</Text>

                <View style={styles.viewLoginOptions}>
                    <Text style={styles.simpleText}>Ou entre com: </Text>
                    <View style={styles.loginOptions}>
                        <TouchableOpacity>
                            <FontAwesome5 name='facebook' size={24} color="#3b5998" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <MaterialCommunityIcons name='gmail' size={24} color="#c71610" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

export default Register

const styles = StyleSheet.create({
    main:{
        flex: 1,       
        backgroundColor: '#FFFFFF'
    },

    form:{
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 30
    },

    title:{
        alignSelf: 'center',
        fontSize: 34,
        color: Colors.PRIMARY_COLOR
    },

    textInput:{
        width: 251.93,
        height: 40,
        padding: 10,
        marginTop: 20,
        backgroundColor: Colors.TEXT_INPUT_BACKGROUND,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: Colors.PRIMARY_COLOR,
        borderRadius: 20
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
        color: '#FFFFFF',
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

    viewLoginOptions:{
        marginTop: '10%'
    },
    
    errorText: {
        color: Colors.ERROR_COLOR,
        textAlign: 'center'
    }
})