import { getSession } from '@/firebase-admin';
import { BADGE_COLLECTION } from '@/lib/badge/badgeCollection';
import badgeService from '@/lib/badge/badgeService';
import dbConnect from '@/lib/db';

/** Get user's badge progress for all available badges */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = await getSession(req, res);
  try {
    await dbConnect();

    const progress = await badgeService.getUserBadgeProgress(userId);

    return res.status(200).json({
      success: true,
      progress
    });
  } catch (error) {
    console.error('Error fetching user badges:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}
