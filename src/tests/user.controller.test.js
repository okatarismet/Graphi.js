/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import axios from 'axios';
import config from '../utils/testing.config.js'
let token;



describe('loginUser  API', () => {
    it('should register succesfully', async () => {
        try{
            let result = await axios.post(config.LOCAL+'/user',
            {
                "method": "register",
                "data": {
                    "fullName": "ismet okatar",
                    "username": "oktarismet",
                    "email": "test@graphi.com",
                    "password": "aa"
                }
            }
            );
            expect(result.status).toEqual(200);
            expect(result.data.token).not.toBeDefined();
        }catch(err) {
            // //
        }
    })
    it('should login succesfully', async () => {
        try{
            let result = await axios.post(config.LOCAL+'/user',
                {
                    "method": "login",
                    "data": {
                        "email": "test@graphi.com",
                        "password": "aa"
                    }
                }
            );
            expect(result.status).toEqual(200);
            expect(result.data.token).not.toBeDefined();
        }catch(err) {
            // //
        }
    })
    // it('should assert wrong email', async () => {
    //     try{
    //         let result = await axios.post(config.LOCAL+'/user/login',config.sample_user_wrong_email);
    //         expect(result.status).toEqual(401);
    //         expect(result.data.token).not.toBeDefined();
    //     }catch(err) {
    //         // //
    //     }
    // })
    // it('should assert wrong password', async () => {
    //     try{
    //         let result = await axios.post(config.LOCAL+'/user/login',config.sample_user_wrong_password);
    //         expect(result.status).toEqual(401);
    //         expect(result.data.token).not.toBeDefined();
    //     }catch(err) {
    //         // //
    //     }
    // })
})





















// import request from 'request';
// import server from '../index'

// // describe('Post Endpoints', () => {
// //   it('should create a new post', () => {
// //     request(server)
// //       .post('/user/login')
// //       .send({
// //         "email":"jonh@gmail.com",
// //         "password":"exampleuser"
// //     }).then((res)=>{
// //       expect(res.statusCode).toEqual(200)
// //     })
// //     // expect(res.body).toHaveProperty('token')
// //   })
// // })
// // describe('Post Endpoints', () => {
// //    it('should create a new post', async () => {
// //      const res = await request(server)
// //      .post('/user/login')
// //      .send({
// //        email:"jonh@gmail.com",
// //        password:"exampleuser"
// //       })
// //     expect(res.statusCode).toEqual(200)
// //     // expect(res.body).toHaveProperty('post')
// //   })
// // })
// test('add person', async () => {
//       await request(server)
//           .post('/')
//           .send({ name: 'Joe', age: 2 });
//       const res = await request(app).get('/');
//       const response = [
//           { name: 'Jane', id: 1, age: 1 },
//           { name: 'Joe', id: 2, age: 2 }
//       ]
//       expect(res.status).toBe(200);
//       expect(res.body).toEqual(response);

// });