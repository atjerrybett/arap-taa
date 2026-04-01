'use client';

import { X, User, Calendar, MapPin, Briefcase, Users, Heart, Baby, Crown, Mail, Phone, GraduationCap, Award, Link2, ImageIcon, CalendarDays } from 'lucide-react';
import { Person } from '@/types';
import { 
  getPersonDisplayName, 
  getParentsOfPerson, 
  getSpousesOfPerson, 
  getChildrenOfPerson,
  getSiblingsOfPerson,
  getHouseColor,
  people 
} from '@/data/familyData';
import { useFamilyStore } from '@/store/familyStore';
import { calculateRelationship } from '@/utils/relationshipCalculator';
import { getEventsForDay, MONTH_NAMES } from '@/utils/calendarUtils';
import { useState } from 'react';

interface ProfileModalProps {
  person: Person;
  onClose: () => void;
  referencePersonId?: string;
}

export function ProfileModal({ person, onClose, referencePersonId }: ProfileModalProps) {
  const { openModal, referencePersonId: storeReferenceId } = useFamilyStore();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  
  // Use store reference person if not explicitly provided
  const effectiveReferenceId = referencePersonId || storeReferenceId;

  // Helper function to format dates
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid
    
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };
  
  const parents = getParentsOfPerson(person.id);
  const spouses = getSpousesOfPerson(person.id);
  const children = getChildrenOfPerson(person.id);
  const siblings = getSiblingsOfPerson(person.id);

  // Calculate relationship to reference person
  const relationship = calculateRelationship(effectiveReferenceId, person.id);
  const referencePerson = people[effectiveReferenceId];

  const houseColor = getHouseColor(person.house);
  
  // Get all photos
  const allPhotos = person.photoUrls && person.photoUrls.length > 0 
    ? person.photoUrls 
    : person.photoUrl 
      ? [person.photoUrl] 
      : [];
  
  // Calculate age if birth date is available
  const getAge = () => {
    if (!person.birthDate) return null;
    const birth = new Date(person.birthDate);
    const end = person.deathDate ? new Date(person.deathDate) : new Date();
    let age = end.getFullYear() - birth.getFullYear();
    const monthDiff = end.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = getAge();
  
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
              {person.firstName} {person.lastName}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {person.house && (
                <span className={`inline-block text-sm px-3 py-1 rounded-full ${colors.light} ${colors.text}`}>
                  {person.house}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {/* Relationship Badge */}
          {relationship && relationship.relationship !== 'Self' && (
            <div className="mb-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <div>
                  <p className="text-xs font-medium text-amber-900 dark:text-amber-300">
                    Relationship to {getPersonDisplayName(referencePerson)}
                  </p>
                  <p className="text-sm font-bold text-amber-700 dark:text-amber-400">{relationship.relationship}</p>
                  <p className="text-xs text-amber-600 dark:text-amber-500 mt-0.5">{relationship.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Bio */}
          {person.bio && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-earth-900 dark:text-earth-100 mb-2">About</h3>
              <p className="text-earth-700 dark:text-earth-300 leading-relaxed">
                {person.bio}
              </p>
            </div>
          )}

          {/* Life Summary */}
          {(age !== null || person.isLiving === false) && (
            <div className="mb-6 p-3 rounded-xl bg-earth-50 dark:bg-earth-800">
              <p className="text-sm text-earth-700 dark:text-earth-300">
                {person.isLiving === false || person.deathDate ? (
                  <>Lived {age !== null && `${age} years`}{person.birthDate && person.deathDate && ` (${person.birthDate} - ${person.deathDate})`}</>
                ) : (
                  <>Age {age !== null && `${age} years`}{person.birthDate && ` (Born ${person.birthDate})`}</>
                )}
              </p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
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
            {person.clan && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-earth-50 dark:bg-earth-800">
                <Crown className="w-5 h-5 text-earth-400" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-earth-500 dark:text-earth-400">Clan</p>
                  <p className="text-sm font-medium text-earth-900 dark:text-earth-100 truncate">{person.clan}</p>
                </div>
              </div>
            )}
            {person.deathPlace && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-earth-50 dark:bg-earth-800">
                <MapPin className="w-5 h-5 text-earth-400" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-earth-500 dark:text-earth-400">Death Place</p>
                  <p className="text-sm font-medium text-earth-900 dark:text-earth-100 truncate">{person.deathPlace}</p>
                </div>
              </div>
            )}
            {person.education && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-earth-50 dark:bg-earth-800">
                <GraduationCap className="w-5 h-5 text-earth-400" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-earth-500 dark:text-earth-400">Education</p>
                  <p className="text-sm font-medium text-earth-900 dark:text-earth-100 truncate">{person.education}</p>
                </div>
              </div>
            )}
            {person.email && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-earth-50 dark:bg-earth-800">
                <Mail className="w-5 h-5 text-earth-400" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-earth-500 dark:text-earth-400">Email</p>
                  <a href={`mailto:${person.email}`} className="text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline truncate block">
                    {person.email}
                  </a>
                </div>
              </div>
            )}
            {person.phone && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-earth-50 dark:bg-earth-800">
                <Phone className="w-5 h-5 text-earth-400" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-earth-500 dark:text-earth-400">Phone</p>
                  <a href={`tel:${person.phone}`} className="text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline truncate block">
                    {person.phone}
                  </a>
                </div>
              </div>
            )}
            {person.nickname && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-earth-50 dark:bg-earth-800">
                <User className="w-5 h-5 text-earth-400" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-earth-500 dark:text-earth-400">Nickname</p>
                  <p className="text-sm font-medium text-earth-900 dark:text-earth-100 truncate">"{person.nickname}"</p>
                </div>
              </div>
            )}
          </div>

          {/* Achievements */}
          {person.achievements && person.achievements.length > 0 && (
            <div className="mb-6">
              <h3 className="flex items-center gap-2 font-semibold text-earth-900 dark:text-earth-100 mb-3">
                <Award className="w-4 h-4" />
                Achievements
              </h3>
              <ul className="space-y-2">
                {person.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-earth-700 dark:text-earth-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Photo Gallery */}
          {allPhotos.length > 0 && (
            <div className="mb-6">
              <h3 className="flex items-center gap-2 font-semibold text-earth-900 dark:text-earth-100 mb-3">
                <ImageIcon className="w-4 h-4" />
                Photos ({allPhotos.length})
              </h3>
              <div className="space-y-3">
                {/* Main Photo */}
                <div className="aspect-video rounded-xl overflow-hidden bg-earth-100 dark:bg-earth-800">
                  <img 
                    src={allPhotos[activePhotoIndex]} 
                    alt={`${person.firstName} - Photo ${activePhotoIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Thumbnails */}
                {allPhotos.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {allPhotos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setActivePhotoIndex(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          index === activePhotoIndex 
                            ? 'border-amber-500 scale-95' 
                            : 'border-transparent hover:border-earth-300 dark:hover:border-earth-600'
                        }`}
                      >
                        <img 
                          src={photo} 
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Important Dates & Events */}
          {(person.birthDate || person.deathDate || (person.events && person.events.length > 0)) && (
            <div className="mb-6">
              <h3 className="flex items-center gap-2 font-semibold text-earth-900 dark:text-earth-100 mb-3">
                <CalendarDays className="w-4 h-4" />
                Important Dates
              </h3>
              <div className="space-y-2">
                {person.birthDate && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-earth-50 dark:bg-earth-800">
                    <Calendar className="w-4 h-4 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-earth-900 dark:text-earth-100">Birthday</p>
                      <p className="text-xs text-earth-600 dark:text-earth-400">{formatDate(person.birthDate)}</p>
                    </div>
                  </div>
                )}
                {person.deathDate && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-earth-50 dark:bg-earth-800">
                    <Calendar className="w-4 h-4 text-earth-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-earth-900 dark:text-earth-100">Passed Away</p>
                      <p className="text-xs text-earth-600 dark:text-earth-400">{formatDate(person.deathDate)}</p>
                    </div>
                  </div>
                )}
                {person.events && person.events.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-earth-50 dark:bg-earth-800">
                    <Calendar className="w-4 h-4 text-amber-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-earth-900 dark:text-earth-100">{event.title}</p>
                      <p className="text-xs text-earth-600 dark:text-earth-400">{formatDate(event.date)}</p>
                      {event.description && (
                        <p className="text-xs text-earth-500 dark:text-earth-400 mt-1">{event.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
