import React from "react";
import { Search, Info, X } from "lucide-react";

interface RegistrySearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export const RegistrySearchBar: React.FC<RegistrySearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onClear,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-hover:scale-110 transition-transform">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-12 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-400 text-slate-700 font-medium"
            placeholder="Buscar por cédula, matrícula o nombre del abogado..."
            value={searchTerm}
            onChange={onSearchChange}
          />
          {searchTerm && (
            <button
              onClick={onClear}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-700 text-sm font-medium">
          <Info className="h-4 w-4" />
          Información oficial de la Corte Suprema del Paraguay
        </div>
      </div>
    </div>
  );
};
