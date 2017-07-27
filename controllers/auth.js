import jwt from 'jsonwebtoken';

import User from '../models/user';
import config from '../config';


export const signup = async (req, res, next) => {
   const credentials = req.body;
   let user;

   try {
       user = await User.create(credentials);
   } catch ({ message }) {
       return next({
           status: 400,
           message
       });
   }

   res.json(user);
}

export const signin = async (req, res, next) => {
    // достаём из body логин и пароль
    const { login, password } = req.body;

    // находим user по логину
    const user = await User.findOne({ login });

    // если пользовательне найден выводим ошибку
    if ( !user ) {
        return next({
            status: 400,
            message: 'User not found'
        });
    }

    // если пользователь найден проверяем его пароль
    try {
        const result = user.comparePasswords(password);
    } catch (error) {
        return next({
            status: 400,
            message: 'Bad credentials'
        })
    }

    
    const token = jwt.sign({_id: user._id }, config.secret);
    res.json(token);
}