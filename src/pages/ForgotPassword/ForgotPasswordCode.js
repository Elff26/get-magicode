import { useState } from "react";
import { StyleSheet,Text, TextInput, View} from "react-native";

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from "../../components/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';


export default function ForgotPasswordEmail({navigation}) {
    const [code, setCode] = useState("");

    function goToForgotPasswordRecovery() {
        navigation.navigate('ForgotPasswordRecovery');
    }

    return ( 
        <View style={styles.allPagesCode}>

        <View style={styles.screenContainerCode}>
            
                <Header backArrow={true} navigation={navigation} />
            
            <View style={{marginTop:10}}>
                <Text style={styles.titleCode}>Esqueci minha senha</Text>
            </View>

                <View style={styles.formCode}>
                    <Text style={styles.descriptionCode}>Informe o código que foi enviado no email (email)tarararara</Text>

                    <TextInput
                        value={code}
                        placeholder= "Código"
                        onChangeText= {setCode}
                        style={styles.textInputCode}
                    />
                    <ButtonComponent style={styles.buttonCode} onPress={goToForgotPasswordRecovery}>
                        <Text style={styles.textValidationButton}>Validar</Text>
                    </ButtonComponent>
                </View>
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    screenContainerCode: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-',
        padding: '15px',
        marginBottom: '10px'
    },
    titleCode: {
        color: '#33B9D4',
        fontSize: '30px',
        textAlign: 'center'
    },
   formCode:{
        marginTop: 100,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
   },
   textInputCode:{
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
        marginTop: '30px',
   },
   textValidationButton:{
     color:'#FFFFFF'
   },
   buttonCode: {
        width: 158,
        height: 49,
        borderRadius: 20,
   },
   descriptionCode:{
        textAlign:"center", 
        marginTop:10, 
        color:Colors.TEXT_COLOR, 
        fontSize:24
   },
   allPagesCode:{
        flex: 1,
        backgroundColor: '#fff'
   }
});