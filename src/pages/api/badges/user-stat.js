import { getSession } from '@/firebase-admin';
import badgeService from '@/lib/badge/badgeService';

/** Get user achievement statistics */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = await getSession(req, res);
  try {
    const stat = await badgeService.getUserStat(userId);
    return res.status(200).json({
      success: true,
      stat
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}
