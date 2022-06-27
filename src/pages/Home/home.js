import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../components/colors/colors';

export default function App() {
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textLoginButton}>FAZER LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.createAccountButton]}>
          <Text>CRIAR CONTA</Text>
        </TouchableOpacity>
      </View>

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
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  appContent: {
    width: '70%',
    maxWidth: '340px',
  },

  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '240px',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#33B9D4'
  },

  logoText: {
    fontSize: '85px',
    color: '#CACACA'
  },

  homeText: {
    textAlign: 'center'
  },

  homeTitle: {
    color: '#33B9D4',
    fontSize: '34px'
  },

  homeMessage: {
    fontSize: '24px',
    color: Colors.TEXT_COLOR
  },

  buttonGroup: {
    width: '60%',
    maxWidth: '300px',
    margin: 5
  },  

  button: {
    height: '42px',
    marginBottom: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.PRIMARY_COLOR
  },
  
  textLoginButton: {
    color: '#FFFFFF'
  },

  createAccountButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.PRIMARY_COLOR
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
});
