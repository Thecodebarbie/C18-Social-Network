const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addUserFriend,
  removeUserFriend
} = require('../../controllers/userController');

// /api/users
//http://localhost:3001/api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
.post(addUserFriend) // Add a friend to user's friend list
.delete(removeUserFriend); // Remove a friend from user's friend list

module.exports = router;
