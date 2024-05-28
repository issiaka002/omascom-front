import axios from "axios";
import { connexionService } from "../_services/connexion.service";

let Client= axios.create({
    baseURL: "http://localhost:8081/api/v1/"
})

Client.interceptors.request.use(request=>{
    if(connexionService.isLogged()){
        request.headers.Authorization= 'Bearer ' + connexionService.getToken();
    }
    return request
})

Client.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            connexionService.logout();
            window.location.href = '/auth/login'; // Redirection vers la page de connexion
        }
        if (error.response && error.response.status === 403) {
            connexionService.logout();
            window.location.href = '/auth/login'; // Redirection vers la page de connexion
        }
        return Promise.reject(error);
    }
);

export const http = {
    Client
}