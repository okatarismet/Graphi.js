import {Types, Modal} from './Graphi.js'
const user = new Modal({
    fullName:{
        type: Types.String
    },
    email:{
        type: Types.String
    },
    password:{
        type: Types.String
    },
    username:{
        type: Types.String
    },
});

export default user;