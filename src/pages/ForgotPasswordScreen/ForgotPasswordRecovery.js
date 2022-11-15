import { useEffect, useState } from "react";
import { StyleSheet,Text, View} from "react-native";

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from "../../utils/ColorPallete/Colors";
import Header from '../../components/Header/HeaderComponent';
import Axios from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputTextComponent from "../../components/InputText/InputTextComponent";
import Messages from "../../utils/Messages";

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
        setSubmited(true);

        try {
            if(!password || confirmPassword && password !== confirmPassword || !regPassword(password)) {
                setIsLoading(false);
                
                return;
            }

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
        } catch(e) {
            setError(e.response.data.message);
        }

        setIsLoading(false);
    }

    function regPassword(password) {
        return RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$').test(password);
    }

    return ( 
        <View style={styles.allPagesRecovery}>
            <Header backArrow={true} navigation={navigation} />
            
            <View>
                <Text style={styles.titleRecovery}>Recuperação de senha</Text>
            </View>

            <View style={styles.screenContainerRecovery}>
                <View style={styles.formRecovery}>
                    <Text style={styles.descriptionRecovery}>Informe sua nova senha:</Text>

                    <InputTextComponent
                        value={password}
                        placeholder= "Senha"
                        onChangeText= {setPassword}
                        secureTextEntry={true}
                        icon='lock'
                    >
                        {
                            (password.trim() === '' && submited) && (
                                <Text style={styles.errorText}>{Messages.PASSWORD_IS_REQUIRED}</Text>
                            )
                        }
                    </InputTextComponent>

                    <View>
                        <Text style={styles.descriptionRecovery}>Confirme sua nova senha:</Text>
                    </View>

                    <InputTextComponent
                        value={confirmPassword}
                        placeholder= "Confirme a senha"
                        onChangeText= {setConfirmPassword}
                        secureTextEntry={true}
                        icon='lock'
                    >
                        {
                            (confirmPassword.trim() === '' || confirmPassword !== password) && submited && (
                                <Text style={styles.errorText}>{Messages.CONFIRM_PASSWORD_NOT_MATCH}</Text>
                            )
                        }
                        {
                            (password.trim() !== '' && !(regPassword(password)) && submited) && (
                                <Text style={styles.errorText}>{Messages.PASSWORD_WEAK_TEXT}</Text>
                            )
                        }
                    </InputTextComponent>

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

   screenContainerRecovery: {
       flex: 1,
       justifyContent: 'center'
   },

   formRecovery:{
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },

    titleRecovery: {
        color: Colors.PRIMARY_COLOR,
        fontSize: 30,
        textAlign: 'center'
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