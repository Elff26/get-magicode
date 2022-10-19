import { useEffect, useState } from 'react';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { 
  ActivityIndicator,
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View
} from 'react-native';
import ButtonComponent from '../../components/Buttons/ButtonComponent';
import Colors from '../../utils/ColorPallete/Colors';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../../api/api';
import { LogBox } from "react-native";
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

import { 
  SECURE_STORE_KEY
} from '@env';
import FacebookAuth from '../../utils/ThirdAuth/FacebookAuth';
import GoogleAuth from '../../utils/ThirdAuth/GoogleAuth';

const Home = ({ navigation }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      let accessToken = await SecureStore.getItemAsync(SECURE_STORE_KEY);
      let service = await AsyncStorage.getItem('@Service');
      let user = await AsyncStorage.getItem('@User');

      if(user) {
        if(accessToken && service) {
          let url = "";

          if(service === 'google') {
            url = 'CheckGoogleToken';
          } else if(service === 'facebook') {
            url = 'CheckFacebookToken';
          } else {
            return clearUserData();
          }

          checkToken(accessToken, url);
        }
      }
    }

    getData(); 
    setLoading(false);  
  }, []);

  const clearUserData = async () => {
    await SecureStore.deleteItemAsync(SECURE_STORE_KEY);
    await AsyncStorage.clear();
  }

  const checkToken = async (accessToken, url) => {
    try {
      let result = await Axios.get(`${url}`, {
        headers: {
          accessToken
        }
      });
  
      if(!result) {
        throw new Error('Não autorizado');
      }
  
      navigation.navigate('BottomTabComponent');
    } catch (error) {
      clearUserData();
    }
  }

  const onGoogleAuthentication = async () => {
    setError("");
    GoogleAuth(navigation, setError)
  }

  const onFacebookAuthentication = async () => {
    setError("");
    FacebookAuth(navigation, setError);
  }

  function goToLogin() {
    navigation.navigate('Login');
  }

  function goToRegister() {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.screenContainer}>
      {
        loading && (
          <ActivityIndicator></ActivityIndicator>
        )
      }
      {
        !loading && (
          <>
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
                <TouchableOpacity onPress={onFacebookAuthentication}>
                  <FontAwesome5 name='facebook' size={24} color={Colors.BLUE_FACEBOOK_ICON} />
                </TouchableOpacity>

                <TouchableOpacity onPress={onGoogleAuthentication}>
                  <MaterialCommunityIcons name='gmail' size={24} color={Colors.RED_GMAIL_ICON} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )
      }
      
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
    color: Colors.LIGHT_GRAY
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
