const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const slugify = require('../utils/slug');

// Create Post
router.post('/posts', auth, auth.isAdmin, upload.single('coverImage'), async (req, res) => {
  const { title, content, tags, category } = req.body;

  const post = new Post({
    title,
    content,
    tags: tags ? tags.split(',').map(t => t.trim()) : [],
    category,
    slug: slugify(title),
    coverImage: req.file ? `/uploads/${req.file.filename}` : null,
    author: req.user.id
  });

  await post.save();
  res.json(post);
});

// Update Post
router.put('/posts/:id', auth, auth.isAdmin, upload.single('coverImage'), async (req, res) => {
  const update = { ...req.body };

  if (req.file) {
    update.coverImage = `/uploads/${req.file.filename}`;
  }

  if (update.title) update.slug = slugify(update.title);

  const post = await Post.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(post);
});

// Delete Post
router.delete('/posts/:id', auth, auth.isAdmin, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ msg: "Post deleted" });
});

module.exports = router;