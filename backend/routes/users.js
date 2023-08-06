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

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(linkRegExp).required(),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

router.get('/me', authMiddleware, getCurrentUser);
router.get('/', authMiddleware, getUsers);
router.get('/:userId', authMiddleware, userIdValidation, getUserById);
router.patch('/me', authMiddleware, updateProfileValidation, updateProfileUser);
router.patch('/me/avatar', authMiddleware, updateAvatarValidation, updateAvatarUser);

module.exports = router;
