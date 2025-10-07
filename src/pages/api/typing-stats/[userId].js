import dbConnect from '@/lib/db';
import TypingStat from '@/models/TypingStat';

export default async function handler(req, res) {
  await dbConnect();

  const { userId } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!userId) {
    return res.status(400).json({ message: 'Missing userId' });
  }

  try {
    const stats = await TypingStat.find({ userId }).sort({ date: 1 }).lean();
    return res.status(200).json({ stats });
  } catch (error) {
    console.error('Error fetching typing stats:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
