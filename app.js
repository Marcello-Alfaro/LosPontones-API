import { API_PATH, PORT, CORS_OPTIONS, DEFAULT_ADMIN_USER } from './config/config.js';
import express from 'express';
import './models/associations.js';
import sequelize from './database/connection.js';
import compression from 'compression';
import indexRoutes from './routes/indexRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import User from './models/user.js';
import helmet from 'helmet';
import cors from 'cors';
import Socket from './socket.js';
import storageServerStatus from './middlewares/storageServerStatus.js';

try {
  const app = express();

  app.use(express.json());
  app.use(compression());
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(cors(CORS_OPTIONS));
  app.use(storageServerStatus);
  app.use(API_PATH, indexRoutes);
  app.use(errorHandler);

  await sequelize.authenticate();
  console.log('Connection to database has been established successfully!');
  await sequelize.sync();

  await User.findOrCreate({
    where: { username: 'alfaro4564' },
    defaults: DEFAULT_ADMIN_USER,
  });

  const server = app.listen(PORT ?? 3000, console.log(`Server started on port ${PORT}`));

  Socket.init(server);

  process.on('uncaughtException', (err) => console.error(err));
} catch (err) {
  console.error(err);
}
