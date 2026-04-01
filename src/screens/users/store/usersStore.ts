// src/screens/users/store/usersStore.ts
import { create } from "zustand";
import { usersService } from "../service/users.service";
import type { User } from "../types";

interface UsersState {
  users: User[];
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUsers: (token: string, page?: number, limit?: number, search?: string, role?: string, status?: string) => Promise<void>;
  fetchUser: (id: string, token: string) => Promise<void>;
  clearSelected: () => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  totalUsers: 0,
  currentPage: 1,
  totalPages: 1,
  selectedUser: null,
  isLoading: false,
  error: null,

  fetchUsers: async (token: string, page = 1, limit = 10, search?: string, role?: string, status?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await usersService.findAll(token, page, limit, search, role, status);
      set({ 
        users: response.data, 
        totalUsers: response.total,
        currentPage: response.page,
        totalPages: response.totalPages,
        isLoading: false 
      });
    } catch {
      set({ error: "Error al cargar el listado de usuarios", isLoading: false });
    }
  },

  fetchUser: async (id: string, token: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await usersService.findOne(id, token);
      set({ selectedUser: user, isLoading: false });
    } catch {
      set({ error: "Error al cargar el perfil del usuario", isLoading: false });
    }
  },

  clearSelected: () => set({ selectedUser: null }),
}));
