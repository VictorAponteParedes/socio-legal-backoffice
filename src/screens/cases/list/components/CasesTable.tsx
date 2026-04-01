// src/screens/cases/list/components/CasesTable.tsx
import { ChevronRight, FileText, Scale } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import type { Case } from "../../types";

interface CasesTableProps {
  cases: Case[];
  onViewDetail: (caseItem: Case) => void;
}

const STATUS_MAP: Record<
  string,
  { label: string; variant: "success" | "warning" | "error" | "neutral" }
> = {
  aceptado: { label: "Aceptado", variant: "success" },
  cerrado: { label: "Cerrado", variant: "neutral" },
  suspendido: { label: "Suspendido", variant: "error" },
  pendiente: { label: "Pendiente", variant: "warning" },
};

const getInitials = (name: string, lastname: string) =>
  `${name.charAt(0)}${lastname.charAt(0)}`.toUpperCase();

export const CasesTable = ({ cases, onViewDetail }: CasesTableProps) => {
  if (cases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <span className="text-5xl mb-4">📁</span>
        <p className="text-lg font-medium">No hay casos registrados</p>
        <p className="text-sm mt-1">Los casos aparecerán aquí cuando sean creados</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Caso y Cliente
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Categoría
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Abogado
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Estado
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Urgencia
            </th>
            <th className="py-3 px-4" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {cases.map((caseItem) => {
            const status = STATUS_MAP[caseItem.status] ?? {
              label: caseItem.status,
              variant: "neutral" as const,
            };

            const clientName = caseItem.client
              ? `${caseItem.client.name} ${caseItem.client.lastname}`
              : "Desconocido";

            const lawyerName = caseItem.assignedLawyer
              ? `${caseItem.assignedLawyer.user.name} ${caseItem.assignedLawyer.user.lastname}`
              : "No asignado";

            return (
              <tr
                key={caseItem.id}
                onClick={() => onViewDetail(caseItem)}
                className="hover:bg-slate-50 transition-colors group cursor-pointer"
              >
                {/* Info Caso/Cliente */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {caseItem.client ? getInitials(caseItem.client.name, caseItem.client.lastname) : 'CL'}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 line-clamp-1 max-w-[200px]">
                        {caseItem.title}
                      </p>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <FileText size={11} /> {clientName}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-slate-600">{caseItem.category}</span>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <Scale size={13} className="text-slate-400" />
                    {lawyerName}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <StatusBadge variant={status.variant} dot>
                    {status.label}
                  </StatusBadge>
                </td>

                <td className="py-3.5 px-4 text-slate-500 capitalize">
                  {caseItem.urgency}
                </td>

                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all duration-300 transform group-hover:translate-x-1">
                      <ChevronRight size={22} />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
