const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser
} = require('../../controllers/userController');

// /api/users
//http://localhost:3001/api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser);

module.exports = router;
