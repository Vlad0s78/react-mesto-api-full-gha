const { celebrate, Joi } = require('celebrate');
const express = require('express');
const { linkRegExp } = require('../utils/constants');
const {
  getUsers,
  getUserById,
  updateProfileUser,
  updateAvatarUser,
  getCurrentUser,
} = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware, getUsers);
router.get('/me', authMiddleware, getCurrentUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
}), authMiddleware, getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), authMiddleware, updateProfileUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkRegExp),
  }),
}), authMiddleware, updateAvatarUser);

module.exports = router;
