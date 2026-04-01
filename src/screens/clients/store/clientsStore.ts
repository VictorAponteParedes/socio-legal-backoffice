// src/screens/clients/store/clientsStore.ts
import { create } from "zustand";
import { ClientsService } from "../service/clients.service";
import type { Client } from "../types";

const clientsService = new ClientsService();

interface ClientsState {
  clients: Client[];
  selectedClient: Client | null;
  isLoading: boolean;
  error: string | null;
  fetchClients: (token: string) => Promise<void>;
  fetchClient: (id: string, token: string) => Promise<void>;
  clearSelected: () => void;
}

export const useClientsStore = create<ClientsState>((set) => ({
  clients: [],
  selectedClient: null,
  isLoading: false,
  error: null,

  fetchClients: async (token: string) => {
    set({ isLoading: true, error: null });
    try {
      const clients = await clientsService.findAll(token);
      set({ clients, isLoading: false });
    } catch {
      set({ error: "Error al cargar los clientes", isLoading: false });
    }
  },

  fetchClient: async (id: string, token: string) => {
    set({ isLoading: true, error: null });
    try {
      const client = await clientsService.findOne(id, token);
      set({ selectedClient: client, isLoading: false });
    } catch {
      set({ error: "Error al cargar el cliente", isLoading: false });
    }
  },

  clearSelected: () => set({ selectedClient: null }),
}));
