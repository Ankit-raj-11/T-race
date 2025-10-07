import mongoose from 'mongoose';

const TypingStatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
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
  },
  date: {
    type: Date,
    default: Date.now,
    // indexed via compound index below
  }
}, {
  timestamps: true
});

// keep index for faster queries per user
TypingStatSchema.index({ userId: 1, date: 1 });

export default mongoose.models.TypingStat || mongoose.model('TypingStat', TypingStatSchema);
