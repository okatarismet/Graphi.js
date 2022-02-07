/* eslint-disable no-unused-vars */
import { error, ErrorMessages } from '../utils/errors.js';
import _ from 'lodash'
import User from '../Graphi/user.js'
import Post from '../Graphi/post.js'

export default {
 

  

   getById: async (payload, callback) => {
       const { postId } = payload.data; 
       if(postId == null ){
           return callback(error(ErrorMessages.post_field_missing))
        }
        let post = await Post.findById(postId);
        callback({
            success: true,
            data:post,
        })
    },

   getFiltered: async (payload, callback) => {
       const { content = ""} = payload.data; 
       
        let post = await Post.find({where:{content}});
        callback({
            success: true,
            data:post,
        })
    },

   delete: async (payload, callback) => {
       const { postId } = payload.data; 
       
        let post = await Post.delete(postId);
        callback({
            success: true,
            data:post,
        })
    },

}

