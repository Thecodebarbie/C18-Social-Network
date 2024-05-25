const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      console.log('Fetching all users'); // Debug log
      const users = await User.find().populate("thoughts").populate('friends');
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
        .populate('thoughts')
        .populate('friends')
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
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addUserFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      const friend = await User.findById(friendId);
      if (!friend) {
        return res.status(404).json({ message: 'No friend found with that ID' });
      }

      if (user.friends.includes(friendId)) {
        return res.status(400).json({ message: 'Friend already added' });
      }

      user.friends.push(friendId);
      await user.save();

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeUserFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      const friendIndex = user.friends.indexOf(friendId);
      if (friendIndex === -1) {
        return res.status(400).json({ message: 'Friend not found' });
      }

      user.friends.splice(friendIndex, 1);
      await user.save();

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
