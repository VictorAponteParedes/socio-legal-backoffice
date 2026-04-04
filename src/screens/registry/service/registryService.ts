// src/screens/registry/service/registryService.ts
import { axiosInstance } from "@/constants";
import type { RegistryResponse } from "../types";

export interface RegistryParams {
  q?: string;
  page?: number;
  limit?: number;
  token?: string; // Token obligatorio para la búsqueda protegida
}

const registryService = {
  getRegistry: async (params: RegistryParams = {}): Promise<RegistryResponse> => {
    const { data } = await axiosInstance.get<RegistryResponse>(
      "/lawyers-registry/search",
      {
        params: {
          q: params.q,
          page: params.page || 1,
          limit: params.limit || 15,
        },
        headers: params.token ? { Authorization: `Bearer ${params.token}` } : {},
      },
    );
    return data;
  },
};

export default registryService;
