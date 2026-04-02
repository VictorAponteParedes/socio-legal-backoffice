// src/screens/lawyers/service/lawyersService.ts
import { axiosInstance } from "@/constants";
import type { Lawyer, SearchLawyersPayload } from "../types";

export class LawyersService {
  async findAll(token?: string): Promise<Lawyer[]> {
    const response = await axiosInstance.get<Lawyer[]>("/lawyers", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  }

  async findOne(id: string, token?: string): Promise<Lawyer> {
    const response = await axiosInstance.get<Lawyer>(`/lawyers/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  }

  async search(
    payload: SearchLawyersPayload,
    token?: string,
  ): Promise<Lawyer[]> {
    const response = await axiosInstance.post<Lawyer[]>(
      "/lawyers/search",
      payload,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    );
    return response.data;
  }

  async updateStatus(
    id: string,
    status: string,
    token: string,
  ): Promise<Lawyer> {
    const response = await axiosInstance.patch<Lawyer>(
      `/lawyers/${id}/status`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  }
}

export const lawyersService = new LawyersService();
