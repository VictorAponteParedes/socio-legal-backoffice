// src/screens/cases/list/index.tsx
import { useCasesList } from "./hooks/useCasesList";
import { useCaseFilters } from "./hooks/useCaseFilters";
import { CasesSearchBar } from "./components/CasesSearchBar";
import { CasesStatsBar } from "./components/CasesStatsBar";
import { CasesTable } from "./components/CasesTable";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CasesList = () => {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    clearFilters,
    hasActiveFilters,
  } = useCaseFilters();

  const { cases, totalPages, currentPage, totalCases, setPage, isLoading, error, handleViewDetail, refetch } = useCasesList(search, statusFilter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Casos</h1>
        <p className="text-slate-500 text-sm mt-1">
          Gestiona y monitorea todos los casos legales de la plataforma.
        </p>
      </div>

      <CasesStatsBar
        cases={cases}
        filteredCount={totalCases}
        isLoading={isLoading}
        onRefetch={refetch}
      />

      <CasesSearchBar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      {/* Card contenedor */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Estado de error */}
        {error && (
          <div className="mx-6 mt-4 mb-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Skeleton loading */}
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-slate-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <CasesTable cases={cases} onViewDetail={handleViewDetail} />
        )}

        {/* Controls de Paginación */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
            <span className="text-sm font-medium text-slate-500">
              Página <span className="text-slate-700 font-bold">{currentPage}</span> de <span className="text-slate-700 font-bold">{totalPages}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setPage(page)}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                        currentPage === page
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CasesList;
