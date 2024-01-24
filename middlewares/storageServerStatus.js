import ErrorObject from '../helpers/errorObject.js';
import Socket from '../socket.js';

export default (_, __, next) => {
  if (!Socket.serverSocket) throw new ErrorObject('Internal Server Error, try again later', 500);
  next();
};
