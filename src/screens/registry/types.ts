// src/screens/registry/types.ts
export interface LawyerRegistryItem {
  id: number;
  cedula: string;
  matricula: number;
  nombre: string;
  apellido: string;
  sexo: string;
  fechaNacimiento: string;
  fechaMatricula: string;
  fechaJuramento: string;
  estaHabilitado: boolean;
  universidad: string | null;
  egreso: number | null;
}

export interface RegistryResponse {
  data: LawyerRegistryItem[];
  total: number;
  page: number;
  totalPages: number;
}
