import Graphi,{Modal} from './Graphi.js'

const comment = new Modal({
    content:{
        type: Graphi.String
    },
    likes:{
        type : Graphi.Number
    }
});

export default comment;