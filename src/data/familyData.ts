import { FamilyData, Person, Marriage, ParentChild, HouseData } from '@/types';

// ==========================================
// PEOPLE DATA
// ==========================================

export const people: Record<string, Person> = {
  // PATRIARCH
  'arap-taa': {
    id: 'arap-taa',
    firstName: 'Arap',
    lastName: 'Taa',
    gender: 'male',
    isPatriarch: true,
    bio: 'The founding patriarch of the Arap Taa family legacy. A respected elder whose lineage continues to grow and thrive across generations.',
    occupation: 'Family Patriarch',
  },

  // THREE WIVES (MATRIARCHS)
  'bot-evaline': {
    id: 'bot-evaline',
    firstName: 'Bot',
    lastName: 'Evaline',
    gender: 'female',
    isMatriarch: true,
    house: 'Bot Evaline',
    bio: 'First wife of Arap Taa and matriarch of the House of Bot Evaline. Her descendants form the most extensively documented branch of the family.',
  },
  'bot-jonah': {
    id: 'bot-jonah',
    firstName: 'Bot',
    lastName: 'Jonah',
    gender: 'female',
    isMatriarch: true,
    house: 'Bot Jonah',
    bio: 'Second wife of Arap Taa and matriarch of the House of Bot Jonah.',
  },
  'bot-samson': {
    id: 'bot-samson',
    firstName: 'Bot',
    lastName: 'Samson',
    gender: 'female',
    isMatriarch: true,
    house: 'Bot Samson',
    bio: 'Third wife of Arap Taa and matriarch of the House of Bot Samson.',
  },

  // HOUSE OF BOT EVALINE - GENERATION 2 (Children of Arap Taa & Bot Evaline)
  'elizabeth': {
    id: 'elizabeth',
    firstName: 'Elizabeth',
    nickname: 'Lesebet',
    gender: 'female',
    house: 'Bot Evaline',
    bio: 'Eldest daughter of Arap Taa and Bot Evaline. Known affectionately as Lesebet, she raised a large family of eight children.',
  },
  'samuel-nyolei': {
    id: 'samuel-nyolei',
    firstName: 'Samuel',
    lastName: 'Nyolei',
    gender: 'male',
    house: 'Bot Evaline',
    bio: 'Son of Arap Taa and Bot Evaline.',
  },
  'daniel-nyolei': {
    id: 'daniel-nyolei',
    firstName: 'Daniel',
    lastName: 'Nyolei',
    gender: 'male',
    house: 'Bot Evaline',
    bio: 'Son of Arap Taa and Bot Evaline.',
  },

  // HOUSE OF BOT EVALINE - GENERATION 3 (Children of Elizabeth)
  'pauline': {
    id: 'pauline',
    firstName: 'Pauline',
    gender: 'female',
    house: 'Bot Evaline',
    bio: 'Eldest child of Elizabeth (Lesebet).',
  },
  'roselynne': {
    id: 'roselynne',
    firstName: 'Roselynne',
    gender: 'female',
    house: 'Bot Evaline',
    bio: 'Daughter of Elizabeth (Lesebet).',
  },
  'paul': {
    id: 'paul',
    firstName: 'Paul',
    gender: 'male',
    house: 'Bot Evaline',
    bio: 'Son of Elizabeth (Lesebet).',
  },
  'betsy': {
    id: 'betsy',
    firstName: 'Betsy',
    gender: 'female',
    house: 'Bot Evaline',
    bio: 'Daughter of Elizabeth (Lesebet). Married Willy and together they have five children: Gibson, Jerry, Valerie, Ian, and Joy.',
  },
  'peter': {
    id: 'peter',
    firstName: 'Peter',
    gender: 'male',
    house: 'Bot Evaline',
    bio: 'Son of Elizabeth (Lesebet).',
  },
  'simon': {
    id: 'simon',
    firstName: 'Simon',
    gender: 'male',
    house: 'Bot Evaline',
    bio: 'Son of Elizabeth (Lesebet).',
  },
  'vincent': {
    id: 'vincent',
    firstName: 'Vincent',
    gender: 'male',
    house: 'Bot Evaline',
    bio: 'Son of Elizabeth (Lesebet).',
  },
  'connie': {
    id: 'connie',
    firstName: 'Connie',
    gender: 'female',
    house: 'Bot Evaline',
    bio: 'Youngest daughter of Elizabeth (Lesebet).',
  },

  // SPOUSES - GENERATION 3
  'willy': {
    id: 'willy',
    firstName: 'Willy',
    gender: 'male',
    house: 'Bot Evaline',
    bio: 'Husband of Betsy. Father of Gibson, Jerry, Valerie, Ian, and Joy.',
  },

  // HOUSE OF BOT EVALINE - GENERATION 4 (Children of Betsy & Willy)
  'gibson': {
    id: 'gibson',
    firstName: 'Gibson',
    gender: 'male',
    house: 'Bot Evaline',
    bio: 'Eldest child of Betsy and Willy.',
  },
  'jerry': {
    id: 'jerry',
    firstName: 'Jerry',
    gender: 'male',
    house: 'Bot Evaline',
    bio: 'Son of Betsy and Willy. The creator and maintainer of the Arap Taa Family Legacy application.',
    achievements: ['Created the Arap Taa Family Legacy digital archive'],
  },
  'valerie': {
    id: 'valerie',
    firstName: 'Valerie',
    gender: 'female',
    house: 'Bot Evaline',
    bio: 'Daughter of Betsy and Willy. Married Karanja and together they have two children: Malkia and Malcolm.',
  },
  'ian': {
    id: 'ian',
    firstName: 'Ian',
    gender: 'male',
    house: 'Bot Evaline',
    bio: 'Son of Betsy and Willy.',
  },
  'joy': {
    id: 'joy',
    firstName: 'Joy',
    gender: 'female',
    house: 'Bot Evaline',
    bio: 'Youngest child of Betsy and Willy.',
  },

  // SPOUSES - GENERATION 4
  'karanja': {
    id: 'karanja',
    firstName: 'Karanja',
    gender: 'male',
    house: 'Bot Evaline',
    bio: 'Husband of Valerie. Father of Malkia and Malcolm.',
  },

  // HOUSE OF BOT EVALINE - GENERATION 5 (Children of Valerie & Karanja)
  'malkia': {
    id: 'malkia',
    firstName: 'Malkia',
    gender: 'female',
    house: 'Bot Evaline',
    bio: 'Daughter of Valerie and Karanja. Great-great-great-granddaughter of Arap Taa.',
  },
  'malcolm': {
    id: 'malcolm',
    firstName: 'Malcolm',
    gender: 'male',
    house: 'Bot Evaline',
    bio: 'Son of Valerie and Karanja. Great-great-great-grandson of Arap Taa, representing the newest generation of the family legacy.',
  },
};

