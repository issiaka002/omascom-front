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

export const http = {
    Client
}