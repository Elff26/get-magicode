import { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { 
    KeyboardAvoidingView,
    Platform,
    View,
    StyleSheet, 
    Text, 
} from 'react-native';

import Colors from "../../utils/ColorPallete/Colors";
import MaskInput from 'react-native-mask-input';
import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Header from '../../components/Header/HeaderComponent';
import Axios from '../../api/api';
import DateUtils from '../../utils/DateUtils';
import Messages from '../../utils/Messages';

export default function ThirdRegisterMoreInfo({ route, navigation }) {
    const routeParams = route;

    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [submited, setSubmited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function finishRegistration() {
        setError('');
        setIsLoading(true);
        setSubmited(true);

        if((!birthday || birthday.length !== 10) && !routeParams.params.hasBirthday) {
            setIsLoading(false);
            return;
        }

        if((!phone || phone.length !== 11) && !routeParams.params.hasPhone) {
            setIsLoading(false);
            return;
        }
        
        const userData = {
            birthday: DateUtils.dateConvertToEUA(birthday),
            phone,
        }

        try {
            if(routeParams.params.userID) {
                const response = await Axios.put(`/AddMoreUserInfo/${routeParams.params.userID}`, {
                    userData
                });
    
                if(response.data.user) {
                    let user = response.data.user;
                    await AsyncStorage.mergeItem("@User", JSON.stringify(user));
    
                    navigation.navigate('BottomTabComponent');
                }
            }
        } catch(e) {
            setError(e.response.data.message);
        }

        setIsLoading(false);
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.main}>
            <Header backArrow={true} navigation={navigation} />

            <View style={styles.content}>
                <Text style={styles.title}>Completar cadastro</Text>

                <View>
                    {
                        !routeParams.params.hasBirthday && (
                            <>
                                <MaskInput
                                    placeholder='Data de Nascimento'
                                    onChangeText={(masked, unmasked) => setBirthday(masked)}
                                    value={birthday}
                                    style={styles.textInput}
                                    mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                />
                                {
                                    (birthday.trim() === '' && submited) && (
                                        <Text style={styles.errorText}>{Messages.BIRTHDAY_IS_REQUIRED}</Text>
                                    )
                                }
                                {
                                    (birthday.trim() !== '' && birthday.length !== 10 && submited) && (
                                        <Text style={styles.errorText}>{Messages.BIRTHDAY_MINIMUM_DIGITS}</Text>
                                    )
                                }
                            </>
                        )
                    }
                    {
                        !routeParams.params.hasPhone && (
                            <>
                                <MaskInput
                                    placeholder='Telefone'
                                    onChangeText={(masked, unmasked) => setPhone(unmasked)}
                                    value={phone}
                                    style={styles.textInput}
                                    mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    keyboardType="phone-pad"
                                />
                                {
                                    (phone.trim() === '' && submited) && (
                                        <Text style={styles.errorText}>{Messages.PHONE_IS_REQUIRED}</Text>
                                    )
                                }
                                {
                                    (phone.trim() !== '' && phone.length !== 11 && submited) && (
                                        <Text style={styles.errorText}>{Messages.PHONE_MINIMUM_DIGITS}</Text>
                                    )
                                }
                            </>
                        )
                    }
                    

                    
                </View>

                <ButtonComponent newStyle={styles.button} onPress={finishRegistration} isLoading={isLoading}>
                    <Text style={styles.buttonText}>Finalizar cadastro</Text>
                </ButtonComponent>

                <Text style={styles.errorText}>{error}</Text>
            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    main:{
        flex: 1,       
        backgroundColor: Colors.WHITE_SAFE_COLOR,
        alignItems: 'center'
    },

    content: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%'
    },  

    title:{
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 34,
        color: Colors.PRIMARY_COLOR
    },

    textInput:{
        width: 251.93,
        height: 40,
        padding: 10,
        marginTop: 20,
        backgroundColor: Colors.TEXT_INPUT_BACKGROUND,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: Colors.PRIMARY_COLOR,
        borderRadius: 20
    },

    button: {
        width: 198,
        height: 49,
        margin: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        backgroundColor: Colors.PRIMARY_COLOR
    },

    buttonText:{
        color: Colors.WHITE_SAFE_COLOR,
        fontSize: 18
    },
    
    errorText: {
        color: Colors.ERROR_COLOR,
        textAlign: 'center'
    }
})