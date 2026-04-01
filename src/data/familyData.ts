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
    clan: 'Kipchoge',
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
    clan: 'Kipchoge',
    isMatriarch: true,
    house: 'Bot Evaline',
    bio: 'First wife of Arap Taa and matriarch of the House of Bot Evaline. Her descendants form the most extensively documented branch of the family.',
  },
  'bot-jonah': {
    id: 'bot-jonah',
    firstName: 'Bot',
    lastName: 'Jonah',
    gender: 'female',
    clan: 'Kipchoge',
    isMatriarch: true,
    house: 'Bot Jonah',
    bio: 'Second wife of Arap Taa and matriarch of the House of Bot Jonah.',
  },
  'bot-samson': {
    id: 'bot-samson',
    firstName: 'Bot',
    lastName: 'Samson',
    gender: 'female',
    clan: 'Kipchoge',
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
    clan: 'Kibomwek',
    house: 'Bot Evaline',
    bio: 'Eldest daughter of Arap Taa and Bot Evaline. Known affectionately as Lesebet, she raised a large family of eight children.',
  },
  'samuel-nyolei': {
    id: 'samuel-nyolei',
    firstName: 'Samuel',
    lastName: 'Nyolei',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Son of Arap Taa and Bot Evaline.',
  },
  'daniel-nyolei': {
    id: 'daniel-nyolei',
    firstName: 'Daniel',
    lastName: 'Nyolei',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Son of Arap Taa and Bot Evaline. Father of seven children: Thomas, Henry, Emily, Betty, Patrick, Frederick, and Chebet.',
  },

  // DANIEL NYOLEI'S WIFE
  'spouse-daniel': {
    id: 'spouse-daniel',
    firstName: '[Wife of Daniel]',
    lastName: 'Nyolei',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Wife of Daniel Nyolei. Mother of Thomas, Henry, Emily, Betty, Patrick, Frederick, and Chebet.',
  },

  // CHILDREN OF DANIEL NYOLEI (Generation 3)
  'thomas-nyolei': {
    id: 'thomas-nyolei',
    firstName: 'Thomas',
    lastName: 'Nyolei',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'First born of Daniel and [Wife of Daniel] Nyolei. Father of three children.',
  },
  'henry-nyolei': {
    id: 'henry-nyolei',
    firstName: 'Henry',
    lastName: 'Nyolei',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Son of Daniel and [Wife of Daniel] Nyolei. Father of four children.',
  },
  'emily-nyolei': {
    id: 'emily-nyolei',
    firstName: 'Emily',
    lastName: 'Nyolei',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Daughter of Daniel and [Wife of Daniel] Nyolei. Mother of four children.',
  },
  'betty-nyolei': {
    id: 'betty-nyolei',
    firstName: 'Betty',
    lastName: 'Nyolei',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Daughter of Daniel and [Wife of Daniel] Nyolei. Mother of three children.',
  },
  'patrick-tonui': {
    id: 'patrick-tonui',
    firstName: 'Patrick',
    lastName: 'Tonui',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Son of Daniel and [Wife of Daniel] Nyolei. Father of three children.',
  },
  'frederick-tonui': {
    id: 'frederick-tonui',
    firstName: 'Frederick',
    lastName: 'Tonui',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Son of Daniel and [Wife of Daniel] Nyolei. Father of two children.',
  },
  'chebet-nyolei': {
    id: 'chebet-nyolei',
    firstName: 'Chebet',
    lastName: 'Nyolei',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Last born of Daniel and [Wife of Daniel] Nyolei. Mother of two children.',
  },

  // SPOUSES OF DANIEL'S CHILDREN (Generation 3 spouses)
  'spouse-thomas': {
    id: 'spouse-thomas',
    firstName: '[Wife of Thomas]',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Wife of Thomas Nyolei.',
  },
  'spouse-henry': {
    id: 'spouse-henry',
    firstName: '[Wife of Henry]',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Wife of Henry Nyolei.',
  },
  'spouse-emily': {
    id: 'spouse-emily',
    firstName: '[Husband of Emily]',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Husband of Emily Nyolei.',
  },
  'spouse-patrick': {
    id: 'spouse-patrick',
    firstName: '[Wife of Patrick]',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Wife of Patrick Tonui.',
  },
  'spouse-frederick': {
    id: 'spouse-frederick',
    firstName: '[Wife of Frederick]',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Wife of Frederick Tonui.',
  },

  // GRANDCHILDREN OF DANIEL NYOLEI (Generation 4)
  // Thomas's 3 children
  'thomas-child-1': {
    id: 'thomas-child-1',
    firstName: '[Child 1]',
    lastName: 'Nyolei',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Thomas Nyolei.',
  },
  'thomas-child-2': {
    id: 'thomas-child-2',
    firstName: '[Child 2]',
    lastName: 'Nyolei',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Thomas Nyolei.',
  },
  'thomas-child-3': {
    id: 'thomas-child-3',
    firstName: '[Child 3]',
    lastName: 'Nyolei',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Thomas Nyolei.',
  },

  // Henry's 4 children
  'henry-child-1': {
    id: 'henry-child-1',
    firstName: '[Child 1]',
    lastName: 'Nyolei',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Henry Nyolei.',
  },
  'henry-child-2': {
    id: 'henry-child-2',
    firstName: '[Child 2]',
    lastName: 'Nyolei',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Henry Nyolei.',
  },
  'henry-child-3': {
    id: 'henry-child-3',
    firstName: '[Child 3]',
    lastName: 'Nyolei',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Henry Nyolei.',
  },
  'henry-child-4': {
    id: 'henry-child-4',
    firstName: '[Child 4]',
    lastName: 'Nyolei',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Henry Nyolei.',
  },

  // Emily's 4 children
  'emily-child-1': {
    id: 'emily-child-1',
    firstName: '[Child 1]',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Emily Nyolei.',
  },
  'emily-child-2': {
    id: 'emily-child-2',
    firstName: '[Child 2]',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Emily Nyolei.',
  },
  'emily-child-3': {
    id: 'emily-child-3',
    firstName: '[Child 3]',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Emily Nyolei.',
  },
  'emily-child-4': {
    id: 'emily-child-4',
    firstName: '[Child 4]',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Emily Nyolei.',
  },

  // Betty's 3 children
  'betty-n-child-1': {
    id: 'betty-n-child-1',
    firstName: '[Child 1]',
    lastName: 'Nyolei',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Betty Nyolei.',
  },
  'betty-n-child-2': {
    id: 'betty-n-child-2',
    firstName: '[Child 2]',
    lastName: 'Nyolei',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Betty Nyolei.',
  },
  'betty-n-child-3': {
    id: 'betty-n-child-3',
    firstName: '[Child 3]',
    lastName: 'Nyolei',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Betty Nyolei.',
  },

  // Patrick's 3 children
  'patrick-child-1': {
    id: 'patrick-child-1',
    firstName: '[Child 1]',
    lastName: 'Tonui',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Patrick Tonui.',
  },
  'patrick-child-2': {
    id: 'patrick-child-2',
    firstName: '[Child 2]',
    lastName: 'Tonui',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Patrick Tonui.',
  },
  'patrick-child-3': {
    id: 'patrick-child-3',
    firstName: '[Child 3]',
    lastName: 'Tonui',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Patrick Tonui.',
  },

  // Frederick's 2 children
  'frederick-child-1': {
    id: 'frederick-child-1',
    firstName: '[Child 1]',
    lastName: 'Tonui',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Frederick Tonui.',
  },
  'frederick-child-2': {
    id: 'frederick-child-2',
    firstName: '[Child 2]',
    lastName: 'Tonui',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Frederick Tonui.',
  },

  // Chebet's 2 children
  'chebet-child-1': {
    id: 'chebet-child-1',
    firstName: '[Child 1]',
    gender: 'male',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Chebet Nyolei.',
  },
  'chebet-child-2': {
    id: 'chebet-child-2',
    firstName: '[Child 2]',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Child of Chebet Nyolei.',
  },

  // HOUSE OF BOT EVALINE - GENERATION 3 (Children of Elizabeth)
  'pauline': {
    id: 'pauline',
    firstName: 'Pauline',
    gender: 'female',
    clan: 'Kibomwek',
    house: 'Bot Evaline',
    bio: 'Eldest child of Elizabeth (Lesebet).',
  },
  'roselynne': {
    id: 'roselynne',
    firstName: 'Roselynne',
    gender: 'female',
    clan: 'Kibomwek',
    house: 'Bot Evaline',
    bio: 'Daughter of Elizabeth (Lesebet).',
  },
  'paul': {
    id: 'paul',
    firstName: 'Paul',
    gender: 'male',
    clan: 'Kibomwek',
    house: 'Bot Evaline',
    bio: 'Son of Elizabeth (Lesebet).',
  },
  'betsy': {
    id: 'betsy',
    firstName: 'Betsy',
    gender: 'female',
    clan: 'Kibomwek',
    house: 'Bot Evaline',
    bio: 'Daughter of Elizabeth (Lesebet). Married Willy and together they have five children: Gibson, Jerry, Valerie, Ian, and Joy.',
  },
  'peter': {
    id: 'peter',
    firstName: 'Peter',
    gender: 'male',
    clan: 'Kibomwek',
    house: 'Bot Evaline',
    bio: 'Son of Elizabeth (Lesebet).',
  },
  'simon': {
    id: 'simon',
    firstName: 'Simon',
    gender: 'male',
    clan: 'Kibomwek',
    house: 'Bot Evaline',
    bio: 'Son of Elizabeth (Lesebet).',
  },
  'vincent': {
    id: 'vincent',
    firstName: 'Vincent',
    gender: 'male',
    clan: 'Kibomwek',
    house: 'Bot Evaline',
    bio: 'Son of Elizabeth (Lesebet).',
  },
  'connie': {
    id: 'connie',
    firstName: 'Connie',
    gender: 'female',
    clan: 'Kibomwek',
    house: 'Bot Evaline',
    bio: 'Youngest daughter of Elizabeth (Lesebet).',
  },

  // SPOUSES - GENERATION 3
  'willy': {
    id: 'willy',
    firstName: 'Willy',
    gender: 'male',
    clan: 'Kabarangwek',
    house: 'Bot Evaline',
    bio: 'Husband of Betsy. Father of Gibson, Jerry, Valerie, Ian, and Joy.',
  },

  // HOUSE OF BOT EVALINE - GENERATION 4 (Children of Betsy & Willy)
  'gibson': {
    id: 'gibson',
    firstName: 'Gibson',
    gender: 'male',
    clan: 'Kabarangwek',
    house: 'Bot Evaline',
    bio: 'Eldest child of Betsy and Willy.',
  },
  'jerry': {
    id: 'jerry',
    firstName: 'Jerry',
    gender: 'male',
    clan: 'Kabarangwek',
    house: 'Bot Evaline',
    birthDate: '1990-03-15',
    birthPlace: 'Nairobi, Kenya',
    occupation: 'Software Developer',
    education: 'BSc Computer Science',
    email: 'jerry@example.com',
    phone: '+254 712 345 678',
    isLiving: true,
    bio: 'Son of Betsy and Willy. The creator and maintainer of the Arap Taa Family Legacy application. Passionate about preserving family history through technology.',
    achievements: [
      'Created the Arap Taa Family Legacy digital archive',
      'Implemented advanced family tree visualization',
      'Developed relationship calculator for the family',
    ],
    photoUrls: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    ],
  },
  'valerie': {
    id: 'valerie',
    firstName: 'Valerie',
    gender: 'female',
    clan: 'Kabarangwek',
    house: 'Bot Evaline',
    bio: 'Daughter of Betsy and Willy. Married Karanja and together they have two children: Malkia and Malcolm.',
  },
  'ian': {
    id: 'ian',
    firstName: 'Ian',
    gender: 'male',
    clan: 'Kabarangwek',
    house: 'Bot Evaline',
    bio: 'Son of Betsy and Willy.',
  },
  'joy': {
    id: 'joy',
    firstName: 'Joy',
    gender: 'female',
    clan: 'Kabarangwek',
    house: 'Bot Evaline',
    bio: 'Youngest child of Betsy and Willy.',
  },

  // SPOUSES - GENERATION 4
  'karanja': {
    id: 'karanja',
    firstName: 'Karanja',
    gender: 'male',
    clan: 'Kikuyu',
    house: 'Bot Evaline',
    bio: 'Husband of Valerie. Father of Malkia and Malcolm.',
  },

  // HOUSE OF BOT EVALINE - GENERATION 5 (Children of Valerie & Karanja)
  'malkia': {
    id: 'malkia',
    firstName: 'Malkia',
    gender: 'female',
    clan: 'Kipchoge',
    house: 'Bot Evaline',
    bio: 'Daughter of Valerie and Karanja. Great-great-great-granddaughter of Arap Taa.',
  },
  'malcolm': {
    id: 'malcolm',
    firstName: 'Malcolm',
    gender: 'male',
    clan: 'Kipchoge',
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

  // Daniel Nyolei & Wife's marriage
  {
    id: 'marriage-daniel-nyolei',
    spouse1Id: 'daniel-nyolei',
    spouse2Id: 'spouse-daniel',
    isActive: true,
    childrenIds: ['thomas-nyolei', 'henry-nyolei', 'emily-nyolei', 'betty-nyolei', 'patrick-tonui', 'frederick-tonui', 'chebet-nyolei'],
  },

  // Thomas Nyolei & Wife
  {
    id: 'marriage-thomas-nyolei',
    spouse1Id: 'thomas-nyolei',
    spouse2Id: 'spouse-thomas',
    isActive: true,
    childrenIds: ['thomas-child-1', 'thomas-child-2', 'thomas-child-3'],
  },

  // Henry Nyolei & Wife
  {
    id: 'marriage-henry-nyolei',
    spouse1Id: 'henry-nyolei',
    spouse2Id: 'spouse-henry',
    isActive: true,
    childrenIds: ['henry-child-1', 'henry-child-2', 'henry-child-3', 'henry-child-4'],
  },

  // Emily Nyolei & Husband
  {
    id: 'marriage-emily-nyolei',
    spouse1Id: 'emily-nyolei',
    spouse2Id: 'spouse-emily',
    isActive: true,
    childrenIds: ['emily-child-1', 'emily-child-2', 'emily-child-3', 'emily-child-4'],
  },

  // Patrick Tonui & Wife
  {
    id: 'marriage-patrick-tonui',
    spouse1Id: 'patrick-tonui',
    spouse2Id: 'spouse-patrick',
    isActive: true,
    childrenIds: ['patrick-child-1', 'patrick-child-2', 'patrick-child-3'],
  },

  // Frederick Tonui & Wife
  {
    id: 'marriage-frederick-tonui',
    spouse1Id: 'frederick-tonui',
    spouse2Id: 'spouse-frederick',
    isActive: true,
    childrenIds: ['frederick-child-1', 'frederick-child-2'],
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

  // Daniel Nyolei & Wife's children
  { parentId: 'daniel-nyolei', childId: 'thomas-nyolei', relationship: 'biological' },
  { parentId: 'daniel-nyolei', childId: 'henry-nyolei', relationship: 'biological' },
  { parentId: 'daniel-nyolei', childId: 'emily-nyolei', relationship: 'biological' },
  { parentId: 'daniel-nyolei', childId: 'betty-nyolei', relationship: 'biological' },
  { parentId: 'daniel-nyolei', childId: 'patrick-tonui', relationship: 'biological' },
  { parentId: 'daniel-nyolei', childId: 'frederick-tonui', relationship: 'biological' },
  { parentId: 'daniel-nyolei', childId: 'chebet-nyolei', relationship: 'biological' },
  { parentId: 'spouse-daniel', childId: 'thomas-nyolei', relationship: 'biological' },
  { parentId: 'spouse-daniel', childId: 'henry-nyolei', relationship: 'biological' },
  { parentId: 'spouse-daniel', childId: 'emily-nyolei', relationship: 'biological' },
  { parentId: 'spouse-daniel', childId: 'betty-nyolei', relationship: 'biological' },
  { parentId: 'spouse-daniel', childId: 'patrick-tonui', relationship: 'biological' },
  { parentId: 'spouse-daniel', childId: 'frederick-tonui', relationship: 'biological' },
  { parentId: 'spouse-daniel', childId: 'chebet-nyolei', relationship: 'biological' },

  // Thomas Nyolei's children
  { parentId: 'thomas-nyolei', childId: 'thomas-child-1', relationship: 'biological' },
  { parentId: 'thomas-nyolei', childId: 'thomas-child-2', relationship: 'biological' },
  { parentId: 'thomas-nyolei', childId: 'thomas-child-3', relationship: 'biological' },
  { parentId: 'spouse-thomas', childId: 'thomas-child-1', relationship: 'biological' },
  { parentId: 'spouse-thomas', childId: 'thomas-child-2', relationship: 'biological' },
  { parentId: 'spouse-thomas', childId: 'thomas-child-3', relationship: 'biological' },

  // Henry Nyolei's children
  { parentId: 'henry-nyolei', childId: 'henry-child-1', relationship: 'biological' },
  { parentId: 'henry-nyolei', childId: 'henry-child-2', relationship: 'biological' },
  { parentId: 'henry-nyolei', childId: 'henry-child-3', relationship: 'biological' },
  { parentId: 'henry-nyolei', childId: 'henry-child-4', relationship: 'biological' },
  { parentId: 'spouse-henry', childId: 'henry-child-1', relationship: 'biological' },
  { parentId: 'spouse-henry', childId: 'henry-child-2', relationship: 'biological' },
  { parentId: 'spouse-henry', childId: 'henry-child-3', relationship: 'biological' },
  { parentId: 'spouse-henry', childId: 'henry-child-4', relationship: 'biological' },

  // Emily Nyolei's children
  { parentId: 'emily-nyolei', childId: 'emily-child-1', relationship: 'biological' },
  { parentId: 'emily-nyolei', childId: 'emily-child-2', relationship: 'biological' },
  { parentId: 'emily-nyolei', childId: 'emily-child-3', relationship: 'biological' },
  { parentId: 'emily-nyolei', childId: 'emily-child-4', relationship: 'biological' },
  { parentId: 'spouse-emily', childId: 'emily-child-1', relationship: 'biological' },
  { parentId: 'spouse-emily', childId: 'emily-child-2', relationship: 'biological' },
  { parentId: 'spouse-emily', childId: 'emily-child-3', relationship: 'biological' },
  { parentId: 'spouse-emily', childId: 'emily-child-4', relationship: 'biological' },

  // Betty Nyolei's children (no spouse)
  { parentId: 'betty-nyolei', childId: 'betty-n-child-1', relationship: 'biological' },
  { parentId: 'betty-nyolei', childId: 'betty-n-child-2', relationship: 'biological' },
  { parentId: 'betty-nyolei', childId: 'betty-n-child-3', relationship: 'biological' },

  // Patrick Tonui's children
  { parentId: 'patrick-tonui', childId: 'patrick-child-1', relationship: 'biological' },
  { parentId: 'patrick-tonui', childId: 'patrick-child-2', relationship: 'biological' },
  { parentId: 'patrick-tonui', childId: 'patrick-child-3', relationship: 'biological' },
  { parentId: 'spouse-patrick', childId: 'patrick-child-1', relationship: 'biological' },
  { parentId: 'spouse-patrick', childId: 'patrick-child-2', relationship: 'biological' },
  { parentId: 'spouse-patrick', childId: 'patrick-child-3', relationship: 'biological' },

  // Frederick Tonui's children
  { parentId: 'frederick-tonui', childId: 'frederick-child-1', relationship: 'biological' },
  { parentId: 'frederick-tonui', childId: 'frederick-child-2', relationship: 'biological' },
  { parentId: 'spouse-frederick', childId: 'frederick-child-1', relationship: 'biological' },
  { parentId: 'spouse-frederick', childId: 'frederick-child-2', relationship: 'biological' },

  // Chebet Nyolei's children (no spouse)
  { parentId: 'chebet-nyolei', childId: 'chebet-child-1', relationship: 'biological' },
  { parentId: 'chebet-nyolei', childId: 'chebet-child-2', relationship: 'biological' },
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
// GENERIC PATH-FINDING (BFS)
// ==========================================

/**
 * Find the shortest path between any two people in the family tree.
 * Traverses parent-child and spouse relationships bidirectionally.
 */
export function findPathBetween(fromId: string, toId: string): string[] {
  if (fromId === toId) return [fromId];
  if (!people[fromId] || !people[toId]) return [];

  // Build adjacency list from parent-child relationships
  const adjacency: Record<string, Set<string>> = {};

  const addEdge = (a: string, b: string) => {
    if (!adjacency[a]) adjacency[a] = new Set();
    if (!adjacency[b]) adjacency[b] = new Set();
    adjacency[a].add(b);
    adjacency[b].add(a);
  };

  // Parent-child edges (bidirectional)
  parentChildRelations.forEach(rel => {
    if (people[rel.parentId] && people[rel.childId]) {
      addEdge(rel.parentId, rel.childId);
    }
  });

  // Spouse edges (bidirectional)
  marriages.forEach(m => {
    if (m.spouse1Id && m.spouse2Id && people[m.spouse1Id] && people[m.spouse2Id]) {
      addEdge(m.spouse1Id, m.spouse2Id);
    }
  });

  // BFS
  const queue: string[][] = [[fromId]];
  const visited = new Set<string>([fromId]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const current = path[path.length - 1];

    const neighbors = adjacency[current] || new Set();
    for (const neighbor of neighbors) {
      if (neighbor === toId) {
        return [...path, neighbor];
      }
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }

  return []; // No path found
}

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
