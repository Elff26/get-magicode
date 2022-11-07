import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Colors from '../../utils/ColorPallete/Colors';
import Header from '../../components/Header/HeaderComponent';
import ButtonComponent from '../../components/Buttons/ButtonComponent';

import { Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import ToastComponent from '../../components/Toast/ToastComponent';

import { 
    SECURE_STORE_KEY
  } from '@env';

var width = Dimensions.get('window').width; 

export default function ProfileOptions({navigation}) {
    function goToPrivacyAndSecurityScreen() {
        navigation.navigate('PrivacyAndSecurity');
    }

    function goToAccountScreen() {
        navigation.navigate('Account');
    }

    async function logout() {
        await AsyncStorage.clear();
        await SecureStore.deleteItemAsync(SECURE_STORE_KEY).then(() => {
            navigation.reset({
                index: 0,
                routes: [{
                    name: 'Home'
                }]
            });
        })
        .catch(e => {
            ToastComponent('Erro ao deslogar da aplicação. Tente novamente mais tarde!');
        });
    }

    function goToSetAGoal() {
        navigation.navigate('SetAGoal');
    }

    return (
        <SafeAreaView style={styles.allPagesCode}> 
            <Header backArrow={true} navigation={navigation} />
            <View style={styles.principalView}>
                <View>
                    <Text style={styles.titleLogo}>Configurações</Text> 

                    <TouchableOpacity style={styles.optionButton} onPress={goToPrivacyAndSecurityScreen}>
                        <Text style={styles.bottonText}>Privacidade e Segurança</Text>
                        <Feather name='chevron-right' color={Colors.TEXT_COLOR} size={32} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={goToAccountScreen}>
                        <Text style={styles.bottonText}>Conta</Text>
                        <Feather name='chevron-right' color={Colors.TEXT_COLOR} size={32} />
                    </TouchableOpacity>
                </View>
            
                <ButtonComponent 
                    newStyle={{ 
                        flexDirection: 'row', 
                        width: width - 20, 
                        backgroundColor: Colors.BUTTON_VERSUS_BACKGROUND 
                    }}
                    onPress={logout}>
                    <Text style={styles.bottonText}>Sair</Text>
                </ButtonComponent>
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

    optionButton: {
        width: width,
        borderBottomColor: Colors.LINE_COLOR,
        borderBottomWidth: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    bottonText: {
        color: Colors.TEXT_COLOR,
        fontSize: 20
    }
})