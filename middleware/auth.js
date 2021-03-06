'use strict';

import jwt from 'jsonwebtoken';
import * as userRepository from '../controller/auth.js';
import { config } from '../config.js';


const AUTH_ERROR1 = {message : "유저가 로그인 되지 않거나 인증 과정에서 오류가 발생했습니다.1"};
const AUTH_ERROR2 = {message : "유저가 로그인 되지 않거나 인증 과정에서 오류가 발생했습니다.2"};
const AUTH_ERROR3 = {message : "유저가 로그인 되지 않거나 인증 과정에서 오류가 발생했습니다.3"};
const jwtSecretKey = config.jwt.jwtSecretKey;

export async function isAuth(req, res, next){
    const authHeader = req.get('Authorization');
    if(!(authHeader && authHeader.startsWith('Bearer '))){
        return res.status(401).json(AUTH_ERROR1);
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        jwtSecretKey,
        async (error, decoded) => {
            if(error){
                return res.status(401).json(AUTH_ERROR2);
            };
            const user = await userRepository.findUserById(decoded.id);
            if(!user){
                return res.status(401).json(AUTH_ERROR3);
            }
            req.id = user.id;
            next();
        }
    )
}