import axios from 'axios';
import { useResolvedPah } from 'react-router-dom';
const url = "https://desolate-island-23326.herokuapp.com/api";

export async function userLogin (email, password) {
    const response = await fetch(`${url}/users/login`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    const result = await response.json();
    return result;
};

export async function userRegister (email, password) {
    const response = await fetch(`${url}/users/register`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    });
    const result = await response.json();
    return result;
}