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

const DEBUG = config.DEBUG;

export default {

 
   register: async (payload, callback) => {
        const { fullName,username, email, password } = payload.data; // TODO those has to be validated
        let user = await User.find({
            where: { email: email },
        })
        if (user[0]) { // Check if user already exists
            callback(error(ErrorMessages.user_already_exist));
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        user = await User.create({ // Create new user 
            fullName,
            username,
            email,
            password: encryptedPassword,
        });
        callback({
            success: true,
            data:{}
        })
    },

    login: async (payload, callback) => {
        const { email, password } = payload.data;
        //Find if user exists
        let user = await User.find({
            where: { email: email },
        })
        user = user[0];
        
        if (!user) {
            logger.error(error(ErrorMessages.user_not_found))
            callback(error(ErrorMessages.user_not_found))
            return;
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                callback(error(ErrorMessages.user_wrong_password))
                return;
            }
            // If password matches sign with jwt
            const token = jwt.sign(
                {
                    _id: user._id,
                    email: user.email,
                    password: password,
                },
                process.env.JWT_KEY || "dummy",
            )
            callback({
                success:true,
                message: 'Auth Succesful welcome ' + user.fullName ,
                data: {
                    token: token,
                    user: user,
                }
            })
        }); 

    },

}

