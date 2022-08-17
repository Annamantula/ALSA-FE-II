import axios from 'axios';
import { useResolvedPath } from 'react-router-dom';
import { APIurl } from ".";

export async function userLogin (email, password) {
    const response = await fetch(`${APIurl}/users/login`, {
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
    const response = await fetch(`${APIurl}/users/register`, {
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