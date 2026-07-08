import { create } from "zustand";

interface SearchState {
  filter: string;
  setFilter: (filter: string) => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
  filter: "",
  setFilter: (filter) => set(() => ({ filter })),
}));
