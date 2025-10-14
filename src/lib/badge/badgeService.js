import dbConnect from '@/lib/db';
import { processTestResult } from '@/lib/gamification';
import TypingStat from '@/models/TypingStat';
import User from '@/models/User';
import UserBadge from '@/models/UserBadge';
import UserStat from '@/models/UserStat';
import { BADGE_COLLECTION } from './badgeCollection';

/** Badge criteria evaluation service Handles achievement detection and badge unlocking */
class BadgeService {
  /**
   * Evaluates user performance against all badge criteria
   *
   * @param {string} userId - User ID
   * @param {Object} sessionData - Current session performance data
   * @param {number} sessionData.wpm - Words per minute
   * @param {number} sessionData.accuracy - Accuracy percentage (0-100)
   * @param {number} sessionData.timePlayed - Time played in seconds
   * @returns {Promise<Object>} Result containing new badges and updated progress
   */
  async evaluateAchievements(userId, sessionData) {
    try {
      await dbConnect();

      // Get user's already unlocked badges
      const unlockedBadges = await UserBadge.find({ userId }).select('badgeId');
      const unlockedBadgeIds = new Set(unlockedBadges.map((ub) => ub.badgeId));

      // Filter badges that user hasn't unlocked yet
      const availableBadges = BADGE_COLLECTION.filter(
        (badge) => !unlockedBadgeIds.has(badge.badgeId)
      );

      const newlyUnlockedBadges = [];
      const evaluationResults = [];

      // Evaluate each available badge
      for (const badge of availableBadges) {
        const result = await this.evaluateBadgeCriteria(userId, badge, sessionData);
        evaluationResults.push({
          badgeId: badge.badgeId,
          ...result
        });

        if (result.unlocked) {
          newlyUnlockedBadges.push(badge.badgeId);
        }
      }

      // Unlock new badges
      if (newlyUnlockedBadges.length > 0) {
        await this.unlockBadges(userId, newlyUnlockedBadges);
      }

      return {
        newBadges: newlyUnlockedBadges,
        evaluationResults,
        totalEvaluated: availableBadges.length
      };
    } catch (error) {
      console.error('Error evaluating achievements:', error);
      throw new Error(`Achievement evaluation failed: ${error.message}`);
    }
  }

  /**
   * Evaluates a single badge's criteria against user performance
   *
   * @param {string} userId - User ID
   * @param {Object} badge - Badge document
   * @param {Object} sessionData - Current session performance data
   * @returns {Promise<Object>} Evaluation result
   */
  async evaluateBadgeCriteria(userId, badge, sessionData) {
    const { criteria } = badge;

    try {
      switch (criteria.type) {
        case 'wpm':
          return this.evaluateWpmCriteria(criteria, sessionData);

        case 'accuracy':
          return this.evaluateAccuracyCriteria(criteria, sessionData);

        case 'games_played':
          return await this.evaluateGamesPlayedCriteria(userId, criteria);

        case 'streak':
          return await this.evaluateStreakCriteria(userId, criteria, sessionData);

        case 'time_played':
          return await this.evaluateTimePlayedCriteria(userId, criteria);

        default:
          throw new Error(`Unknown criteria type: ${criteria.type}`);
      }
    } catch (error) {
      console.error(`Error evaluating criteria for badge ${badge.badgeId}:`, error);
      return {
        unlocked: false,
        progress: 0,
        error: error.message
      };
    }
  }

  /** Evaluates WPM-based criteria */
  evaluateWpmCriteria(criteria, sessionData) {
    const { wpm } = sessionData;
    const { threshold, condition } = criteria;

    let unlocked = false;

    switch (condition) {
      case '>=':
        unlocked = wpm >= threshold;
        break;
      case '==':
        unlocked = wpm === threshold;
        break;
      default:
        throw new Error(`Unsupported condition for WPM criteria: ${condition}`);
    }

    return {
      unlocked,
      progress: Math.min((wpm / threshold) * 100, 100),
      currentValue: wpm,
      targetValue: threshold
    };
  }

