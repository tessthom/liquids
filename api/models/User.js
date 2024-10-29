import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

/**
 * User Data Model WIP:
 * - id (ObjectId)
 * - username (String)
 * - email (String)
 * - passwordHash (String, hashed)
 * - avatar (String, URL to image)
 * - bio (String)
 * - following (Array of User IDs)
 * - groups (Array of Group IDs)
 * - favorites (Array of Post IDs)
 * - TODO: In V2 add an `emailVerified` property if you implement email 
 *    verification feature. (type: Boolean, default: false)
 */

// Init Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,  // adds a `required validator` for this property
    unique: true,
    maxlength: 30,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  avatar: { 
    type: String
  },
  bio: { 
    type: String,
    maxlength: 130
  },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true }); // timestamps in 2nd arg options object will automatically create a timestamp property for each document's creation

// Pre-save hook to hash password before storing
userSchema.pre('save', async function (next) {
  // If password wasn't modified, don't hash password, skip the rest of this hook
  if (!this.isModified('passwordHash')) {
    return next();
  }
  // If password is being created or updated...
  try {
    // Generate a salt and use it to hash the password value
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to verify password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

// Compile Schema into a Model and export
export default mongoose.model('User', userSchema);