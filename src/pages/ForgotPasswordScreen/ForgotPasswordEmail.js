import { useState } from "react";
import { StyleSheet,Text, TextInput, View} from "react-native";

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';

export default function ForgotPasswordEmail({navigation}) {
    const [email, setEmail] = useState("");

    function goToForgotPasswordCode() {
        navigation.navigate('ForgotPasswordCode');
      }

    return ( 
        <View style={styles.allPages}>
            <Header backArrow={true} navigation={navigation} />
            <View style={styles.screenContainer}>
                <View>
                    <Text style={styles.homeTitle}>Esqueci minha senha</Text>
                    <Text style={styles.description}>Informe um email para enviarmos um código de recuperação de senha</Text>
                </View>
                <View style={styles.form}>
                    <TextInput
                        value={email}
                        placeholder= "Email"
                        onChangeText= {setEmail}
                        style={styles.textInput}
                    />
                    <ButtonComponent newStyle={styles.buttonEmail} onPress={goToForgotPasswordCode}>
                        <Text style={styles.textSendButton}>Enviar</Text>
                    </ButtonComponent>
                </View>
                <View>
                    <Text>Reenviar código - 15s</Text>
                </View>
            </View>   
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        marginBottom: 10
    },
    homeTitle: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 30,
        textAlign: 'center'
    },
   form:{
        justifyContent: 'center',
        alignItems: 'center',
   },
   textInput:{
        width: 304,
        height: 40,
        backgroundColor: '#E9E9E9',
        borderWidth: 1,
        borderColor: Colors.PRIMARY_COLOR,
        borderRadius: 20,
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 30,
   },
   textSendButton:{
        color:'#FFFFFF'
   },
   buttonEmail: {
        width: 198,
        height: 49,
        borderRadius: 20,
   },
   description:{
        textAlign:"center", 
        marginTop:10, 
        color:Colors.TEXT_COLOR, 
        fontSize: 24
   },
   allPages:{
        flex: 1,
        backgroundColor: '#fff'
   }
});