  /** Evaluates accuracy-based criteria */
  evaluateAccuracyCriteria(criteria, sessionData) {
    const { accuracy } = sessionData;
    const { threshold, condition } = criteria;

    let unlocked = false;

    switch (condition) {
      case '>=':
        unlocked = accuracy >= threshold;
        break;
      case '==':
        unlocked = accuracy === threshold;
        break;
      default:
        throw new Error(`Unsupported condition for accuracy criteria: ${condition}`);
    }

    return {
      unlocked,
      progress: Math.min((accuracy / threshold) * 100, 100),
      currentValue: accuracy,
      targetValue: threshold
    };
  }

  /** Evaluates games played criteria */
  async evaluateGamesPlayedCriteria(userId, criteria) {
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }

    const { totalGamesPlayed } = user;
    const { threshold, condition } = criteria;

    let unlocked = false;

    switch (condition) {
      case '>=':
        unlocked = totalGamesPlayed >= threshold;
        break;
      case '==':
        unlocked = totalGamesPlayed === threshold;
        break;
      default:
        throw new Error(`Unsupported condition for games played criteria: ${condition}`);
    }

    return {
      unlocked,
      progress: Math.min((totalGamesPlayed / threshold) * 100, 100),
      currentValue: totalGamesPlayed,
      targetValue: threshold
    };
  }

  /** Evaluates streak-based criteria (consecutive achievements) */
  async evaluateStreakCriteria(userId, criteria, sessionData) {
    const { threshold, condition } = criteria;

    if (condition !== 'consecutive') {
      throw new Error(`Unsupported condition for streak criteria: ${condition}`);
    }

    // Get recent typing stats to check for consecutive achievements
    const recentStats = await TypingStat.find({ userId })
      .sort({ createdAt: -1 })
      .limit(threshold + 1); // Get one more than needed to check if streak continues

    if (recentStats.length < threshold) {
      return {
        unlocked: false,
        progress: (recentStats.length / threshold) * 100,
        currentValue: recentStats.length,
        targetValue: threshold
      };
    }

    // For accuracy streaks, check if the last N games (including current) meet accuracy requirement
    // Assuming streak criteria is for 95%+ accuracy
    const accuracyThreshold = 95; // This could be made configurable
    let consecutiveCount = 0;

    // Check current session first
    if (sessionData.accuracy >= accuracyThreshold) {
      consecutiveCount = 1;
    } else {
      return {
        unlocked: false,
        progress: 0,
        currentValue: 0,
        targetValue: threshold
      };
    }

    // Check previous sessions
    for (let i = 0; i < Math.min(recentStats.length, threshold - 1); i++) {
      if (recentStats[i].accuracy >= accuracyThreshold) {
        consecutiveCount++;
      } else {
        break;
      }
    }

    const unlocked = consecutiveCount >= threshold;

    return {
      unlocked,
      progress: Math.min((consecutiveCount / threshold) * 100, 100),
      currentValue: consecutiveCount,
      targetValue: threshold
    };
  }

  /** Evaluates time played criteria */
  async evaluateTimePlayedCriteria(userId, criteria) {
    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }

    const { totalTimePlayed } = user;
    const { threshold, condition } = criteria;

    const thresholdInSec = threshold * 60;
    let unlocked = false;

    switch (condition) {
      case '>=':
        unlocked = totalTimePlayed >= thresholdInSec;
        break;
      case '==':
        unlocked = totalTimePlayed === thresholdInSec;
        break;
      default:
        throw new Error(`Unsupported condition for time played criteria: ${condition}`);
    }

    return {
      unlocked,
      progress: Math.min((totalTimePlayed / thresholdInSec) * 100, 100),
      currentValue: totalTimePlayed,
      targetValue: thresholdInSec
    };
  }

  /**
   * Unlocks badges for a user and updates user statistics
   *
   * @param {string} userId - User ID
   * @param {string[]} badgeIds - Array of badge IDs to unlock
   */
  async unlockBadges(userId, badgeIds) {
    if (!badgeIds || badgeIds.length === 0) {
      return;
    }

    try {
      // Create user badge records
      const userBadges = badgeIds.map((badgeId) => ({
        userId,
        badgeId,
        unlockedAt: new Date(),
        isViewed: false
      }));

      // Use insertMany with ordered: false to continue on duplicate key errors
      await UserBadge.insertMany(userBadges, { ordered: false });

      console.log(`Successfully unlocked ${badgeIds.length} badges for user ${userId}`);
    } catch (error) {
      // Handle duplicate key errors gracefully (user already has the badge)
      if (error.code === 11000) {
        console.log(`Some badges were already unlocked for user ${userId}`);
      } else {
        console.error('Error unlocking badges:', error);
        throw error;
      }
    }
  }

  /**
   * Gets user's badge progress for all available badges
   *
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Badge progress data
   */
  async getUserBadgeProgress(userId) {
    try {
      await dbConnect();

      const unlockedBadges = await UserBadge.find({ userId });
      const progress = {};

      for (const badge of BADGE_COLLECTION) {
        const unlockedBadge = unlockedBadges.find((ub) => ub.badgeId === badge.badgeId);
        if (unlockedBadge) {
          progress[badge.badgeId] = {
            unlocked: true,
            progress: 100,
            isViewed: unlockedBadge.isViewed,
            unlockedAt: unlockedBadges.unlockedAt
          };
        } else {
          // Calculate current progress for locked badges
          const result = await this.evaluateBadgeCriteria(userId, badge, {
            wpm: 0,
            accuracy: 0,
            timePlayed: 0
          });
          progress[badge.badgeId] = {
            unlocked: false,
            progress: result.progress || 0,
            currentValue: result.currentValue,
            targetValue: result.targetValue
          };
        }
      }

      return progress;
    } catch (error) {
      console.error('Error getting user badge progress:', error);
      throw new Error(`Failed to get badge progress: ${error.message}`);
    }
  }

  /**
   * Marks badges as viewed to prevent repeated celebration animations
   *
   * @param {string} userId - User ID
   * @param {string[]} badgeIds - Array of badge IDs to mark as viewed
   * @returns {Promise<void>}
   */
  async markBadgesAsViewed(userId, badgeIds) {
    try {
      await dbConnect();

      if (!badgeIds || badgeIds.length === 0) {
        return;
      }

      await UserBadge.updateMany(
        {
          userId,
          badgeId: { $in: badgeIds },
          isViewed: false
        },
        {
          $set: { isViewed: true }
        }
      );

      console.log(`Marked ${badgeIds.length} badges as viewed for user ${userId}`);
    } catch (error) {
      console.error('Error marking badges as viewed:', error);
      throw new Error(`Failed to mark badges as viewed: ${error.message}`);
    }
  }

  /**
   * Gets user's achievement statistics
   *
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Achievement data
   */
  async getUserStat(userId) {
    try {
      await dbConnect();

      const stat = await UserStat.findOne({ userId })
        // Don't return the version control
        .select('-__v')
        // Prevents direct modification to document
        .lean();
      return stat ?? {};
    } catch (error) {
      console.error('Error getting user stat progress:', error);
      throw new Error(`Failed to get user stat progress: ${error.message}`);
    }
  }

  /**
   * Update user's achievement statistics
   *
   * @param {string} userId - User ID
   * @param {object} wpm - Latest wpm
   * @returns {Promise<Object>} Achievement data + gamification states
   */
  async updateUserStat(userId, wpm) {
    try {
      await dbConnect();

      const curStat = await this.getUserStat(userId);
      const newStat = processTestResult(curStat, wpm);
      await UserStat.updateOne(
        { userId },
        { $set: newStat },
        // Creates document if it doesn't exist
        { upsert: true }
      );

      const levelUp = newStat.skillLevel !== curStat.skillLevel;
      const newBadges = newStat.badges.filter(
        (b) => !(curStat.badges ?? []).some((cb) => cb.name === b.name)
      );
      return { stat: newStat, levelUp, newBadges };
    } catch (error) {
      console.error('Error getting user stat progress:', error);
      throw new Error(`Failed to get user stat progress: ${error.message}`);
    }
  }
}

const badgeService = new BadgeService();
export default badgeService;
