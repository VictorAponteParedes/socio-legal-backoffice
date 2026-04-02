// src/screens/tips/types.ts

export type TipTargetRole = "client" | "lawyer" | "all";

export interface Tip {
  id: string;
  title: string;
  description: string;
  targetRole: TipTargetRole;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTipDto {
  title: string;
  description: string;
  targetRole: TipTargetRole;
}
