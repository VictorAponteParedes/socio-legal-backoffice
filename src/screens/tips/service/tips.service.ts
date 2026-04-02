// src/screens/tips/service/tips.service.ts
import { axiosInstance } from "@/constants";
import type { Tip, CreateTipDto, TipTargetRole } from "../types";

export class TipsService {
  async findAll(token: string, role?: TipTargetRole): Promise<Tip[]> {
    const params = new URLSearchParams();
    if (role) params.append("role", role);

    const response = await axiosInstance.get(`/tips?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async create(data: CreateTipDto, token: string): Promise<Tip> {
    const response = await axiosInstance.post("/tips", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async remove(id: string, token: string): Promise<void> {
    await axiosInstance.delete(`/tips/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export const tipsService = new TipsService();
