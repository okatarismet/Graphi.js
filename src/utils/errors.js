/* eslint-disable no-undef */
//! Work in progress

export const error = (code, message) => {

    let result;
    message = (message) ? message : "Unkown error.";

    if(typeof code == "object"){
        result = code;
    }else{
        result = (ErrorMessages[code]) ? ErrorMessages[code] : {code:"AUTOHANDLE", message};
    }
    return result

}

/*
200 OK
201 Created
301 Moved
306 Unused = reserved status code and is not used
200 Bad Request = Incorrect Syntax
401 Unauthorized. (Client unkown)
403 Forbidden Unauthorized (Client known)
404 Not Found
405 Method Not = Allowed Wrong POST/GET... for endpoint.
420 EYC = API Rate limits
200 Internal Server Error
501 Not Implemented
502 3rd Party server sent data that cant handled.
503 Service Unavailable
504 3rd Part not responding in time.
*/

export const ErrorMessages = {
  error_in_token: {
    code: "G1",
    message: "Error in token. token might get broken",
    statusCode:401
  },

  missing_fields: { code: "M1", message: "Missing Fields", statusCode:200},

  db_connect_error: { code: "D1", message: "Error connecting to database", statusCode:200},
  db_busy: { code: "D2", message: "Database busy", statusCode:200},

  auth_no_key: { code: "A0", message: "Auth key is requred.", statusCode:401},
  auth_key_wrong: { code: "A1", message: "Session expired.", statusCode:401},
  auth_key_expired: { code: "A2", message: "Session expired.", statusCode:401},
  auth_unauthorized: { code: "A3", message: "You are not authorized.", statusCode:401},
  auth_level_error: { code: "A4", message: "You are not authorized.", statusCode:401},

  api_no_data: { code: "A5", message: "Data parameter requred.", statusCode:200},
  api_no_method: { code: "A6", message: "No method defined.", statusCode:200},
  api_no_payload: { code: "A7", messages: "Invalid arguments", statusCode:200},
  api_wrong_method: { code: "A8", messages: "Invalid method", statusCode:200},
  api_id_format: { code: "A9", messages: "Invalid ID", statusCode:200},
  api_not_found: { code: "A10", messages: "Not found", statusCode:404},
  api_data_format: { code: "A11", messages: "Invalid data in payload", statusCode:200},
  api_not_implemented: { code: "A12", messages: "This method is not yet implemented.", statusCode:501},
  
  bin_not_empty: { code: "B1", messages: "Bin already used", statusCode:200},
  bin_not_found: { code: "B2", messages: "Bin not found", statusCode:200},

  product_autohandle: {
    code: "P0",
    message: "Something went wrong with product",
    statusCode:200
  },
  product_not_found: { code: "P1", message: "Product not found", statusCode:200 },
  product_field_missing: { code: "P1", message: "Missing fields in products", statusCode:200 },
  product_cant_edit_approved: {
    code: "P2",
    message: "Cant edit approved product",
    statusCode:200
  },
  product_cant_edit_another: {
    code: "P3",
    message: "Cant edit someone elses product",
    statusCode:200

  },
  product_cant_delete_approved: {
    code: "P4",
    message: "Cant delete approved product",
    statusCode:200

  },
  product_cant_access_another: {
    code: "P4",
    message: "Cant access someone elses product",
    statusCode:200

  },

  user_autohandle: { code: "O0", message: "Something went wrong with user", statusCode:401},
  user_wrong_password: { code: "U1", message: "Wrong credentials", statusCode:200},
  user_not_found: { code: "U2", message: "User not found", statusCode:200},
  user_wrong_email: { code: "U3", message: "Wrong credentials", statusCode:200},
  user_login_error: {code: "U4", message: "Wrong credentials", statusCode:200},
  user_wrong_verification_key: {
    code: "U4",
    message: "Wrong verification key", 
    statusCode:401
  },
  user_password_reset_expiration: {
    code: "U5",
    message: "Password reset expiration time expired",
    statusCode:401
  },
  user_already_exist: { code: "U6", message: "User already exist", statusCode:200 },
  user_already_verified: { code: "U7", message: "User already verified", statusCode:200 },
 
}

