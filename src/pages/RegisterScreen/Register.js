import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { 
    StyleSheet, 
    Text, 
    TextInput,
    View,
    TouchableOpacity
} from 'react-native'

import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Header from '../../components/Header/HeaderComponent';
import Colors from '../../utils/ColorPallete/Colors'

const Register = ({ navigation }) => {
    function goToChooseTechnologies() {
        navigation.navigate('BottomTabComponent');
    }

    return(
        <View style={styles.main}>
            <Header backArrow={true} navigation={navigation}/>
            <View style={styles.form}>
                <Text style={styles.title}>Cadastre-se</Text>
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

                <ButtonComponent newStyle={styles.button} onPress={goToChooseTechnologies}>
                    <Text style={styles.buttonText}>Criar Conta</Text>
                </ButtonComponent>

                <View style={styles.viewLoginOptions}>
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
        backgroundColor: '#FFFFFF',
        height: '100%',
        width: '100%'
    },
    form:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10%'
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
        color: '#FFFFFF',
        fontSize: 18
    },
    simpleText: {
        color: Colors.TEXT_COLOR,
        fontSize: 18
    },
    loginOptions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    viewLoginOptions:{
        marginTop: '10%'
    }
})