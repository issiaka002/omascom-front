import { http } from "../_api/http.common"


let refreshToken = (refresh)=>{
    return http.Client.post("/connexion/refresh-token", refresh)
}

let howIsLogIn = ()=>{
    return http.Client.get("/connexion/howIslogIn")
}

//
let saveToken = (token) =>{
    localStorage.setItem("bearer",token);
}

let logout = () =>{
    localStorage.removeItem("bearer");
}

let isLogged = () => {
    let tk = localStorage.getItem("bearer");
    return !!tk;
}

let getToken = () => {
    return localStorage.getItem("bearer");
}

let connexion = (credentials) => {
    return http.Client.post("/connexion",credentials)
}

let deconnexion = () => {
    return http.Client.get("/connexion/deconnexion")
}

export const connexionService = {
    saveToken, 
    logout, 
    isLogged,
    howIsLogIn,
    refreshToken,
    getToken,
    //
    connexion,
    deconnexion
}