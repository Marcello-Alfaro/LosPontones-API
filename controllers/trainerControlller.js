import Trainer from '../models/trainer.js';

export default {
  async getTrainers(_, res, next) {
    try {
      const trainers = await Trainer.findAll();

      res.status(200).json(trainers);
    } catch (err) {
      next(err);
    }
  },

  async postAddTrainer(req, res, next) {
    try {
      const trainer = req.body;

      await Trainer.create(trainer);

      res.status(201).json('ok');
    } catch (err) {
      next(err);
    }
  },
};
