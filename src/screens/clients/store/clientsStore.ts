// src/screens/clients/store/clientsStore.ts
import { create } from "zustand";
import { ClientsService } from "../service/clients.service";
import type { Client } from "../types";

const clientsService = new ClientsService();

interface ClientsState {
  clients: Client[];
  selectedClient: Client | null;
  isLoading: boolean;
  isUpdatingStatus: boolean;
  error: string | null;
  fetchClients: (token: string) => Promise<void>;
  fetchClient: (id: string, token: string) => Promise<void>;
  updateClientStatus: (id: string, status: "active" | "inactive" | "suspended" | "pending", token: string) => Promise<void>;
  clearSelected: () => void;
}

export const useClientsStore = create<ClientsState>((set) => ({
  clients: [],
  selectedClient: null,
  isLoading: false,
  isUpdatingStatus: false,
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

  updateClientStatus: async (id: string, status: "active" | "inactive" | "suspended" | "pending", token: string) => {
    set({ isUpdatingStatus: true, error: null });
    try {
      const updatedClient = await clientsService.updateStatus(id, status, token);
      set((state) => ({
        selectedClient: state.selectedClient?.id === id ? updatedClient : state.selectedClient,
        clients: state.clients.map(c => c.id === id ? updatedClient : c),
        isUpdatingStatus: false
      }));
    } catch {
      set({ error: "Error al actualizar el estado", isUpdatingStatus: false });
    }
  },

  clearSelected: () => set({ selectedClient: null }),
}));
