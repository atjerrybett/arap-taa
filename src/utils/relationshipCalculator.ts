import { Person } from '@/types';
import { 
  people, 
  getParentsOfPerson, 
  getChildrenOfPerson,
  findPathBetween 
} from '@/data/familyData';

export interface RelationshipResult {
  relationship: string;
  description: string;
  distance: number;
}

/**
 * Calculate the relationship between two people
 */
export function calculateRelationship(person1Id: string, person2Id: string): RelationshipResult | null {
  if (person1Id === person2Id) {
    return {
      relationship: 'Self',
      description: 'This is you!',
      distance: 0
    };
  }

  const person1 = people[person1Id];
  const person2 = people[person2Id];

  if (!person1 || !person2) return null;

  // Check direct relationships first
  const directRelation = checkDirectRelationship(person1Id, person2Id);
  if (directRelation) return directRelation;

  // Check for common ancestors (cousins, etc.)
  const cousinRelation = checkCousinRelationship(person1Id, person2Id);
  if (cousinRelation) return cousinRelation;

  // If no specific relationship found, calculate via common ancestor
  const path = findPathBetween(person1Id, person2Id);
  if (path.length > 0) {
    return {
      relationship: 'Distant Relative',
      description: `Connected through ${path.length - 1} generation${path.length - 1 === 1 ? '' : 's'}`,
      distance: path.length - 1
    };
  }

  return null;
}

/**
 * Check if two people have a direct relationship (parent, child, sibling, spouse)
 */
function checkDirectRelationship(person1Id: string, person2Id: string): RelationshipResult | null {
  // Check if parent-child
  const person1Children = getChildrenOfPerson(person1Id);
  if (person1Children.some(c => c.id === person2Id)) {
    return {
      relationship: 'Child',
      description: `${people[person2Id].firstName} is your child`,
      distance: 1
    };
  }

  const person1Parents = getParentsOfPerson(person1Id);
  if (person1Parents.some(p => p.id === person2Id)) {
    return {
      relationship: 'Parent',
      description: `${people[person2Id].firstName} is your parent`,
      distance: 1
    };
  }

  // Check if siblings
  const siblings = getSiblings(person1Id);
  if (siblings.some(s => s === person2Id)) {
    return {
      relationship: 'Sibling',
      description: `${people[person2Id].firstName} is your sibling`,
      distance: 1
    };
  }

  // Check grandparent/grandchild
  const grandchildren = getGrandchildren(person1Id);
  if (grandchildren.includes(person2Id)) {
    return {
      relationship: 'Grandchild',
      description: `${people[person2Id].firstName} is your grandchild`,
      distance: 2
    };
  }

  const grandparents = getGrandparents(person1Id);
  if (grandparents.includes(person2Id)) {
    return {
      relationship: 'Grandparent',
      description: `${people[person2Id].firstName} is your grandparent`,
      distance: 2
    };
  }

  // Check aunt/uncle, niece/nephew
  const auntUncle = getAuntsUncles(person1Id);
  if (auntUncle.includes(person2Id)) {
    return {
      relationship: 'Aunt/Uncle',
      description: `${people[person2Id].firstName} is your aunt or uncle`,
      distance: 2
    };
  }

  const nieceNephew = getNiecesNephews(person1Id);
  if (nieceNephew.includes(person2Id)) {
    return {
      relationship: 'Niece/Nephew',
      description: `${people[person2Id].firstName} is your niece or nephew`,
      distance: 2
    };
  }

  return null;
}

/**
 * Check cousin relationships
 */
