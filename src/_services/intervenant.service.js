import { http } from "../_api/http.common"


let changeObjectif = (contact,dateObjectif, objectifMontant) =>{
    return http.Client.put("/intervenant/"+contact+"/"+dateObjectif+"/"+objectifMontant)
}

let getIntervenant = (contact)=>{
    return http.Client.get("/intervenant/"+contact);
}

let getPosition = ()=>{
    return http.Client.get("/intervenant/allPositionGps");
}

let getPositionOfIntervenant = (conctact)=>{
    return http.Client.get("/intervenant/positionsGpsBy/"+conctact);
}

let addPosition = (contact, position)=>{
    return http.Client.post("/intervenant/addpositionGps"+contact, position);
}

export const intervenantService = {
    addPosition,
    getPositionOfIntervenant,
    getPosition,
    getIntervenant,
    changeObjectif
}

