import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import axios from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  GOOGLE_CLIENT_ID,
  GOOGLE_SCOPE,
  GOOGLE_RESPONSE_TYPE,
  REDIRECT_URI,
  SECURE_STORE_KEY
} from '@env';

export default async function GoogleAuth(navigation, setError) {
    try {
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${GOOGLE_RESPONSE_TYPE}&scope=${encodeURI(GOOGLE_SCOPE)}&access_type=offline&prompt=consent`;
        
        const authResponse = await AuthSession.startAsync({ authUrl });
        
        if(authResponse.type === 'success') {
            const response = await axios.post(`SiginWithGoogle`, {
                googleCode: authResponse.params.code
            });

            if(response.data.userInfo.user && response.data.userInfo.externalToken && response.data.userInfo.token) {
                let externalToken = response.data.userInfo.externalToken;
                let token = response.data.userInfo.token;
                let user = response.data.userInfo.user;

                await SecureStore.setItemAsync(SECURE_STORE_KEY, externalToken);
                await AsyncStorage.setItem("@Service", 'google');
                await AsyncStorage.setItem('@Token', token);

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