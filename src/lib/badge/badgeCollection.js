/**
 * A list of all possible badges available to grab
 *
 * - BadgeId: a unique Id for each badge
 * - Name: display name
 * - Description: description of the badge
 * - IconType: 'string' or 'url'
 * - Icon, badge icon:
 *
 *   - If iconType is 'string', this is intepret as a string
 *   - If iconType is 'url', this is a image URL for the badge icon
 *   - If null, shows a gold trophy
 * - Category: 'speed', 'accuracy', 'consistency', 'milestone'
 * - Criteria: an object describing how to obtain badge
 *
 *       {
 *          type: 'wpm', 'accuracy', 'games_played', 'streak', 'time_played'
 *          condition: '>=', '==', 'consecutive'
 *          threshold: value to satisfy condition
 *       }
 * - Rarity: 'common', 'rare', 'epic', 'legendary'
 */
export const BADGE_COLLECTION = [
  wpmBadge({
    badgeId: 'warm_up_starter',
    name: 'Warm-Up Starter',
    icon: '🎈',
    threshold: 20,
    rarity: 'common'
  }),
  wpmBadge({
    badgeId: 'quick_learner',
    name: 'Quick Learner',
    icon: '🪶',
    threshold: 30,
    rarity: 'common'
  }),
  wpmBadge({
    badgeId: 'focused_fingers',
    name: 'Focused Fingers',
    icon: '🎯',
    threshold: 40,
    rarity: 'common'
  }),
  wpmBadge({
    badgeId: 'fast_fingers',
    name: 'Fast Fingers',
    icon: '🥉',
    threshold: 50,
    rarity: 'epic'
  }),
  wpmBadge({
    badgeId: 'typing_enthusiast',
    name: 'Typing Enthusiast',
    icon: '💫',
    threshold: 60,
    rarity: 'epic'
  }),
  wpmBadge({
    badgeId: 'speed_challenger',
    name: 'Speed Challenger',
    icon: '🚀',
    threshold: 70,
    rarity: 'epic'
  }),
  wpmBadge({
    badgeId: 'speedster',
    name: 'Speedster',
    icon: '🥈',
    threshold: 80,
    rarity: 'rare'
  }),
  wpmBadge({
    badgeId: 'keyboard_ninja',
    name: 'Keyboard Ninja',
    icon: '🔥',
    threshold: 90,
    rarity: 'rare'
  }),
  wpmBadge({
    badgeId: 'lightning_hands',
    name: 'Lightning Hands',
    icon: '⚡',
    threshold: 100,
    rarity: 'rare'
  }),
  wpmBadge({
    badgeId: 'type_master',
    name: 'Type Master',
    icon: '🏆',
    threshold: 110,
    rarity: 'legendary'
  }),
  wpmBadge({
    badgeId: 'typing_virtuoso',
    name: 'Typing Virtuoso',
    icon: '🧠',
    threshold: 120,
    rarity: 'legendary'
  }),
  wpmBadge({
    badgeId: 'legendary_typist',
    name: 'Legendary Typist',
    icon: '💥',
    threshold: 130,
    rarity: 'legendary'
  }),
  {
    badgeId: 'accuracy_expert_95',
    name: 'Accuracy Expert',
    description: 'Achieve 95% accuracy in a race',
    iconType: 'string',
    icon: null,
    category: 'accuracy',
    criteria: { type: 'accuracy', threshold: 95, condition: '>=' },
    rarity: 'rare'
  },
  {
    badgeId: 'perfect_typist',
    name: 'Perfect Typist',
    description: 'Achieve 100% accuracy in a race',
    iconType: 'string',
    icon: null,
    category: 'accuracy',
    criteria: { type: 'accuracy', threshold: 100, condition: '==' },
    rarity: 'rare'
  },
  {
    badgeId: 'warm_up',
    name: 'Warm Up',
    description: 'Play over 1 minute',
    iconType: 'string',
    icon: null,
    category: 'milestone',
    criteria: { type: 'time_played', threshold: 1, condition: '>=' },
    rarity: 'common'
  },
  {
    badgeId: 'high_roller',
    name: 'High Roller',
    description: 'Play over 60 minutes',
    iconType: 'string',
    icon: null,
    category: 'milestone',
    criteria: { type: 'time_played', threshold: 60, condition: '>=' },
    rarity: 'legendary'
  },
  {
    badgeId: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first typing race',
    iconType: 'string',
    icon: null,
    category: 'milestone',
    criteria: { type: 'games_played', threshold: 1, condition: '>=' },
    rarity: 'common'
  },
  {
    badgeId: 'marathon_runner',
    name: 'Marathon Runner',
    description: 'Complete 100 typing races',
    iconType: 'string',
    icon: null,
    category: 'milestone',
    criteria: { type: 'games_played', threshold: 100, condition: '>=' },
    rarity: 'rare'
  },
  {
    badgeId: 'aim_high',
    name: 'Aim High',
    description: 'Perform well 10 times in a row',
    iconType: 'string',
    icon: null,
    category: 'consistency',
    criteria: { type: 'streak', threshold: 10, condition: 'consecutive' },
    rarity: 'legendary'
  }
];

/** Badge template for speed related achievements */
function wpmBadge({ badgeId, name, icon, threshold, rarity }) {
  return {
    badgeId,
    name,
    description: `Achieve ${threshold}+ WPM in a single race`,
    iconType: 'string',
    icon,
    category: 'speed',
    criteria: { type: 'wpm', threshold, condition: '>=' },
    rarity
  };
}
