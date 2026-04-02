import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Scale, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import type { CreateTermDto, Term } from "../../types";

interface CreateTermModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dto: CreateTermDto) => Promise<void>;
  onUpdate?: (id: string, dto: Partial<CreateTermDto>) => Promise<void>;
  termToEdit?: Term | null;
}

export const CreateTermModal = ({ isOpen, onClose, onSubmit, onUpdate, termToEdit }: CreateTermModalProps) => {
  const [formData, setFormData] = useState<CreateTermDto>({
    title: "",
    description: "",
    target: "client",
    order: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (termToEdit) {
        setFormData({
          title: termToEdit.title,
          description: termToEdit.description,
          target: termToEdit.target,
          order: termToEdit.order,
        });
      } else {
        setFormData({ title: "", description: "", target: "client", order: 0 });
      }
      setError(null);
    }
  }, [isOpen, termToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setError("El título y la descripción son obligatorios.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const submitData = { ...formData, order: Number(formData.order) };

    try {
      if (termToEdit && onUpdate) {
        await onUpdate(termToEdit.id, submitData);
        toast.success("Término actualizado correctamente");
      } else {
        await onSubmit(submitData);
        toast.success("Término creado correctamente");
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error al guardar el término.");
      toast.error("Error al guardar");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Scale size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-slate-800">
                  {termToEdit ? "Editar Término" : "Crear Nuevo Término"}
                </h3>
                <p className="text-sm font-medium text-slate-500">
                  {termToEdit ? "Modifica los detalles del término." : "Añade un nuevo ítem a los términos y condiciones."}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 overflow-y-auto">
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 border border-red-100">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <form id="term-form" onSubmit={handleSubmit} className="space-y-6">
              {/* Field: target */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Público Objetivo</label>
                <div className="flex gap-2">
                  <label className={`flex-1 cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${formData.target === "client" ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-slate-100 bg-white text-slate-500 hover:border-slate-200"}`}>
                    <input type="radio" value="client" checked={formData.target === "client"} onChange={() => setFormData({ ...formData, target: "client" })} className="hidden" />
                    <span className="block font-bold">Cliente</span>
                    <span className="block text-xs mt-1">Visible en la App Cliente</span>
                  </label>
                  <label className={`flex-1 cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${formData.target === "lawyer" ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-slate-100 bg-white text-slate-500 hover:border-slate-200"}`}>
                    <input type="radio" value="lawyer" checked={formData.target === "lawyer"} onChange={() => setFormData({ ...formData, target: "lawyer" })} className="hidden" />
                    <span className="block font-bold">Abogado</span>
                    <span className="block text-xs mt-1">Visible en la App Abogado</span>
                  </label>
                </div>
              </div>

              {/* Field: order */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Orden de Visualización</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full h-12 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  min="0"
                />
                <p className="text-xs text-slate-500 mt-2 font-medium">Define la posición en la que aparecerá este punto en la lista.</p>
              </div>

              {/* Field: title */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Título del Punto</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej: 1. Descripción del Servicio"
                  className="w-full h-12 px-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* Field: description */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Escribe los detalles aquí..."
                  rows={6}
                  className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none resize-none placeholder:text-slate-400 font-medium"
                />
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="term-form"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {termToEdit ? "Guardar Cambios" : "Guardar Término"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
