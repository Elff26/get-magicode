import { useEffect, useState } from 'react';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { 
  Image,
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
import LoadingComponent from '../../components/Loading/LoadingComponent';

const Home = ({ navigation }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      let token = await AsyncStorage.getItem('@Token');
      let externalAccessToken = await SecureStore.getItemAsync(SECURE_STORE_KEY);
      let service = await AsyncStorage.getItem('@Service');
      let user = JSON.parse(await AsyncStorage.getItem('@User'));

      if(user) {
        if(externalAccessToken && service) {
          let url = "";

          if(service === 'google') {
            url = 'CheckGoogleToken';
          } else if(service === 'facebook') {
            url = 'CheckFacebookToken';
          } else {
            return clearUserData();
          }

          checkToken(externalAccessToken, url, user.userID);
        } else if(token && user) {
          return getUser(user);
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

  const getUser = async (user) => {
    try {
      setLoading(true);
    
      let userResponse = await Axios.get(`FindUserById/${user.userID}`);
  
      if(userResponse.data.user) {
        await AsyncStorage.mergeItem('@User', JSON.stringify(userResponse.data.user));
  
        setLoading(false);
        navigation.navigate('BottomTabComponent');
      }
    } catch(e) {
      setLoading(false);
      clearUserData();
    }
    
  }

  const checkToken = async (externalAccessToken, url, userID) => {
    try {
      setLoading(true);

      let result = await Axios.get(`${url}`, {
        headers: {
          externalaccesstoken: externalAccessToken,
          userid: userID
        }
      });
  
      if(!result.data) {
        throw new Error('Não autorizado');
      }      
  
      await AsyncStorage.setItem('@Token', result.data.userInfo.token);

      setLoading(false);
      navigation.navigate('BottomTabComponent');
    } catch (error) {
      clearUserData();
    }
  }

  const onGoogleAuthentication = async () => {
    setError("");
    setLoading(true);
    await GoogleAuth(navigation, setError, setLoading);
    setLoading(false);
  }

  const onFacebookAuthentication = async () => {
    setError("");
    setLoading(true);
    await FacebookAuth(navigation, setError, setLoading);
    setLoading(false);
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
          <LoadingComponent />
        )
      }
      {
        !loading && (
          <>
            <View style={styles.appContent}>
              <View style={styles.logoContainer}>
                <Image source={require('../../../assets/logo.png')} style={styles.image} />
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
    height: 300
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
  },

  image: {
    height: 300,
    resizeMode: 'contain'
  }
});
