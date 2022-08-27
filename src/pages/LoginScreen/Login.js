import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Colors from '../../utils/ColorPallete/Colors';
import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Header from '../../components/Header/HeaderComponent';
import Axios from '../../api/api';

//FOR BACK-END

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function loginUser() {
        setError('');

        if(!email || !password) {
            return setError('All fields are required!');
        }

        const user = {
            ds_email: email,
            ds_senha: password
        }
        //TO DO AXIOS CONNECTION WITH GET + OBJECT
        try {
            const response = await Axios.get('/CreateUser', {
                user
            });

            if(response.data.user) {
                navigation.navigate('BottomTabComponent');
            }
        } catch(e) {
            setError(e.response.data.message);
        }
    }

//FOR FRONT-END
    function goToForgotPasswordEmail() {
        navigation.navigate('ForgotPasswordEmail');
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
                        placeholder='E-mail'
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                    />

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
        color: Colors.TEXT_COLOR,
        textAlign: 'center'
    }
})