import { useState } from 'react';
import { 
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
import ToastComponent from '../../components/Toast/ToastComponent';

var width = Dimensions.get('window').width; 

export default function AccountScreen({navigation}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [editData, setEditData] = useState(false);
    const [error, setError] = useState(false);

    async function deleteAccount() {
        try {
            const response = await Axios.delete('/DeleteUser/' + '1');

            if(response.data.message) {
                navigation.navigate('Login');
            }
        } catch(e) {
            setError(e.response.data.message);
        }
    }

    async function editAccount() {
        if(editData) {
            const user = {
                nm_usuario: name,
                ds_email: email,
                dt_nascimento: birthday,
                nr_telefone: phone
            }

            try {
                const response = await Axios.put('/UpdateUser/' + '1', {
                    user
                });

                if(response.data.user) {
                    let user = response.data.user;
                    setName(user.nm_usuario);
                    setEmail(user.ds_email);
                    setPhone(user.nr_phone);
                    setBirthday(user.dt_nascimento);

                    ToastComponent('Dados atualizados com sucesso!');
                }
            } catch(e) {
                console.log(e);
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
                    />

                    <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        editable={editData}
                        style={styles.textInput}
                        placeholder="Telefone"
                    />

                <TextInput
                        value={birthday}
                        onChangeText={setBirthday}
                        editable={editData}
                        style={styles.textInput}
                        placeholder="Data Nascimento"
                    />
                </View>
            
                <View>
                    <ButtonComponent 
                        newStyle={{ 
                            width: width - 20, 
                            backgroundColor: Colors.PRIMARY_COLOR, 
                            marginBottom: 20 
                        }}
                        onPress={editAccount}>
                        <Text style={[styles.bottonText, { color: '#fff' }]}>{ editData ? 'Salvar' : 'Editar dados'}</Text>
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
})