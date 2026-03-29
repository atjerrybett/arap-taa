'use client';

import { useCallback } from 'react';
import { pathToMalcolm, getPersonById } from '@/data/familyData';

export function usePathHighlight() {
  const highlightPathToMalcolm = useCallback(() => {
    return pathToMalcolm;
  }, []);

  const isPersonInPath = useCallback((personId: string, path: string[]) => {
    return path.includes(personId);
  }, []);

  return {
    highlightPathToMalcolm,
    isPersonInPath,
  };
}

export function usePersonRelations(personId: string) {
  const person = getPersonById(personId);

  const getRelationshipLabel = useCallback((otherPersonId: string): string => {
    if (!person) return '';
    
    // This could be expanded with actual relationship checking logic
    return 'Family Member';
  }, [person]);

  return {
    person,
    getRelationshipLabel,
  };
}
