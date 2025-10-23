import { getSession } from '@/firebase-admin';
import badgeService from '@/lib/badge/badgeService';
import dbConnect from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = await getSession(req, res);

  try {
    await dbConnect();

    const { badgeId, badgeIds } = req.body;

    // Support both single badge and multiple badges
    let badgesToMark = [];

    if (badgeId) {
      badgesToMark = [badgeId];
    } else if (badgeIds && Array.isArray(badgeIds)) {
      badgesToMark = badgeIds;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: badgeId or badgeIds array'
      });
    }

    if (badgesToMark.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No badges specified to mark as viewed'
      });
    }

    // Use the badge service to mark badges as viewed
    await badgeService.markBadgesAsViewed(userId, badgesToMark);

    return res.status(200).json({
      success: true,
      message: `${badgesToMark.length} badge(s) marked as viewed`,
      markedBadges: badgesToMark
    });
  } catch (error) {
    console.error('Error marking badges as viewed:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}
