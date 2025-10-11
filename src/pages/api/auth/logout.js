import { clearSession } from '../../../firebase-admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Remove session token
  await clearSession(req, res);

  return res.status(200).json({
    message: 'Logged off successfully'
  });
}
