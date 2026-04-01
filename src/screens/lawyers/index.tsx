// src/screens/lawyers/index.tsx
import { useLawyers } from "./hooks/useLawyers";
import { useLawyerFilters } from "./hooks/useLawyerFilters";
import { LawyersSearchBar } from "./components/LawyersSearchBar";
import { LawyersStatsBar } from "./components/LawyersStatsBar";
import { LawyerTable } from "./components/LawyerTable";
import { ListSkeleton } from "@/components/ListSkeleton";

const LawyersPage = () => {
  const { lawyers, isLoading, error, refetch } = useLawyers();

  const {
    search,
    setSearch,
    cityFilter,
    setCityFilter,
    availableOnly,
    setAvailableOnly,
    filtered,
    uniqueCities,
    clearFilters,
    hasActiveFilters,
  } = useLawyerFilters({ lawyers });

  if (isLoading) return <ListSkeleton rows={8} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Abogados</h1>
        <p className="text-slate-500 text-sm mt-1">
          Gestiona la nómina de especialistas de la plataforma.
        </p>
      </div>

      <LawyersStatsBar
        lawyers={lawyers}
        filteredCount={filtered.length}
        isLoading={isLoading}
        onRefetch={refetch}
      />

      <LawyersSearchBar
        search={search}
        onSearchChange={setSearch}
        cityFilter={cityFilter}
        onCityChange={setCityFilter}
        availableOnly={availableOnly}
        onAvailableChange={setAvailableOnly}
        uniqueCities={uniqueCities}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      {/* Tabla de abogados */}
      <LawyerTable
        lawyers={filtered}
        isLoading={isLoading}
        error={error}
        onRefetch={refetch}
      />
    </div>
  );
};

export default LawyersPage;
