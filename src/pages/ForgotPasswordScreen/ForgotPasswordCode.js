import { useEffect, useState } from "react";
import { StyleSheet,Text, TextInput, View} from "react-native";
import Axios from "../../api/api";

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';
import AsyncStorage from "@react-native-async-storage/async-storage";


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
            <View style={styles.screenContainerCode}>
                
                <View style={{marginTop:10}}>
                    <Text style={styles.titleCode}>Esqueci minha senha</Text>
                </View>
                <View style={styles.formCode}>
                    <Text style={styles.descriptionCode}>Informe o código que foi enviado no seu email</Text>
                    <TextInput
                        placeholder= "Código"
                        value={code}
                        onChangeText= {setCode}
                        style={styles.textInputCode}
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