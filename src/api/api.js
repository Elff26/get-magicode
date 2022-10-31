import axios from 'axios';

import { 
    URL
} from '@env';

const Axios = axios.create({
    baseURL: URL || "http://192.168.15.11:3000"
});

export default Axios;