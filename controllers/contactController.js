import ErrorObject from '../helpers/errorObject.js';
import Athlete from '../models/athlete.js';
import Contact from '../models/contact.js';

export default {
  async postAddContact(req, res, next) {
    try {
      const { athleteId } = req.params;

      const { contactId } = req.body;

      if (contactId) {
        const contact = await Contact.findOne({ where: { contactId } });
        await contact.set(req.body).save();
        return res.status(201).json('ok');
      }

      const athlete = await Athlete.findOne({ where: { athleteId } });
      if (!athlete) throw new ErrorObject('Athlete not found!', 404);

      await athlete.createContact(req.body);

      res.status(201).json('ok');
    } catch (err) {
      next(err);
    }
  },
};
