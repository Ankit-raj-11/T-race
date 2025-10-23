// Comprehensive word database organized by difficulty and category
const wordDatabase = {
  // Common words (3-5 characters) - 200+ words
  common: [
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his',
    'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use', 'any', 'may',
    'try', 'end', 'ask', 'big', 'buy', 'eat', 'far', 'few', 'fly', 'fun', 'got', 'hot', 'job', 'key', 'kid', 'lot', 'low', 'own', 'run', 'set',
    'sit', 'top', 'win', 'yes', 'yet', 'age', 'bad', 'bag', 'bed', 'bit', 'box', 'car', 'cat', 'cut', 'dog', 'ear', 'eye', 'fat', 'fit', 'fix',
    'hat', 'hit', 'ice', 'leg', 'lie', 'log', 'map', 'mix', 'net', 'oil', 'pen', 'pie', 'red', 'sea', 'sun', 'tax', 'tea', 'ten', 'tie', 'war',
    'web', 'win', 'zip', 'act', 'add', 'air', 'arm', 'art', 'ask', 'bad', 'bag', 'bar', 'bat', 'bed', 'bee', 'bet', 'big', 'bit', 'bow', 'box',
    'bus', 'buy', 'cap', 'car', 'cat', 'cup', 'cut', 'day', 'die', 'dig', 'dog', 'dry', 'ear', 'eat', 'egg', 'end', 'eye', 'fan', 'fat', 'few',
    'fix', 'fly', 'fun', 'gap', 'gas', 'get', 'gun', 'hat', 'hit', 'hot', 'ice', 'job', 'key', 'kid', 'kit', 'leg', 'let', 'lie', 'lot', 'low',
    'map', 'mix', 'net', 'new', 'oil', 'old', 'one', 'own', 'pen', 'pie', 'pot', 'red', 'run', 'sea', 'set', 'sit', 'six', 'sun', 'tax', 'tea',
    'ten', 'tie', 'top', 'try', 'use', 'war', 'web', 'win', 'yes', 'yet', 'zip'
  ],

  // Medium words (5-8 characters) - 300+ words
  medium: [
    'about', 'after', 'again', 'before', 'other', 'right', 'think', 'where', 'being', 'every', 'great', 'might', 'shall', 'still', 'those',
    'under', 'while', 'never', 'small', 'found', 'asked', 'going', 'large', 'until', 'along', 'began', 'place', 'sound', 'such', 'much',
    'very', 'well', 'back', 'good', 'just', 'life', 'most', 'only', 'over', 'said', 'some', 'time', 'work', 'also', 'another', 'around',
    'became', 'because', 'before', 'better', 'between', 'called', 'could', 'during', 'family', 'first', 'friend', 'group', 'house', 'however',
    'important', 'little', 'long', 'made', 'many', 'mother', 'never', 'number', 'people', 'place', 'point', 'problem', 'program', 'public',
    'school', 'seems', 'service', 'should', 'system', 'though', 'through', 'today', 'together', 'turned', 'until', 'used', 'using', 'water',
    'world', 'years', 'young', 'able', 'above', 'account', 'action', 'activity', 'actually', 'addition', 'administration', 'adult', 'after',
    'again', 'against', 'already', 'although', 'always', 'among', 'animal', 'another', 'answer', 'appear', 'approach', 'area', 'article',
    'artist', 'attack', 'attempt', 'attention', 'attitude', 'attractive', 'available', 'average', 'avoid', 'away', 'baby', 'back', 'bad',
    'bank', 'base', 'basic', 'battle', 'beauty', 'because', 'become', 'bed', 'before', 'begin', 'behavior', 'behind', 'believe', 'below',
    'benefit', 'best', 'better', 'between', 'beyond', 'big', 'bill', 'bit', 'black', 'blood', 'blue', 'board', 'body', 'book', 'born',
    'both', 'bottom', 'box', 'boy', 'break', 'bring', 'brother', 'budget', 'build', 'business', 'but', 'buy', 'call', 'camera', 'campaign',
    'can', 'cancer', 'candidate', 'capital', 'car', 'card', 'care', 'career', 'carry', 'case', 'catch', 'cause', 'cell', 'center', 'central',
    'century', 'certain', 'certainly', 'chair', 'challenge', 'chance', 'change', 'character', 'charge', 'check', 'child', 'choice', 'choose',
    'church', 'citizen', 'city', 'civil', 'claim', 'class', 'clear', 'clearly', 'close', 'coach', 'cold', 'collection', 'college', 'color',
    'come', 'commercial', 'common', 'community', 'company', 'compare', 'computer', 'concern', 'condition', 'conference', 'Congress',
    'consider', 'consumer', 'contain', 'continue', 'control', 'cost', 'could', 'country', 'couple', 'course', 'court', 'cover', 'create',
    'crime', 'cultural', 'culture', 'cup', 'current', 'customer', 'cut', 'dark', 'data', 'daughter', 'day', 'dead', 'deal', 'death',
    'debate', 'decade', 'decide', 'decision', 'deep', 'defense', 'degree', 'Democrat', 'democratic', 'describe', 'design', 'despite',
    'detail', 'determine', 'develop', 'development', 'die', 'difference', 'different', 'difficult', 'dinner', 'direction', 'director',
    'discover', 'discuss', 'disease', 'do', 'doctor', 'dog', 'door', 'down', 'draw', 'dream', 'drive', 'drop', 'drug', 'during', 'each',
    'early', 'east', 'easy', 'eat', 'economic', 'economy', 'edge', 'education', 'effect', 'effort', 'eight', 'either', 'election', 'else',
    'employee', 'end', 'energy', 'enjoy', 'enough', 'enter', 'entire', 'environment', 'environmental', 'especially', 'establish', 'even',
    'evening', 'event', 'ever', 'every', 'everybody', 'everyone', 'everything', 'evidence', 'exactly', 'example', 'executive', 'exist',
    'expect', 'experience', 'expert', 'explain', 'eye', 'face', 'fact', 'factor', 'fail', 'fall', 'family', 'far', 'fast', 'father',
    'fear', 'federal', 'feel', 'feeling', 'few', 'field', 'fight', 'figure', 'fill', 'film', 'final', 'finally', 'financial', 'find',
    'fine', 'finger', 'finish', 'fire', 'firm', 'first', 'fish', 'five', 'floor', 'fly', 'focus', 'follow', 'food', 'foot', 'for',
    'force', 'foreign', 'forget', 'form', 'former', 'forward', 'four', 'free', 'friend', 'from', 'front', 'full', 'fund', 'future', 'game',
    'garden', 'gas', 'general', 'generation', 'get', 'girl', 'give', 'glass', 'go', 'goal', 'good', 'government', 'great', 'green', 'ground',
    'group', 'grow', 'growth', 'guess', 'gun', 'guy', 'hair', 'half', 'hand', 'hang', 'happen', 'happy', 'hard', 'have', 'he', 'head',
    'health', 'hear', 'heart', 'heat', 'heavy', 'help', 'her', 'here', 'herself', 'high', 'him', 'himself', 'his', 'history', 'hit',
    'hold', 'home', 'hope', 'hospital', 'hot', 'hotel', 'hour', 'house', 'how', 'however', 'huge', 'human', 'hundred', 'husband', 'I',
    'idea', 'identify', 'if', 'image', 'imagine', 'impact', 'important', 'improve', 'in', 'include', 'including', 'increase', 'indeed',
    'indicate', 'individual', 'industry', 'information', 'inside', 'instead', 'institution', 'interest', 'interesting', 'international',
    'interview', 'into', 'investment', 'involve', 'issue', 'it', 'item', 'its', 'itself', 'job', 'join', 'just', 'keep', 'key', 'kid',
    'kill', 'kind', 'kitchen', 'know', 'knowledge', 'land', 'language', 'large', 'last', 'late', 'later', 'laugh', 'law', 'lawyer',
    'lay', 'lead', 'leader', 'learn', 'least', 'leave', 'left', 'leg', 'legal', 'less', 'let', 'letter', 'level', 'lie', 'life',
    'light', 'like', 'likely', 'line', 'list', 'listen', 'little', 'live', 'local', 'long', 'look', 'lose', 'loss', 'lot', 'love',
    'low', 'luck', 'lunch', 'machine', 'magazine', 'main', 'maintain', 'major', 'majority', 'make', 'man', 'manage', 'management',
    'manager', 'many', 'market', 'marriage', 'material', 'matter', 'may', 'maybe', 'me', 'mean', 'measure', 'media', 'medical',
    'meet', 'meeting', 'member', 'memory', 'mention', 'message', 'method', 'middle', 'might', 'military', 'million', 'mind', 'mine',
    'minister', 'minor', 'minority', 'minute', 'miss', 'mission', 'mistake', 'mix', 'model', 'modern', 'moment', 'money', 'month',
    'more', 'morning', 'most', 'mother', 'mouth', 'move', 'movement', 'movie', 'much', 'music', 'must', 'my', 'myself', 'name',
    'nation', 'national', 'natural', 'nature', 'near', 'nearly', 'necessary', 'need', 'network', 'never', 'new', 'news', 'newspaper',
    'next', 'nice', 'night', 'no', 'none', 'nor', 'north', 'not', 'note', 'nothing', 'notice', 'now', 'number', 'nurse', 'occur',
    'of', 'off', 'offer', 'office', 'officer', 'official', 'often', 'oil', 'ok', 'old', 'on', 'once', 'one', 'only', 'onto',
    'open', 'operation', 'opportunity', 'option', 'or', 'order', 'organization', 'other', 'others', 'our', 'out', 'outside', 'over',
    'own', 'owner', 'page', 'pain', 'painting', 'pair', 'paper', 'parent', 'park', 'part', 'participant', 'particular', 'particularly',
    'partner', 'party', 'pass', 'past', 'patient', 'pattern', 'pay', 'peace', 'people', 'per', 'perform', 'performance', 'perhaps',
    'period', 'person', 'personal', 'phone', 'physical', 'pick', 'picture', 'piece', 'place', 'plan', 'plant', 'play', 'player',
    'PM', 'point', 'police', 'policy', 'political', 'politician', 'politics', 'poor', 'popular', 'population', 'position', 'positive',
    'possible', 'power', 'practice', 'prepare', 'present', 'president', 'pressure', 'pretty', 'prevent', 'price', 'private', 'probably',
    'problem', 'process', 'produce', 'product', 'production', 'professional', 'professor', 'program', 'project', 'property', 'protect',
    'prove', 'provide', 'public', 'pull', 'purpose', 'push', 'put', 'quality', 'question', 'quickly', 'quite', 'race', 'radio',
    'raise', 'range', 'rate', 'rather', 'reach', 'read', 'ready', 'real', 'reality', 'realize', 'really', 'reason', 'receive',
  ],

  // Advanced words (8+ characters) - 200+ words
  advanced: [
    'beautiful', 'different', 'following', 'important', 'necessary', 'possible', 'available', 'community', 'development', 'environment',
    'experience', 'government', 'information', 'interesting', 'performance', 'perspective', 'relationship', 'traditional', 'understanding',
    'administration', 'characteristics', 'responsibility', 'accommodation', 'recommendation', 'representative', 'implementation',
    'transformation', 'extraordinary', 'incomprehensible', 'disproportionate', 'institutional', 'constitutional', 'international',
    'technological', 'psychological', 'philosophical', 'architectural', 'entrepreneurial', 'revolutionary', 'evolutionary',
    'contemporary', 'sophisticated', 'unprecedented', 'magnificent', 'tremendous', 'spectacular', 'phenomenal', 'incredible',
    'exceptional', 'remarkable', 'outstanding', 'extraordinary', 'fascinating', 'mesmerizing', 'breathtaking', 'astonishing',
    'overwhelming', 'unbelievable', 'indescribable', 'unimaginable', 'incomprehensible', 'unprecedented', 'revolutionary',
    'transformational', 'inspirational', 'motivational', 'educational', 'instructional', 'operational', 'organizational',
    'institutional', 'constitutional', 'technological', 'methodological', 'philosophical', 'psychological', 'sociological',
    'anthropological', 'archaeological', 'astronomical', 'geological', 'biological', 'chemical', 'mathematical', 'statistical',
    'analytical', 'theoretical', 'practical', 'therapeutic', 'diagnostic', 'prognostic', 'symptomatic', 'systematic', 'automatic',
    'democratic', 'republican', 'authoritarian', 'totalitarian', 'bureaucratic', 'aristocratic', 'demographic', 'geographic',
    'photographic', 'cinematographic', 'stereographic', 'holographic', 'calligraphic', 'typographic', 'orthographic',
    'lexicographic', 'bibliographic', 'biographic', 'autobiographic', 'historiographic', 'cartographic', 'oceanographic',
    'meteorological', 'climatological', 'ecological', 'environmental', 'experimental', 'developmental', 'instructional',
    'educational', 'vocational', 'professional', 'occupational', 'recreational', 'therapeutic', 'diagnostic', 'prognostic',
    'symptomatic', 'systematic', 'automatic', 'mechanistic', 'deterministic', 'stochastic', 'probabilistic', 'statistical',
    'analytical', 'theoretical', 'empirical', 'experimental', 'observational', 'computational', 'mathematical', 'numerical',
    'algorithmic', 'computational', 'technological', 'methodological', 'philosophical', 'psychological', 'sociological',
    'anthropological', 'archaeological', 'astronomical', 'geological', 'biological', 'chemical', 'physical', 'mathematical',
    'statistical', 'analytical', 'theoretical', 'practical', 'therapeutic', 'diagnostic', 'prognostic', 'symptomatic',
    'systematic', 'automatic', 'democratic', 'republican', 'authoritarian', 'totalitarian', 'bureaucratic', 'aristocratic',
    'demographic', 'geographic', 'photographic', 'cinematographic', 'stereographic', 'holographic', 'calligraphic',
    'typographic', 'orthographic', 'lexicographic', 'bibliographic', 'biographic', 'autobiographic', 'historiographic',
    'cartographic', 'oceanographic', 'meteorological', 'climatological', 'ecological', 'environmental', 'experimental',
    'developmental', 'instructional', 'educational', 'vocational', 'professional', 'occupational', 'recreational',
    'therapeutic', 'diagnostic', 'prognostic', 'symptomatic', 'systematic', 'automatic', 'mechanistic', 'deterministic',
    'stochastic', 'probabilistic', 'statistical', 'analytical', 'theoretical', 'empirical', 'experimental', 'observational',
    'computational', 'mathematical', 'numerical', 'algorithmic'
  ]
};

