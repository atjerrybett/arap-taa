'use client';

import { X, User, Calendar, MapPin, Briefcase, Users, Heart, Baby } from 'lucide-react';
import { Person } from '@/types';
import { 
  getPersonDisplayName, 
  getParentsOfPerson, 
  getSpousesOfPerson, 
  getChildrenOfPerson,
  getSiblingsOfPerson,
  getHouseColor 
} from '@/data/familyData';
import { useFamilyStore } from '@/store/familyStore';

interface ProfileModalProps {
  person: Person;
  onClose: () => void;
}

export function ProfileModal({ person, onClose }: ProfileModalProps) {
  const { openModal } = useFamilyStore();
  
  const parents = getParentsOfPerson(person.id);
  const spouses = getSpousesOfPerson(person.id);
  const children = getChildrenOfPerson(person.id);
  const siblings = getSiblingsOfPerson(person.id);

  const houseColor = getHouseColor(person.house);
  
  const colorClasses: Record<string, { bg: string; border: string; text: string; light: string }> = {
    amber: {
      bg: 'bg-amber-500',
      border: 'border-amber-500',
      text: 'text-amber-600 dark:text-amber-400',
      light: 'bg-amber-100 dark:bg-amber-900/30',
    },
    cyan: {
      bg: 'bg-cyan-500',
      border: 'border-cyan-500',
      text: 'text-cyan-600 dark:text-cyan-400',
      light: 'bg-cyan-100 dark:bg-cyan-900/30',
    },
    violet: {
      bg: 'bg-violet-500',
      border: 'border-violet-500',
      text: 'text-violet-600 dark:text-violet-400',
      light: 'bg-violet-100 dark:bg-violet-900/30',
    },
    stone: {
      bg: 'bg-stone-500',
      border: 'border-stone-500',
      text: 'text-stone-600 dark:text-stone-400',
      light: 'bg-stone-100 dark:bg-stone-900/30',
    },
  };

  const colors = colorClasses[houseColor] || colorClasses.stone;

  const handlePersonClick = (p: Person) => {
    openModal(p.id);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-earth-950/60 modal-backdrop"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] bg-white dark:bg-earth-900 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className={`relative h-32 ${colors.light}`}>
          <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-earth-900`} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-earth-800/80 hover:bg-white dark:hover:bg-earth-800 transition-colors"
          >
            <X className="w-5 h-5 text-earth-600 dark:text-earth-300" />
          </button>
        </div>

        {/* Profile Picture & Name */}
        <div className="relative px-6 -mt-16">
          <div className={`w-24 h-24 rounded-full ${colors.bg} flex items-center justify-center border-4 border-white dark:border-earth-900 shadow-lg`}>
            {person.photoUrl ? (
              <img src={person.photoUrl} alt={person.firstName} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-white" />
            )}
          </div>
          
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-earth-900 dark:text-earth-100">
              {getPersonDisplayName(person)}
            </h2>
            {person.house && (
              <span className={`inline-block text-sm px-3 py-1 rounded-full mt-2 ${colors.light} ${colors.text}`}>
                {person.house}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-220px)] sm:max-h-[calc(90vh-200px)]">
          {/* Bio */}
          {person.bio && (
            <p className="text-earth-700 dark:text-earth-300 leading-relaxed mb-6">
              {person.bio}
            </p>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {person.birthDate && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-earth-50 dark:bg-earth-800">
                <Calendar className="w-5 h-5 text-earth-400" />
                <div>
                  <p className="text-xs text-earth-500 dark:text-earth-400">Born</p>
                  <p className="text-sm font-medium text-earth-900 dark:text-earth-100">{person.birthDate}</p>
                </div>
              </div>
            )}
            {person.deathDate && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-earth-50 dark:bg-earth-800">
                <Calendar className="w-5 h-5 text-earth-400" />
                <div>
                  <p className="text-xs text-earth-500 dark:text-earth-400">Passed</p>
                  <p className="text-sm font-medium text-earth-900 dark:text-earth-100">{person.deathDate}</p>
                </div>
              </div>
            )}
            {person.birthPlace && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-earth-50 dark:bg-earth-800">
                <MapPin className="w-5 h-5 text-earth-400" />
                <div>
                  <p className="text-xs text-earth-500 dark:text-earth-400">Birthplace</p>
                  <p className="text-sm font-medium text-earth-900 dark:text-earth-100">{person.birthPlace}</p>
                </div>
              </div>
            )}
            {person.occupation && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-earth-50 dark:bg-earth-800">
                <Briefcase className="w-5 h-5 text-earth-400" />
                <div>
                  <p className="text-xs text-earth-500 dark:text-earth-400">Occupation</p>
                  <p className="text-sm font-medium text-earth-900 dark:text-earth-100">{person.occupation}</p>
                </div>
              </div>
            )}
          </div>

          {/* Relationships */}
          <div className="space-y-4">
            {/* Parents */}
            {parents.length > 0 && (
              <RelationshipSection
                title="Parents"
                icon={<Users className="w-4 h-4" />}
                people={parents}
                onPersonClick={handlePersonClick}
              />
            )}

            {/* Spouses */}
            {spouses.length > 0 && (
              <RelationshipSection
                title="Spouse(s)"
                icon={<Heart className="w-4 h-4" />}
                people={spouses}
                onPersonClick={handlePersonClick}
              />
            )}

            {/* Children */}
            {children.length > 0 && (
              <RelationshipSection
                title="Children"
                icon={<Baby className="w-4 h-4" />}
                people={children}
                onPersonClick={handlePersonClick}
              />
            )}

            {/* Siblings */}
            {siblings.length > 0 && (
              <RelationshipSection
                title="Siblings"
                icon={<Users className="w-4 h-4" />}
                people={siblings}
                onPersonClick={handlePersonClick}
              />
            )}
          </div>

          {/* Photo Album Placeholder */}
          <div className="mt-6">
            <h3 className="font-semibold text-earth-900 dark:text-earth-100 mb-3">Photo Album</h3>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="aspect-square rounded-lg bg-earth-100 dark:bg-earth-800 flex items-center justify-center"
                >
                  <User className="w-6 h-6 text-earth-300 dark:text-earth-600" />
                </div>
              ))}
            </div>
            <p className="text-xs text-earth-400 mt-2 text-center">Photos coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RelationshipSectionProps {
  title: string;
  icon: React.ReactNode;
  people: Person[];
  onPersonClick: (person: Person) => void;
}

function RelationshipSection({ title, icon, people, onPersonClick }: RelationshipSectionProps) {
  return (
    <div>
      <h3 className="flex items-center gap-2 font-semibold text-earth-900 dark:text-earth-100 mb-2">
        {icon}
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {people.map((person) => (
          <button
            key={person.id}
            onClick={() => onPersonClick(person)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-earth-100 dark:bg-earth-800 hover:bg-earth-200 dark:hover:bg-earth-700 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-earth-300 dark:bg-earth-600 flex items-center justify-center">
              <User className="w-3 h-3 text-earth-600 dark:text-earth-300" />
            </div>
            <span className="text-sm text-earth-700 dark:text-earth-300">
              {getPersonDisplayName(person)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
