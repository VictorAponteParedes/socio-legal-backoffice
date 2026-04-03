import { create } from "zustand";
import type { Term } from "../types";

interface TermsState {
  terms: Term[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  setTermsData: (data: { terms: Term[], total: number, page: number, totalPages: number }) => void;
  addTerm: (term: Term) => void;
  updateTerm: (updatedTerm: Term) => void;
  removeTerm: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTermsStore = create<TermsState>((set) => ({
  terms: [],
  total: 0,
  page: 1,
  totalPages: 0,
  isLoading: false,
  error: null,
  setTermsData: (data) => set({ 
    terms: data.terms, 
    total: data.total, 
    page: data.page, 
    totalPages: data.totalPages 
  }),
  addTerm: (term) => set((state) => ({ 
    terms: [...state.terms, term].sort((a, b) => a.order - b.order),
    total: state.total + 1
  })),
  updateTerm: (updatedTerm) => set((state) => ({
    terms: state.terms.map(t => t.id === updatedTerm.id ? updatedTerm : t).sort((a, b) => a.order - b.order)
  })),
  removeTerm: (id) => set((state) => ({ 
    terms: state.terms.filter((t) => t.id !== id),
    total: state.total - 1
  })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
