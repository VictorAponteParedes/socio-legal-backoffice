// src/screens/specializations/list/components/SpecializationsTable.tsx
import { Scale, Trash2, Calendar, Clock, ChevronRight } from "lucide-react";
import type { Specialization } from "../../types";

interface Props {
  specializations: Specialization[];
  onDelete: (id: number) => void;
}

export const SpecializationsTable = ({ specializations, onDelete }: Props) => {
  if (specializations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-200 mb-4">
          <Scale size={40} />
        </div>
        <p className="text-lg font-medium">Sin especializaciones</p>
        <p className="text-sm mt-1">No se encontraron resultados para los filtros aplicados</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Especialidad
            </th>
            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              ID
            </th>
            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Descripción
            </th>
            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Creado
            </th>
            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Último Cambio
            </th>
            <th className="py-4 px-6" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {specializations.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-slate-50/80 transition-colors group cursor-default"
            >
              {/* Icono + Nombre */}
              <td className="py-4 px-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Scale size={18} />
                  </div>
                  <span className="font-bold text-slate-800 text-sm">
                    {item.name}
                  </span>
                </div>
              </td>

              {/* ID */}
              <td className="py-4 px-6">
                <span className="font-mono text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-lg">
                  #{item.id}
                </span>
              </td>

              {/* Descripción */}
              <td className="py-4 px-6 max-w-xs">
                <p className="text-slate-500 font-medium line-clamp-2 leading-relaxed">
                  {item.description || <span className="text-slate-300 italic">Sin descripción</span>}
                </p>
              </td>

              {/* Fecha Creación */}
              <td className="py-4 px-6 text-slate-500 font-medium">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <Calendar size={13} className="text-slate-400" />
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </td>

              {/* Fecha Actualización */}
              <td className="py-4 px-6 text-slate-500 font-medium">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <Clock size={13} className="text-slate-400" />
                  {new Date(item.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </td>

              {/* Acciones */}
              <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all duration-300 transform group-hover:translate-x-0.5">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
