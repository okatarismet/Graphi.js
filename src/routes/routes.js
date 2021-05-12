import userEndpoints from "../controllers/user.js";
import postEndpoints from "../controllers/post.js";

import { response } from "../utils/response.js";
import { error, ErrorMessages } from "../utils/errors.js"

const endpoints = {
    user : userEndpoints,
    post: postEndpoints,
}

const routes = {
    user:(req, res)=>{

        findMethod( endpoints["user"], req.payload.method, req.payload,(M)=>{
            const R = response(M);
            return res.status(R.code).json(R.result);
        });
    },
  
    product:(req, res)=>{

        findMethod(endpoints["product"], req.payload.method, req.payload,(M)=>{
            const R = response(M);
            return res.status(R.code).json(R.result);
        });
    },
}

function findMethod(endpoint, method, data, callback){
    if (endpoint && endpoint[method]){
        endpoint[method](data, callback)
    } else{
        callback(error(ErrorMessages.api_wrong_method));
    }
}

export function listEndpoints(){
    let list = {};
    for(let route in routes){
        list[route] = (endpoints[`${route}Endpoints`]) ? Object.keys(endpoints[`${route}Endpoints`]):{};
    }
    return list;
}

 
export default routes;