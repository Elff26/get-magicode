import axios from 'axios';

import { 
    URL
} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Axios = axios.create({
    baseURL: "http://192.168.15.6:3000"
});

Axios.interceptors.request.use(async (request) => {
    let token = await AsyncStorage.getItem('@Token');

    if(token) {
        request.headers.token = token;
    }

    return request;
}, (error) => {
    return Promise.reject(error);
});

export default Axios;