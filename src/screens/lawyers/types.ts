// src/screens/lawyers/types.ts

export interface Specialization {
  id: number;
  name: string;
}

export interface LawyerUser {
  id: string;
  name: string;
  lastname: string;
  email: string;
  status: "active" | "inactive" | "suspended";
}

export interface Lawyer {
  id: string;
  user_id: string;
  user: LawyerUser;
  license: string;
  bio?: string;
  specializations: Specialization[];
  yearsOfExperience: number;
  rating: number;
  totalReviews: number;
  languages?: string[];
  isAvailable: boolean;
  officeAddress?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  profileCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SearchLawyersPayload {
  search?: string;
  specializationIds?: number[];
  city?: string;
  country?: string;
}