// ==========================================
// MARRIAGES DATA
// ==========================================

export const marriages: Marriage[] = [
  // Arap Taa's marriages
  {
    id: 'marriage-arap-taa-evaline',
    spouse1Id: 'arap-taa',
    spouse2Id: 'bot-evaline',
    house: 'Bot Evaline',
    isActive: true,
    childrenIds: ['elizabeth', 'samuel-nyolei', 'daniel-nyolei'],
  },
  {
    id: 'marriage-arap-taa-jonah',
    spouse1Id: 'arap-taa',
    spouse2Id: 'bot-jonah',
    house: 'Bot Jonah',
    isActive: true,
    childrenIds: [],
  },
  {
    id: 'marriage-arap-taa-samson',
    spouse1Id: 'arap-taa',
    spouse2Id: 'bot-samson',
    house: 'Bot Samson',
    isActive: true,
    childrenIds: [],
  },

  // Elizabeth's marriage (spouse unknown, children listed)
  {
    id: 'marriage-elizabeth',
    spouse1Id: 'elizabeth',
    spouse2Id: '',
    isActive: true,
    childrenIds: ['pauline', 'roselynne', 'paul', 'betsy', 'peter', 'simon', 'vincent', 'connie'],
  },

  // Betsy & Willy's marriage
  {
    id: 'marriage-betsy-willy',
    spouse1Id: 'betsy',
    spouse2Id: 'willy',
    isActive: true,
    childrenIds: ['gibson', 'jerry', 'valerie', 'ian', 'joy'],
  },

  // Valerie & Karanja's marriage
  {
    id: 'marriage-valerie-karanja',
    spouse1Id: 'valerie',
    spouse2Id: 'karanja',
    isActive: true,
    childrenIds: ['malkia', 'malcolm'],
  },
];

// ==========================================
// PARENT-CHILD RELATIONSHIPS
// ==========================================

export const parentChildRelations: ParentChild[] = [
  // Arap Taa & Bot Evaline's children
  { parentId: 'arap-taa', childId: 'elizabeth', relationship: 'biological' },
  { parentId: 'arap-taa', childId: 'samuel-nyolei', relationship: 'biological' },
  { parentId: 'arap-taa', childId: 'daniel-nyolei', relationship: 'biological' },
  { parentId: 'bot-evaline', childId: 'elizabeth', relationship: 'biological' },
  { parentId: 'bot-evaline', childId: 'samuel-nyolei', relationship: 'biological' },
  { parentId: 'bot-evaline', childId: 'daniel-nyolei', relationship: 'biological' },

  // Elizabeth's children
  { parentId: 'elizabeth', childId: 'pauline', relationship: 'biological' },
  { parentId: 'elizabeth', childId: 'roselynne', relationship: 'biological' },
  { parentId: 'elizabeth', childId: 'paul', relationship: 'biological' },
  { parentId: 'elizabeth', childId: 'betsy', relationship: 'biological' },
  { parentId: 'elizabeth', childId: 'peter', relationship: 'biological' },
  { parentId: 'elizabeth', childId: 'simon', relationship: 'biological' },
  { parentId: 'elizabeth', childId: 'vincent', relationship: 'biological' },
  { parentId: 'elizabeth', childId: 'connie', relationship: 'biological' },

  // Betsy & Willy's children
  { parentId: 'betsy', childId: 'gibson', relationship: 'biological' },
  { parentId: 'betsy', childId: 'jerry', relationship: 'biological' },
  { parentId: 'betsy', childId: 'valerie', relationship: 'biological' },
  { parentId: 'betsy', childId: 'ian', relationship: 'biological' },
  { parentId: 'betsy', childId: 'joy', relationship: 'biological' },
  { parentId: 'willy', childId: 'gibson', relationship: 'biological' },
  { parentId: 'willy', childId: 'jerry', relationship: 'biological' },
  { parentId: 'willy', childId: 'valerie', relationship: 'biological' },
  { parentId: 'willy', childId: 'ian', relationship: 'biological' },
  { parentId: 'willy', childId: 'joy', relationship: 'biological' },

  // Valerie & Karanja's children
  { parentId: 'valerie', childId: 'malkia', relationship: 'biological' },
  { parentId: 'valerie', childId: 'malcolm', relationship: 'biological' },
  { parentId: 'karanja', childId: 'malkia', relationship: 'biological' },
  { parentId: 'karanja', childId: 'malcolm', relationship: 'biological' },
];

