'use client';

import { people, houses } from '@/data/familyData';
import { PersonNode } from '@/components/PersonNode';
import { HouseCard, FamilyBranch } from '@/components/FamilyTree';
import { ProfileModal } from '@/components/ProfileModal';
import { useFamilyStore } from '@/store/familyStore';
import { Sparkles, ArrowRight, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { pathToMalcolm, getPersonDisplayName } from '@/data/familyData';

export default function TreePage() {
  const {
    expandedHouses,
    toggleHouse,
    highlightedPath,
    highlightPathToMalcolm,
    clearHighlight,
    selectedPersonId,
    isModalOpen,
    closeModal,
  } = useFamilyStore();

  const [isFullscreen, setIsFullscreen] = useState(false);

  const patriarch = people['arap-taa'];
  const selectedPerson = selectedPersonId ? people[selectedPersonId] : null;
  const isPathHighlighted = highlightedPath.length > 0;

  return (
    <div className={clsx('min-h-screen', isFullscreen && 'fixed inset-0 z-40 bg-earth-50 dark:bg-earth-950 overflow-auto')}>
      {/* Header */}
      <div className="bg-white dark:bg-earth-900 border-b border-earth-200 dark:border-earth-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-earth-900 dark:text-earth-100">
                Full Family Tree
              </h1>
              <p className="text-earth-600 dark:text-earth-400 mt-1">
                Interactive view of the complete Arap Taa family
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => isPathHighlighted ? clearHighlight() : highlightPathToMalcolm()}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm',
                  isPathHighlighted
                    ? 'bg-amber-500 text-white'
                    : 'bg-earth-100 dark:bg-earth-800 text-earth-700 dark:text-earth-200 hover:bg-earth-200 dark:hover:bg-earth-700'
                )}
              >
                <Sparkles className="w-4 h-4" />
                {isPathHighlighted ? 'Clear Path' : 'Path to Malcolm'}
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg bg-earth-100 dark:bg-earth-800 text-earth-700 dark:text-earth-200 hover:bg-earth-200 dark:hover:bg-earth-700 transition-colors"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Path Breadcrumb */}
          {isPathHighlighted && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
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
          )}
        </div>
      </div>

      {/* Tree */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Patriarch */}
        <div className="flex flex-col items-center mb-8">
          <PersonNode person={patriarch} size="lg" />
          <div className="w-0.5 h-8 bg-earth-300 dark:bg-earth-600 mt-4" />
          <div className="w-3/4 max-w-3xl h-0.5 bg-earth-300 dark:bg-earth-600" />
        </div>

        {/* Houses */}
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
      </div>

      {/* Profile Modal */}
      {isModalOpen && selectedPerson && (
        <ProfileModal person={selectedPerson} onClose={closeModal} />
      )}
    </div>
  );
}
