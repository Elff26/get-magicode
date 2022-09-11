import { useState } from "react";
import { StyleSheet,Text, TextInput, View} from "react-native";
import Axios from "../../api/api";

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';
import AsyncStorage from "@react-native-async-storage/async-storage";


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
                    <TextInput
                        value={email}
                        placeholder= "Email"
                        onChangeText= {setEmail}
                        style={styles.textInput}
                    />
                    {
                        (email.trim() === '' && submited) && (
                            <Text style={styles.errorText}>Email is required</Text>
                        )
                    }

                    <Text style={styles.errorText}>{error}</Text>

                    <ButtonComponent newStyle={styles.buttonEmail} onPress={goToForgotPasswordCode} isLoading={isLoading}>
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
        backgroundColor: Colors.WHITE_SAFE_COLOR,
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
        backgroundColor: Colors.TEXT_INPUT_BACKGROUND,
        borderWidth: 1,
        borderColor: Colors.PRIMARY_COLOR,
        borderRadius: 20,
        textAlign: 'center',
        justifyContent: 'center'
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