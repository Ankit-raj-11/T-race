import { getSession } from '@/firebase-admin';
import badgeService from '@/lib/badge/badgeService';

/** Manage user achievement statistics */
export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = await getSession(req, res);
  try {
    switch (req.method) {
      case 'GET': {
        const stat = await badgeService.getUserStat(userId);
        return res.status(200).json({
          success: true,
          stat
        });
      }

      case 'POST': {
        const { wpm } = req.body;
        const userStat = await badgeService.updateUserStat(userId, wpm);
        return res.status(200).json({
          success: true,
          ...userStat
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}
