import express from 'express';

const router = express.Router();

// All routes relative to '/api/users'

// TODO: Write + import all userController methods req'd

// Get all users
router.get('/', (req, res) => {
  res.json({ msg: 'Get all users' });
});

// Create new user
router.post('/register', (req, res) => {
  res.json({ msg: 'Register new user' });
});

// Login a user
router.post('/login', (req, res) => {
  res.json({ msg: 'Log in user' });
});

// Logout a user
router.post('/logout', (req, res) => {
  res.json({ msg: 'Log out user' });
});

// Get one user
router.get('/:userId', (req, res) => {
  res.json({ msg: 'Get one user' });
});

// Follow a user
router.patch('/:userId/follow', (req, res) => {
  res.json({ msg: 'Follow a user' });
});

// Unfollow a user
router.patch('/:userId/unfollow', (req, res) => {
  res.json({ msg: 'Unfollow a user' });
});

// Get one user's posts
router.get('/:userId/posts', (req, res) => {
  res.json({ msg: 'Get one users posts' });
});

// Get one user's favorites array
router.get('/:userId/favorites', (req, res) => {
  res.json({ msg: 'Get one users favorites array' });
});

// Get one user's feed from users they follow and groups they're in. ***This endpoint should aggregate posts based on a user's follows + groups + their own posts.
router.get('/:userId/feed', (req, res) => {
  res.json({ msg: 'Get one users feed' });
});

export default router;