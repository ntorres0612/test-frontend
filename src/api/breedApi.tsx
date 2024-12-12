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


const breedsSearch = (q: string) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/breeds/search?q=${q}`, {
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