import dbConnect from '../../../lib/db';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    // Get top users by highest score
    const users = await User.find({})
      .sort({ highestScore: -1 })
      .skip(offset)
      .limit(limit)
      .select('displayName highestScore totalGamesPlayed totalTimePlayed createdAt')
      .lean();

    // Get total count for pagination
    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      leaderboard: users.map((user, index) => ({
        rank: offset + index + 1,
        displayName: user.displayName,
        highestScore: user.highestScore,
        totalGamesPlayed: user.totalGamesPlayed,
        totalTimePlayed: user.totalTimePlayed,
        joinedAt: user.createdAt
      })),
      pagination: {
        total: totalUsers,
        limit,
        offset,
        hasMore: offset + limit < totalUsers
      }
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}
