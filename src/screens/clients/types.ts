// src/screens/clients/types.ts

export interface ClientUser {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone?: string;
  cedula?: string;
  profilePicture?: string;
  status: "active" | "inactive" | "suspended" | "pending";
  createdAt: string;
}

export interface Client {
  id: string;
  user_id: string;
  user: ClientUser;
  address?: string;
  city?: string;
  country?: string;
  preferences?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedClients {
  data: Client[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
