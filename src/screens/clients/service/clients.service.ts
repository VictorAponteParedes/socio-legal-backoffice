// src/screens/clients/service/clients.service.ts
import { axiosInstance } from "@/constants";
import type { Client, PaginatedClients } from "../types";

export class ClientsService {
  async findAll(token: string, page: number = 1, limit: number = 10): Promise<PaginatedClients> {
    const response = await axiosInstance.get(`/clients?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async findOne(id: string, token: string): Promise<Client> {
    const response = await axiosInstance.get(`/clients/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async updateStatus(id: string, status: string, token: string): Promise<Client> {
    const response = await axiosInstance.patch(`/clients/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}
