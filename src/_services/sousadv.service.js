import { http } from "../_api/http.common"


let getAllCommerciaux = (contactSousAdv) =>{
    return http.Client.get("/sousadv/commercials/"+contactSousAdv)
}

let getCommerciauxsHasCreance = (contactSousAdv) =>{
    return http.Client.get("/sousadv/commerciauxsHasCreance/"+contactSousAdv)
}

let getPdvHasCreanceWithSousAdv = (contactSousAdv) =>{
    return http.Client.get("/sousadv/pdvHasCreanceWithSousAdv/"+contactSousAdv)
}

let getStatistique = (contactSousAdv, date)=>{
    return http.Client.get("/sousadv/statistique/"+contactSousAdv+"/"+date)
}

let getStatistiquePdv = (contactSousAdv, date)=>{
    return http.Client.get("/sousadv/statistiquepdv/"+contactSousAdv+"/"+date)
}

let getSousAdvByContact = (contact)=>{
    return http.Client.get("/sousadv/contact/"+contact)
}

let getMyAdv = (contact)=>{
    return http.Client.get("/sousadv/myAdv/"+contact)
}

let getCommercialPosition = (contactCommercial)=>{
    return http.Client.get("/sousadv/positionOfCommercial/"+contactCommercial)
}

let getTrasanctionWithCommerciaux = (contactSim)=>{
    return http.Client.get("/sousadv/lastTransactionCommercial/"+contactSim)
}

let getTrasanctionWithPdvs= (contactSim)=>{
    return http.Client.get("/sousadv/lastTransactionPdv/"+contactSim)
}
export const sousadvService = {
    getTrasanctionWithCommerciaux,
    getTrasanctionWithPdvs,
    getAllCommerciaux,
    getStatistique,
    getCommercialPosition,
    getMyAdv,
    getPdvHasCreanceWithSousAdv,
    getCommerciauxsHasCreance,
    getSousAdvByContact,
    getStatistiquePdv
}