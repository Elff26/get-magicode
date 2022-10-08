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
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import axios from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../../api/api';

import { 
  FACEBOOK_CLIENT_ID,
  FACEBOOK_SCOPE,
  GOOGLE_CLIENT_ID,
  GOOGLE_SCOPE,
  GOOGLE_RESPONSE_TYPE,
  REDIRECT_URI,
  SECURE_STORE_KEY
} from '@env';

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
    try {
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${GOOGLE_RESPONSE_TYPE}&scope=${encodeURI(GOOGLE_SCOPE)}&access_type=offline&prompt=consent`;
      
      const authResponse = await AuthSession.startAsync({ authUrl });
      
      if(authResponse.type === 'success') {
        const response = await axios.post(`SiginWithGoogle`, {
          googleCode: authResponse.params.code
        });

        if(response.data.user && response.data.token) {
          let token = response.data.token;
          let user = response.data.user;

          await SecureStore.setItemAsync(SECURE_STORE_KEY, token);
          await AsyncStorage.setItem("@Service", 'google');

          if(!user.phone || !user.birthday) {
            navigation.navigate('ThirdRegisterMorInfo', {
              userID: user.userID,
              hasPhone: user.phone,
              hasBirthday: user.birthday
            });

            return;
          }

          await AsyncStorage.setItem('@User', JSON.stringify(user));
          navigation.navigate('BottomTabComponent');
        }
      }
    } catch (error) {
      setError("Erro ao tentar se conectar ao Google!");
    }
  }

  const onFacebookAuthentication = async () => {
    setError("");
    try {
      const authUrl = `https://www.facebook.com/v15.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${FACEBOOK_SCOPE}&state=teste`;

      const authResponse = await AuthSession.startAsync({ authUrl }); 
      
      if(authResponse.type === 'success') {
        const response = await axios.post(`SiginWithFacebook`, {
          facebookCode: authResponse.params.code
        });

        if(response.data.user && response.data.token) {
          let token = response.data.token;
          let user = response.data.user;

          await SecureStore.setItemAsync(SECURE_STORE_KEY, token);
          await AsyncStorage.setItem("@Service", 'facebook');

          if(!user.phone || !user.birthday) {
            navigation.navigate('ThirdRegisterMorInfo', {
              userID: user.userID
            });

            return;
          }
          
          await AsyncStorage.setItem('@User', JSON.stringify(response.data.user));
          navigation.navigate('BottomTabComponent');
        }
      }
    } catch(e) {
      setError("Erro ao tentar se conectar ao Facebook!");
    }
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
