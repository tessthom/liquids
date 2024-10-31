import mongoose from 'mongoose';

import Post from '../models/Post.js';

// Get all posts
export const getPosts = async (req, res) => {
  // find() will return all docs from the Post collection if passed an empty object, or a subset based on query filters spec'd in the options object. sort({ createdAt: -1 }) will sort in descending order, aka newest first
  const posts = await Post.find({}).sort({ createdAt: -1 });

  res.status(200).json(posts);
};

// Create a new post
export const createPost = async (req, res) => {
  // only pass in user + content data, no interactions at creation time
  // TODO: pass in userId after you implement JWT for auth
  // const userId = req.user._id; // After implementing auth, `req.user` should contain the authenticated user's ID
  const { content } = req.body; // input data will be avail on req.body
  try {
    // add doc to Post collection in db
    const post = await Post.create({ content }); // after auth, include userId
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
  // res.json({ msg: 'Create a new post' });
};

// Get one post by ID
export const getPostById = async (req, res) => {
  const { postId } = req.params; // destructure dynamic id value from params object

  // Check that id param is valid ObjectId format 
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).json({ error: 'Invalid post ID param' });
  }

  const post = await Post.findById(postId);
  // Use `if` bc async op will still resolve (just to null) even if no matching doc is found
  if (!post) {
    return res.status(404).json({ error: 'No matching post found'});
  }

  res.status(200).json(post);
};

// Update a post
export const updatePost = async (req, res) => {
  // Get the id from the request
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).json({ error: 'Invalid post ID param' });
  }

  // findOneAndUpdate([filter, update, options]) - finds matching doc, updates according to `update` arg, passing in any `options`, returns found doc (if any) to the CB if a CB is passed, else returns a query object.
  const filter = { _id: postId };
  const post = await Post.findOneAndUpdate(filter, {
    ...req.body 
  });

  if (!post) {
    return res.status(404).json({ error: 'No matching post found'});
  }

  res.status(200).json(post);
}

// Delete a post
export const deletePost = async (req, res) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).json({ error: 'Invalid post ID param' });
  }

  const post = await Post.findOneAndDelete({ _id: postId }); // `_id` is how mongoose refs ids

  if (!post) {
    return res.status(404).json({ error: 'No matching post found' });
  }

  res.status(200).json({ post });
};

// Get one post's interaction data
export const getInteractionsById = async (req, res) => {
  const { postId } = req.params; // destructure dynamic id value from params object

  // Check that id param is valid ObjectId format 
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).json({ error: 'Invalid post ID param' });
  }

  const post = await Post.findById(postId);
  // Use `if` bc async op will still resolve (just to null) even if no matching doc is found
  if (!post) {
    return res.status(404).json({ error: 'No matching post found'});
  }

  const interactions = post.interactions; 
  // interactions === { likes: num, dislikes: num, comments: array }
  res.status(200).json({ interactions });
};

// Vote on a post --- JSON payload = { "voteType": "upvote" } // or "downvote"
// Should also receive the user's JWT in the `Authorization` header, so dont need to pass in userId directly to payload
export const vote = async (req, res) => {
  const { postId } = req.params;
  const { voteType } = req.body; // "upvote" or "downvote"
  // const userId = req.user.id; // retrieved from the JWT in auth middleware
  const userId = '603d7eec32f38b0b8f8f8d63'; // TODO: temp hard coded val to test in Postman

  try {
    // Get post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Call instance method to update votes
    post.updateVote(userId, voteType);

    // Get updated votes
    const voteCounts = post.getVoteCounts();

    // Save updated post to DB
    await post.save();

    res.status(200).json({ voteCounts }); // Returns { upvotes: n, downvotes: n }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Favorite a post


// Unfavorite a post