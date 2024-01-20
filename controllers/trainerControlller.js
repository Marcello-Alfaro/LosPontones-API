import { API_URL, API_PATH } from '../config/config.js';
import ErrorObject from '../helpers/errorObject.js';
import Athlete from '../models/athlete.js';
import Trainer from '../models/trainer.js';
import fs from 'fs-extra';
import busboy from 'busboy';
import { v4 as uuidv4 } from 'uuid';
import { pipeline } from 'stream/promises';

export default {
  async getTrainers(_, res, next) {
    try {
      const trainers = await Trainer.findAll();

      res.status(200).json(trainers);
    } catch (err) {
      next(err);
    }
  },

  async getTrainer(req, res, next) {
    try {
      const { trainerId } = req.params;

      const trainer = await Trainer.findOne({
        where: { trainerId },
        include: [{ model: Athlete, attributes: { exclude: ['id'] } }],
        attributes: { exclude: ['id'] },
      });

      if (!trainer) throw new ErrorObject('Trainer not found!', 404);

      res.status(200).json(trainer);
    } catch (err) {
      next(err);
    }
  },

  async postAddTrainer(req, res, next) {
    try {
      const { edit, trainerId } = req.query;
      const { headers } = req;
      const bb = busboy({ headers });

      const trainer = edit ? await Trainer.findOne({ where: { trainerId } }) : Trainer.build();

      bb.on('file', async (_, file, { mimeType }) => {
        if (!/image/.test(mimeType)) return file.resume();

        const photoName = `${uuidv4()}.${mimeType.split('/')[1]}`;
        if (trainer.photo)
          await fs.remove(`public/images/photos/${trainer.photo.split('/').pop()}`);

        trainer.set({ photo: `${API_URL + API_PATH}/images/photos/${photoName}` });
        await pipeline(file, fs.createWriteStream(`public/images/photos/${photoName}`));
      });

      bb.on('field', (name, value) => trainer.set({ [name]: value }));

      await pipeline(req, bb);

      await trainer.save();

      res.status(201).json('ok');
    } catch (err) {
      next(err);
    }
  },
};
