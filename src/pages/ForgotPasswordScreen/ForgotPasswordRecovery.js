import { useEffect, useState } from "react";
import { StyleSheet,Text, TextInput, View} from "react-native";

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';
import Axios from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ForgotPasswordRecovery({navigation}) {
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getData() {
            setUserID(await AsyncStorage.getItem("@UserID"));
        }

        getData();
    }, []);

    async function backToLogin() {
        setIsLoading(true);

        try {
            if(password && confirmPassword && password === confirmPassword) {
    
                const response = await Axios.put(`/UpdateUser/${userID}`, {
                    user: {
                        password
                    }
                });
                
                if(response.data.user) {    
                    setIsLoading(false);
                    
                    navigation.navigate('Login', {
                        passwordRecovered: true
                    });
                }
            }
        } catch(e) {
            setError(e.response.data.message);
        }
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
                        value={password}
                        placeholder= "Senha"
                        onChangeText= {setPassword}
                        style={styles.textInputRecovery}
                        secureTextEntry={true}
                    />
                    {
                        (password.trim() === '' && submited) && (
                            <Text style={styles.errorText}>Password is required</Text>
                        )
                    }
                    <View>
                        <Text style={styles.descriptionRecovery}>Confirme sua nova senha:</Text>
                    </View>
                    <TextInput
                        value={confirmPassword}
                        placeholder= "Confirme a senha"
                        onChangeText= {setConfirmPassword}
                        style={styles.textInputRecovery}
                        secureTextEntry={true}
                    />
                    {
                        (confirmPassword.trim() === '' && submited) || (confirmPassword !== password) && (
                            <Text style={styles.errorText}>password and password confirmation do not match</Text>
                        )
                    }

                    <Text style={styles.errorText}>{error}</Text>

                    <ButtonComponent newStyle={styles.buttonRecovery} onPress={backToLogin} isLoading={isLoading}>
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
        backgroundColor: Colors.WHITE_SAFE_COLOR
   },

   formRecovery:{
        marginTop: 100,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },

    titleRecovery: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 30,
        textAlign: 'center'
    },

    textInputRecovery:{
        width: 304,
        height: 40,
        backgroundColor: Colors.TEXT_INPUT_BACKGROUND,
        borderWidth: 1,
        borderColor: Colors.PRIMARY_COLOR,
        borderRadius: 20,
        textAlign: 'center',
        justifyContent: 'center',
        margin: 10
    },

    textAgreeButton:{
        color: Colors.WHITE_SAFE_COLOR
    },

    buttonRecovery: {
        width: 198,
        height: 49,
        borderRadius: 20,
        marginTop: 15
    },

    descriptionRecovery:{
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