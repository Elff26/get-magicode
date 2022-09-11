import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Colors from '../../utils/ColorPallete/Colors';
import Header from '../../components/Header/HeaderComponent';
import ButtonComponent from '../../components/Buttons/ButtonComponent';

import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; 

export default function PrivacyAndSecurityOptions({navigation}) {
    function goToChangePassword() {
        navigation.navigate('ChangePassword');
    }

    return (
        <SafeAreaView style={styles.allPagesCode}> 
            <Header backArrow={true} navigation={navigation} />
            <View style={styles.principalView}>
                <View>
                    <Text style={styles.titleLogo}>Privacidade e Segurança</Text> 

                    <TouchableOpacity style={styles.optionButton} onPress={goToChangePassword}>
                        <Text style={styles.bottonText}>Alteração de senha</Text>
                        <Feather name='chevron-right' color={Colors.TEXT_COLOR} size={32} />
                    </TouchableOpacity>
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