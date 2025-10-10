/**
 * A list of all possible badges available to grab
 *
 * - badgeId: a unique Id for each badge
 * - name: display name
 * - description: description of the badge
 * - iconUrl: a custom image URL for the badge icon (default is a gold trophy)
 * - category: 'speed', 'accuracy', 'consistency', 'milestone'
 * - criteria: an object describing how to obtain badge
 *   ```
 *   {
 *      type: 'wpm', 'accuracy', 'games_played', 'streak', 'time_played'
 *      condition: '>=', '==', 'consecutive'
 *      threshold: value to satisfy condition
 *   }
 *   ```
 * - rarity: 'common', 'rare', 'epic', 'legendary'
 */
export const BADGE_COLLECTION = [
  {
    badgeId: 'speed_demon_50',
    name: 'Speed Demon',
    description: 'Achieve 50+ WPM in a single race',
    iconUrl: null,
    category: 'speed',
    criteria: { type: 'wpm', threshold: 50, condition: '>=' },
    rarity: 'common'
  },
  {
    badgeId: 'lightning_fingers_80',
    name: 'Lightning Fingers',
    description: 'Type at 80+ WPM consistently',
    iconUrl: null,
    category: 'speed',
    criteria: { type: 'wpm', threshold: 80, condition: '>=' },
    rarity: 'epic'
  },
  {
    badgeId: 'accuracy_expert_95',
    name: 'Accuracy Expert',
    description: 'Maintain 95% accuracy in a race',
    iconUrl: null,
    category: 'accuracy',
    criteria: { type: 'accuracy', threshold: 95, condition: '>=' },
    rarity: 'rare'
  },
  {
    badgeId: 'perfect_typist',
    name: 'Perfect Typist',
    description: 'Achieve 100% accuracy in a race',
    iconUrl: null,
    category: 'accuracy',
    criteria: { type: 'accuracy', threshold: 100, condition: '==' },
    rarity: 'legendary'
  },
  {
    badgeId: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first typing race',
    iconUrl: null,
    category: 'milestone',
    criteria: { type: 'games_played', threshold: 1, condition: '>=' },
    rarity: 'common'
  },
  {
    badgeId: 'marathon_runner',
    name: 'Marathon Runner',
    description: 'Complete 100 typing races',
    iconUrl: null,
    category: 'milestone',
    criteria: { type: 'games_played', threshold: 100, condition: '>=' },
    rarity: 'rare'
  }
];
