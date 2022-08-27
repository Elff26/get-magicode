import { useState } from 'react';
import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import Colors from '../../utils/ColorPallete/Colors';
import Header from '../../components/Header/HeaderComponent';
import ButtonComponent from '../../components/Buttons/ButtonComponent';

import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; 

export default function AccountScreen({navigation}) {
    const [name, setName] = useState('Jão');
    const [email, setEmail] = useState('jao@gmail.com');
    const [phone, setPhone] = useState('11111');
    const [birthday, setBirthday] = useState('16/05/1998');
    const [editData, setEditData] = useState(false);

    return (
        <SafeAreaView style={styles.allPagesCode}> 
            <Header backArrow={true} navigation={navigation} />
            <View style={styles.principalView}>
                <View>
                    <Text style={styles.titleLogo}>Dados da conta</Text> 

                    <TextInput
                        value={name}
                        onChange={setName}
                        editable={editData}
                        style={styles.textInput}
                    />

                    <TextInput
                        value={email}
                        onChange={setEmail}
                        editable={editData}
                        style={styles.textInput}
                    />

                    <TextInput
                        value={phone}
                        onChange={setPhone}
                        editable={editData}
                        style={styles.textInput}
                    />

                <TextInput
                        value={birthday}
                        onChange={setBirthday}
                        editable={editData}
                        style={styles.textInput}
                    />
                </View>
            
                <View>
                    <ButtonComponent 
                        newStyle={{ 
                            width: width - 20, 
                            backgroundColor: Colors.PRIMARY_COLOR, 
                            marginBottom: 20 
                        }}
                        onPress={() => setEditData(!editData)}>
                        <Text style={[styles.bottonText, { color: '#fff' }]}>{ editData ? 'Salvar' : 'Editar dados'}</Text>
                    </ButtonComponent>
                    <ButtonComponent 
                        newStyle={{ 
                            width: width - 20, 
                            backgroundColor: Colors.BUTTON_VERSUS_BACKGROUND 
                        }}>
                        <Text style={styles.bottonText}>Excluir conta</Text>
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