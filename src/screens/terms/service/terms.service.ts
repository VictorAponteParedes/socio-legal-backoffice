import { axiosInstance } from "@/constants";
import type { Term, CreateTermDto } from "../types";

export const termsService = {
  findAll: async (target?: string): Promise<Term[]> => {
    const params = target && target !== "all" ? { target } : {};
    const { data } = await axiosInstance.get<Term[]>("/terms-and-conditions", { params });
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
