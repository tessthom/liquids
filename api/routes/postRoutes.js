import express from 'express';

const router = express.Router();

// All routes relative to '/api/posts'

// Get all posts
router.get('/', (req, res) => {
  res.json({ msg: 'GET all posts' });
});

// Create a new post
router.post('/', (req, res) => {
  res.json({ msg: 'Create a new post' });
});

// Get one post by post ID
router.get('/:id', (req, res) => {
  res.json({ msg: 'GET one post' });
});

// Update a post
router.patch('/:id', (req, res) => {
  res.json({ msg: 'Update a post' });
});

// Delete a post
router.delete('/:id', (req, res) => {
  res.json({ msg: 'Delete a post' });
});

// Get likes, dislikes, comment totals for a post
router.get('/:id/stats', (req, res) => {
  res.json({ msg: 'Get stats for a post' });
});

// Like a post
router.patch('/:id/like', (req, res) => {
  res.json({ msg: 'Like a post' });
});

// Dislike a post
router.patch('/:id/dislike', (req, res) => {
  res.json({ msg: 'Dislike a post' });
});

// Favorite a post
router.patch('/:id/favorite', (req, res) => {
  res.json({ msg: 'Favorite a post' });
});

// Unfavorite a post
router.patch('/:id/unfavorite', (req, res) => {
  res.json({ msg: 'Unfavorite a post' });
});

export default router;