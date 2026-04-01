// src/screens/specializations/list/index.tsx
import { useState } from "react";
import { useSpecializationsList } from "./hooks/useSpecializationsList";
import { CreateSpecializationModal } from "./components/CreateSpecializationModal";
import { SpecializationsSearchBar } from "./components/SpecializationsSearchBar";
import { SpecializationsTable } from "./components/SpecializationsTable";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Scale, ChevronLeft, ChevronRight } from "lucide-react";

const SpecializationsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { 
    specializations, 
    totalPages, 
    currentPage, 
    total, 
    setPage, 
    isLoading, 
    error, 
    addSpecialization, 
    deleteSpecialization 
  } = useSpecializationsList(searchTerm);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; name: string } | null>(null);

  const handleDelete = async () => {
    if (deleteConfirm) {
      await deleteSpecialization(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <header>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          Especializaciones
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Gestiona las áreas legales que los abogados pueden asignar a sus perfiles.
        </p>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Scale size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Especialidades</p>
            <h3 className="text-2xl font-bold text-slate-800 ">{total}</h3>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <SpecializationsSearchBar
        search={searchTerm}
        onSearchChange={setSearchTerm}
        onClearFilters={() => setSearchTerm("")}
        onCreateOpen={() => setIsModalOpen(true)}
      />

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl font-bold text-sm">
          {error}
        </div>
      )}

      {/* Table container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-slate-50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <SpecializationsTable 
              specializations={specializations} 
              onDelete={(id) => {
                const spec = specializations.find(s => s.id === id);
                if (spec) setDeleteConfirm({ id, name: spec.name });
              }} 
            />

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
                <span className="text-sm font-medium text-slate-500">
                  Mostrando <span className="text-slate-700 font-bold">{specializations.length}</span> de <span className="text-slate-700 font-bold">{total}</span>
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
                      if (totalPages > 5 && Math.abs(currentPage - page) > 1 && page !== 1 && page !== totalPages) return null;
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
          </>
        )}
      </div>

      <CreateSpecializationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addSpecialization}
      />

      <ConfirmModal
        isOpen={!!deleteConfirm}
        title="¿Deseas eliminar esta especialidad?"
        description={`Estás por eliminar "${deleteConfirm?.name}". Esta acción no se puede deshacer y podría afectar a los abogados asignados.`}
        confirmText="Sí, eliminar"
        onConfirm={handleDelete}
        onClose={() => setDeleteConfirm(null)}
      />
    </div>
  );
};

export default SpecializationsList;
