import axios from "axios";
import config from "../../config.js";

export const axiosInstance = axios.create({
    baseURL: config.API_URL
})

export const axiosInstanceToken = axios.create({
    baseURL: config.API_URL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true
});


