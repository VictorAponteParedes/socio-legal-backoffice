// src/screens/clients/list/index.tsx
import { useClientsList } from "./hooks/useClientsList";
import { useClientFilters } from "./hooks/useClientFilters";
import { ClientsSearchBar } from "./components/ClientsSearchBar";
import { ClientsStatsBar } from "./components/ClientsStatsBar";
import { ClientsTable } from "./components/ClientsTable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ListSkeleton } from "@/components/ListSkeleton";

const ClientsList = () => {
  const {
    search,
    setSearch,
    cityFilter,
    setCityFilter,
    activeOnly,
    setActiveOnly,
    uniqueCities,
    clearFilters,
    hasActiveFilters,
  } = useClientFilters({ clients: [] });

  const { clients, totalPages, currentPage, totalClients, setPage, isLoading, error, handleViewDetail, refetch } = useClientsList(search, cityFilter, activeOnly);

  if (isLoading) return <ListSkeleton rows={8} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Clientes</h1>
        <p className="text-slate-500 text-sm mt-1">
          Gestiona la nómina de clientes de la plataforma.
        </p>
      </div>

      <ClientsStatsBar
        clients={clients}
        filteredCount={totalClients}
        isLoading={isLoading}
        onRefetch={refetch}
      />

      <ClientsSearchBar
        search={search}
        onSearchChange={setSearch}
        cityFilter={cityFilter}
        onCityChange={setCityFilter}
        activeOnly={activeOnly}
        onActiveChange={setActiveOnly}
        uniqueCities={uniqueCities}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {error && (
          <div className="mx-6 mt-4 mb-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <ClientsTable clients={clients} onViewDetail={handleViewDetail} />

        {totalPages > 1 && (
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

export default ClientsList;
