import { axiosInstance } from "@/constants";
import type { Term, CreateTermDto, PaginatedTerms } from "../types";

export const termsService = {
  findAll: async (page: number = 1, limit: number = 10, target?: string, search?: string): Promise<PaginatedTerms> => {
    const params: any = { page, limit };
    if (target && target !== "all") params.target = target;
    if (search) params.search = search;
    
    const { data } = await axiosInstance.get<PaginatedTerms>("/terms-and-conditions", { params });
    return data;
  },

  create: async (createDto: CreateTermDto, token: string): Promise<Term> => {
    const { data } = await axiosInstance.post<Term>("/terms-and-conditions", createDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  update: async (id: string, updateDto: Partial<CreateTermDto>, token: string): Promise<Term> => {
    const { data } = await axiosInstance.patch<Term>(`/terms-and-conditions/${id}`, updateDto, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  delete: async (id: string, token: string): Promise<void> => {
    await axiosInstance.delete(`/terms-and-conditions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
