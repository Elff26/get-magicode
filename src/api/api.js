import axios from 'axios';

const Axios = axios.create({
    baseURL: "http://192.168.15.6:3000"
});

export default Axios;