import dbConnect from '@/lib/db';
import User from '@/models/User';
import UserStat from '@/models/UserStat';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    // Use UserStat as the source of truth for leaderboard ranking (lastTestWPM)
    const stats = await UserStat.find({ lastTestWPM: { $gt: 0 } })
      .sort({ lastTestWPM: -1 })
      .skip(offset)
      .limit(limit)
      .select('userId lastTestWPM lastTestDate')
      .lean();

    const userIds = Array.from(new Set(stats.map((s) => s.userId).filter(Boolean)));

    // Fetch display names and photoURL in a single query; if missing, fall back to userId
    const users = await User.find({ userId: { $in: userIds } })
      .select('userId displayName photoURL')
      .lean();

    // Map userId => { displayName, photoURL }
    const userMap = users.reduce((acc, u) => {
      acc[u.userId] = {
        displayName: u.displayName || u.userId,
        photoURL: u.photoURL || null
      };
      return acc;
    }, {});

    const leaderboard = stats.map((s, idx) => {
      const info = userMap[s.userId] || { displayName: s.userId || 'Anonymous', photoURL: null };
      return {
        rank: offset + idx + 1,
        userId: s.userId,
        displayName: info.displayName,
        photoURL: info.photoURL,
        lastTestWPM: s.lastTestWPM,
        lastTestDate: s.lastTestDate
      };
    });

    // total count based on UserStat documents with lastTestWPM > 0
    const total = await UserStat.countDocuments({ lastTestWPM: { $gt: 0 } });

    return res.status(200).json({
      leaderboard,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error('Error fetching leaderboard from UserStat:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}
