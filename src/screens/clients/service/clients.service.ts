// src/screens/clients/service/clients.service.ts
import { axiosInstance } from "@/constants";
import type { Client } from "../types";

export class ClientsService {
  async findAll(token: string): Promise<Client[]> {
    const response = await axiosInstance.get("/clients", {
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
