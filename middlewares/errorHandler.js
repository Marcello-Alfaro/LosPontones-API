export default (err, _, res, next) => {
  const {
    message = status >= 500 ? 'Something went wrong, try again later!' : message,
    status = 500,
  } = err;
  console.error(err, new Date().toISOString());
  if (res.headersSent) return next(err);

  res.status(status).json({ message });
};
