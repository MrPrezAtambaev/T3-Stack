import { create } from "zustand";

interface TodoFiltersState {
  searchText: string;
  setSearchText: (searchText: string) => void;
}

export const useTodoFiltersState = create<TodoFiltersState>(
  (set, get, store) => ({
    searchText: "",
    setSearchText: (searchText) => {
      set({ searchText });
    },
  })
);
