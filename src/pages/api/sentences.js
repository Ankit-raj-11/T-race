const sentences = [
  'The quick brown fox jumps over the lazy dog.',
  'Technology is advancing at an unprecedented rate in the modern world.',
  'Programming requires patience, practice, and persistent problem-solving skills.',
  'Artificial intelligence is transforming how we work and live today.',
  'The beautiful sunset painted the sky with vibrant orange and purple hues.',
  'Success comes to those who never give up on their dreams.',
  'Coffee shops provide the perfect atmosphere for creative thinking and productivity.',
  'Reading books expands your mind and opens doors to new possibilities.',
  'Exercise and proper nutrition are essential for maintaining good health.',
  'Music has the power to heal hearts and bring people together.',
  'Innovation happens when creativity meets technical expertise and determination.',
  'The ocean waves crashed against the rocky shore with tremendous force.',
  'Learning new languages opens up opportunities for cultural exchange and understanding.',
  'Teamwork and collaboration are key ingredients for achieving extraordinary results.',
  'Time management skills are crucial for balancing work and personal life effectively.'
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Get a random sentence
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];

    res.status(200).json({
      sentence: randomSentence,
      length: randomSentence.length,
      wordCount: randomSentence.split(' ').length
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
