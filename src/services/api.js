import axios from 'axios';
import { API_KEY } from 'react-native-dotenv';

const api = axios.create({
    baseURL: API_KEY
});

export default api;