import {Types, Modal} from './Graphi.js'

const post = new Modal({
    content:{
        type: Types.String
    },
    likes:{
        type: Types.Number
    },
  
});

export default post;