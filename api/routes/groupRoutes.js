import express from 'express';

const router = express.Router();

// All routes relative to '/api/groups'

// TODO: Write + import all groupController methods req'd
// Get all groups
router.get('/', (req, res) => {
  res.json({ msg: 'Get all groups' });
});

// Create a group
router.post('/', (req, res) => {
  res.json({ msg: 'Create a group' });
});

// Get one group's details
router.get('/:groupId', (req, res) => {
  res.json({ msg: 'Get one groups details' });
});

// Join a group
router.patch('/:groupId/join', (req, res) => {
  res.json({ msg: 'Join a group' });
});

// Leave a group
router.patch('/:groupId/leave', (req, res) => {
  res.json({ msg: 'Leave a group' });
});

// Get a group's posts
router.get('/:groupId/posts', (req, res) => {
  res.json({ msg: 'Get a groups posts' });
});

export default router;