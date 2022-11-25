import { useState, useEffect } from 'react';
import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';

import Colors from '../../utils/ColorPallete/Colors';
import Header from '../../components/Header/HeaderComponent';
import ButtonComponent from '../../components/Buttons/ButtonComponent';

import { Dimensions } from "react-native";

import Axios from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastComponent from '../../components/Toast/ToastComponent';
import InputTextComponent from '../../components/InputText/InputTextComponent';
import Messages from '../../utils/Messages';

var width = Dimensions.get('window').width; 

export default function ChangePassword({navigation}) {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(false);
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submited, setSubmited] = useState(false);

    useEffect(() => {
        async function getData() {
            let user = JSON.parse(await AsyncStorage.getItem('@User'))
            setUser(user);
        }

        getData();
    }, []);

    function regPassword(password) {
        return RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$').test(password);
    }

    async function changeUserPassword() {
        setSubmited(true);
        setIsLoading(true);

        if(password && newPassword && regPassword(newPassword)) {
            try {
                if (user != null) {
                    const response = await Axios.put('/ChangePassword/' + user.userID, {
                        password,
                        newPassword
                    });

                    if(response.data.user) {   
                        ToastComponent(Messages.PASSWORD_UPDATED);
                        setPassword('');
                        setNewPassword('');
                        setSubmited(false);
                        setError('')
                    }

                    setIsLoading(false);
                }
            } catch(e) {
                setIsLoading(false);
                setError(e.response.data.message);
            }
        }

        setIsLoading(false);
    }

    return (
        <SafeAreaView style={styles.allPagesCode}> 
            <Header backArrow={true} navigation={navigation} />
            <View style={styles.principalView}>
                <Text style={styles.titleLogo}>Alteração de Senha</Text> 

                <View>
                    <InputTextComponent
                        secure={true}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Confirme sua senha"
                        icon='lock'
                    >
                        {
                            (password.trim() === '' && submited) && (
                                <Text style={styles.errorText}>{Messages.PASSWORD_IS_REQUIRED}</Text>
                            )
                        }
                    </InputTextComponent>

                    <InputTextComponent
                        secure={true}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Digite a nova senha"
                        icon='lock'
                    >
                        {
                            (newPassword.trim() === '' && submited) && (
                                <Text style={styles.errorText}>{Messages.NEW_PASSWORD_IS_REQUIRED}</Text>
                            )
                        }
                        {
                            (newPassword.trim() !== '' && !(regPassword(newPassword)) && submited) && (
                                <Text style={styles.errorText}>{Messages.PASSWORD_WEAK_TEXT}</Text>
                            )
                        }
                    </InputTextComponent>

                    <Text style={styles.errorText}>{error}</Text>
                </View>

                <View>
                    <ButtonComponent 
                        newStyle={{ 
                            width: width - 20, 
                            backgroundColor: Colors.PRIMARY_COLOR, 
                            marginBottom: 20 
                        }}
                        onPress={changeUserPassword}
                        disabled={isLoading}
                        isLoading={isLoading}>
                        <Text style={styles.buttonText}>Atualizar Senha</Text>
                    </ButtonComponent>
                </View>
                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    allPagesCode:{
        flex: 1,
        backgroundColor: Colors.WHITE_SAFE_COLOR
   },

    principalView: {
        flex: 1,
        backgroundColor: Colors.WHITE_SAFE_COLOR,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    titleLogo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.PRIMARY_COLOR,
        marginBottom: 20,
        textAlign: 'center'
    },

    buttonText: {
        color: Colors.WHITE_SAFE_COLOR,
        fontSize: 20
    },

    errorText: {
        color: Colors.ERROR_COLOR,
        textAlign: 'center'
    }
})