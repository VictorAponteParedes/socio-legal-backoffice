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
  license: string;
  user: CaseUser;
}

export interface CaseUpdate {
  id: string;
  type: "NOTE" | "FILE" | "MEETING" | "MILESTONE";
  title: string;
  description?: string;
  attachmentUrl?: string;
  eventDate?: string;
  createdAt: string;
  lawyer: CaseLawyer;
}

export interface CaseProposal {
  id: number;
  message: string;
  proposedFee: number;
  estimatedDuration: string;
  status: string;
  createdAt: string;
  lawyer: CaseLawyer;
}

export interface CaseClosure {
  id: string;
  result: string;
  closureReason: string;
  clientComment?: string;
  rating?: number;
  closedAt: string;
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
  proposals?: CaseProposal[];
  closure?: CaseClosure;
  updates?: CaseUpdate[];
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
