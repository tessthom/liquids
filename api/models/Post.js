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

const postSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  title: { 
    type: String, 
    required: true,
    maxlength: 80
  },
  description: { type: String },
  imageUrl: { type: String },
  externalLink: { type: String },
  ingredients: [{
    name: { type: String, maxlength: 50 },
    amount: { type: Number, max: 1000 },
    unit: { 
      type: String, 
      default: 'oz' 
    }
  }]
}, { timestamps: true });

// Compile Schema into a Model and export
export default mongoose.model('Post', postSchema);