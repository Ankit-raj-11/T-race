import dbConnect from '@/lib/db';
import TypingStat from '@/models/TypingStat';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { userId, wpm, accuracy, timePlayed } = req.body;

      if (!userId || typeof wpm !== 'number' || typeof accuracy !== 'number' || typeof timePlayed !== 'number') {
        return res.status(400).json({ message: 'Missing or invalid fields: userId, wpm, accuracy, timePlayed' });
      }

      // Insert new stat
      const stat = await TypingStat.create({ userId, wpm, accuracy, timePlayed });

      // Enforce maximum 50 records per user: delete oldest beyond 50
      const count = await TypingStat.countDocuments({ userId });
      if (count > 50) {
        const toRemove = count - 50;
        // find oldest documents and remove them
        const olds = await TypingStat.find({ userId }).sort({ date: 1 }).limit(toRemove).select('_id');
        const ids = olds.map((d) => d._id);
        if (ids.length) {
          await TypingStat.deleteMany({ _id: { $in: ids } });
        }
      }

      return res.status(201).json({ message: 'Stat saved', stat });
    } catch (error) {
      console.error('Error saving typing stat:', error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  // unsupported method
  res.setHeader('Allow', ['POST']);
  return res.status(405).json({ message: 'Method not allowed' });
}
