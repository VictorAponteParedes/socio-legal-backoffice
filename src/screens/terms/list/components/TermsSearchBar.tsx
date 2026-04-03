import { Search, Filter, X } from "lucide-react";
import type { ChangeEvent } from "react";
import type { TermsTarget } from "../../types";

interface TermsSearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  targetFilter: TermsTarget | "all";
  onTargetChange: (value: TermsTarget | "all") => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export const TermsSearchBar = ({
  search,
  onSearchChange,
  targetFilter,
  onTargetChange,
  hasActiveFilters,
  onClearFilters,
}: TermsSearchBarProps) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Búsqueda principal */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onSearchChange(e.target.value)
            }
            placeholder="Buscar por título o descripción..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200
                       text-sm text-slate-700 placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400
                       transition-all font-medium"
          />
        </div>

        {/* Filtro Público */}
        <div className="relative">
          <Filter
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <select
            value={targetFilter}
            onChange={(e) => onTargetChange(e.target.value as TermsTarget | "all")}
            className="pl-8 pr-8 py-2.5 rounded-xl bg-slate-50 border border-slate-200
                       text-sm text-slate-700 appearance-none cursor-pointer font-bold
                       focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400
                       transition-all min-w-[180px]"
          >
            <option value="all">Todos los públicos</option>
            <option value="client">Solo Clientes</option>
            <option value="lawyer">Solo Abogados</option>
          </select>
        </div>

        {/* Limpiar filtros */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200
                       text-sm text-red-600 hover:bg-red-100 transition-colors whitespace-nowrap font-bold"
          >
            <X size={14} />
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
};
