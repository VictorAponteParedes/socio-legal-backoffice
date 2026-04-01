// src/screens/specializations/list/components/SpecializationsSearchBar.tsx
import { Search, X, Plus } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
  onCreateOpen: () => void;
}

export const SpecializationsSearchBar = ({
  search,
  onSearchChange,
  onClearFilters,
  onCreateOpen,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
      <div className="relative flex-1 group w-full">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
          size={18}
        />
        <input
          type="text"
          placeholder="Buscar especialidad por nombre o descripción..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-11 pr-12 text-sm text-slate-700 font-medium placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all outline-none"
        />
        {search && (
          <button
            onClick={onClearFilters}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <button
        onClick={onCreateOpen}
        className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap"
      >
        <Plus size={18} />
        Nueva Especialización
      </button>
    </div>
  );
};
