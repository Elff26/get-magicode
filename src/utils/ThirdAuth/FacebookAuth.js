import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import axios from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  FACEBOOK_CLIENT_ID,
  FACEBOOK_SCOPE,
  REDIRECT_URI,
  SECURE_STORE_KEY
} from '@env';

export default async function FacebookAuth(navigation, setError) {
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