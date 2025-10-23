import { getSession } from '../../../firebase-admin';
import dbConnect from '../../../lib/db';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = await getSession(req, res);

  try {
    await dbConnect();

    const { score, gameTime } = req.body;

    if (typeof score !== 'number') {
      return res.status(400).json({
        message: 'Missing required fields: score'
      });
    }

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update game statistics
    user.totalGamesPlayed += 1;
    if (gameTime) {
      user.totalTimePlayed += gameTime;
    }

    // Update highest score if current score is higher
    if (score > user.highestScore) {
      user.highestScore = score;
    }

    await user.save();

    return res.status(200).json({
      message: 'Score updated successfully',
      user: {
        userId: user.userId,
        highestScore: user.highestScore,
        totalGamesPlayed: user.totalGamesPlayed,
        totalTimePlayed: user.totalTimePlayed
      }
    });
  } catch (error) {
    console.error('Error updating score:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}
