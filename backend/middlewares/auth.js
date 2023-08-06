const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError('Требуется аутентификация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret');
    req.user = payload;
    next();
  } catch (error) {
    return next(new UnauthorizedError('Неверный токен аутентификации'));
  }
  req.user = payload;
};

module.exports = authMiddleware;
