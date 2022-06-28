import { useState } from "react";
import { StyleSheet,Text, TextInput, TouchableOpacity, View} from "react-native";


export default function ForgotPasswordEmail() {
    const [PasswordRecovery, setPasswordRecovery] = useState("");

    return ( 
        <View>
            <View>
                <Text>Recuperação de Senha</Text>
                <Text>Informe sua Nova Senha:</Text>
            </View>

            <TextInput
                value={PasswordRecovery}
                placeholder= "Senha"
                onChangeText= {setPasswordRecovery}
                style={styles.TextInput}
            />

            <View>
                <Text>Confirme sua Nova Senha:</Text>
            </View>

            <TextInput
                value={PasswordRecovery}
                placeholder= "Senha"
                onChangeText= {setPasswordRecovery}
                style={styles.TextInput}
            />

            <TouchableOpacity onPress={() => {}}>
                <Text>Confirmar</Text>
            </TouchableOpacity>

        </View>   
    );
}

const styles = StyleSheet.create({
   //css
});