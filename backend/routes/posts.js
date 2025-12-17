const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const slugify = require('../utils/slug');
const auth = require('../middleware/auth.js');

// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// Get single post by slug
router.get('/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });

  if (!post) return res.status(404).json({ msg: "Post not found" });

  post.views += 1;
  await post.save();

  res.json(post);
});

// Get recommended posts
router.get('/:id/recommended', async (req, res) => {
  const post = await Post.findById(req.params.id);

  const recommended = await Post.find({
    _id: { $ne: post._id },
    $or: [
      { category: post.category },
      { tags: { $in: post.tags } }
    ]
  }).limit(3);

  res.json(recommended);
});




router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ msg: 'Post not found' })

    const userId = req.user.id

    const alreadyLiked = post.likes.includes(userId)

    if (alreadyLiked) {
      // UNLIKE
      post.likes = post.likes.filter(
        id => id.toString() !== userId
      )
    } else {
      // LIKE
      post.likes.push(userId)
    }

    await post.save()

    res.json({
      likes: post.likes.length,
      liked: !alreadyLiked
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router;