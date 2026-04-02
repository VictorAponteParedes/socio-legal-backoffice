// src/screens/tips/list/components/TipsSearchBar.tsx
import { Search, X, Plus, RefreshCw } from "lucide-react";
import type { TipTargetRole } from "../../types";

interface TipsSearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: TipTargetRole | "";
  onRoleChange: (value: TipTargetRole | "") => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onCreateOpen: () => void;
  onRefetch: () => void;
}


export const TipsSearchBar = ({
  search,
  onSearchChange,
  roleFilter,
  onRoleChange,
  hasActiveFilters,
  onClearFilters,
  onCreateOpen,
  onRefetch,
}: TipsSearchBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
      {/* Search */}
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar consejo por título..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-transparent focus:border-indigo-300 focus:bg-white text-sm font-medium text-slate-700 placeholder-slate-400 outline-none transition-all"
        />
      </div>

      {/* Role filter */}
      <select
        value={roleFilter}
        onChange={(e) => onRoleChange(e.target.value as TipTargetRole | "")}
        className="px-4 py-2.5 rounded-xl bg-slate-50 border border-transparent focus:border-indigo-300 text-sm font-semibold text-slate-600 outline-none transition-all min-w-[160px]"
      >
        <option value="">Todos los roles</option>
        <option value="client">Clientes</option>
        <option value="lawyer">Abogados</option>
        <option value="all">Ambos</option>
      </select>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <X size={14} />
          Limpiar
        </button>
      )}

      {/* Refresh */}
      <button
        onClick={onRefetch}
        className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
        title="Recargar"
      >
        <RefreshCw size={16} />
      </button>

      {/* Create */}
      <button
        onClick={onCreateOpen}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm transition-all shadow-sm shadow-indigo-200 hover:shadow-md active:scale-95"
      >
        <Plus size={16} />
        Nuevo Consejo
      </button>
    </div>
  );
};
