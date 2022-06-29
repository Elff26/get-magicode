import { useState } from "react";
import { StyleSheet,Text, TextInput, View} from "react-native";

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from "../../components/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';

export default function ForgotPasswordEmail() {
    const [PasswordRecovery, setPasswordRecovery] = useState("");

    function BackToLogin() {
        navigation.navigate('Login');
    }

    return ( 
        <View style={styles.allPagesRecovery}>
            <View style={styles.screenContainerRecovery}>

                    {/* TO DO */}
                    {/* <Header backArrow={true} navigation={navigation} /> */}

                        <View>
                            <Text style={styles.titleRecovery}>Recuperação de Senha</Text>
                        </View>


                        <View style={styles.formRecovery}>

                                <Text style={styles.descriptionRecovery}>Informe sua Nova Senha:</Text>
                            
                                <TextInput
                                value={PasswordRecovery}
                                placeholder= "Senha"
                                onChangeText= {setPasswordRecovery}
                                style={styles.textInputRecovery}
                                />

                            <View>
                                <Text style={styles.descriptionRecovery}>Confirme sua Nova Senha:</Text>
                            </View>

                                <TextInput
                                value={PasswordRecovery}
                                placeholder= "Senha"
                                onChangeText= {setPasswordRecovery}
                                style={styles.textInputRecovery}
                                />

                            <ButtonComponent onPress={BackToLogin}>
                                <Text style={styles.textAgreeButton}>Confirmar</Text>
                            </ButtonComponent>

                        </View>
            </View>
        </View>   
    );
}

const styles = StyleSheet.create({
    titleRecovery: {
        color: '#33B9D4',
        fontSize: '30px',
        textAlign: 'center'
    },
    formRecovery:{
        marginTop: 100,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
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
        marginBottom: '30px',
        marginTop: '30px',
   },
   textAgreeButton:{
        color:'#FFFFFF'
   },
   buttonRecovery: {
        width: 158,
        height: 49,
        borderRadius: 20,
   },
   descriptionRecovery:{
        textAlign:"center", 
        marginTop:10, 
        color:Colors.TEXT_COLOR, 
        fontSize:24
   },
   allPagesRecovery:{
        flex: 1,
        backgroundColor: '#fff'
   }
});