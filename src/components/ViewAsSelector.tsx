'use client';

import { useState, useRef, useEffect } from 'react';
import { User, ChevronDown, Users as UsersIcon, Search } from 'lucide-react';
import { getAllPeopleArray, getPersonDisplayName, getHouseColor } from '@/data/familyData';
import { useFamilyStore } from '@/store/familyStore';
import clsx from 'clsx';

export function ViewAsSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const { referencePersonId, setReferencePerson } = useFamilyStore();

  const allPeople = getAllPeopleArray();
  const selectedPerson = allPeople.find(p => p.id === referencePersonId);

  // Filter people based on search query
  const filteredPeople = allPeople.filter(person => {
    const displayName = getPersonDisplayName(person).toLowerCase();
    const query = searchQuery.toLowerCase();
    return displayName.includes(query) || person.house?.toLowerCase().includes(query);
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const houseColorClasses: Record<string, string> = {
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
    violet: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400',
    stone: 'bg-stone-100 text-stone-800 dark:bg-stone-900/30 dark:text-stone-400',
  };

  const handleSelect = (personId: string) => {
    setReferencePerson(personId);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 touch-manipulation active:scale-95',
          isOpen
            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-2 border-amber-300 dark:border-amber-700'
            : 'bg-earth-100 dark:bg-earth-800 text-earth-700 dark:text-earth-200 hover:bg-earth-200 dark:hover:bg-earth-700 border-2 border-transparent'
        )}
      >
        <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        <div className="hidden sm:flex flex-col items-start min-w-0">
          <span className="text-xs text-earth-500 dark:text-earth-400">View as</span>
          <span className="text-sm font-medium truncate max-w-[120px]">
            {selectedPerson ? getPersonDisplayName(selectedPerson) : 'Select...'}
          </span>
        </div>
        <ChevronDown className={clsx('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-earth-900 rounded-xl border border-earth-200 dark:border-earth-700 shadow-xl z-50 max-h-[70vh] overflow-hidden animate-fade-in">
          <div className="p-3 border-b border-earth-200 dark:border-earth-700">
            <p className="text-xs font-medium text-earth-500 dark:text-earth-400 uppercase tracking-wider mb-2">
              View relationships from perspective of:
            </p>
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-earth-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
                className="w-full pl-10 pr-3 py-2 bg-earth-50 dark:bg-earth-800 border border-earth-200 dark:border-earth-700 rounded-lg text-sm text-earth-900 dark:text-earth-100 placeholder-earth-500 dark:placeholder-earth-400 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600"
                autoFocus
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-[calc(70vh-120px)]">
            <div className="p-2">
              {filteredPeople.length > 0 ? (
                filteredPeople.map(person => {
                const houseColor = getHouseColor(person.house);
                const isSelected = person.id === referencePersonId;
                return (
                  <button
                    key={person.id}
                    onClick={() => handleSelect(person.id)}
                    className={clsx(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left touch-manipulation active:scale-[0.98]',
                      isSelected
                        ? 'bg-amber-100 dark:bg-amber-900/30'
                        : 'hover:bg-earth-100 dark:hover:bg-earth-800'
                    )}
                  >
                    <div className={clsx(
                      'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                      isSelected 
                        ? 'bg-amber-500' 
                        : 'bg-earth-200 dark:bg-earth-700'
                    )}>
                      <User className={clsx(
                        'w-5 h-5',
                        isSelected 
                          ? 'text-white' 
                          : 'text-earth-500 dark:text-earth-400'
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={clsx(
                        'text-sm font-medium truncate',
                        isSelected
                          ? 'text-amber-700 dark:text-amber-400'
                          : 'text-earth-900 dark:text-earth-100'
                      )}>
                        {getPersonDisplayName(person)}
                      </p>
                      {person.house && (
                        <span className={clsx('inline-block text-xs px-1.5 py-0.5 rounded mt-0.5', houseColorClasses[houseColor])}>
                          {person.house}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                    )}
                  </button>
                );
              })
              ) : (
                <div className="p-4 text-center text-sm text-earth-500 dark:text-earth-400">
                  No people found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
