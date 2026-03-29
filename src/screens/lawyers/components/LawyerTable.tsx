// src/screens/lawyers/components/LawyerTable.tsx
import { RefreshCw, Users } from "lucide-react";
import { LawyerTableRow } from "./LawyerTableRow";
import type { Lawyer } from "../types";

interface Props {
  lawyers: Lawyer[];
  isLoading: boolean;
  error: string | null;
  onRefetch: () => void;
}

const TableSkeleton = () => (
  <div className="w-full space-y-3 animate-pulse">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="h-16 bg-slate-100 rounded-xl w-full" />
    ))}
  </div>
);

export const LawyerTable = ({ lawyers, isLoading, error, onRefetch }: Props) => {
  if (isLoading) return <TableSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
          <RefreshCw size={28} className="text-red-400" />
        </div>
        <h3 className="font-semibold text-slate-700">{error}</h3>
        <button onClick={onRefetch} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm transition-colors hover:bg-indigo-700">
          Reintentar
        </button>
      </div>
    );
  }

  if (lawyers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <Users size={40} className="text-slate-200 mb-4" />
        <p className="text-slate-500 font-medium tracking-tight whitespace-nowrap">No se encontraron abogados con esos filtros</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Abogado</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Matrícula</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Especialidades</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Experiencia</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Rating</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Estado</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {lawyers.map((lawyer, index) => (
              <LawyerTableRow key={lawyer.id} lawyer={lawyer} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
