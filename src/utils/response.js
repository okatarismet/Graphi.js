//import {error,ErrorMessages} from '../utils/errors.js'

export const response = (data) => {

    let result = {};

    if(data.code){//Just Error Received.
        result.error = data;

    }else{//Everything is in order.
        result = { ...data }

    }

    let payload = {
        result,
        timestamp: new Date().getTime()
    }

    if(data.statusCode && typeof data.statusCode == "number" ){//Status Code Received.
        payload.code = data.statusCode;
        delete data.statusCode;

    }else if(data.error){//Error object exists
        payload.code = (data.error.statusCode) ? data.error.statusCode:503;//If error has no code.
        delete data.error.statusCode;

    }else{//Default HTTP Code.
        payload.code = 200;
    }

    return payload;
}