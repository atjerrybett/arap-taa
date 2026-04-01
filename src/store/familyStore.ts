import { create } from 'zustand';
import { HouseName } from '@/types';
import { pathToMalcolm, findPathBetween, people } from '@/data/familyData';

interface FamilyStore {
  // Selection state
  selectedPersonId: string | null;
  setSelectedPersonId: (id: string | null) => void;

  // Modal state
  isModalOpen: boolean;
  openModal: (personId: string) => void;
  closeModal: () => void;

  // Path highlight state
  highlightedPath: string[];
  highlightedTargetId: string | null;
  setHighlightedPath: (path: string[]) => void;
  highlightPathTo: (targetId: string) => void;
  highlightPathToMalcolm: () => void;
  clearHighlight: () => void;

  // House expansion state
  expandedHouses: HouseName[];
  toggleHouse: (house: HouseName) => void;
  expandHouse: (house: HouseName) => void;
  collapseHouse: (house: HouseName) => void;

  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Expanded nodes in tree
  expandedNodes: Set<string>;
  toggleNode: (nodeId: string) => void;
  expandNode: (nodeId: string) => void;
  collapseNode: (nodeId: string) => void;
}

export const useFamilyStore = create<FamilyStore>((set, get) => ({
  // Selection
  selectedPersonId: null,
  setSelectedPersonId: (id) => set({ selectedPersonId: id }),

  // Modal
  isModalOpen: false,
  openModal: (personId) => set({ selectedPersonId: personId, isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  // Path highlight
  highlightedPath: [],
  highlightedTargetId: null,
  setHighlightedPath: (path) => set({ highlightedPath: path }),
  highlightPathTo: (targetId) => {
    const path = findPathBetween('arap-taa', targetId);
    
    // Auto-expand houses that contain people in the path
    const housesInPath = new Set<HouseName>();
    path.forEach(personId => {
      const person = people[personId];
      if (person?.house) {
        housesInPath.add(person.house as HouseName);
      }
    });
    
    // Auto-expand nodes in the path
    const nodesToExpand = new Set(path);
    
    set((state) => {
      const newExpandedHouses = [...state.expandedHouses];
      housesInPath.forEach(house => {
        if (!newExpandedHouses.includes(house)) {
          newExpandedHouses.push(house);
        }
      });
      
      const newExpandedNodes = new Set(state.expandedNodes);
      nodesToExpand.forEach(nodeId => newExpandedNodes.add(nodeId));
      
      return {
        highlightedPath: path,
        highlightedTargetId: targetId,
        expandedHouses: newExpandedHouses,
        expandedNodes: newExpandedNodes
      };
    });
  },
  highlightPathToMalcolm: () => {
    // Auto-expand for Malcolm's path too
    const path = pathToMalcolm;
    const housesInPath = new Set<HouseName>();
    path.forEach(personId => {
      const person = people[personId];
      if (person?.house) {
        housesInPath.add(person.house as HouseName);
      }
    });
    
    const nodesToExpand = new Set(path);
    
    set((state) => {
      const newExpandedHouses = [...state.expandedHouses];
      housesInPath.forEach(house => {
        if (!newExpandedHouses.includes(house)) {
          newExpandedHouses.push(house);
        }
      });
      
      const newExpandedNodes = new Set(state.expandedNodes);
      nodesToExpand.forEach(nodeId => newExpandedNodes.add(nodeId));
      
      return {
        highlightedPath: pathToMalcolm,
        highlightedTargetId: 'malcolm',
        expandedHouses: newExpandedHouses,
        expandedNodes: newExpandedNodes
      };
    });
  },
  clearHighlight: () => set({ highlightedPath: [], highlightedTargetId: null }),

  // House expansion
  expandedHouses: ['Bot Evaline'] as HouseName[],
  toggleHouse: (house) => set((state) => ({
    expandedHouses: state.expandedHouses.includes(house)
      ? state.expandedHouses.filter(h => h !== house)
      : [...state.expandedHouses, house]
  })),
  expandHouse: (house) => set((state) => ({
    expandedHouses: state.expandedHouses.includes(house)
      ? state.expandedHouses
      : [...state.expandedHouses, house]
  })),
  collapseHouse: (house) => set((state) => ({
    expandedHouses: state.expandedHouses.filter(h => h !== house)
  })),

  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Node expansion
  expandedNodes: new Set(['arap-taa', 'bot-evaline', 'elizabeth', 'betsy', 'valerie']),
  toggleNode: (nodeId) => set((state) => {
    const newSet = new Set(state.expandedNodes);
    if (newSet.has(nodeId)) {
      newSet.delete(nodeId);
    } else {
      newSet.add(nodeId);
    }
    return { expandedNodes: newSet };
  }),
  expandNode: (nodeId) => set((state) => {
    const newSet = new Set(state.expandedNodes);
    newSet.add(nodeId);
    return { expandedNodes: newSet };
  }),
  collapseNode: (nodeId) => set((state) => {
    const newSet = new Set(state.expandedNodes);
    newSet.delete(nodeId);
    return { expandedNodes: newSet };
  }),
}));
