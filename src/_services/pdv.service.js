import { http } from "../_api/http.common"


let getAllPdvsPaginate = (offset, limit) =>{
    return http.Client.get("/pdv/"+offset+"/"+limit)
}

let AddPdv = (pdvRequest)=>{
    return http.Client.post("/pdv/new",pdvRequest)
}

let getPdvByContactSim = (contactSim)=>{
    return http.Client.get("/pdv/contactSim/"+contactSim)
}

let getPdvByContactPerso = (contactPerso)=>{
    return http.Client.get("/pdv/contactPerso/"+contactPerso)
}

let deletePdv = (idPdv)=>{
    return http.Client.delete("/pdv/"+idPdv)
}

let updateCommercialPdv = (contactSimCom, contactSimPdv)=>{
    return http.Client.put("/pdv/updateCommercialPdv/"+contactSimCom+"/"+contactSimPdv)
}

let updatePdv = (contactPdv, pdvRequest)=>{
    return http.Client.put("/pdv/updatePdv/"+contactPdv, pdvRequest)
}



export const pdvService = {
    updatePdv,
    updateCommercialPdv,
    deletePdv,
    getPdvByContactPerso,
    getPdvByContactSim,
    AddPdv,
    getAllPdvsPaginate
}