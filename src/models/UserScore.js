import mongoose from 'mongoose';

const UserScoreSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  gameName: {
    type: String,
    required: true,
    trim: true
  },
  highestScore: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

UserScoreSchema.index({ userId: 1, gameName: 1 }, { unique: true });

export default mongoose.models.UserScore || mongoose.model('UserScore', UserScoreSchema);