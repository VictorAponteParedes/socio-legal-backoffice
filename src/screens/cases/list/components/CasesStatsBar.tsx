// src/screens/cases/list/components/CasesStatsBar.tsx
import { RefreshCw, Briefcase, FileText, CheckCircle } from "lucide-react";
import type { Case } from "../../types";

interface Props {
  cases: Case[];
  filteredCount: number;
  isLoading: boolean;
  onRefetch: () => void;
}

export const CasesStatsBar = ({
  filteredCount,
  isLoading,
  onRefetch,
}: Props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Resumen principal */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex-1 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Casos Registrados</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-slate-800">
                {filteredCount}
              </h3>
            </div>
          </div>
        </div>
        <button
          onClick={onRefetch}
          disabled={isLoading}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all disabled:opacity-50"
          title="Actualizar datos"
        >
          <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex-1">
        <div className="flex items-center justify-between h-full">
          <div>
            <p className="text-sm font-medium text-slate-500">Gestión</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FileText size={16} className="text-blue-500" />
                <span>Pendientes</span>
              </div>
              <div className="w-px h-4 bg-slate-200"></div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle size={16} className="text-emerald-500" />
                <span>Casos Activos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
