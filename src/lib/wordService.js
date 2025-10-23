// Word service for managing the enhanced word database
// This service provides optimized access to words with caching and performance optimizations

class WordService {
  constructor() {
    this.wordCache = new Map();
    this.sentenceCache = new Map();
    this.maxCacheSize = 50;
    this.lastUsedWords = new Set();
    this.maxUsedWords = 200;
  }

  // Get random word from specified difficulty level
  getRandomWord(difficulty = 'medium') {
    const words = this.getWordList(difficulty);
    return words[Math.floor(Math.random() * words.length)];
  }

  // Get multiple random words
  getRandomWords(difficulty = 'medium', count = 10) {
    const words = this.getWordList(difficulty);
    const result = [];
    
    for (let i = 0; i < count; i++) {
      let word;
      let attempts = 0;
      
      // Try to avoid recently used words
      do {
        word = words[Math.floor(Math.random() * words.length)];
        attempts++;
      } while (this.lastUsedWords.has(word) && attempts < 10);
      
      result.push(word);
      this.lastUsedWords.add(word);
    }
    
    // Clean up old used words if cache gets too large
    if (this.lastUsedWords.size > this.maxUsedWords) {
      const wordsArray = Array.from(this.lastUsedWords);
      this.lastUsedWords.clear();
      // Keep only the most recent half
      wordsArray.slice(-this.maxUsedWords / 2).forEach(word => this.lastUsedWords.add(word));
    }
    
    return result;
  }

  // Generate sentence from template with words
  generateSentenceFromTemplate(template, difficulty = 'medium') {
    const words = this.getWordList(difficulty);
    return template.replace(/{word}/g, () => this.getRandomWord(difficulty));
  }

  // Get word list for difficulty (with caching)
  getWordList(difficulty = 'medium') {
    if (this.wordCache.has(difficulty)) {
      return this.wordCache.get(difficulty);
    }

    // This would normally load from the API or database
    // For now, we'll use the words from the sentences API
    const words = this.loadWordsForDifficulty(difficulty);
    this.wordCache.set(difficulty, words);
    
    // Clean cache if it gets too large
    if (this.wordCache.size > this.maxCacheSize) {
      const firstKey = this.wordCache.keys().next().value;
      this.wordCache.delete(firstKey);
    }
    
    return words;
  }

  // Load words for specific difficulty (this would typically come from API/database)
  loadWordsForDifficulty(difficulty) {
    // These are the word lists from our enhanced sentences API
    const wordDatabase = {
      easy: [
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
      hard: [
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
        'anthropological', 'archaeological', 'astronomical', 'geological', 'biological', 'chemical', 'mathematical', 'statistical'
      ]
    };

    return wordDatabase[difficulty] || wordDatabase.medium;
  }

  // Clear caches to free memory
  clearCache() {
    this.wordCache.clear();
    this.sentenceCache.clear();
    this.lastUsedWords.clear();
  }

  // Get cache statistics
  getCacheStats() {
    return {
      wordCacheSize: this.wordCache.size,
      sentenceCacheSize: this.sentenceCache.size,
      lastUsedWordsSize: this.lastUsedWords.size,
      maxCacheSize: this.maxCacheSize,
      maxUsedWords: this.maxUsedWords
    };
  }
}

// Create and export a singleton instance
const wordService = new WordService();
export default wordService;
