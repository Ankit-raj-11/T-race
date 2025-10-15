import { BADGE_COLLECTION } from '@/lib/badge/badgeCollection';
import { Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-toastify';
import { BadgePic, BadgeRarity } from './BadgeHelper';

function BadgeContent({ badge, closeToast, toastProps }) {
  return (
    <Link href="/profile" onClick={() => closeToast()}>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <BadgePic badge={badge} isUnlocked />
          <BadgeRarity badge={badge} isUnlocked />
        </div>
        <div className="flex-grow min-w-0">
          <p className="text-xs text-blue-300">New achievement unlocked!</p>
          <h3 className="font-semibold text-white">{badge.name}</h3>
          <p className="text-sm text-gray-300">{badge.description}</p>
        </div>
      </div>
    </Link>
  );
}

export function showBadgeToast(badgeId) {
  const badgeInfo = BADGE_COLLECTION.find((entry) => entry.badgeId === badgeId);
  if (!badgeInfo) {
    return;
  }

  toast(<BadgeContent badge={badgeInfo} />, {
    position: 'bottom-right',
    // prevent toast from closing automatically
    autoClose: false
  });
}

function LevelUpContent({ skillLevel, closeToast, toastProps }) {
  return (
    <Link href="/profile" onClick={() => closeToast()}>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <Star className="text-yellow-300" size={20} />
        </div>
        <div className="flex-grow min-w-0">
          <p className="text-xs text-blue-300">You leveled up!</p>
          <h3 className="text-yellow-300">
            New rank: <span className="font-semibold">{skillLevel}</span>
          </h3>
        </div>
      </div>
    </Link>
  );
}

export function showLevelUpToast(skillLevel) {
  toast(<LevelUpContent skillLevel={skillLevel} />, {
    position: 'bottom-right',
    // prevent toast from closing automatically
    autoClose: false
  });
}
