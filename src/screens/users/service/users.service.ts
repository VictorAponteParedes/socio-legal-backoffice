// src/screens/users/service/users.service.ts
import { axiosInstance } from "@/constants";
import type { PaginatedUsers, User } from "../types";

export class UsersService {
  async findAll(
    token: string,
    page: number = 1,
    limit: number = 10,
    search?: string,
    role?: string,
    status?: string
  ): Promise<PaginatedUsers> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) params.append("search", search);
    if (role) params.append("role", role);
    if (status) params.append("status", status);

    const response = await axiosInstance.get(`/users?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async findOne(id: string, token: string): Promise<User> {
    const response = await axiosInstance.get(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}

export const usersService = new UsersService();
