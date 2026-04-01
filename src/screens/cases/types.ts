// src/screens/cases/types.ts

export interface CaseUser {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone?: string;
  cedula?: string;
  profilePicture?: string;
}

export interface CaseLawyer {
  id: string;
  user_id: string;
  user: CaseUser;
}

export interface Case {
  id: string;
  clientId: string;
  client: CaseUser;
  title: string;
  description: string;
  category: string;
  urgency: string;
  budget?: number;
  status: "pendiente" | "aceptado" | "cerrado";
  assignedLawyerId?: string;
  assignedLawyer?: CaseLawyer;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedCases {
  data: Case[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
