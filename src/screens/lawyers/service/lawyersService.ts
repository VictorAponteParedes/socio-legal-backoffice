// src/screens/lawyers/service/lawyersService.ts
import { axiosInstance } from "@/constants";
import type { Lawyer, SearchLawyersPayload } from "../types";

export class LawyersService {
  async findAll(): Promise<Lawyer[]> {
    const response = await axiosInstance.get<Lawyer[]>("/lawyers");
    return response.data;
  }

  async findOne(id: string): Promise<Lawyer> {
    const response = await axiosInstance.get<Lawyer>(`/lawyers/${id}`);
    return response.data;
  }

  async search(payload: SearchLawyersPayload): Promise<Lawyer[]> {
    const response = await axiosInstance.post<Lawyer[]>("/lawyers/search", payload);
    return response.data;
  }
}

export const lawyersService = new LawyersService();
