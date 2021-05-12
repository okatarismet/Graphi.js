import { response } from "../utils/response.js";
import { error, ErrorMessages } from "../utils/errors.js";


export default (req, res, next) => {
  let path = req._parsedUrl.pathname.split("/");
  let formattedResult = {};

  if (Object.keys(req.body).length) {
      //Check if request has a JSON body.

    if (typeof req.body.method === "string") {//Is Method Defined?

      if (typeof req.body.data === "object") {//Is Data Defined?

        req.payload = {
          endpoint: path[1],//Assign Endpoint Values.
          meta:{//Additional Meta Data
            path,//Browsed Path
            browser: req.headers['user-agent']//User Agent
          },
          method: req.body.method,//Requested Method
          data: req.body.data,//Method Payload
          fields: (req.body.fields) ? req.body.fields : []
        };

        //If ID Exists
        if(req.body.data.id){
            req.payload.id = req.body.data.id
        }

        if(req.payload.id){
          console.log("ID RECV",req.payload.id);
        }
        checkPaginationFormat(req.payload, req.body.pagination);
        next();
          
      } else {

        formattedResult = response(error(ErrorMessages.api_no_data));
        return res.send(formattedResult.code, formattedResult.result);
      }
    } else {

      formattedResult = response(error(ErrorMessages.api_no_method));
      return res.send(formattedResult.code, formattedResult.result);
    }
  } else {

    formattedResult = response(error(ErrorMessages.api_no_payload))
    return res.send(formattedResult.code, formattedResult.result);
  }

};

function checkPaginationFormat(data, pagination) {
  if (typeof pagination === "object") {
    if (typeof pagination.page == "number") {
      data.pagination = pagination;
      data.pagination.limit =
        typeof pagination.limit == "number" ? pagination.limit : 0;
    }
  }
}
