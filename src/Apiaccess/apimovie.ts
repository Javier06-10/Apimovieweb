import axios, { AxiosInstance } from "axios";



const client : AxiosInstance= axios.create({
    
    baseURL: "https://www.episodate.com",
});

export default client;