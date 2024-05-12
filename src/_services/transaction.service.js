import { http } from "../_api/http.common"

let getTransactionByIntervenant= (contactSim)=>{
    return http.Client.get("/transaction/makeByIntervenant/"+contactSim)
}

let getByIntervenantGroupByType= (contactSim)=>{
    return http.Client.get("/transaction/makeByIntervenantGroupByType/"+contactSim)
}

let getTransactionByReference = (reference)=>{
    return http.Client.get("/transaction/reference/"+reference)
}

let getByIntervenantByTypeByDate= (contactSim,type,date)=>{
    return http.Client.get("/transaction/ByTypeOfIntervenant/"+contactSim+"/"+type+"/"+date)
}

let get10lastTransaction=(contactSim)=>{   
    return http.Client.get("/transaction/lastTransaction/"+contactSim+"/5")
}

let getInfoTransaction=(contactSim,date)=>{
    return http.Client.get("/transaction/infoTransactionByIntervenant/"+contactSim+"/"+date)
}

let getStat=(contactSim, date1 ,date2)=>{
    return http.Client.get("/stats/statsTransaction/"+contactSim+"/"+date1+"/"+date2)
}

let testStat=()=>{
    return http.Client.get("http://localhost:8081/api/v1/stats/statsTransaction/6996306039/2024-05-01/2024-05-03")
}



export const TransactionService = {
    getTransactionByIntervenant,getByIntervenantGroupByType,getInfoTransaction,getStat,testStat,
    getTransactionByReference,get10lastTransaction,getByIntervenantByTypeByDate
}

