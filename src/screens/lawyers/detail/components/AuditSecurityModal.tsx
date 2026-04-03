import { useState } from "react";
import { ShieldAlert, Lock, ArrowRight, X, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

interface AuditSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  isVerifying: boolean;
  error?: string;
}

export const AuditSecurityModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isVerifying,
  error 
}: AuditSecurityModalProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    onConfirm(password);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl border border-slate-100"
      >
        {/* Header Decorativo */}
        <div className="bg-red-50 p-8 text-center relative">
          <div className="absolute top-4 right-4">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-red-100 rounded-xl transition-colors text-red-400"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-red-500 border border-red-100">
            <ShieldAlert size={32} />
          </div>
          
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Acceso Restringido</h2>
          <p className="text-xs text-red-600 font-bold uppercase tracking-widest mt-2 px-6 leading-relaxed">
            Esta sección es de auditoría crítica. Todo acceso será registrado con tu usuario y hora actual.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Contraseña de Auditoría
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoFocus
                className={`w-full pl-11 pr-12 py-3.5 bg-slate-50 border rounded-2xl text-sm font-bold transition-all focus:outline-none focus:ring-4
                  ${error 
                    ? 'border-red-200 focus:ring-red-500/10 focus:border-red-400' 
                    : 'border-slate-100 focus:ring-indigo-500/10 focus:border-indigo-500'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && (
              <p className="text-[10px] font-bold text-red-500 mt-2 ml-1 text-center bg-red-50 py-1 rounded-lg">
                ⚠️ {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!password || isVerifying}
            className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-black text-sm transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {isVerifying ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Confirmar Acceso
                <ArrowRight size={18} />
              </>
            )}
          </button>
          
          <p className="text-[10px] text-center text-slate-400 font-medium px-4">
            Al continuar, aceptas que tu actividad sea monitoreada bajo las políticas de protección de datos.
          </p>
        </form>
      </motion.div>
    </div>
  );
};
