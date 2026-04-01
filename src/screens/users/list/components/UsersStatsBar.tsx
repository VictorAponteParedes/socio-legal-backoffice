// src/screens/users/list/components/UsersStatsBar.tsx
import { RefreshCw, Users, ShieldCheck, UserCheck } from "lucide-react";
import type { User } from "../../types";

interface Props {
  users: User[];
  filteredCount: number;
  isLoading: boolean;
  onRefetch: () => void;
}

export const UsersStatsBar = ({
  filteredCount,
  isLoading,
  onRefetch,
}: Props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex-1 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Usuarios</p>
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
            <p className="text-sm font-medium text-slate-500">Distribución</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <UserCheck size={16} className="text-emerald-500" />
                <span>Clientes</span>
              </div>
              <div className="w-px h-4 bg-slate-200"></div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <ShieldCheck size={16} className="text-blue-500" />
                <span>Abogados / Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
