import { PORT, CORS_OPTIONS } from './config/config.js';
import express from 'express';
import './models/associations.js';
import sequelize from './database/connection.js';
import compression from 'compression';
import indexRoutes from './routes/indexRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import User from './models/user.js';
import helmet from 'helmet';
import cors from 'cors';
import fsp from 'fs/promises';

try {
  const app = express();

  await fsp.mkdir('public/images/photos', { recursive: true });
  await fsp.mkdir('public/images/evidence', { recursive: true });

  app.use(express.json());
  app.use(compression());
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(cors(CORS_OPTIONS));
  app.use(express.static('public'));
  app.use(indexRoutes);
  app.use(errorHandler);

  await sequelize.authenticate();
  console.log('Connection to database has been established successfully!');
  await sequelize.sync();

  await User.findOrCreate({
    where: { username: 'alfaro4564' },
    defaults: {
      isAdmin: true,
      username: 'alfaro4564',
      email: 'pikebshp13@gmail.com',
      password: '$2a$10$.HBkuc7vn.8eyykGRwRZjepZtsW26JPtWA695yFHeckJuIUrL2Wl6',
      name: 'Jake',
      lastname: 'Gittes',
    },
  });

  app.listen(PORT ?? 3000, console.log(`Server started on port ${PORT}`));

  process.on('uncaughtException', (err) => console.error(err));
} catch (err) {
  console.error(err);
}
