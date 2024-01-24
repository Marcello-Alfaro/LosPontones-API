import { Server } from 'socket.io';
import { API_PATH, CORS_ORIGIN } from './config/config.js';
import jwtVerify from './helpers/jwtVerify.js';
import ErrorObject from './helpers/errorObject.js';

export default class Socket {
  static #io;
  static serverSocket;

  static init(server) {
    this.#io = new Server(server, {
      path: `${API_PATH}.io/`,
      cors: {
        origin: CORS_ORIGIN,
        methods: ['GET', 'POST'],
      },
    });

    this.#io
      .of('/storage-server')
      .use(async (socket, next) => {
        try {
          const {
            auth: { token },
          } = socket.handshake;
          if (!token) throw new ErrorObject('No valid auth token present!', 401);
          await jwtVerify(token);
          next();
        } catch (err) {
          next(err);
        }
      })
      .on('connection', (socket) => {
        this.serverSocket = socket;
        console.log('Connection with storage server established.');

        socket.on('disconnect', (reason) => {
          this.serverSocket = null;
          console.log(`Connection with storage server lost due to ${reason}.`);
        });
      });
  }
}
