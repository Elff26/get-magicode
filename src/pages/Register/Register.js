import { useState } from "react"
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { 
    Button,
    ScrollView,
    StyleSheet, 
    Text, 
    TextInput,
    View,
    TouchableOpacity
} from 'react-native'
import Colors from '../../components/Colors/Colors'

const Register = () => {
    return(
        <View style={styles.main}>
            <Text style={styles.title}>Cadastre-se</Text>
            <View style={styles.form}>
                <TextInput
                    placeholder='Nome Completo'
                    style={styles.textInput}
                />
                <TextInput
                    placeholder='Email'
                    style={styles.textInput}
                />
                <TextInput
                    placeholder='Data de Nascimento'
                    style={styles.textInput}
                />
                <TextInput
                    placeholder='Telefone'
                    style={styles.textInput}
                />
                <TextInput
                    placeholder='Senha'
                    style={styles.textInput}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Criar Conta</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.simpleText}>Ou entre com: </Text>
                    <View style={styles.loginOptions}>
                        <TouchableOpacity>
                            <FontAwesome5 name='facebook' size={24} color="#3b5998" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <MaterialCommunityIcons name='gmail' size={24} color="#c71610" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    main:{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        height: '100%',
        width: '100%'
    },
    form:{
        flexDirection: 'column',
        alignItems: 'center'
    },
    title:{
        alignSelf: 'center',
        fontSize: 34,
        color: Colors.PRIMARY_COLOR
    },
    textInput:{
        width: 251.93,
        height: 40,
        padding: 10,
        marginTop: 20,
        backgroundColor: '#E9E9E9',
        border: '1px solid #33B9D4',
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
        color: '#FFFFFF',
        fontSize: 18
    },
    simpleText: {
        color: Colors.TEXT_COLOR,
        fontSize: '18px'
    },
    loginOptions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})