const { celebrate, Joi } = require('celebrate');
const express = require('express');
const { linkRegExp } = require('../utils/constants');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(linkRegExp).required(),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

router.get('/', authMiddleware, getCards);
router.post('/', authMiddleware, createCardValidation, createCard);
router.delete('/:cardId', authMiddleware, cardIdValidation, deleteCard);
router.put('/:cardId/likes', authMiddleware, cardIdValidation, likeCard);
router.delete('/:cardId/likes', authMiddleware, cardIdValidation, dislikeCard);

module.exports = router;
