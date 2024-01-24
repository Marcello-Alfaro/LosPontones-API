import { pipeline } from 'stream/promises';
import Image from '../helpers/image.js';
import Socket from '../socket.js';

export default {
  async getImage(req, res, next) {
    try {
      const { image } = req.params;

      const { id, location, name } = new Image(res, image, req.path.split('/')[1]);

      Socket.serverSocket.emit('get-image', { id, location, name });

      res.attachment(image);
    } catch (err) {
      next(err);
    }
  },

  async redirectMain(req, res, next) {
    try {
      const { id } = req.headers;
      const { stream } = Image.remove(id);

      await pipeline(req, stream);

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },

  async redirectStorage(req, res, next) {
    try {
      const { id } = req.headers;
      const { stream } = Image.remove(id);
      console.log(stream);
      await pipeline(stream, res);
    } catch (err) {
      next(err);
    }
  },
};
