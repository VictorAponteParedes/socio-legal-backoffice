// src/screens/clients/list/components/ClientsSearchBar.tsx
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { ChangeEvent } from "react";

interface ClientsSearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  cityFilter: string;
  onCityChange: (value: string) => void;
  activeOnly: boolean;
  onActiveChange: (value: boolean) => void;
  uniqueCities: string[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export const ClientsSearchBar = ({
  search,
  onSearchChange,
  cityFilter,
  onCityChange,
  activeOnly,
  onActiveChange,
  uniqueCities,
  hasActiveFilters,
  onClearFilters,
}: ClientsSearchBarProps) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm mb-6">
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
            placeholder="Buscar por nombre, correo o cédula..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200
                       text-sm text-slate-700 placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400
                       transition-all"
          />
        </div>

        {/* Filtro ciudad */}
        <div className="relative">
          <SlidersHorizontal
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <select
            value={cityFilter}
            onChange={(e) => onCityChange(e.target.value)}
            className="pl-8 pr-8 py-2.5 rounded-xl bg-slate-50 border border-slate-200
                       text-sm text-slate-700 appearance-none cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400
                       transition-all min-w-[160px]"
          >
            <option value="">Todas las ciudades</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Toggle activos */}
        <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none hover:bg-indigo-50 hover:border-indigo-200 transition-colors">
          <input
            type="checkbox"
            checked={activeOnly}
            onChange={(e) => onActiveChange(e.target.checked)}
            className="w-4 h-4 accent-indigo-600 rounded"
          />
          <span className="text-sm text-slate-600 whitespace-nowrap">Solo activos</span>
        </label>

        {/* Limpiar filtros */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200
                       text-sm text-red-600 hover:bg-red-100 transition-colors whitespace-nowrap"
          >
            <X size={14} />
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
};
