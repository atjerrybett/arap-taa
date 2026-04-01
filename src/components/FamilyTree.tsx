'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Users } from 'lucide-react';
import { Person, HouseName } from '@/types';
import { 
  people, 
  getChildrenOfPerson, 
  getSpousesOfPerson,
  marriages,
  getPersonDisplayName 
} from '@/data/familyData';
import { PersonNode, SpouseGroup } from './PersonNode';
import { useFamilyStore } from '@/store/familyStore';
import clsx from 'clsx';

interface HouseCardProps {
  houseName: HouseName;
  matriarch: Person;
  color: string;
  accentColor: string;
  description?: string;
  isExpanded: boolean;
  onToggle: () => void;
  patriarch: Person;
}

export function HouseCard({ 
  houseName, 
  matriarch, 
  color, 
  accentColor, 
  description,
  isExpanded,
  onToggle,
  patriarch
}: HouseCardProps) {
  const children = getChildrenOfMarriage(patriarch.id, matriarch.id);

  const colorClasses: Record<string, { bg: string; border: string; text: string; button: string }> = {
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-200 dark:border-amber-800',
      text: 'text-amber-700 dark:text-amber-400',
      button: 'bg-amber-500 hover:bg-amber-600',
    },
    cyan: {
      bg: 'bg-cyan-50 dark:bg-cyan-950/30',
      border: 'border-cyan-200 dark:border-cyan-800',
      text: 'text-cyan-700 dark:text-cyan-400',
      button: 'bg-cyan-500 hover:bg-cyan-600',
    },
    violet: {
      bg: 'bg-violet-50 dark:bg-violet-950/30',
      border: 'border-violet-200 dark:border-violet-800',
      text: 'text-violet-700 dark:text-violet-400',
      button: 'bg-violet-500 hover:bg-violet-600',
    },
  };

  const colors = colorClasses[color] || colorClasses.amber;

  return (
    <div className={clsx(
      'rounded-2xl border-2 overflow-hidden transition-all duration-300',
      colors.bg,
      colors.border,
      isExpanded ? 'col-span-full' : ''
    )}>
      {/* House Header */}
      <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div className="flex items-center gap-3">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <div>
            <h3 className={clsx('font-bold text-lg', colors.text)}>
              House of {houseName}
            </h3>
            {description && (
              <p className="text-sm text-earth-600 dark:text-earth-400">
                {description}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onToggle}
          className={clsx(
            'flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base text-white transition-colors w-full sm:w-auto justify-center sm:justify-start',
            colors.button
          )}
        >
          {isExpanded ? (
            <>
              <ChevronDown className="w-4 h-4" />
              Collapse
            </>
          ) : (
            <>
              <ChevronRight className="w-4 h-4" />
              Explore House
            </>
          )}
        </button>
      </div>

      {/* Matriarch Preview (when collapsed) */}
      {!isExpanded && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-4">
            <PersonNode person={matriarch} size="sm" />
            <div className="text-sm text-earth-600 dark:text-earth-400">
              <p>{children.length} children</p>
              <p className="text-xs">Click to explore this lineage</p>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Tree */}
      {isExpanded && (
        <div className="p-6 pt-2 overflow-x-auto">
          <FamilyBranch 
            person={matriarch} 
            level={0} 
            showSpouse={false}
          />
        </div>
      )}
    </div>
  );
}

interface FamilyBranchProps {
  person: Person;
  level: number;
  showSpouse?: boolean;
}

export function FamilyBranch({ person, level, showSpouse = true }: FamilyBranchProps) {
  const { expandedNodes, toggleNode, highlightedPath } = useFamilyStore();
  const isExpanded = expandedNodes.has(person.id);
  const children = getChildrenOfPerson(person.id);
  const spouses = getSpousesOfPerson(person.id);
  const hasChildren = children.length > 0;
  const isInPath = highlightedPath.includes(person.id);

  // Deduplicate children (since both parents point to same children)
  const uniqueChildren = children.filter((child, index, self) => 
    index === self.findIndex(c => c.id === child.id)
  );

  return (
    <div className="flex flex-col items-center">
      {/* Person Node with Spouses */}
      <div className="flex items-center gap-2">
        {showSpouse && spouses.length > 0 ? (
          <SpouseGroup person={person} spouses={spouses} isHighlighted={isInPath} />
        ) : (
          <PersonNode 
            person={person} 
            isHighlighted={isInPath}
            showExpand={hasChildren}
            isExpanded={isExpanded}
            onToggleExpand={() => toggleNode(person.id)}
          />
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="mt-4 relative">
          {/* Vertical line from parent */}
          <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-earth-300 dark:bg-earth-600 -translate-x-1/2" />
          
          {/* Horizontal line connecting children */}
          {uniqueChildren.length > 1 && (
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-earth-300 dark:bg-earth-600" 
                 style={{ 
                   left: `${100 / (uniqueChildren.length * 2)}%`,
                   right: `${100 / (uniqueChildren.length * 2)}%`
                 }} 
            />
          )}
          
          {/* Children nodes */}
          <div className="flex gap-6 pt-4">
            {uniqueChildren.map((child, index) => (
              <div key={child.id} className="flex flex-col items-center relative">
                {/* Vertical line to child */}
                <div className="w-0.5 h-4 bg-earth-300 dark:bg-earth-600" />
                <FamilyBranch 
                  person={child} 
                  level={level + 1}
                  showSpouse={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show children count when collapsed */}
      {hasChildren && !isExpanded && (
        <button
          onClick={() => toggleNode(person.id)}
          className="mt-2 flex items-center gap-1 text-xs text-earth-500 dark:text-earth-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
        >
          <Users className="w-3 h-3" />
          {uniqueChildren.length} {uniqueChildren.length === 1 ? 'child' : 'children'}
        </button>
      )}
    </div>
  );
}

// Helper function to get children from a specific marriage
function getChildrenOfMarriage(spouse1Id: string, spouse2Id: string): Person[] {
  const marriage = marriages.find(
    m => (m.spouse1Id === spouse1Id && m.spouse2Id === spouse2Id) ||
         (m.spouse1Id === spouse2Id && m.spouse2Id === spouse1Id)
  );
  
  if (!marriage) return [];
  
  return marriage.childrenIds.map(id => people[id]).filter(Boolean);
}
