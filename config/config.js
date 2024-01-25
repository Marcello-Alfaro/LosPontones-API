export const {
  PORT,
  API_URL,
  API_PATH,
  JWT_SECRET,
  CORS_ORIGIN,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
} = process.env;

export const DEFAULT_ADMIN_USER = JSON.parse(process.env.DEFAULT_ADMIN_USER);

export const CORS_OPTIONS = {
  origin: CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
