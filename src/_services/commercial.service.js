import { http } from "../_api/http.common"


let getCommercialById = (id) =>{
    return http.Client.get("/commercial/"+id)
}

let getCommercialByContact = (contact) =>{
    return http.Client.get("/commercial/contact/"+contact)
}
let getPdvsCommercial=(contact)=>{
    return http.Client.get("/commercial/pdvs/"+contact)
}

let getAllCommercial= () =>{
    return http.Client.get("/commercial")
}

let getPaginateCommercial= (offset, limit) =>{
    return http.Client.get("/commercial/"+offset+"/"+limit)
}

let getPdvsHasCreance= (contactCommercial) =>{
    return http.Client.get("/commercial/pdvsHasCreance/"+contactCommercial)
}

let addcommercial = (commercialRequest)=>{
    return http.Client.post("/commercial/new", commercialRequest)
}

let getAllPositionPdv = (contactCommercial)=>{
    return http.Client.get("/coordonneesgps/allgpsposition/"+contactCommercial)
}
let updateCommercial= (contactCommercial,commercialUpdate)=>{
    return http.Client.put("/commercial/update/"+contactCommercial, commercialUpdate)
}

let updateSousAdv= (contactSousAdv, contactCommercial)=>{
    return http.Client.put("/commercial/updateSousAdv/"+contactSousAdv+"/"+contactCommercial)
}

let getNotification= (contactSim, startDate, endDate)=>{
    return http.Client.get("/notification/notification/"+contactSim+"/"+startDate+"/"+endDate)
}

let getCommercialAndPdv= (contactSim, contactPdv)=>{
    return http.Client.get("/transaction/transactionWithIntervenant/"+contactSim+"/"+contactPdv)
}

let getMySousAdv = (contactSim)=>{
    return http.Client.get("/commercial/mysousAdv/"+contactSim)
}
export const commercialService = {
    updateSousAdv,
    getMySousAdv,
    addcommercial,
    getCommercialAndPdv,
    getPdvsCommercial,
    getAllPositionPdv,
    updateCommercial,
    getPaginateCommercial,
    getAllCommercial,
    getCommercialByContact,
    getCommercialById,
    getNotification,
    getPdvsHasCreance,
}