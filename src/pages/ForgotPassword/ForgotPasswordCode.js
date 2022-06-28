import { useState } from "react";
import { StyleSheet,Text, TextInput, TouchableOpacity, View} from "react-native";


export default function ForgotPasswordEmail() {
    const [code, setCode] = useState("");

    return ( 
        <View>
            <View>
                <Text>Esqueci Minha Senha</Text>
                <Text>Informe o código que foi enviado no email (email)tarararara</Text>
            </View>

            <TextInput
                value={code}
                placeholder= "Código"
                onChangeText= {setCode}
                style={styles.TextInput}
            />

            <TouchableOpacity onPress={() => {}}>
                <Text>Validar</Text>
            </TouchableOpacity>
        </View>   
    );
}

const styles = StyleSheet.create({
   //css
});