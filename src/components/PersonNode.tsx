'use client';

import { User, ChevronDown, ChevronRight } from 'lucide-react';
import { Person } from '@/types';
import { getPersonDisplayName, getHouseColor, getChildrenOfPerson, getSpousesOfPerson } from '@/data/familyData';
import { useFamilyStore } from '@/store/familyStore';
import clsx from 'clsx';

interface PersonNodeProps {
  person: Person;
  isHighlighted?: boolean;
  showExpand?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function PersonNode({ 
  person, 
  isHighlighted = false,
  showExpand = false,
  isExpanded = false,
  onToggleExpand,
  size = 'md' 
}: PersonNodeProps) {
  const { openModal, highlightedPath } = useFamilyStore();
  const children = getChildrenOfPerson(person.id);
  const hasChildren = children.length > 0;
  
  const isInPath = highlightedPath.includes(person.id);
  const houseColor = getHouseColor(person.house);

  const sizeClasses = {
    sm: 'w-24 sm:w-28',
    md: 'w-32 sm:w-36',
    lg: 'w-36 sm:w-44',
  };

  const avatarSizes = {
    sm: 'w-9 h-9 sm:w-10 sm:h-10',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
  };

  const iconSizes = {
    sm: 'w-4 h-4 sm:w-5 sm:h-5',
    md: 'w-6 h-6 sm:w-7 sm:h-7',
    lg: 'w-7 h-7 sm:w-8 sm:h-8',
  };

  const colorClasses: Record<string, { ring: string; bg: string; accent: string }> = {
    amber: {
      ring: 'ring-amber-500',
      bg: 'bg-gradient-to-br from-amber-400 to-amber-600',
      accent: 'bg-amber-500',
    },
    cyan: {
      ring: 'ring-cyan-500',
      bg: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
      accent: 'bg-cyan-500',
    },
    violet: {
      ring: 'ring-violet-500',
      bg: 'bg-gradient-to-br from-violet-400 to-violet-600',
      accent: 'bg-violet-500',
    },
    stone: {
      ring: 'ring-stone-400',
      bg: 'bg-gradient-to-br from-stone-400 to-stone-600',
      accent: 'bg-stone-500',
    },
  };

  const colors = colorClasses[houseColor] || colorClasses.stone;

  return (
    <div className={clsx('flex flex-col items-center', sizeClasses[size])}>
      <button
        onClick={() => openModal(person.id)}
        className={clsx(
          'person-node flex flex-col items-center p-2 sm:p-3 rounded-xl bg-white dark:bg-earth-800 shadow-md hover:shadow-lg transition-all duration-200 touch-manipulation active:scale-95 w-full',
          isInPath && 'ring-2 ring-offset-2 ring-offset-earth-50 dark:ring-offset-earth-950 animate-pulse-glow',
          isInPath && colors.ring,
          !isInPath && 'hover:scale-105'
        )}
      >
        {/* Avatar */}
        <div className={clsx(
          'rounded-full flex items-center justify-center shadow-inner',
          avatarSizes[size],
          colors.bg
        )}>
          {person.photoUrl ? (
            <img 
              src={person.photoUrl} 
              alt={person.firstName} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className={clsx('text-white', iconSizes[size])} />
          )}
        </div>

        {/* Name */}
        <p className={clsx(
          'mt-1.5 sm:mt-2 font-medium text-earth-900 dark:text-earth-100 text-center leading-tight px-1',
          size === 'sm' && 'text-[10px] sm:text-xs',
          size === 'md' && 'text-xs sm:text-sm',
          size === 'lg' && 'text-sm sm:text-base'
        )}>
          {getPersonDisplayName(person)}
        </p>

        {/* Role Badge */}
        {(person.isPatriarch || person.isMatriarch) && (
          <span className={clsx(
            'mt-0.5 sm:mt-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full text-white',
            colors.accent
          )}>
            {person.isPatriarch ? 'Patriarch' : 'Matriarch'}
          </span>
        )}
      </button>

      {/* Expand/Collapse Button */}
      {showExpand && hasChildren && (
        <button
          onClick={onToggleExpand}
          className="mt-2 p-1.5 sm:p-1 rounded-full bg-earth-200 dark:bg-earth-700 hover:bg-earth-300 dark:hover:bg-earth-600 transition-colors touch-manipulation min-w-[32px] min-h-[32px] sm:min-w-0 sm:min-h-0 flex items-center justify-center active:scale-95"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-earth-600 dark:text-earth-300" />
          ) : (
            <ChevronRight className="w-4 h-4 text-earth-600 dark:text-earth-300" />
          )}
        </button>
      )}
    </div>
  );
}

interface SpouseGroupProps {
  person: Person;
  spouses: Person[];
  isHighlighted?: boolean;
}

export function SpouseGroup({ person, spouses, isHighlighted }: SpouseGroupProps) {
  const { highlightedPath } = useFamilyStore();
  
  if (spouses.length === 0) {
    return <PersonNode person={person} isHighlighted={isHighlighted} />;
  }

  return (
    <div className="flex items-center gap-2">
      <PersonNode person={person} isHighlighted={highlightedPath.includes(person.id)} />
      {spouses.map((spouse) => (
        <div key={spouse.id} className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-pink-400 dark:bg-pink-500" />
          <span className="text-pink-500 text-xs">♥</span>
          <div className="w-6 h-0.5 bg-pink-400 dark:bg-pink-500" />
          <PersonNode person={spouse} isHighlighted={highlightedPath.includes(spouse.id)} />
        </div>
      ))}
    </div>
  );
}
