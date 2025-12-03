const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

// Add comment
router.post('/', auth, async (req, res) => {
  const { postId, body } = req.body;

  const comment = new Comment({
    post: postId,
    author: req.user.id,
    body
  });

  await comment.save();

  res.json(comment);
});

// Get comments for post
router.get('/:postId', async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate('author', 'name')
    .sort({ createdAt: -1 });

  res.json(comments);
});

module.exports = router;