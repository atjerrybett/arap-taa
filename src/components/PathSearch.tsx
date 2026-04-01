'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, Route, User } from 'lucide-react';
import { getAllPeopleArray, getPersonDisplayName, getHouseColor } from '@/data/familyData';
import { Person } from '@/types';
import { useFamilyStore } from '@/store/familyStore';
import clsx from 'clsx';

export function PathSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { highlightedPath, highlightedTargetId, highlightPathTo, clearHighlight } = useFamilyStore();

  const allPeople = useMemo(() => getAllPeopleArray(), []);
  const isPathHighlighted = highlightedPath.length > 0;

  const results = useMemo(() => {
    if (!query.trim()) return allPeople.slice(0, 8);
    const q = query.toLowerCase();
    return allPeople.filter(p => {
      const name = `${p.firstName} ${p.lastName || ''} ${p.nickname || ''}`.toLowerCase();
      return name.includes(q);
    }).slice(0, 10);
  }, [query, allPeople]);

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

  const handleSelect = (person: Person) => {
    highlightPathTo(person.id);
    setQuery(getPersonDisplayName(person));
    setIsOpen(false);
  };

  const handleClear = () => {
    clearHighlight();
    setQuery('');
    setIsOpen(false);
  };

  const selectedPerson = highlightedTargetId
    ? allPeople.find(p => p.id === highlightedTargetId)
    : null;

  const houseColorClasses: Record<string, string> = {
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
    violet: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400',
    stone: 'bg-stone-100 text-stone-800 dark:bg-stone-900/30 dark:text-stone-400',
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      {/* Search input */}
      <div className={clsx(
        'flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200',
        isPathHighlighted
          ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700'
          : 'bg-white dark:bg-earth-800 border-earth-200 dark:border-earth-700',
        isOpen && !isPathHighlighted && 'border-amber-400 dark:border-amber-600 shadow-lg'
      )}>
        <Route className={clsx('w-5 h-5 flex-shrink-0', isPathHighlighted ? 'text-amber-500' : 'text-earth-400')} />
        <input
          ref={inputRef}
          type="text"
          value={isPathHighlighted && !isOpen ? `Path to ${selectedPerson ? getPersonDisplayName(selectedPerson) : ''}` : query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            if (isPathHighlighted) clearHighlight();
          }}
          onFocus={() => {
            setIsOpen(true);
            if (isPathHighlighted) {
              setQuery('');
            }
          }}
          placeholder="Search path to anyone..."
          className={clsx(
            'flex-1 bg-transparent outline-none text-sm',
            isPathHighlighted
              ? 'text-amber-700 dark:text-amber-300 font-medium'
              : 'text-earth-900 dark:text-earth-100 placeholder:text-earth-400'
          )}
        />
        {(isPathHighlighted || query) && (
          <button
            onClick={handleClear}
            className="p-1 rounded-lg hover:bg-earth-100 dark:hover:bg-earth-700 transition-colors"
          >
            <X className="w-4 h-4 text-earth-400" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-earth-900 rounded-xl border border-earth-200 dark:border-earth-700 shadow-xl z-50 max-h-64 overflow-y-auto animate-fade-in">
          <div className="p-2">
            <p className="px-3 py-2 text-xs font-medium text-earth-500 dark:text-earth-400 uppercase tracking-wider">
              {query.trim() ? 'Search results' : 'Select a family member'}
            </p>
            {results.length === 0 ? (
              <p className="px-3 py-4 text-sm text-earth-500 dark:text-earth-400 text-center">
                No family members found
              </p>
            ) : (
              results.map(person => {
                const houseColor = getHouseColor(person.house);
                return (
                  <button
                    key={person.id}
                    onClick={() => handleSelect(person)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-earth-100 dark:hover:bg-earth-800 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-earth-200 dark:bg-earth-700 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-earth-500 dark:text-earth-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-earth-900 dark:text-earth-100 truncate">
                        {getPersonDisplayName(person)}
                      </p>
                      {person.house && (
                        <span className={clsx('inline-block text-xs px-1.5 py-0.5 rounded mt-0.5', houseColorClasses[houseColor])}>
                          {person.house}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
