import { API_URL, API_PATH } from '../config/config.js';
import Athlete from '../models/athlete.js';
import { pipeline } from 'stream/promises';
import busboy from 'busboy';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import ErrorObject from '../helpers/errorObject.js';
import Trainer from '../models/trainer.js';
import Contact from '../models/contact.js';
import Payment from '../models/payment.js';

export default {
  async getAtheletes(_, res, next) {
    try {
      const athletes = await Athlete.findAll({ attributes: { exclude: ['id'] } });

      res.status(200).json(athletes);
    } catch (err) {
      next(err);
    }
  },

  async getAthletePayments(req, res, next) {
    try {
      const { athleteId } = req.params;
      const payments = await Athlete.findOne({
        where: { athleteId },
        include: { model: Payment, attributes: { exclude: ['id'] } },
      });

      res.status(200).json(payments);
    } catch (err) {
      next(err);
    }
  },

  async getAthlete(req, res, next) {
    try {
      const { athleteId } = req.params;

      const athlete = await Athlete.findOne({
        where: { athleteId },
        attributes: { exclude: ['id', 'trainerId'] },
        include: [Trainer, Contact, Payment],
      });
      if (!athlete) throw new ErrorObject('Athlete not found!', 404);

      res.status(200).json(athlete);
    } catch (err) {
      next(err);
    }
  },

  async postAddAthlete(req, res, next) {
    try {
      const { edit, athleteId } = req.query;
      const { headers } = req;
      const bb = busboy({ headers });

      const athlete = edit ? await Athlete.findOne({ where: { athleteId } }) : Athlete.build();

      bb.on('file', async (_, file, { mimeType }) => {
        if (!/image/.test(mimeType)) return file.resume();

        const photoName = `${uuidv4()}.${mimeType.split('/')[1]}`;
        athlete.set({ photo: `${API_URL + API_PATH}/images/photos/${photoName}` });
        await pipeline(file, fs.createWriteStream(`public/images/photos/${photoName}`));
      });

      bb.on('field', (name, value) => athlete.set({ [name]: value }));

      await pipeline(req, bb);

      await athlete.save();

      res.status(201).json(athlete.athleteId);
    } catch (err) {
      next(err);
    }
  },
};
