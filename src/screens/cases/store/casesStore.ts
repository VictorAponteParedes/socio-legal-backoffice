// src/screens/cases/store/casesStore.ts
import { create } from "zustand";
import { casesService } from "../service/cases.service";
import type { Case } from "../types";

interface CasesState {
  cases: Case[];
  totalCases: number;
  currentPage: number;
  totalPages: number;
  selectedCase: Case | null;
  isLoading: boolean;
  error: string | null;
  fetchCases: (token: string, page?: number, limit?: number, search?: string, status?: string) => Promise<void>;
  fetchCase: (id: string, token: string) => Promise<void>;
  clearSelected: () => void;
}

export const useCasesStore = create<CasesState>((set) => ({
  cases: [],
  totalCases: 0,
  currentPage: 1,
  totalPages: 1,
  selectedCase: null,
  isLoading: false,
  error: null,

  fetchCases: async (token: string, page = 1, limit = 10, search?: string, status?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await casesService.findAll(token, page, limit, search, status);
      set({ 
        cases: response.data, 
        totalCases: response.total,
        currentPage: response.page,
        totalPages: response.totalPages,
        isLoading: false 
      });
    } catch {
      set({ error: "Error al cargar los casos", isLoading: false });
    }
  },

  fetchCase: async (id: string, token: string) => {
    set({ isLoading: true, error: null });
    try {
      const caseItem = await casesService.findOne(id, token);
      set({ selectedCase: caseItem, isLoading: false });
    } catch {
      set({ error: "Error al cargar el detalle del caso", isLoading: false });
    }
  },

  clearSelected: () => set({ selectedCase: null }),
}));
