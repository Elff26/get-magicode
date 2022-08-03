import { useState } from "react";
import { StyleSheet,Text, TextInput, View} from "react-native";

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';


export default function ForgotPasswordCode({navigation}) {
    const [code, setCode] = useState("");

    function goToForgotPasswordRecovery() {
        navigation.navigate('ForgotPasswordRecovery');
    }

    return ( 
        <View style={styles.allPagesCode}>
            <Header backArrow={true} navigation={navigation} />
            <View style={styles.screenContainerCode}>
                
                <View style={{marginTop:10}}>
                    <Text style={styles.titleCode}>Esqueci minha senha</Text>
                </View>
                <View style={styles.formCode}>
                    <Text style={styles.descriptionCode}>Informe o código que foi enviado no email ****.****@gmail.com</Text>
                    <TextInput
                        value={code}
                        placeholder= "Código"
                        onChangeText= {setCode}
                        style={styles.textInputCode}
                    />
                    <ButtonComponent newStyle={styles.buttonCode} onPress={goToForgotPasswordRecovery}>
                        <Text style={styles.textValidationButton}>Validar</Text>
                    </ButtonComponent>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    allPagesCode:{
        flex: 1,
        backgroundColor: '#fff'
   },
    screenContainerCode: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    titleCode: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 30,
        textAlign: 'center'
    },
   formCode:{
        marginTop: 100,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        padding: 5
   },
   textInputCode:{
        width: 304,
        height: 40,
        backgroundColor: '#E9E9E9',
        borderWidth: 1,
        borderColor: Colors.PRIMARY_COLOR,
        borderRadius: 20,
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 30,
   },
   textValidationButton:{
        color: '#FFF'
   },
   buttonCode: {
        width: 198,
        height: 49,
        borderRadius: 20,
   },
   descriptionCode:{
        textAlign:"center", 
        marginTop:10, 
        color:Colors.TEXT_COLOR, 
        fontSize: 24
   }
});