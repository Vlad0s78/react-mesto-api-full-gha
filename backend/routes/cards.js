const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { createCardValidation, cardIdValidation } = require('../middlewares/validation');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware, getCards);
router.post('/', [authMiddleware, createCardValidation], createCard);
router.delete('/:cardId', [authMiddleware, cardIdValidation], deleteCard);
router.put('/:cardId/likes', [authMiddleware, cardIdValidation], likeCard);
router.delete('/:cardId/likes', [authMiddleware, cardIdValidation], dislikeCard);

module.exports = router;
