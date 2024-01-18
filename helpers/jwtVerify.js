import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';
import ErrorObject from './errorObject.js';

export default (token) =>
  new Promise((res, rej) => {
    try {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) throw new ErrorObject(`Session expired or invalid, please log in again.`, 401);
        res(decoded);
      });
    } catch (err) {
      rej(err);
    }
  });
