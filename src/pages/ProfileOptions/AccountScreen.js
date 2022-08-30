import { useState, useEffect } from 'react';
import { 
    ActivityIndicator,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TextInput, 
    View 
} from 'react-native';
import MaskInput from 'react-native-mask-input';

import Colors from '../../utils/ColorPallete/Colors';
import Header from '../../components/Header/HeaderComponent';
import ButtonComponent from '../../components/Buttons/ButtonComponent';

import { Dimensions } from "react-native";

import Axios from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastComponent from '../../components/Toast/ToastComponent';

var width = Dimensions.get('window').width; 

export default function AccountScreen({navigation}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [editData, setEditData] = useState(false);
    const [error, setError] = useState(false);
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            let user = JSON.parse(await AsyncStorage.getItem('@User'))
            setUser(user);
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            setBirthday(user.birthday);
        }
        getData();
    }, [])
    
    async function deleteAccount() {
        try {
            if (user != null) {
                
                const response = await Axios.delete('/DeleteUser/' + user.userID);
                
                if(response.data.message) {
                    navigation.navigate('Login', {
                        deletedUser: true
                    });
                }
            }
        } catch(e) {
            setError(e.response.data.message);
        }
    }

    async function editAccount() {
        if(editData) {
            setIsLoading(true);
            const dataUser = {
                ...user,
                name,
                email,
                birthday,
                phone
            }

            try {
                if (user != null) {
                    const response = await Axios.put('/UpdateUser/' + user.userID, {
                        user:dataUser
                    });
    
                    if(response.data.user) {
                        let user = response.data.user;

                        setUser(user);
                        setName(user.name);
                        setEmail(user.email);
                        setPhone(user.phone);
                        setBirthday(user.birthday);

                        await AsyncStorage.mergeItem('@User', JSON.stringify(user));

                        setIsLoading(false);
                        ToastComponent('Dados atualizados com sucesso!');
                    }
                    setIsLoading(false);
                }
            } catch(e) {
                setIsLoading(false);
                setError(e.response.data.message);
            }
        }

        setEditData(!editData);
    }

    return (
        <SafeAreaView style={styles.allPagesCode}> 
            <Header backArrow={true} navigation={navigation} />
            <View style={styles.principalView}>
                <View>
                    <Text style={styles.titleLogo}>Dados da conta</Text> 

                    <TextInput
                        value={name}
                        onChangeText={setName}
                        editable={editData}
                        style={styles.textInput}
                        placeholder="Nome"
                    />

                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        editable={editData}
                        style={styles.textInput}
                        placeholder="E-mail"
                        autoComplete="email"
                        keyboardType="email-address"
                        textContentType='emailAddress'
                    />

                    <MaskInput
                        placeholder='Telefone'
                        onChangeText={(masked, unmasked) => setPhone(unmasked)}
                        value={phone}
                        style={styles.textInput}
                        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        keyboardType="phone-pad"
                        editable={editData}
                    />

                    <MaskInput
                        placeholder='Data de Nascimento'
                        onChangeText={(masked, unmasked) => setBirthday(masked)}
                        value={birthday}
                        style={styles.textInput}
                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                        editable={editData}
                    />
                </View>

                <Text style={styles.errorText}>{error}</Text>
            
                <View>
                    <ButtonComponent 
                        newStyle={{ 
                            width: width - 20, 
                            backgroundColor: Colors.PRIMARY_COLOR, 
                            marginBottom: 20 
                        }}
                        onPress={editAccount}
                        disabled={isLoading}>
                        {
                            isLoading && (
                                <ActivityIndicator />
                            )
                        }
                        {
                            !isLoading && (
                                <Text style={[styles.bottonText, { color: '#fff' }]}>{ editData ? 'Salvar' : 'Editar dados'}</Text>
                            )
                        }
                    </ButtonComponent>
                    <ButtonComponent 
                        newStyle={{ 
                            width: width - 20, 
                            backgroundColor: Colors.BUTTON_VERSUS_BACKGROUND 
                        }}>
                        <Text style={styles.bottonText} onPress={deleteAccount}>Excluir conta</Text>
                    </ButtonComponent>
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
        justifyContent: 'space-around'
    },

    titleLogo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.PRIMARY_COLOR,
        marginBottom: 20,
        textAlign: 'center'
    },

    bottonText: {
        color: Colors.TEXT_COLOR,
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