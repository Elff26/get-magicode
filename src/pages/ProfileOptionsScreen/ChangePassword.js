import { useState, useEffect } from 'react';
import { 
    ActivityIndicator,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TextInput, 
    View 
} from 'react-native';

import Colors from '../../utils/ColorPallete/Colors';
import Header from '../../components/Header/HeaderComponent';
import ButtonComponent from '../../components/Buttons/ButtonComponent';

import { Dimensions } from "react-native";

import Axios from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastComponent from '../../components/Toast/ToastComponent';

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

    async function changeUserPassword() {
        setSubmited(true);
        setIsLoading(true);

        if(password && newPassword) {
            try {
                if (user != null) {
                    const response = await Axios.put('/ChangePassword/' + user.userID, {
                        password,
                        newPassword
                    });

                    if(response.data.user) {   
                        ToastComponent('Senha atualizada com sucesso!');
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
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={styles.textInput}
                        placeholder="Confirme sua senha"
                        secureTextEntry={true}
                    />
                    {
                        (password.trim() === '' && submited) && (
                            <Text style={styles.errorText}>Password is required</Text>
                        )
                    }

                    <TextInput
                        value={newPassword}
                        onChangeText={setNewPassword}
                        style={styles.textInput}
                        placeholder="Digite a nova senha"
                        secureTextEntry={true}
                    />
                    {
                        (newPassword.trim() === '' && submited) && (
                            <Text style={styles.errorText}>New password is required</Text>
                        )
                    }

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

    textInput:{
        width: width - 20,
        height: 40,
        padding: 10,
        marginTop: 20,
        backgroundColor: Colors.TEXT_INPUT_BACKGROUND,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: Colors.PRIMARY_COLOR,
        borderRadius: 20
    },

    errorText: {
        color: Colors.ERROR_COLOR,
        textAlign: 'center'
    }
})