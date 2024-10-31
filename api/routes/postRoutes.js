import express from 'express';
// import { authenticateUser } from '../middleware/authMiddleware.js';
import * as postController from '../controllers/postController.js';

const router = express.Router();

// All routes relative to '/api/posts'

// Get all posts
router.get('/', postController.getPosts);

// Create a new post
// With auth middleware would be router.post('/', authenticateUser, postController.createPost);
router.post('/', postController.createPost);

// Get one post by post ID
router.get('/:postId', postController.getPostById);

// Update a post
router.patch('/:postId', postController.updatePost);

// Delete a post
router.delete('/:postId', postController.deletePost);

// Get upvotes, downvotes, comments array for a post
router.get('/:postId/interactions', postController.getInteractionsById);

// Vote on a post
router.patch('/:postId/vote', postController.vote);

// Favorite a post
router.patch('/:postId/favorite', (req, res) => {
  res.json({ msg: 'Favorite a post' });
});

// Unfavorite a post
router.patch('/:postId/unfavorite', (req, res) => {
  res.json({ msg: 'Unfavorite a post' });
});

export default router;