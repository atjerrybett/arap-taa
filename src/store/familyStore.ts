import { create } from 'zustand';
import { HouseName } from '@/types';
import { pathToMalcolm } from '@/data/familyData';

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
  setHighlightedPath: (path: string[]) => void;
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
  setHighlightedPath: (path) => set({ highlightedPath: path }),
  highlightPathToMalcolm: () => set({ highlightedPath: pathToMalcolm }),
  clearHighlight: () => set({ highlightedPath: [] }),

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