// Comprehensive sentence templates organized by complexity
const sentenceTemplates = {
  simple: [
    'The {word} is very {word}.',
    'I like to {word} every day.',
    'This {word} looks {word}.',
    'We can {word} together.',
    'The {word} will {word} soon.',
    'My {word} is {word}.',
    'They {word} in the {word}.',
    'The {word} has {word}.',
    'I want to {word} the {word}.',
    'The {word} was {word}.',
    'The {word} is {word} and {word}.',
    'I {word} that the {word} will {word} tomorrow.',
    'The {word} {word} in the {word} was {word}.',
    'We {word} to {word} the {word} for {word}.',
    'The {word} {word} can {word} very {word}.',
    'I {word} the {word} because it is {word}.',
    'The {word} {word} with {word} and {word}.',
    'We {word} the {word} to {word} our {word}.',
    'The {word} {word} from {word} to {word}.',
    'I {word} that {word} is the most {word}.',
    'The {word} {word} that {word} {word} is {word} and {word}.',
    'I {word} that the {word} {word} will {word} the {word} {word}.',
    'The {word} {word} in the {word} {word} was {word} and {word}.',
    'We {word} to {word} the {word} {word} for {word} and {word}.',
    'The {word} {word} can {word} very {word} when {word} {word}.',
    'I {word} the {word} {word} because it is {word} and {word}.',
    'The {word} {word} with {word} and {word} to {word} the {word}.',
    'We {word} the {word} {word} to {word} our {word} and {word}.',
    'The {word} {word} from {word} to {word} is {word} and {word}.',
    'I {word} that {word} {word} is the most {word} and {word}.'
  ]
};

