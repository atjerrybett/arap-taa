'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, User } from 'lucide-react';
import { searchPeople, getPersonDisplayName, getHouseColor } from '@/data/familyData';
import { Person } from '@/types';
import { useFamilyStore } from '@/store/familyStore';
import { useRouter } from 'next/navigation';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Person[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { openModal } = useFamilyStore();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchPeople(query));
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // Toggle search - this would need to be handled by parent
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSelect = (person: Person) => {
    onClose();
    setQuery('');
    openModal(person.id);
  };

  if (!isOpen) return null;

  const houseColorClasses: Record<string, string> = {
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
    violet: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400',
    stone: 'bg-stone-100 text-stone-800 dark:bg-stone-900/30 dark:text-stone-400',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center pt-[5vh] sm:pt-[10vh] px-3 sm:px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-forest-950/50 modal-backdrop"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-sm sm:max-w-lg bg-white dark:bg-forest-900 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-forest-200 dark:border-forest-700">
          <Search className="w-5 h-5 text-forest-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search family members..."
            className="flex-1 bg-transparent outline-none text-forest-900 dark:text-forest-100 placeholder:text-forest-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-forest-100 dark:hover:bg-forest-800 transition-colors"
          >
            <X className="w-5 h-5 text-forest-400" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-forest-500 dark:text-forest-400">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Start typing to search family members</p>
              <p className="text-sm mt-1 text-forest-400">Press ESC to close</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-forest-500 dark:text-forest-400">
              <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No family members found for &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <ul className="p-2">
              {results.map((person) => {
                const houseColor = getHouseColor(person.house);
                return (
                  <li key={person.id}>
                    <button
                      onClick={() => handleSelect(person)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-forest-100 dark:hover:bg-forest-800 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-forest-200 dark:bg-forest-700 flex items-center justify-center">
                        <User className="w-5 h-5 text-forest-500 dark:text-forest-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-forest-900 dark:text-forest-100 truncate">
                          {getPersonDisplayName(person)}
                        </p>
                        {person.house && (
                          <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${houseColorClasses[houseColor]}`}>
                            {person.house}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
