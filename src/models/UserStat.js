import mongoose from 'mongoose';

const UserStatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    currentStreak: {
      type: Number,
      required: true,
      min: 0
    },
    longestStreak: {
      type: Number,
      required: true,
      min: 0
    },
    racesCompleted: {
      type: Number,
      required: true,
      min: 0
    },
    lastTestWPM: {
      type: Number,
      required: true,
      min: 0
    },
    skillLevel: {
      type: String,
      required: true,
      trim: true
    },
    xpPoints: {
      type: Number,
      required: true,
      min: 0
    },
    lastTestDate: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.UserStat || mongoose.model('UserStat', UserStatSchema);
