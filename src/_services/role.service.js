import { http } from "../_api/http.common"


let getAllRole = () =>{
    return http.Client.get("/roles")
}

let getRole = (id) =>{
    return http.Client.get("/roles/"+id)
}

export const roleservice = {
    getAllRole, getRole
}