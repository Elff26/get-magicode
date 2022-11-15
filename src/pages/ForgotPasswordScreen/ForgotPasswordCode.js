import { useEffect, useState } from "react";
import { StyleSheet,Text, View} from "react-native";
import Axios from "../../api/api";

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputTextComponent from "../../components/InputText/InputTextComponent";


export default function ForgotPasswordCode({navigation}) {
    const [userID, setUserID] = useState("");
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getData() {
            setUserID(await AsyncStorage.getItem("@UserID"));
        }

        getData();
    }, []);

    async function goToForgotPasswordRecovery() {
        setIsLoading(true);
        setSubmited(true);

        if(code) {
            try {
                const response = await Axios.post('/VerificationCode/' + userID, {
                    codeChangePassword: code
                });

                if(response.data) {
                    await AsyncStorage.setItem("@Token", response.data.token);
                    navigation.navigate('ForgotPasswordRecovery');
                }
            } catch(e) {
                setError(e.response.data.message);
            }
        }

        setIsLoading(false);
    }

    return ( 
        <View style={styles.allPagesCode}>
            <Header backArrow={true} navigation={navigation} />

            <View style={{marginTop:10}}>
                <Text style={styles.titleCode}>Esqueci minha senha</Text>
            </View>

            <View style={styles.screenContainerCode}>
                <Text style={styles.descriptionCode}>Informe o código que foi enviado no seu email</Text>

                <View style={styles.formCode}>
                    <InputTextComponent
                        placeholder= "Código"
                        value={code}
                        onChangeText= {setCode}
                        icon='key'
                    />

                    <Text style={styles.errorText}>{error}</Text>
                    
                    <ButtonComponent newStyle={styles.buttonCode} onPress={goToForgotPasswordRecovery} isLoading={isLoading}>
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
        backgroundColor:  Colors.WHITE_SAFE_COLOR
    },

    screenContainerCode: {
        flex: 1,
        backgroundColor:  Colors.WHITE_SAFE_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },

    titleCode: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 30,
        textAlign: 'center'
    },

    formCode:{
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    },

    textValidationButton:{
        color: Colors.WHITE_SAFE_COLOR
    },

    buttonCode: {
        width: 198,
        height: 49,
        borderRadius: 20,
        marginTop: 15
    },

    descriptionCode:{
        textAlign:"center", 
        marginTop:10, 
        color:Colors.TEXT_COLOR, 
        fontSize: 24
    },

    errorText: {
        color: Colors.ERROR_COLOR,
        textAlign: 'center'
    }
});