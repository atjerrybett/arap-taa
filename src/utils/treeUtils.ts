import { Person, HouseName } from '@/types';
import { people, parentChildRelations } from '@/data/familyData';

export function getAncestorsOfPerson(personId: string): Person[] {
  const ancestors: Person[] = [];
  const visited = new Set<string>();

  function traverse(id: string) {
    if (visited.has(id)) return;
    visited.add(id);

    const parentRels = parentChildRelations.filter(rel => rel.childId === id);
    parentRels.forEach(rel => {
      const parent = people[rel.parentId];
      if (parent) {
        ancestors.push(parent);
        traverse(parent.id);
      }
    });
  }

  traverse(personId);
  return ancestors;
}

export function getDescendantsOfPerson(personId: string): Person[] {
  const descendants: Person[] = [];
  const visited = new Set<string>();

  function traverse(id: string) {
    if (visited.has(id)) return;
    visited.add(id);

    const childRels = parentChildRelations.filter(rel => rel.parentId === id);
    childRels.forEach(rel => {
      const child = people[rel.childId];
      if (child) {
        descendants.push(child);
        traverse(child.id);
      }
    });
  }

  traverse(personId);
  return descendants;
}

export function getGenerationLevel(personId: string): number {
  let level = 0;
  const ancestors = getAncestorsOfPerson(personId);
  
  // Simple heuristic: count ancestors
  if (ancestors.length === 0) return 1; // Root/patriarch level
  if (ancestors.length <= 1) return 2;
  if (ancestors.length <= 3) return 3;
  if (ancestors.length <= 7) return 4;
  return 5;
}

export function getPeopleByHouse(house: HouseName): Person[] {
  return Object.values(people).filter(p => p.house === house);
}

export function getHouseStats(house: HouseName): {
  name: HouseName;
  memberCount: number;
  generationCount: number;
} {
  const members = getPeopleByHouse(house);
  const generations = new Set(members.map(m => getGenerationLevel(m.id)));

  return {
    name: house,
    memberCount: members.length,
    generationCount: generations.size,
  };
}

export function searchFamilyTree(query: string): {
  people: Person[];
  connections: Array<{ personId: string; relationType: string }>;
} {
  const lowerQuery = query.toLowerCase();
  const foundPeople = Object.values(people).filter(p => {
    const fullName = `${p.firstName} ${p.lastName || ''} ${p.nickname || ''}`.toLowerCase();
    return fullName.includes(lowerQuery);
  });

  const connections: Array<{ personId: string; relationType: string }> = [];
  foundPeople.forEach(person => {
    // Find ancestors
    const ancestors = getAncestorsOfPerson(person.id);
    ancestors.forEach(ancestor => {
      connections.push({ personId: ancestor.id, relationType: 'ancestor' });
    });

    // Find descendants
    const descendants = getDescendantsOfPerson(person.id);
    descendants.forEach(descendant => {
      connections.push({ personId: descendant.id, relationType: 'descendant' });
    });
  });

  return { people: foundPeople, connections };
}

export const TREE_STATS = {
  totalMembers: Object.keys(people).length,
  houses: ['Bot Evaline', 'Bot Jonah', 'Bot Samson'],
  maxGenerations: 5,
};
