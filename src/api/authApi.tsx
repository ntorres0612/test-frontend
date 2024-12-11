import { LoginRequest } from "../data/model/LoginRequest";
import { RegisterRequest } from "../data/model/RegisterRequest";
import { API_URL } from "./../constant";

import axios from 'axios';

const prefix = '/auth/';

const login = (data: LoginRequest) => {
    return new Promise((resolve, reject) => {

        axios.post(
            `${API_URL}${prefix}login`, data
        ).then((response) => {
            resolve(response.data);
        }).catch(function (error) {
            reject(error);
        });
    });
}


const register = (data: RegisterRequest) => {
    return new Promise((resolve, reject) => {

        axios.post(
            `${API_URL}${prefix}signup`, data
        ).then((response) => {
            resolve(response.data);
        }).catch(function (error) {
            reject(error);
        });
    });
}
export {
    login,
    register
}