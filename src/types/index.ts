// ==========================================
// FAMILY TREE DATA TYPES
// ==========================================

export type Gender = 'male' | 'female' | 'other';

export type HouseName = 'Bot Evaline' | 'Bot Jonah' | 'Bot Samson';

export type EventType = 'birthday' | 'wedding' | 'anniversary' | 'death' | 'graduation' | 'achievement' | 'other';

export interface FamilyEvent {
  id: string;
  personId: string;
  type: EventType;
  title: string;
  date: string; // YYYY-MM-DD format
  description?: string;
  isRecurring?: boolean; // For birthdays, anniversaries
}

export interface Person {
  id: string;
  firstName: string;
  lastName?: string;
  nickname?: string;
  gender: Gender;
  birthDate?: string;
  deathDate?: string;
  birthPlace?: string;
  deathPlace?: string;
  clan?: string;
  bio?: string;
  photoUrl?: string;
  photoUrls?: string[];
  isPatriarch?: boolean;
  isMatriarch?: boolean;
  house?: HouseName;
  occupation?: string;
  achievements?: string[];
  education?: string;
  email?: string;
  phone?: string;
  isLiving?: boolean;
  events?: FamilyEvent[];
}

export interface Marriage {
  id: string;
  spouse1Id: string;
  spouse2Id: string;
  marriageDate?: string;
  house?: HouseName;
  isActive: boolean;
  childrenIds: string[];
}

export interface ParentChild {
  parentId: string;
  childId: string;
  relationship: 'biological' | 'adopted' | 'step';
}

export interface FamilyData {
  people: Record<string, Person>;
  marriages: Marriage[];
  parentChild: ParentChild[];
}

// Tree visualization types
export interface TreeNode {
  person: Person;
  spouses: Person[];
  children: TreeNode[];
  marriages: Marriage[];
  level: number;
  house?: HouseName;
}

export interface HouseData {
  name: HouseName;
  matriarch: Person;
  color: string;
  accentColor: string;
  description?: string;
  isExpanded: boolean;
}

// UI State types
export interface AppState {
  selectedPersonId: string | null;
  highlightedPath: string[];
  expandedHouses: HouseName[];
  searchQuery: string;
  isModalOpen: boolean;
}

// Path highlight types
export interface PathSegment {
  fromId: string;
  toId: string;
  relationship: 'parent' | 'child' | 'spouse';
}
