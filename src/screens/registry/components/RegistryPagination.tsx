import React from "react";
import { ChevronLeft, ChevronRight, Hash } from "lucide-react";

interface RegistryPaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  onPageChange: (newPage: number) => void;
}

export const RegistryPagination: React.FC<RegistryPaginationProps> = ({
  currentPage,
  totalPages,
  totalRecords,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 pb-12">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-slate-500 text-sm font-medium">
        <Hash className="h-4 w-4" />
        Mostrando <span className="text-slate-800 font-bold px-1">{totalRecords.toLocaleString()}</span> registros registrados en total
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center bg-white border border-slate-200 rounded-xl px-2 py-1 shadow-sm">
          <span className="px-3 py-1 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-lg">
            {currentPage}
          </span>
          <span className="px-3 text-slate-400 text-xs font-medium uppercase tracking-widest">
            DE
          </span>
          <span className="px-3 py-1 text-sm font-bold text-slate-600">
            {totalPages}
          </span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
