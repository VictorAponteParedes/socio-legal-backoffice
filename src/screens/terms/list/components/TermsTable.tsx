import type { Term } from "../../types";
import { Edit2, Trash2 } from "lucide-react";
import { ListSkeleton } from "@/components/ListSkeleton";

interface TermsTableProps {
  terms: Term[];
  isLoading: boolean;
  onEdit: (term: Term) => void;
  onDelete: (id: string) => void;
}

export const TermsTable = ({ terms, isLoading, onEdit, onDelete }: TermsTableProps) => {
  if (isLoading) return <ListSkeleton rows={3} />;

  if (terms.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-slate-100">
        <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-xl font-bold text-slate-800 tracking-tight">No se encontraron términos</p>
        <p className="text-slate-500 font-medium mt-2 max-w-sm mx-auto">
          Aún no has creado términos para este grupo. Comienza creando el primero.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100">
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                Orden
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                Público
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest min-w-[200px]">
                Título
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest min-w-[300px]">
                Descripción
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {terms.map((term) => (
              <tr 
                key={term.id} 
                className="hover:bg-indigo-50/30 transition-colors group"
              >
                <td className="px-6 py-5">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
                    {term.order}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${term.target === 'client' ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'}`}>
                    {term.target === 'client' ? 'Cliente' : 'Abogado'}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-bold text-slate-800">{term.title}</p>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-slate-500 line-clamp-2">
                    {term.description}
                  </p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(term)}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      title="Editar"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if(window.confirm('¿Estás seguro de que deseas eliminar este término?')) {
                          onDelete(term.id);
                        }
                      }}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
