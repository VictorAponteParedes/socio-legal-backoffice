import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Filter } from "lucide-react";
import { useTermsList } from "./hooks/useTermsList";
import { CreateTermModal } from "./components/CreateTermModal";
import { TermsTable } from "./components/TermsTable";
import type { Term, TermsTarget } from "../types";
import { MessageToast } from "@/components/form/MessageToast";

export interface TermMessage {
  type: "success" | "error";
  title: string;
  description: string;
}

const TermsListPage = () => {
  const [filter, setFilter] = useState<TermsTarget | "all">("all");
  const { terms, isLoading, createTerm, updateExistingTerm, deleteTerm } = useTermsList(filter);
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

      {/* Filter and Content section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
              <Filter size={18} />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as TermsTarget | "all")}
              className="bg-slate-50 border border-slate-100 text-slate-700 text-sm rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 block p-2.5 font-bold outline-none cursor-pointer"
            >
              <option value="all">Todos los términos</option>
              <option value="client">Solo para Clientes</option>
              <option value="lawyer">Solo para Abogados</option>
            </select>
          </div>
        </div>

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
