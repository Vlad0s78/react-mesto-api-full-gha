const express = require('express');
const {
  getUsers,
  getUserById,
  updateProfileUser,
  updateAvatarUser,
  login,
  getCurrentUser,
} = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');
const {
  updateUserProfileValidation,
  updateUserAvatarValidation,
} = require('../middlewares/validation');

const router = express.Router();

router.get('/me', authMiddleware, getCurrentUser);
router.get('/', authMiddleware, getUsers);
router.get('/:userId', authMiddleware, getUserById);
router.patch('/me', [authMiddleware, updateUserProfileValidation], updateProfileUser);
router.patch('/me/avatar', [authMiddleware, updateUserAvatarValidation], updateAvatarUser);
router.post('/login', login);

module.exports = router;
