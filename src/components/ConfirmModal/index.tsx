// src/components/ConfirmModal/index.tsx
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onClose,
  variant = "danger",
  isLoading = false,
}: ConfirmModalProps) => {
  const variants = {
    danger: {
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      btnBg: "bg-red-600 hover:bg-red-700",
      shadow: "shadow-red-100",
    },
    warning: {
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      btnBg: "bg-amber-600 hover:bg-amber-700",
      shadow: "shadow-amber-100",
    },
    info: {
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      btnBg: "bg-indigo-600 hover:bg-indigo-700",
      shadow: "shadow-indigo-100",
    },
  };

  const style = variants[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl ${style.iconBg} ${style.iconColor} flex items-center justify-center mb-6`}>
                  <AlertCircle size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3.5 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`flex-1 ${style.btnBg} text-white px-6 py-3.5 rounded-2xl font-bold transition-all shadow-lg ${style.shadow} flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50`}
                >
                  {isLoading ? "Procesando..." : confirmText}
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
