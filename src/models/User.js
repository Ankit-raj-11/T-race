import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    default: null,
  },
  gameName: {
    type: String,
    default: 'T-Race',
  },
  highestScore: {
    type: Number,
    default: 0,
  },
  totalGamesPlayed: {
    type: Number,
    default: 0,
  },
  totalTimePlayed: {
    type: Number, // in seconds
    default: 0,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better performance
UserSchema.index({ userId: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ highestScore: -1 }); // For leaderboard queries

export default mongoose.models.User || mongoose.model('User', UserSchema);
