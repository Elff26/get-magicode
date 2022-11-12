import { useState } from "react";
import { StyleSheet,Text, View} from "react-native";
import Axios from "../../api/api";

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputTextComponent from "../../components/InputText/InputTextComponent";
import Messages from "../../utils/Messages";


export default function ForgotPasswordEmail({navigation}) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [error, setError] = useState(false);

    async function goToForgotPasswordCode() {
        setSubmited(true);
        setIsLoading(true);

        if(email) {
            try {
                const response = await Axios.put('/CodeAndDateGenerator', {
                    email
                });

                if(response.data) {
                    let id = response.data.userID;

                    await AsyncStorage.setItem('@UserID', JSON.stringify(id));
                }

                navigation.navigate('ForgotPasswordCode');
            } catch(e) {
                setError(e.response.data.message);
            }
        }

        setIsLoading(false);
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
                    <InputTextComponent
                        value={email}
                        placeholder= "Email"
                        onChangeText= {setEmail}
                        icon='mail'
                    >
                        {
                            (email.trim() === '' && submited) && (
                                <Text style={styles.errorText}>{Messages.EMAIL_IS_REQUIRED}</Text>
                            )
                        }
                    </InputTextComponent>

                    <Text style={styles.errorText}>{error}</Text>

                    <ButtonComponent newStyle={styles.buttonEmail} onPress={goToForgotPasswordCode} isLoading={isLoading}>
                        <Text style={styles.textSendButton}>Enviar</Text>
                    </ButtonComponent>
                </View>
            </View>   
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE_SAFE_COLOR,
        alignItems: 'center',
        padding: 15,
        marginBottom: 10
    },

    homeTitle: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 30,
        textAlign: 'center'
    },

    form:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textSendButton:{
        color: Colors.WHITE_SAFE_COLOR
    },
    
    buttonEmail: {
        width: 198,
        height: 49,
        borderRadius: 20,
        marginTop: 15
    },

    description:{
        textAlign:"center", 
        marginTop:10, 
        color:Colors.TEXT_COLOR, 
        fontSize: 24
    },

    allPages:{
        flex: 1,
        backgroundColor: Colors.WHITE_SAFE_COLOR
    },

    errorText: {
        color: Colors.ERROR_COLOR,
        textAlign: 'center'
    }
});