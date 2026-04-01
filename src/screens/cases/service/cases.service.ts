// src/screens/cases/service/cases.service.ts
import { axiosInstance } from "@/constants";
import type { PaginatedCases, Case } from "../types";

export class CasesService {
  async findAll(
    token: string, 
    page: number = 1, 
    limit: number = 10,
    search?: string,
    status?: string
  ): Promise<PaginatedCases> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) params.append("search", search);
    if (status) params.append("status", status);

    const response = await axiosInstance.get(`/cases?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async findOne(id: string, token: string): Promise<Case> {
    const response = await axiosInstance.get(`/cases/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}

export const casesService = new CasesService();
