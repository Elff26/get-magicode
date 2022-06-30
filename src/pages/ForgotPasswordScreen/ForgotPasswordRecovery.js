import { useState } from "react";
import { StyleSheet,Text, TextInput, View} from "react-native";

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from "../../components/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';

export default function ForgotPasswordRecovery({navigation}) {
    const [PasswordRecovery, setPasswordRecovery] = useState("");

    function BackToLogin() {
        navigation.navigate('Login');
    }

    return ( 
        <View style={styles.allPagesRecovery}>
            <Header backArrow={true} navigation={navigation} />
            <View style={styles.screenContainerRecovery}>
                <View>
                    <Text style={styles.titleRecovery}>Recuperação de senha</Text>
                </View>
                <View style={styles.formRecovery}>
                    <Text style={styles.descriptionRecovery}>Informe sua nova senha:</Text>
                    <TextInput
                    value={PasswordRecovery}
                    placeholder= "Senha"
                    onChangeText= {setPasswordRecovery}
                    style={styles.textInputRecovery}
                    />
                    <View>
                        <Text style={styles.descriptionRecovery}>Confirme sua nova senha:</Text>
                    </View>
                    <TextInput
                    value={PasswordRecovery}
                    placeholder= "Senha"
                    onChangeText= {setPasswordRecovery}
                    style={styles.textInputRecovery}
                    />
                    <ButtonComponent newStyle={styles.buttonRecovery} onPress={BackToLogin}>
                        <Text style={styles.textAgreeButton}>Confirmar</Text>
                    </ButtonComponent>
                </View>
            </View>
        </View>   
    );
}

const styles = StyleSheet.create({
    allPagesRecovery:{
        flex: 1,
        backgroundColor: '#fff'
   },
   formRecovery:{
        marginTop: 100,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
    titleRecovery: {
        color: '#33B9D4',
        fontSize: '30px',
        textAlign: 'center'
    },
   textInputRecovery:{
        width: 304,
        height: 40,
        left: 28,
        top: 292,
        backgroundColor: '#E9E9E9',
        border: '1px solid #33B9D4',
        borderRadius: 20,
        textAlign: 'center',
        justifyContent: 'center',
        margin: 10
   },
   textAgreeButton:{
        color:'#FFFFFF'
   },
   buttonRecovery: {
        width: 198,
        height: 49,
        borderRadius: 20,
        marginTop: 10
   },
   descriptionRecovery:{
        textAlign:"center", 
        marginTop:10, 
        color:Colors.TEXT_COLOR, 
        fontSize:24
   }
});