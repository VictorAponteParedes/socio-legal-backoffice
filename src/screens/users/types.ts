// src/screens/users/types.ts
export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone?: string;
  cedula?: string;
  role: "super_admin" | "admin" | "abogado" | "cliente";
  status: "active" | "inactive" | "suspended" | "pending";
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedUsers {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
