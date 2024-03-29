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
import MaskTextComponent from '../../components/InputText/MaskTextComponent';
import InputTextComponent from '../../components/InputText/InputTextComponent';
import CardComponent from "../../components/Card/CardComponent";
import DateUtils from '../../utils/DateUtils';
import * as SecureStore from 'expo-secure-store';

import { 
    SECURE_STORE_KEY
} from '@env';
import Messages from '../../utils/Messages';

var width = Dimensions.get('window').width; 

export default function Account({navigation}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [editData, setEditData] = useState(false);
    const [error, setError] = useState(false);
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);

    useEffect(() => {
        async function getData() {
            let user = JSON.parse(await AsyncStorage.getItem('@User'))
            setUser(user);
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            setBirthday(DateUtils.dateConvertToBrasil(user.birthday));
        }
        getData();
    }, []);

    useEffect(() => {

    }, []);
    
    async function deleteAccount() {
        try {
            if (user != null) {
                setIsLoading(true);

                const response = await Axios.delete('/DeleteUser/' + user.userID);
                
                if(response.data.message) {
                    await AsyncStorage.clear();
                    SecureStore.deleteItemAsync(SECURE_STORE_KEY).then(() => {
                        returnToHome();
                    }).catch(() => {
                        returnToHome();
                    });
                }
            }
        } catch(e) {
            setError(e.response.data.message);
        }
    }

    function returnToHome() {
        setIsLoading(false);
        navigation.reset({
            index: 0,
            routes: [{
                name: 'Login',
                params: {
                    deletedUser: true
                }
            }]
        });
    }

    async function editAccount() {
        if(editData) {
            setIsLoading(true);
            const dataUser = {
                ...user,
                name,
                email,
                birthday: DateUtils.dateConvertToEUA(birthday),
                phone
            }

            try {
                if (user != null) {
                    const response = await Axios.put('/UpdateUser/' + user.userID, {
                        user:dataUser
                    });
    
                    if(response.data.user) {
                        let userUpdated = response.data.user
                        setUser(userUpdated);
                        setName(userUpdated.name);
                        setEmail(userUpdated.email);
                        setPhone(userUpdated.phone);
                        setBirthday(DateUtils.dateConvertToBrasil(userUpdated.birthday));

                        await AsyncStorage.mergeItem('@User', JSON.stringify(userUpdated));

                        setIsLoading(false);
                        ToastComponent(Messages.DATA_UPDATED);
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

                    <InputTextComponent
                        value={name}
                        onChangeText={setName}
                        editable={editData}
                        placeholder="Nome"
                        icon='user'
                    />

                    <InputTextComponent
                        value={email}
                        onChangeText={setEmail}
                        editable={editData}
                        placeholder="E-mail"
                        autoComplete="email"
                        keyboardType="email-address"
                        textContentType='emailAddress'
                        autoCapitalize='none'
                        icon='mail'
                    />

                    <MaskTextComponent 
                        placeholder='Telefone'
                        onChangeText={(masked, unmasked) => setPhone(unmasked)}
                        value={phone}
                        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        keyboardType="phone-pad"
                        editable={editData}
                        icon='phone'
                    />

                    <MaskTextComponent 
                        placeholder='Data de Nascimento'
                        onChangeText={(masked, unmasked) => setBirthday(masked)}
                        value={birthday}
                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                        editable={editData}
                        icon='calendar'
                    />

                    <Text style={styles.errorText}>{error}</Text>
                </View>
            
                <View>
                    <ButtonComponent 
                        newStyle={{ 
                            width: width - 20, 
                            backgroundColor: Colors.PRIMARY_COLOR, 
                            marginBottom: 20 
                        }}
                        onPress={editAccount}
                        isLoading={isLoading}>
                        <Text style={[styles.bottonText, { color: '#fff' }]}>{ editData ? 'Salvar' : 'Editar dados'}</Text>
                    </ButtonComponent>
                    <ButtonComponent 
                        newStyle={{ 
                            width: width - 20, 
                            backgroundColor: Colors.BUTTON_VERSUS_BACKGROUND 
                        }}
                        isLoading={isLoading}
                        onPress={() => setShowDeleteAccount(true)}>
                        <Text style={styles.bottonText}>Excluir conta</Text>
                    </ButtonComponent>
                </View>
                
            </View>

            <CardComponent showCard={showDeleteAccount} setShowCard={setShowDeleteAccount}>
                <Text style={styles.deleteAccountText}>Você realmente deseja excluir sua conta?</Text>

                <View style={styles.separator}></View>

                <ButtonComponent onPress={() => deleteAccount()} isLoading={isLoading}>
                    <Text style={styles.bottonTextWhite}>Sim</Text>
                </ButtonComponent>
                <ButtonComponent onPress={() => setShowDeleteAccount(false)} isLoading={isLoading}>
                    <Text style={styles.bottonTextWhite}>Não</Text>
                </ButtonComponent>
            </CardComponent>
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

    bottonText: {
        color: Colors.TEXT_COLOR,
        fontSize: 20
    },

    errorText: {
        color: Colors.ERROR_COLOR,
        textAlign: 'center'
    },

    bottonTextWhite: {
        fontSize: 20,
        color: Colors.WHITE_SAFE_COLOR
    },

    deleteAccountText: {
        fontSize: 22,
        color: Colors.TEXT_COLOR,
        textAlign: 'center',
        marginBottom: 10
    },

    separator: {
        marginBottom: 10,
        borderWidth: .2,
        borderColor: Colors.LIGHT_GRAY,
        width: '100%'
    }
})