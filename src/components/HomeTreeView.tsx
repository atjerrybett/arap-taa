'use client';

import { people, houses, pathToMalcolm, getPersonDisplayName } from '@/data/familyData';
import { PersonNode } from './PersonNode';
import { HouseCard, FamilyBranch } from './FamilyTree';
import { useFamilyStore } from '@/store/familyStore';
import { ProfileModal } from './ProfileModal';
import { Sparkles, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export function HomeTreeView() {
  const { 
    expandedHouses, 
    toggleHouse, 
    highlightedPath, 
    highlightPathToMalcolm, 
    clearHighlight,
    selectedPersonId,
    isModalOpen,
    closeModal
  } = useFamilyStore();

  const patriarch = people['arap-taa'];
  const selectedPerson = selectedPersonId ? people[selectedPersonId] : null;

  const isPathHighlighted = highlightedPath.length > 0;

  return (
    <div className="py-8">
      {/* Highlight Path Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => isPathHighlighted ? clearHighlight() : highlightPathToMalcolm()}
          className={clsx(
            'flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300',
            isPathHighlighted
              ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
              : 'bg-white dark:bg-earth-800 text-earth-700 dark:text-earth-200 shadow-md hover:shadow-lg hover:scale-105'
          )}
        >
          <Sparkles className={clsx('w-5 h-5', isPathHighlighted && 'animate-pulse')} />
          {isPathHighlighted ? 'Clear Highlight' : 'Highlight Path to Malcolm'}
        </button>
      </div>

      {/* Path Visualization */}
      {isPathHighlighted && (
        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-700 dark:text-amber-400 mb-3 font-medium">
            Lineage Path: Arap Taa → Malcolm
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {pathToMalcolm.map((personId, index) => (
              <div key={personId} className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-medium">
                  {getPersonDisplayName(people[personId])}
                </span>
                {index < pathToMalcolm.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Patriarch */}
      <div className="flex flex-col items-center mb-8">
        <h3 className="text-lg font-semibold text-earth-700 dark:text-earth-300 mb-4">
          The Patriarch
        </h3>
        <PersonNode person={patriarch} size="lg" />
        
        {/* Connecting line to wives */}
        <div className="w-0.5 h-8 bg-earth-300 dark:bg-earth-600 mt-4" />
        <div className="w-3/4 max-w-2xl h-0.5 bg-earth-300 dark:bg-earth-600" />
      </div>

      {/* Three Houses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {houses.map((house) => (
          <HouseCard
            key={house.name}
            houseName={house.name}
            matriarch={house.matriarch}
            color={house.color}
            accentColor={house.accentColor}
            description={house.description}
            isExpanded={expandedHouses.includes(house.name)}
            onToggle={() => toggleHouse(house.name)}
            patriarch={patriarch}
          />
        ))}
      </div>

      {/* Profile Modal */}
      {isModalOpen && selectedPerson && (
        <ProfileModal 
          person={selectedPerson} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}
