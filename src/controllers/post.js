import { error, ErrorMessages } from '../utils/errors.js';
import config from '../utils/config.js'
import _ from 'lodash'
import Post from '../Graphi/post.js'
import User from '../Graphi/user.js'

const DEBUG = config.DEBUG;

export default {

    create: async (payload, callback) => {
        let { 
            id,
            content,
        } = payload.data; 
        if(!content ){
            return callback(error(ErrorMessages.product_field_missing))
        }

       let post = Post.create({
           content,
           likes:0
       })
       //link to user
        callback({
            success: true
        })
    },
    update: async (payload, callback) => {
        let { 
            id,
            content,
            likes,
        } = payload.data; 
        if(!content ){
            return callback(error(ErrorMessages.product_field_missing))
        }

       let post = Post.update({
           content,
           likes,
       })
       //link to user
        callback({
            success: true
        })
    },
    
}
