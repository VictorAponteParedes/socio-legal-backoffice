// src/screens/clients/detail/components/ClientSensitiveData.tsx
import { ShieldAlert, UserCheck, MessageSquare, FileText, Lock } from "lucide-react";

export const ClientSensitiveData = () => {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border border-white/5">
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <ShieldAlert size={160} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <Lock size={22} />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight">Datos Sensibles y Resguardo</h3>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Protocolo de seguridad activo</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-lg bg-indigo-500/10"><UserCheck className="text-indigo-400" size={20} /></div>
              <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Abogados</span>
            </div>
            <p className="text-4xl font-black text-white">—</p>
            <p className="text-[10px] text-slate-500 mt-2 uppercase font-medium">Verificación única</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10"><MessageSquare className="text-emerald-400" size={20} /></div>
              <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Mensajes</span>
            </div>
            <p className="text-4xl font-black text-white">—</p>
            <p className="text-[10px] text-slate-500 mt-2 uppercase font-medium">Chat encriptado</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-lg bg-amber-500/10"><FileText className="text-amber-400" size={20} /></div>
              <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Documentos</span>
            </div>
            <p className="text-4xl font-black text-white">—</p>
            <p className="text-[10px] text-slate-500 mt-2 uppercase font-medium">Storage cifrado</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex items-start gap-4">
            <div className="flex -space-x-3 shrink-0">
               {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[9px] font-black text-slate-400">P{i}</div>
              ))}
            </div>
            <p className="text-slate-500 text-xs font-medium leading-relaxed">
              Toda interacción entre este cliente y los profesionales se encuentra bajo cifrado de extremo a extremo. El acceso a esta información está estrictamente limitado a auditorías autorizadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
