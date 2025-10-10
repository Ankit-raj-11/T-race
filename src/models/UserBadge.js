import mongoose from 'mongoose';

const UserBadgeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true
    },
    badgeId: {
      type: String,
      required: true,
      trim: true
    },
    unlockedAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    isViewed: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Create compound index to ensure a user can only unlock each badge once
UserBadgeSchema.index({ userId: 1, badgeId: 1 }, { unique: true });

// Create index for efficient queries by user
UserBadgeSchema.index({ userId: 1, unlockedAt: -1 });

// Create index for finding unviewed badges
UserBadgeSchema.index({ userId: 1, isViewed: 1 });

export default mongoose.models.UserBadge || mongoose.model('UserBadge', UserBadgeSchema);
