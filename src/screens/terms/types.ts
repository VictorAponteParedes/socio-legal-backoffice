// src/screens/terms/types.ts

export type TermsTarget = "client" | "lawyer";

export interface Term {
  id: string;
  title: string;
  description: string;
  target: TermsTarget;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTermDto {
  title: string;
  description: string;
  target: TermsTarget;
  order?: number;
}
