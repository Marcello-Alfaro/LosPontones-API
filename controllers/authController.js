import { Op } from 'sequelize';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ErrorObject from '../helpers/errorObject.js';
import { JWT_SECRET } from '../config/config.js';
import jwtVerify from '../helpers/jwtVerify.js';

export default {
  async putLogin(req, res, next) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({
        where: { [Op.or]: [{ username }, { email: username }] },
      });

      if (!user) throw new ErrorObject('User or password is invalid!', 404);

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) throw new ErrorObject('User or password is invalid!', 404);

      const token = jwt.sign({ isAdmin: user.isAdmin, email: user.email }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res.status(200).json({ user: `${user.name} ${user.lastname}`, token });
    } catch (err) {
      next(err);
    }
  },

  async getVerifyToken(req, res, next) {
    try {
      const { token } = req.params;
      await jwtVerify(token);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },
};
