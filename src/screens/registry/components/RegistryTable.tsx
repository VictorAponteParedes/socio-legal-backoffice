// src/screens/registry/components/RegistryTable.tsx
import React from "react";
import { 
  UserCheck, 
  UserX, 
  MapPin, 
  GraduationCap, 
  Calendar,
  SearchX
} from "lucide-react";
import type { LawyerRegistryItem } from "../types";

interface RegistryTableProps {
  data: LawyerRegistryItem[];
  loading: boolean;
}

export const RegistryTable: React.FC<RegistryTableProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm animate-pulse">
        <div className="h-12 bg-slate-50 border-b border-slate-200"></div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-16 border-b border-slate-100 mx-4"></div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <SearchX className="text-slate-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">No se encontraron resultados</h3>
        <p className="text-slate-500 max-w-sm mx-auto mt-1">
          Intente con otro número de cédula, matrícula o nombre completo.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Abogado</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cédula / Matrícula</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Universidad / Egreso</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Fechas Clave</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      {item.nombre.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 uppercase text-sm">
                        {item.nombre} {item.apellido}
                      </div>
                      <div className="text-slate-500 text-xs flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> Paraguay
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1 text-xs">
                    <div className="font-medium text-slate-500">CI: <span className="text-slate-800 font-bold">{item.cedula}</span></div>
                    <div className="font-medium text-slate-500">Mat: <span className="text-indigo-600 font-bold">{item.matricula}</span></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {item.estaHabilitado ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <UserCheck className="w-3 h-3" /> Habilitado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100">
                      <UserX className="w-3 h-3" /> No Habilitado
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1 max-w-[250px]">
                    <div className="text-sm text-slate-700 truncate flex items-center gap-1.5 leading-none">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{item.universidad || "No especificada"}</span>
                    </div>
                    {item.egreso && (
                      <div className="text-xs text-slate-500 pl-5">Año: {item.egreso}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Calendar className="w-3 h-3" /> Juramento: <span className="text-slate-700">{item.fechaJuramento || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 border-l border-slate-200 pl-2 ml-1.5">
                      Matrícula: <span className="text-slate-700">{item.fechaMatricula || 'N/A'}</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
