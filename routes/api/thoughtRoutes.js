const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addThoughtReaction,
  removeThoughtReaction,
} = require('../../controllers/thoughtController');

// /api/Thoughts
//http://localhost:3001/api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/Thoughts/:thoughtId/reactions
//http://localhost:3001/api/Thoughts/
router.route('/:thoughtId/reactions').post(addThoughtReaction);

// /api/Thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReaction);

module.exports = router;
