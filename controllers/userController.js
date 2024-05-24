const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      console.log('Fetching all users'); // Debug log
      const users = await User.find().populate("thoughts");
      console.log('Fetched users:', users); // Debug log
      res.json(users);
    } catch (err) {
      console.error('Error fetching users:', err); // Detailed error log
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
