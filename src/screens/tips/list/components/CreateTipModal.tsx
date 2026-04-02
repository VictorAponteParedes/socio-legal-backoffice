// src/screens/tips/list/components/CreateTipModal.tsx
import { useState } from "react";
import { X, Lightbulb, Loader2 } from "lucide-react";
import type { CreateTipDto, TipTargetRole } from "../../types";

interface CreateTipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dto: CreateTipDto) => Promise<void>;
}

export const CreateTipModal = ({ isOpen, onClose, onSave }: CreateTipModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetRole, setTargetRole] = useState<TipTargetRole>("all");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setTargetRole("all");
    setError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("El título y la descripción son obligatorios.");
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      await onSave({ title: title.trim(), description: description.trim(), targetRole });
      handleClose();
    } catch {
      setError("Error al guardar el consejo. Inténtalo de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Lightbulb size={20} />
            </div>
            <div>
              <h2 className="font-black text-slate-800 text-lg leading-none">Nuevo Consejo</h2>
              <p className="text-xs text-slate-400 font-medium mt-1">Se mostrará en la app móvil</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">
              Título del consejo *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Cómo preparar un buen contrato..."
              maxLength={120}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:bg-white text-sm font-semibold text-slate-700 placeholder-slate-400 outline-none transition-all"
            />
            <p className="text-right text-[11px] text-slate-300 font-bold">{title.length}/120</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">
              Descripción *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Escribe el contenido del consejo que verán los usuarios en la app..."
              maxLength={500}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:bg-white text-sm font-medium text-slate-700 placeholder-slate-400 outline-none transition-all resize-none"
            />
            <p className="text-right text-[11px] text-slate-300 font-bold">{description.length}/500</p>
          </div>

          {/* Target Role */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">
              Destinado a *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["client", "lawyer", "all"] as TipTargetRole[]).map((role) => {
                const labels = { client: "Clientes", lawyer: "Abogados", all: "Todos" };
                const colors = {
                  client: "border-emerald-500 bg-emerald-50 text-emerald-700",
                  lawyer: "border-indigo-500 bg-indigo-50 text-indigo-700",
                  all: "border-slate-500 bg-slate-100 text-slate-700",
                };
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setTargetRole(role)}
                    className={`py-3 rounded-xl text-sm font-black border-2 transition-all ${
                      targetRole === role
                        ? colors[role]
                        : "border-slate-200 bg-white text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    {labels[role]}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <p className="text-sm font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-black text-sm hover:bg-slate-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving ? <><Loader2 size={16} className="animate-spin" /> Guardando...</> : "Crear Consejo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
