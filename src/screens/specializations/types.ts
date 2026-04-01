// src/screens/specializations/types.ts

export interface Specialization {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSpecializationDto {
  name: string;
  description?: string;
  icon?: string;
}

export interface UpdateSpecializationDto {
  name?: string;
  description?: string;
  icon?: string;
}

export interface PaginatedSpecializations {
  data: Specialization[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