function checkCousinRelationship(person1Id: string, person2Id: string): RelationshipResult | null {
  const commonAncestors = findCommonAncestors(person1Id, person2Id);
  
  if (commonAncestors.length === 0) return null;

  // Find the closest common ancestor
  let closestAncestor = commonAncestors[0];
  let minDistance = Infinity;

  for (const ancestor of commonAncestors) {
    const dist1 = getGenerationDistance(ancestor, person1Id);
    const dist2 = getGenerationDistance(ancestor, person2Id);
    const totalDist = dist1 + dist2;
    
    if (totalDist < minDistance) {
      minDistance = totalDist;
      closestAncestor = ancestor;
    }
  }

  const dist1 = getGenerationDistance(closestAncestor, person1Id);
  const dist2 = getGenerationDistance(closestAncestor, person2Id);

  // First cousins: both are 2 generations from common ancestor
  // Second cousins: both are 3 generations from common ancestor
  // "Once removed" means one generation difference

  const minGen = Math.min(dist1, dist2);
  const maxGen = Math.max(dist1, dist2);
  const removed = maxGen - minGen;

  if (minGen === 2 && removed === 0) {
    return {
      relationship: '1st Cousin',
      description: `${people[person2Id].firstName} is your first cousin`,
      distance: 3
    };
  }

  if (minGen === 3 && removed === 0) {
    return {
      relationship: '2nd Cousin',
      description: `${people[person2Id].firstName} is your second cousin`,
      distance: 4
    };
  }

  if (minGen === 4 && removed === 0) {
    return {
      relationship: '3rd Cousin',
      description: `${people[person2Id].firstName} is your third cousin`,
      distance: 5
    };
  }

  if (minGen === 2 && removed === 1) {
    return {
      relationship: '1st Cousin Once Removed',
      description: `${people[person2Id].firstName} is your first cousin once removed`,
      distance: 3
    };
  }

  if (minGen === 3 && removed === 1) {
    return {
      relationship: '2nd Cousin Once Removed',
      description: `${people[person2Id].firstName} is your second cousin once removed`,
      distance: 4
    };
  }

  const cousinDegree = minGen - 2;
  const removedText = removed > 0 ? ` ${removed === 1 ? 'Once' : removed === 2 ? 'Twice' : removed + ' Times'} Removed` : '';
  
  return {
    relationship: `${getOrdinal(cousinDegree)} Cousin${removedText}`,
    description: `${people[person2Id].firstName} is your ${getOrdinal(cousinDegree).toLowerCase()} cousin${removedText.toLowerCase()}`,
    distance: minGen + 1
  };
}

/**
 * Helper functions
 */
function getSiblings(personId: string): string[] {
  const parents = getParentsOfPerson(personId);
  const siblings = new Set<string>();
  
  for (const parent of parents) {
    const children = getChildrenOfPerson(parent.id);
    for (const child of children) {
      if (child.id !== personId) {
        siblings.add(child.id);
      }
    }
  }
  
  return Array.from(siblings);
}

function getGrandchildren(personId: string): string[] {
  const children = getChildrenOfPerson(personId);
  const grandchildren: string[] = [];
  
  for (const child of children) {
    const childChildren = getChildrenOfPerson(child.id);
    grandchildren.push(...childChildren.map(c => c.id));
  }
  
  return grandchildren;
}

function getGrandparents(personId: string): string[] {
  const parents = getParentsOfPerson(personId);
  const grandparents: string[] = [];
  
  for (const parent of parents) {
    const parentParents = getParentsOfPerson(parent.id);
    grandparents.push(...parentParents.map(p => p.id));
  }
  
  return grandparents;
}

function getAuntsUncles(personId: string): string[] {
  const parents = getParentsOfPerson(personId);
  const auntsUncles: string[] = [];
  
  for (const parent of parents) {
    const siblings = getSiblings(parent.id);
    auntsUncles.push(...siblings);
  }
  
  return auntsUncles;
}

function getNiecesNephews(personId: string): string[] {
  const siblings = getSiblings(personId);
  const niecesNephews: string[] = [];
  
  for (const sibling of siblings) {
    const children = getChildrenOfPerson(sibling);
    niecesNephews.push(...children.map(c => c.id));
  }
  
  return niecesNephews;
}

function findCommonAncestors(person1Id: string, person2Id: string): string[] {
  const ancestors1 = getAllAncestors(person1Id);
  const ancestors2 = getAllAncestors(person2Id);
  
  return ancestors1.filter(a => ancestors2.includes(a));
}

function getAllAncestors(personId: string): string[] {
  const ancestors = new Set<string>();
  const queue = [personId];
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    const parents = getParentsOfPerson(current);
    
    for (const parent of parents) {
      if (!ancestors.has(parent.id)) {
        ancestors.add(parent.id);
        queue.push(parent.id);
      }
    }
  }
  
  return Array.from(ancestors);
}

function getGenerationDistance(ancestorId: string, descendantId: string): number {
  if (ancestorId === descendantId) return 0;
  
  let distance = 0;
  const queue: Array<{ id: string; dist: number }> = [{ id: ancestorId, dist: 0 }];
  const visited = new Set<string>();
  
  while (queue.length > 0) {
    const { id, dist } = queue.shift()!;
    
    if (id === descendantId) {
      return dist;
    }
    
    if (visited.has(id)) continue;
    visited.add(id);
    
    const children = getChildrenOfPerson(id);
    for (const child of children) {
      queue.push({ id: child.id, dist: dist + 1 });
    }
  }
  
  return Infinity;
}

function getOrdinal(n: number): string {
  if (n === 1) return '1st';
  if (n === 2) return '2nd';
  if (n === 3) return '3rd';
  return `${n}th`;
}