// Static sentences for variety (kept from original)
const staticSentences = [
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

// Utility functions for generating sentences
function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateSentenceFromTemplate(template, wordPool) {
  return template.replace(/{word}/g, () => getRandomFromArray(wordPool));
}

function generateRandomSentence(difficulty = 'medium', type = 'mixed') {
  const finalDifficulty = difficulty;
  const finalType = type;
  
  // Choose sentence generation method based on type
  if (finalType === 'template') {
    // Use template-based generation
    const templates = sentenceTemplates[finalDifficulty === 'easy' ? 'simple' : 
                                       finalDifficulty === 'hard' ? 'complex' : 'medium'];
    const template = getRandomFromArray(templates);
    const wordPool = wordDatabase[finalDifficulty];
    return generateSentenceFromTemplate(template, wordPool);
  } else if (finalType === 'words') {
    // Generate from random words
    const wordPool = wordDatabase[finalDifficulty];
    const wordCount = finalDifficulty === 'easy' ? 8 : finalDifficulty === 'hard' ? 15 : 12;
    const words = [];
    for (let i = 0; i < wordCount; i++) {
      words.push(getRandomFromArray(wordPool));
    }
    return words.join(' ') + '.';
  } else {
    // Mixed approach: 70% static sentences, 30% generated
    const useStatic = Math.random() < 0.7;
    if (useStatic) {
      return getRandomFromArray(staticSentences);
    } else {
      const templates = sentenceTemplates[finalDifficulty === 'easy' ? 'simple' : 
                                         finalDifficulty === 'hard' ? 'complex' : 'medium'];
      const template = getRandomFromArray(templates);
      const wordPool = wordDatabase[finalDifficulty];
      return generateSentenceFromTemplate(template, wordPool);
    }
  }
}

// Track used sentences to minimize repetition
const usedSentences = new Set();
const maxUsedSentences = 100; // Reset after 100 uses

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { difficulty = 'medium', type = 'mixed' } = req.query;
      
      let sentence;
      let attempts = 0;
      const maxAttempts = 10;
      
      // Try to generate a sentence that hasn't been used recently
      do {
        sentence = generateRandomSentence(difficulty, type);
        attempts++;
        
        // If we've tried too many times, just use the current sentence
        if (attempts >= maxAttempts) {
          break;
        }
      } while (usedSentences.has(sentence) && usedSentences.size < maxUsedSentences);
      
      // Add to used sentences
      usedSentences.add(sentence);
      
      // Reset used sentences if we've reached the limit
      if (usedSentences.size >= maxUsedSentences) {
        usedSentences.clear();
      }

      res.status(200).json({
        sentence,
        length: sentence.length,
        wordCount: sentence.split(' ').length,
        difficulty,
        type,
        totalWords: Object.values(wordDatabase).flat().length,
        availableDifficulties: Object.keys(wordDatabase)
      });
    } catch (error) {
      console.error('Error generating sentence:', error);
      // Fallback to static sentence
      const fallbackSentence = getRandomFromArray(staticSentences);
      res.status(200).json({
        sentence: fallbackSentence,
        length: fallbackSentence.length,
        wordCount: fallbackSentence.split(' ').length,
        difficulty: 'medium',
        type: 'fallback'
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}