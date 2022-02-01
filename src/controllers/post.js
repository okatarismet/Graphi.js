/* eslint-disable no-unused-vars */
import { error, ErrorMessages } from '../utils/errors.js';
import _ from 'lodash'
import User from '../Graphi/user.js'
import Post from '../Graphi/post.js'

export default {
 
   create: async (payload, callback) => {
       const { userId, content } = payload.data; 
       if(userId == null || content == null ){
           return callback(error(ErrorMessages.post_field_missing))
        }

        let post = await Post.create({ 
            content,
        });
        await User.addRelation(userId,'Posted',Post,post._id);
        callback({
            success: true,
            data:{
                users: await User.findAll()
            }
        })
    },
    
   update: async (payload, callback) => {
       const { postId, content } = payload.data; 
       if(postId == null || content == null ){
           return callback(error(ErrorMessages.post_field_missing))
        }

        let post = await Post.update(postId,{ 
            content
        });
        callback({
            success: true,
            data:post,
        })
    },

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

