const textSources = {
  randomWords: {
    easy: [
      "the", "and", "for", "are", "but", "not", "you", "all", "can", "had", "her", "was", "one", "our", "out", "day", "get", "has", "him", "his", "how", "man", "new", "now", "old", "see", "two", "way", "who", "boy", "did", "its", "let", "put", "say", "she", "too", "use"
    ],
    medium: [
      "about", "after", "again", "before", "other", "right", "think", "where", "being", "every", "great", "might", "shall", "still", "those", "under", "while", "never", "small", "found", "asked", "going", "large", "until", "along", "began", "place", "right", "sound", "still", "such", "those", "where", "much", "very", "well", "back", "good", "just", "life", "most", "only", "over", "said", "some", "time", "work"
    ],
    hard: [
      "beautiful", "different", "following", "important", "necessary", "possible", "available", "community", "development", "environment", "experience", "government", "information", "interesting", "performance", "perspective", "relationship", "traditional", "understanding", "administration", "characteristics", "responsibility", "accommodation", "recommendation", "representative", "implementation", "transformation", "extraordinary", "incomprehensible", "disproportionate"
    ]
  },
  quotes: [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It is during our darkest moments that we must focus to see the light. - Aristotle",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "Don't let yesterday take up too much of today. - Will Rogers",
    "You learn more from failure than from success. Don't let it stop you. Failure builds character. - Unknown",
    "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you. - Steve Jobs"
  ],
  codeSnippets: [
    "function calculateSum(a, b) { return a + b; }",
    "const users = data.filter(user => user.active === true);",
    "if (condition) { console.log('Hello World'); } else { return false; }",
    "const fetchData = async () => { const response = await fetch('/api/data'); return response.json(); };",
    "import React, { useState, useEffect } from 'react';",
    "export default function Component({ props }) { return <div>{props.children}</div>; }",
    "const handleClick = (event) => { event.preventDefault(); setCount(count + 1); };",
    "try { const result = JSON.parse(data); } catch (error) { console.error(error); }",
    "const debounce = (func, delay) => { let timeoutId; return (...args) => { clearTimeout(timeoutId); timeoutId = setTimeout(() => func.apply(null, args), delay); }; };",
    "class Calculator { constructor() { this.result = 0; } add(num) { this.result += num; return this; } }"
  ],
  literature: [
    "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.",
    "To be or not to be, that is the question: Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
    "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore.",
    "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell.",
    "All happy families are alike; each unhappy family is unhappy in its own way.",
    "It was a bright cold day in April, and the clocks were striking thirteen.",
    "The past is a foreign country; they do things differently there.",
    "Many years later, as he faced the firing squad, Colonel Aureliano Buendía was to remember that distant afternoon when his father took him to discover ice.",
    "Last night I dreamt I went to Manderley again."
  ]
};

function generateRandomWords(difficulty, wordCount = 20) {
  const words = textSources.randomWords[difficulty];
  const result = [];
  for (let i = 0; i < wordCount; i++) {
    result.push(words[Math.floor(Math.random() * words.length)]);
  }
  return result.join(' ');
}

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { source, difficulty, customText } = req.query;

    let text = '';

    if (customText) {
      text = customText;
    } else {
      switch (source) {
        case 'randomWords':
          text = generateRandomWords(difficulty || 'medium', 25);
          break;
        case 'quotes':
          text = getRandomFromArray(textSources.quotes);
          break;
        case 'codeSnippets':
          text = getRandomFromArray(textSources.codeSnippets);
          break;
        case 'literature':
          text = getRandomFromArray(textSources.literature);
          break;
        default:
          text = generateRandomWords('medium', 25);
      }
    }

    res.status(200).json({
      text,
      source: customText ? 'custom' : source,
      difficulty: difficulty || 'medium',
      wordCount: text.split(' ').length,
      charCount: text.length
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}