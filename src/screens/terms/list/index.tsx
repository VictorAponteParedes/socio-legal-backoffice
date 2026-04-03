import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useTermsList } from "./hooks/useTermsList";
import { CreateTermModal } from "./components/CreateTermModal";
import { TermsTable } from "./components/TermsTable";
import { TermsSearchBar } from "./components/TermsSearchBar";
import type { Term, TermsTarget } from "../types";
import { MessageToast } from "@/components/form/MessageToast";

export interface TermMessage {
  type: "success" | "error";
  title: string;
  description: string;
}

const TermsListPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TermsTarget | "all">("all");
  const { 
    terms, 
    totalTerms, 
    totalPages, 
    currentPage, 
    setPage, 
    isLoading, 
    createTerm, 
    updateExistingTerm, 
    deleteTerm 
  } = useTermsList(search, filter);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termToEdit, setTermToEdit] = useState<Term | null>(null);
  const [message, setMessage] = useState<TermMessage | null>(null);

  const handleEdit = (term: Term) => {
    setTermToEdit(term);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setTermToEdit(null);
    setIsModalOpen(true);
  };

  const hasActiveFilters = search !== "" || filter !== "all";

  const clearFilters = () => {
    setSearch("");
    setFilter("all");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-6 pb-10"
    >
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Términos y Condiciones</h1>
          <p className="text-slate-500 font-medium mt-1">Gestiona los términos de uso para clientes y abogados.</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2 group"
        >
          <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus size={16} />
          </div>
          Nuevo Término
        </button>
      </div>

      <TermsSearchBar
        search={search}
        onSearchChange={setSearch}
        targetFilter={filter}
        onTargetChange={setFilter}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      {/* Content section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <TermsTable 
          terms={terms} 
          isLoading={isLoading} 
          onEdit={handleEdit} 
          onDelete={async (id) => {
            try {
              await deleteTerm(id);
              setMessage({
                type: "success",
                title: "Término eliminado",
                description: "El término ha sido eliminado correctamente del público seleccionado."
              });
            } catch {
              setMessage({
                type: "error",
                title: "Error al eliminar",
                description: "No se pudo eliminar el término en este momento."
              });
            }
          }} 
        />

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
            <span className="text-sm font-medium text-slate-500">
              Página <span className="text-slate-700 font-bold">{currentPage}</span> de <span className="text-slate-700 font-bold">{totalPages}</span>
              <span className="ml-2 text-slate-400">({totalTerms} términos en total)</span>
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

      <CreateTermModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (dto) => { 
          try {
            await createTerm(dto);
            setMessage({
              type: "success",
              title: "Término creado",
              description: "El nuevo término ha sido añadido exitosamente."
            });
          } catch {
            setMessage({
              type: "error",
              title: "Error al crear",
              description: "Hubo un problema al procesar la creación."
            });
            throw new Error();
          }
        }}
        onUpdate={async (id, dto) => { 
          try {
            await updateExistingTerm(id, dto);
            setMessage({
              type: "success",
              title: "Término actualizado",
              description: "Los cambios han sido guardados correctamente."
            });
          } catch {
            setMessage({
              type: "error",
              title: "Error al actualizar",
              description: "No se pudieron guardar los cambios realizados."
            });
            throw new Error();
          }
        }}
        termToEdit={termToEdit}
      />

      {message && (
        <MessageToast {...message} onClose={() => setMessage(null)} />
      )}
    </motion.div>
  );
};

export default TermsListPage;
