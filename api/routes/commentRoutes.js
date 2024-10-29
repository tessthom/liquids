import express from 'express';

// import { getComments, createComment, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

// All routes relative to '/api/posts/:postId/comments'

// Get all comments for a specific post
// router.get('/', getComments);
router.get('/', (req, res) => {
  res.json({ msg: 'Get all comments for a post' });
});

// Create new comment for a specific post
// router.post('/', createComment);
router.post('/', (req, res) => {
  res.json({ msg: 'Create new comment' });
});

// Delete a specific comment by ID
// router.delete('/:commentId', deleteComment);
router.delete('/:commentId', (req, res) => {
  res.json({ msg: 'Delete a comment by comment ID' });
});

export default router;