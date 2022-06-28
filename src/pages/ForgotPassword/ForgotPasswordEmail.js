import { useState } from "react";
import { StyleSheet,Text, TextInput, TouchableOpacity, View} from "react-native";


export default function ForgotPasswordEmail() {
    const [email, setEmail] = useState("");

    return ( 
        <View>
            <View style={styles.screenContainer}></View>
            <View>
                <Text style={styles.homeTitle}>Esqueci Minha Senha</Text>
                <Text>Informe um email para enviarmos um código de recuperação de senha</Text>
            </View>
            
            <TextInput
                value={email}
                placeholder= "Email"
                onChangeText= {setEmail}
                style={styles.TextInput}
            />

            <TouchableOpacity onPress={() => {}}>
                <Text>Enviar</Text>
            </TouchableOpacity>

            <View>
                <Text>Reenviar código - 15s</Text>
            </View>
            <View>
                <Text>{email}</Text>
            </View>
        </View>   
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

   main:{

   },
   form:{

   },
   textInput:{

   },
   button:{

   },
   simpleText:{

   }
});