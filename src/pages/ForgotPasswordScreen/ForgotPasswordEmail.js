import { useState } from "react";
import { StyleSheet,Text, TextInput, View} from "react-native";

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from "../../components/ColorPallete/Colors";
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
        padding: '15px',
        marginBottom: '10px'
    },
    homeTitle: {
        color: '#33B9D4',
        fontSize: '30px',
        textAlign: 'center'
    },
   form:{
        justifyContent: 'center',
        alignItems: 'center',
   },
   textInput:{
        width: 304,
        height: 40,
        left: 28,
        top: 292,
        backgroundColor: '#E9E9E9',
        border: '1px solid #33B9D4',
        borderRadius: 20,
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: '30px',
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
        fontSize:24
   },
   allPages:{
        flex: 1,
        backgroundColor: '#fff'
   }
});