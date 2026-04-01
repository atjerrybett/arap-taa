'use client';

import { people, houses, getPersonDisplayName } from '@/data/familyData';
import { PersonNode } from '@/components/PersonNode';
import { HouseCard, FamilyBranch } from '@/components/FamilyTree';
import { ProfileModal } from '@/components/ProfileModal';
import { PathSearch } from '@/components/PathSearch';
import { useFamilyStore } from '@/store/familyStore';
import { ArrowRight, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export default function TreePage() {
  const {
    expandedHouses,
    toggleHouse,
    highlightedPath,
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
      <div className="bg-white dark:bg-earth-900 border-b border-earth-200 dark:border-earth-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Title and controls row */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-earth-900 dark:text-earth-100 truncate">
                  Full Family Tree
                </h1>
                <p className="text-xs sm:text-sm text-earth-600 dark:text-earth-400 mt-0.5 sm:mt-1 line-clamp-1">
                  Interactive view of the complete Arap Taa family
                </p>
              </div>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 sm:p-2.5 rounded-lg bg-earth-100 dark:bg-earth-800 text-earth-700 dark:text-earth-200 hover:bg-earth-200 dark:hover:bg-earth-700 transition-colors flex-shrink-0 touch-manipulation active:scale-95"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
            
            {/* Search row */}
            <div className="w-full">
              <PathSearch />
            </div>
          </div>

          {/* Path Breadcrumb */}
          {isPathHighlighted && (
            <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
              {highlightedPath.map((personId, index) => (
                <div key={personId} className="flex items-center gap-1.5 sm:gap-2">
                  <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-500 text-white rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                    {getPersonDisplayName(people[personId])}
                  </span>
                  {index < highlightedPath.length - 1 && (
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tree */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Patriarch */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <PersonNode person={patriarch} size="lg" />
          <div className="w-0.5 h-6 sm:h-8 bg-earth-300 dark:bg-earth-600 mt-3 sm:mt-4" />
          <div className="w-3/4 max-w-3xl h-0.5 bg-earth-300 dark:bg-earth-600" />
        </div>

        {/* Houses */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
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
