import { API_URL, API_PATH } from '../config/config.js';
import busboy from 'busboy';
import { pipeline } from 'stream/promises';
import { v4 as uuidv4 } from 'uuid';
import Athlete from '../models/athlete.js';
import Payment from '../models/payment.js';
import ErrorObject from '../helpers/errorObject.js';
import Socket from '../socket.js';
import Image from '../helpers/image.js';

export default {
  async getPayment(req, res, next) {
    try {
      const { paymentId } = req.params;

      const payment = await Payment.findOne({
        where: { paymentId },
        include: [{ model: Athlete, attributes: ['athleteId', 'name', 'lastname'] }],
      });

      if (!payment) throw new ErrorObject('Payment not found!', 404);

      res.status(200).json(payment);
    } catch (err) {
      next(err);
    }
  },

  async postAddPayment(req, res, next) {
    try {
      const { edit, paymentId } = req.query;
      const { headers } = req;
      const bb = busboy({ headers });

      const payment = edit ? await Payment.findOne({ where: { paymentId } }) : Payment.build();

      bb.on('file', async (_, file, { mimeType }) => {
        if (!/image/.test(mimeType)) return file.resume();

        const imageName = `${uuidv4()}.${mimeType.split('/')[1]}`;
        if (payment.evidence)
          Socket.serverSocket.emit('remove-image', {
            location: 'evidence',
            name: payment.evidence.split('/').pop(),
          });

        payment.set({ evidence: `${API_URL + API_PATH}/images/evidence/${imageName}` });

        const { id, location, name } = new Image(file, imageName, 'evidence');
        req.imageId = id;
        Socket.serverSocket.emit('store-image', { id, location, name });
      });

      bb.on('field', (name, value) => payment.set({ [name]: value }));

      await pipeline(req, bb);

      await payment.save();

      res.status(201).json('ok');
    } catch (err) {
      next(err);
    }
  },
};
