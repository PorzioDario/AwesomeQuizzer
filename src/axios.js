import axios from 'axios';
import {urlQuizzerAPI} from './settings';

const instance = axios.create();

instance.defaults.baseURL = urlQuizzerAPI;
instance.defaults.headers['token'] = localStorage.token;

export const setToken = (token) => {
    instance.defaults.headers['token'] = token;
}

export const resetToken = () => {
    instance.defaults.headers['token'] = undefined;
}

export default instance;