// src/screens/tips/list/components/TipsTable.tsx
import { Trash2, Lightbulb, UserCheck, Briefcase, Users } from "lucide-react";
import type { Tip, TipTargetRole } from "../../types";

interface TipsTableProps {
  tips: Tip[];
  onDelete: (id: string) => void;
}

const ROLE_CONFIG: Record<TipTargetRole, { label: string; icon: React.ReactNode; classes: string }> = {
  client: {
    label: "Clientes",
    icon: <UserCheck size={12} />,
    classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  lawyer: {
    label: "Abogados",
    icon: <Briefcase size={12} />,
    classes: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  all: {
    label: "Todos",
    icon: <Users size={12} />,
    classes: "bg-slate-100 text-slate-600 border-slate-200",
  },
};

export const TipsTable = ({ tips, onDelete }: TipsTableProps) => {
  if (tips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-400 flex items-center justify-center">
          <Lightbulb size={32} strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-slate-700 font-bold text-lg">Sin consejos registrados</p>
          <p className="text-slate-400 text-sm mt-1">Crea el primer consejo del día con el botón de arriba.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="text-left px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">
              Consejo
            </th>
            <th className="text-left px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest hidden md:table-cell">
              Destinado a
            </th>
            <th className="text-left px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest hidden lg:table-cell">
              Fecha
            </th>
            <th className="text-right px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {tips.map((tip) => {
            const roleConfig = ROLE_CONFIG[tip.targetRole];
            return (
              <tr
                key={tip.id}
                className="hover:bg-slate-50/70 transition-colors group"
              >
                {/* Title + Description */}
                <td className="px-6 py-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Lightbulb size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-slate-800 mb-1 line-clamp-1">{tip.title}</p>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{tip.description}</p>
                    </div>
                  </div>
                </td>

                {/* Target Role */}
                <td className="px-6 py-5 hidden md:table-cell">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black border ${roleConfig.classes}`}>
                    {roleConfig.icon}
                    {roleConfig.label}
                  </span>
                </td>

                {/* Date */}
                <td className="px-6 py-5 hidden lg:table-cell">
                  <span className="text-xs text-slate-400 font-semibold">
                    {new Date(tip.createdAt).toLocaleDateString("es-PY", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-5 text-right">
                  <button
                    onClick={() => onDelete(tip.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                    title="Eliminar consejo"
                  >
                    <Trash2 size={14} />
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
