// src/screens/clients/list/index.tsx
import { AppDrawer } from "@/components/AppDrawer";
import { useClientsList } from "./hooks/useClientsList";
import { useClientFilters } from "./hooks/useClientFilters";
import { ClientsSearchBar } from "./components/ClientsSearchBar";
import { ClientsStatsBar } from "./components/ClientsStatsBar";
import { ClientsTable } from "./components/ClientsTable";

const ClientsList = () => {
  const { clients, isLoading, error, handleViewDetail, refetch } = useClientsList();

  const {
    search,
    setSearch,
    cityFilter,
    setCityFilter,
    activeOnly,
    setActiveOnly,
    filtered,
    uniqueCities,
    clearFilters,
    hasActiveFilters,
  } = useClientFilters({ clients });

  return (
    <AppDrawer>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Clientes</h1>
          <p className="text-slate-500 text-sm mt-1">
            Gestiona la nómina de clientes de la plataforma.
          </p>
        </div>

        <ClientsStatsBar
          clients={clients}
          filteredCount={filtered.length}
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
            <ClientsTable clients={filtered} onViewDetail={handleViewDetail} />
          )}
        </div>
      </div>
    </AppDrawer>
  );
};

export default ClientsList;
