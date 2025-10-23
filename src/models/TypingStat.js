import mongoose from 'mongoose';

const TypingStatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
      // indexed via compound index below
    },
    wpm: {
      type: Number,
      required: true,
      min: 0
    },
    accuracy: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    timePlayed: {
      // seconds
      type: Number,
      required: true,
      min: 0
    }
    // relying on timestamps.createdAt instead of a separate `date` field
  },
  {
    timestamps: true
  }
);

// keep index for faster queries per user (use createdAt provided by timestamps)
TypingStatSchema.index({ userId: 1, createdAt: 1 });

export default mongoose.models.TypingStat || mongoose.model('TypingStat', TypingStatSchema);
