'use client';

import { useState, useMemo } from 'react';
import { User, Search, Filter, ChevronDown } from 'lucide-react';
import { getAllPeopleArray, getPersonDisplayName, getHouseColor, getChildrenOfPerson, getSpousesOfPerson } from '@/data/familyData';
import { Person, HouseName } from '@/types';
import { useFamilyStore } from '@/store/familyStore';
import { ProfileModal } from '@/components/ProfileModal';
import { people } from '@/data/familyData';
import clsx from 'clsx';

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterHouse, setFilterHouse] = useState<string>('all');
  const [filterGender, setFilterGender] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'house'>('name');

  const { selectedPersonId, isModalOpen, openModal, closeModal } = useFamilyStore();
  const selectedPerson = selectedPersonId ? people[selectedPersonId] : null;

  const allPeople = useMemo(() => getAllPeopleArray(), []);

  const filteredPeople = useMemo(() => {
    let result = allPeople;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => {
        const name = `${p.firstName} ${p.lastName || ''} ${p.nickname || ''}`.toLowerCase();
        return name.includes(q);
      });
    }

    if (filterHouse !== 'all') {
      result = result.filter(p => p.house === filterHouse);
    }

    if (filterGender !== 'all') {
      result = result.filter(p => p.gender === filterGender);
    }

    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.firstName.localeCompare(b.firstName);
      }
      return (a.house || '').localeCompare(b.house || '');
    });

    return result;
  }, [allPeople, searchQuery, filterHouse, filterGender, sortBy]);

  const houseColorMap: Record<string, { bg: string; text: string; dot: string }> = {
    amber: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500' },
    cyan: { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-700 dark:text-cyan-400', dot: 'bg-cyan-500' },
    violet: { bg: 'bg-violet-100 dark:bg-violet-900/30', text: 'text-violet-700 dark:text-violet-400', dot: 'bg-violet-500' },
    stone: { bg: 'bg-stone-100 dark:bg-stone-900/30', text: 'text-stone-700 dark:text-stone-400', dot: 'bg-stone-500' },
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-earth-950">
      {/* Header */}
      <div className="bg-white dark:bg-earth-900 border-b border-earth-200 dark:border-earth-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-earth-900 dark:text-earth-100">
            People Directory
          </h1>
          <p className="text-sm sm:text-base text-earth-600 dark:text-earth-400 mt-1 sm:mt-2">
            Browse all {allPeople.length} members of the Arap Taa family
          </p>

          {/* Search & Filters */}
          <div className="mt-4 sm:mt-6 flex flex-col gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
                className="w-full pl-10 pr-4 py-3 bg-earth-50 dark:bg-earth-800 border border-earth-200 dark:border-earth-700 rounded-xl text-earth-900 dark:text-earth-100 placeholder:text-earth-400 outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
              />
            </div>

            <select
              value={filterHouse}
              onChange={(e) => setFilterHouse(e.target.value)}
              className="px-4 py-3 bg-earth-50 dark:bg-earth-800 border border-earth-200 dark:border-earth-700 rounded-xl text-earth-900 dark:text-earth-100 outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Houses</option>
              <option value="Bot Evaline">Bot Evaline</option>
              <option value="Bot Jonah">Bot Jonah</option>
              <option value="Bot Samson">Bot Samson</option>
            </select>

            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="px-4 py-3 bg-earth-50 dark:bg-earth-800 border border-earth-200 dark:border-earth-700 rounded-xl text-earth-900 dark:text-earth-100 outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
      </div>

      {/* People Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-earth-500 dark:text-earth-400 mb-6">
          Showing {filteredPeople.length} of {allPeople.length} family members
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredPeople.map((person) => {
            const houseColor = getHouseColor(person.house);
            const colors = houseColorMap[houseColor] || houseColorMap.stone;
            const children = getChildrenOfPerson(person.id);
            const spouses = getSpousesOfPerson(person.id);

            return (
              <button
                key={person.id}
                onClick={() => openModal(person.id)}
                className="flex items-start gap-4 p-4 bg-white dark:bg-earth-900 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group hover:-translate-y-0.5"
              >
                <div className={clsx(
                  'w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0',
                  person.gender === 'male' 
                    ? 'bg-gradient-to-br from-blue-400 to-blue-600'
                    : 'bg-gradient-to-br from-pink-400 to-pink-600'
                )}>
                  <User className="w-7 h-7 text-white" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-earth-900 dark:text-earth-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {getPersonDisplayName(person)}
                  </h3>
                  
                  {person.house && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className={clsx('w-2 h-2 rounded-full', colors.dot)} />
                      <span className={clsx('text-xs', colors.text)}>{person.house}</span>
                    </div>
                  )}

                  <div className="flex gap-3 mt-2 text-xs text-earth-500 dark:text-earth-400">
                    {children.length > 0 && (
                      <span>{children.length} {children.length === 1 ? 'child' : 'children'}</span>
                    )}
                    {spouses.length > 0 && (
                      <span>{spouses.length} {spouses.length === 1 ? 'spouse' : 'spouses'}</span>
                    )}
                  </div>

                  {(person.isPatriarch || person.isMatriarch) && (
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                      {person.isPatriarch ? 'Patriarch' : 'Matriarch'}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {filteredPeople.length === 0 && (
          <div className="text-center py-16">
            <User className="w-16 h-16 mx-auto text-earth-300 dark:text-earth-600 mb-4" />
            <h3 className="text-lg font-semibold text-earth-700 dark:text-earth-300">No results found</h3>
            <p className="text-earth-500 dark:text-earth-400 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {isModalOpen && selectedPerson && (
        <ProfileModal person={selectedPerson} onClose={closeModal} />
      )}
    </div>
  );
}