// ==========================================
// HOUSE DATA
// ==========================================

export const houses: HouseData[] = [
  {
    name: 'Bot Evaline',
    matriarch: people['bot-evaline'],
    color: 'amber',
    accentColor: '#d97706',
    description: 'The most documented lineage, tracing through Elizabeth (Lesebet) down to the newest generation.',
    isExpanded: true,
  },
  {
    name: 'Bot Jonah',
    matriarch: people['bot-jonah'],
    color: 'cyan',
    accentColor: '#0891b2',
    description: 'The second house of the Arap Taa family.',
    isExpanded: false,
  },
  {
    name: 'Bot Samson',
    matriarch: people['bot-samson'],
    color: 'violet',
    accentColor: '#7c3aed',
    description: 'The third house of the Arap Taa family.',
    isExpanded: false,
  },
];

// ==========================================
// COMBINED FAMILY DATA
// ==========================================

export const familyData: FamilyData = {
  people,
  marriages,
  parentChild: parentChildRelations,
};

// ==========================================
// PATH TO MALCOLM (Highlight Feature)
// ==========================================

export const pathToMalcolm = [
  'arap-taa',
  'bot-evaline',
  'elizabeth',
  'betsy',
  'valerie',
  'malcolm',
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export function getPersonById(id: string): Person | undefined {
  return people[id];
}

export function getChildrenOfPerson(personId: string): Person[] {
  const childIds = parentChildRelations
    .filter(rel => rel.parentId === personId)
    .map(rel => rel.childId);
  return childIds.map(id => people[id]).filter(Boolean);
}

export function getParentsOfPerson(personId: string): Person[] {
  const parentIds = parentChildRelations
    .filter(rel => rel.childId === personId)
    .map(rel => rel.parentId);
  return parentIds.map(id => people[id]).filter(Boolean);
}

export function getSpousesOfPerson(personId: string): Person[] {
  const spouseIds: string[] = [];
  marriages.forEach(m => {
    if (m.spouse1Id === personId && m.spouse2Id) spouseIds.push(m.spouse2Id);
    if (m.spouse2Id === personId && m.spouse1Id) spouseIds.push(m.spouse1Id);
  });
  return spouseIds.map(id => people[id]).filter(Boolean);
}

export function getMarriagesOfPerson(personId: string): Marriage[] {
  return marriages.filter(m => m.spouse1Id === personId || m.spouse2Id === personId);
}

export function getSiblingsOfPerson(personId: string): Person[] {
  const parents = getParentsOfPerson(personId);
  if (parents.length === 0) return [];
  
  const siblingIds = new Set<string>();
  parents.forEach(parent => {
    const children = getChildrenOfPerson(parent.id);
    children.forEach(child => {
      if (child.id !== personId) siblingIds.add(child.id);
    });
  });
  
  return Array.from(siblingIds).map(id => people[id]).filter(Boolean);
}

export function getAllPeopleArray(): Person[] {
  return Object.values(people);
}

export function searchPeople(query: string): Person[] {
  const lowerQuery = query.toLowerCase();
  return getAllPeopleArray().filter(person => {
    const fullName = `${person.firstName} ${person.lastName || ''} ${person.nickname || ''}`.toLowerCase();
    return fullName.includes(lowerQuery);
  });
}

export function getPersonDisplayName(person: Person): string {
  if (person.nickname) {
    return `${person.firstName} (${person.nickname})`;
  }
  return person.lastName ? `${person.firstName} ${person.lastName}` : person.firstName;
}

export function getHouseColor(house?: string): string {
  switch (house) {
    case 'Bot Evaline': return 'amber';
    case 'Bot Jonah': return 'cyan';
    case 'Bot Samson': return 'violet';
    default: return 'stone';
  }
}
