import { API_URL } from "./../constant";

import axios from 'axios';

const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
});
const prefix = '/breeds';

const getBreeds = () => {

    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/breeds`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                console.error('Error recibido en la solicitud:', err);
                reject(err)
            });
    });

}


const getBreedsById = (id: string) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/breeds/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                console.error('Error recibido en la solicitud:', err);
                reject(err)
            });
    });
}

const breedsSearch = (query: string) => {
    return new Promise((resolve, reject) => {

        instance.get(
            `${API_URL}${prefix}search?query?${query}`
        ).then((response) => {
            resolve(response.data);
        }).catch(function (error) {
            reject(error);
        });
    });
}

const getImagesById = (imageId: string) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/breeds/images/${imageId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                console.error('Error recibido en la solicitud:', err);
                reject(err)
            });
    });
}

export {
    getBreeds,
    getBreedsById,
    breedsSearch,
    getImagesById

}