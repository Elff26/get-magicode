import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from '../../utils/ColorPallete/Colors';

const Home = ({ navigation }) => {
  function goToLogin() {
    navigation.navigate('Login');
  }

  function goToRegister() {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.appContent}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Logo</Text>
        </View>

        <View style={styles.homeText}>
          <Text style={styles.homeTitle}>Get MagiCode</Text>
          <Text style={styles.homeMessage}>Aprenda novas tecnologias!</Text>
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <ButtonComponent onPress={goToLogin}>
          <Text style={styles.textLoginButton}>FAZER LOGIN</Text>
        </ButtonComponent>

        <ButtonComponent newStyle={styles.createAccountButton} onPress={goToRegister}>
          <Text>CRIAR CONTA</Text>
        </ButtonComponent>
      </View>

      <View>
        <Text style={styles.simpleText}>Ou entre com: </Text>
        <View style={styles.loginOptions}>
          <TouchableOpacity>
            <FontAwesome5 name='facebook' size={24} color={Colors.BLUE_FACEBOOK_ICON} />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons name='gmail' size={24} color={Colors.RED_GMAIL_ICON} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE_SAFE_COLOR,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  appContent: {
    width: '70%',
    maxWidth: 340,
  },

  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 240,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.PRIMARY_COLOR
  },

  logoText: {
    fontSize: 85,
    color: Colors.LOGO_TEXT_COLOR
  },

  homeTitle: {
    color: Colors.PRIMARY_COLOR,
    fontSize: 34,
    textAlign: 'center'
  },

  homeMessage: {
    fontSize: 24,
    color: Colors.TEXT_COLOR,
    textAlign: 'center'
  },

  buttonGroup: {
    width: '60%',
    maxWidth: 300,
    margin: 5
  },
  
  textLoginButton: {
    color: Colors.WHITE_SAFE_COLOR
  },

  createAccountButton: {
    backgroundColor: Colors.WHITE_SAFE_COLOR,
    borderWidth: 1,
    borderColor: Colors.PRIMARY_COLOR
  }, 

  simpleText: {
    color: Colors.TEXT_COLOR,
    fontSize: 18
  },

  loginOptions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
});
