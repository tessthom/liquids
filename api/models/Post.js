import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * Post Data Model WIP:
 * - ObjectId
 * - userId (reference to User)
 * - groupId (optional ref to Group)
 * - title (String)
 * - description (String, optional)
 * - imageUrl (String, optional)
 * - externalLink (String, optional link)
 * - ingredients (Array of objects)
 *    - name: (String)
 *    - amount: (Number)
 *    - unit: (String)
 * - instructions (Array of strings)
 * - likes (Number)
 * - dislikes (Number)
 * - comments (Array of Comment IDs)
 * - createdAt (Date)
 */

const voteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  direction: { type: String, enum: ['upvote', 'downvote'] }
});

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  groupId: { type: Schema.Types.ObjectId, ref: 'Group' },
  // Wrapper fields for easier destructuring in FE/organization
  content: {
    title: { 
      type: String, 
      maxlength: 80
    },
    description: { type: String },
    imageUrl: { type: String },
    externalLink: { type: String },
    ingredients: [{
      name: { type: String, maxlength: 50 },
      amount: { type: Number, min: 0, max: 1000 },
      unit: { type: String, default: 'oz' }
    }],
    instructions: { type: [String], maxlength: 200 }
  },
  votes: [voteSchema],
  comments: [commentSchema]

}, { timestamps: true });

// Instance method to get vote counts
postSchema.methods.getVoteCounts = function () {
  const upvotes = this.votes.filter(vote => vote.direction === 'upvote').length;
  const downvotes = this.votes.filter(vote => vote.direction === 'downvote').length;

  return { upvotes, downvotes };
}

// Instance method to handle voting
postSchema.methods.updateVote = function (userId, voteType) {
  const existingVoteIndex = this.votes.findIndex(vote => vote.userId.toString() === userId); // returns index of existing vote or -1 if none found

  // If user has already voted on this post...
  if (existingVoteIndex !== -1) {
    // Case 1: If same vote type (ie `direction`), user is de-selecting it
    if (this.votes[existingVoteIndex].direction === voteType) {
      this.votes.splice(existingVoteIndex, 1); // Remove the existing vote
    } else {
      // Case 2: If different vote type/direction, update the existing vote
      this.votes[existingVoteIndex].direction = voteType;
    }
  } else {
    // Case 3: User is voting on this post for the first time, so add a vote
    this.votes.push({ userId, direction: voteType });
  }
};

// Compile Schema into a Model and export
export default mongoose.model('Post', postSchema);