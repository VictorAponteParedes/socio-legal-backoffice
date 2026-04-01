// src/screens/specializations/store/specializationsStore.ts
import { create } from "zustand";
import { specializationsService } from "../service/specializations.service";
import type { Specialization, CreateSpecializationDto } from "../types";

interface SpecializationsState {
  specializations: Specialization[];
  total: number;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  fetchSpecializations: (token: string, page?: number, limit?: number, search?: string) => Promise<void>;
  addSpecialization: (token: string, data: CreateSpecializationDto) => Promise<void>;
  deleteSpecialization: (token: string, id: number) => Promise<void>;
}

export const useSpecializationsStore = create<SpecializationsState>((set, get) => ({
  specializations: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,

  fetchSpecializations: async (token: string, page = 1, limit = 10, search?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await specializationsService.findAll(token, page, limit, search);
      set({ 
        specializations: response.data, 
        total: response.total,
        currentPage: response.page,
        totalPages: response.totalPages,
        isLoading: false 
      });
    } catch {
      set({ error: "Error al cargar especializaciones", isLoading: false });
    }
  },

  addSpecialization: async (token: string, data: CreateSpecializationDto) => {
    set({ isLoading: true, error: null });
    try {
      await specializationsService.create(data, token);
      await get().fetchSpecializations(token, get().currentPage);
    } catch {
      set({ error: "Error al crear la especialización", isLoading: false });
      throw new Error("Failed to create specialization");
    }
  },

  deleteSpecialization: async (token: string, id: number) => {
    set({ isLoading: true, error: null });
    try {
      await specializationsService.remove(id, token);
      await get().fetchSpecializations(token, get().currentPage);
    } catch {
      set({ error: "Error al eliminar la especialización", isLoading: false });
    }
  },
}));
