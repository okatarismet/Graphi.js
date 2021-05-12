/* eslint-disable no-unused-vars */
import { error, ErrorMessages } from '../utils/errors.js';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer'
import logger from '../utils/winston.js'
import bcrypt from 'bcryptjs';
import config from '../utils/config.js'
import moment from 'moment'
import jwt from 'jsonwebtoken';
import _ from 'lodash'
import User from '../Graphi/user.js'
import Post from '../Graphi/post.js'

const DEBUG = config.DEBUG;

export default {
 
   create: async (payload, callback) => {
       console.log(1)
       const { userId, content } = payload.data; 
       if(userId == null || content == null ){
           return callback(error(ErrorMessages.post_field_missing))
        }
        console.log(2)
        

        let post = await Post.create({ 
            content,
        });
        console.log("ASE")
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

