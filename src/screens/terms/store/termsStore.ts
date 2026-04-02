import { create } from "zustand";
import type { Term } from "../types";

interface TermsState {
  terms: Term[];
  isLoading: boolean;
  error: string | null;
  setTerms: (terms: Term[]) => void;
  addTerm: (term: Term) => void;
  updateTerm: (updatedTerm: Term) => void;
  removeTerm: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTermsStore = create<TermsState>((set) => ({
  terms: [],
  isLoading: false,
  error: null,
  setTerms: (terms) => set({ terms }),
  addTerm: (term) => set((state) => ({ terms: [...state.terms, term].sort((a, b) => a.order - b.order) })),
  updateTerm: (updatedTerm) => set((state) => ({
    terms: state.terms.map(t => t.id === updatedTerm.id ? updatedTerm : t).sort((a, b) => a.order - b.order)
  })),
  removeTerm: (id) => set((state) => ({ terms: state.terms.filter((t) => t.id !== id) })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
