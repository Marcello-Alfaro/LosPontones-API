import ErrorObject from '../helpers/errorObject.js';
import jwtVerify from '../helpers/jwtVerify.js';

export default async (req, _, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new ErrorObject('No valid authorization header present!', 401);
    const token = authorization.split(' ')[1];
    await jwtVerify(token);
    next();
  } catch (err) {
    next(err);
  }
};
