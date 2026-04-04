import React from "react";
import { useLawyersRegistry } from "./hooks/useLawyersRegistry";
import { RegistryTable } from "./components/RegistryTable";
import { RegistrySearchBar } from "./components/RegistrySearchBar";
import { RegistryPagination } from "./components/RegistryPagination";
import { ShieldCheck, RefreshCcw } from "lucide-react";

const LawyersRegistryPage = () => {
  const {
    data,
    total,
    loading,
    currentPage,
    searchTerm,
    totalPages,
    handleSearchChange,
    handlePageChange,
    refresh
  } = useLawyersRegistry();

  const onClear = () => {
    handleSearchChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-indigo-600 text-white p-1 rounded-md shadow-lg shadow-indigo-200">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="text-xs font-black text-indigo-600 tracking-widest uppercase">
              Base de Datos Oficial
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            Padrón Judicial
          </h1>
          <p className="text-slate-500 text-lg mt-1 font-medium italic">
            Validación de credenciales del Poder Judicial del Paraguay.
          </p>
        </div>

        <button 
          onClick={refresh}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-100 transition-all font-bold shadow-sm disabled:opacity-50"
        >
          <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Sincronizar
        </button>
      </div>

      <div className="space-y-6">
        <RegistrySearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onClear={onClear}
        />

        <RegistryTable 
          data={data} 
          loading={loading} 
        />

        <RegistryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={total}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default LawyersRegistryPage;
