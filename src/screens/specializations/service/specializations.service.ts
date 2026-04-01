// src/screens/specializations/service/specializations.service.ts
import { axiosInstance } from "@/constants";
import type { Specialization, CreateSpecializationDto, UpdateSpecializationDto, PaginatedSpecializations } from "../types";

export class SpecializationsService {
  async findAll(
    token: string,
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<PaginatedSpecializations> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) params.append("search", search);

    const response = await axiosInstance.get(`/specializations?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async findOne(id: number, token: string): Promise<Specialization> {
    const response = await axiosInstance.get(`/specializations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async create(data: CreateSpecializationDto, token: string): Promise<Specialization> {
    const response = await axiosInstance.post("/specializations", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async update(id: number, data: UpdateSpecializationDto, token: string): Promise<Specialization> {
    const response = await axiosInstance.patch(`/specializations/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async remove(id: number, token: string): Promise<void> {
    await axiosInstance.delete(`/specializations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export const specializationsService = new SpecializationsService();
