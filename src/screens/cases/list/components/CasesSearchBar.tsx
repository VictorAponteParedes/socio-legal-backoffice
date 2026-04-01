// src/screens/cases/list/components/CasesSearchBar.tsx
import { Search, Filter, X } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

const statusOptions = [
  { value: "", label: "Todos los estados" },
  { value: "pendiente", label: "Pendiente" },
  { value: "aceptado", label: "Aceptado" },
  { value: "cerrado", label: "Cerrado" },
];

export const CasesSearchBar = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  hasActiveFilters,
  onClearFilters,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 relative z-10">
      <div className="relative flex-1 group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
          size={18}
        />
        <input
          type="text"
          placeholder="Buscar caso por título, cliente, cédula..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-slate-50 border-none rounded-xl py-3 pl-11 pr-4 text-sm text-slate-700 font-medium placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
        />
      </div>

      <div className="flex gap-3">
        {/* Status Select */}
        <div className="relative bg-slate-50 rounded-xl min-w-[170px]">
          <Filter
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full bg-transparent border-none appearance-none py-3 pl-10 pr-10 text-sm font-medium text-slate-600 focus:ring-2 focus:ring-indigo-500/20 rounded-xl outline-none cursor-pointer"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-slate-700">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Botón limpiar */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
          >
            <X size={16} />
            <span className="hidden sm:inline">Limpiar</span>
          </button>
        )}
      </div>
    </div>
  );
};
