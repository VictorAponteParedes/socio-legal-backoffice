// src/screens/cases/detail/components/CaseProgressTimeline.tsx
import { History, Paperclip } from "lucide-react";
import type { CaseUpdate } from "../../types";

interface Props {
  updates: CaseUpdate[];
}

const getInitials = (name: string, lastname: string) =>
  `${name?.charAt(0) || ""}${lastname?.charAt(0) || ""}`.toUpperCase() || "LW";

export const CaseProgressTimeline = ({ updates }: Props) => {
  if (!updates || updates.length === 0) return null;

  return (
    <div className="bg-white rounded-4xl border border-slate-100 p-8 shadow-sm">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
          <History size={20} />
        </div>
        <div>
          <h3 className="text-lg font-black text-slate-800 tracking-tight leading-none">Progreso de Caso</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 border-0">Línea de tiempo del caso</p>
        </div>
      </div>

      <div className="relative border-l-2 border-slate-100 ml-4 md:ml-6 pl-8 md:pl-10 space-y-10 py-2">
        {updates.map((update) => (
          <div key={update.id} className="relative group">
            {/* Punto del Timeline */}
            <div className="absolute -left-[41px] md:-left-[49px] top-1 w-5 h-5 rounded-full bg-white border-4 border-blue-500 group-hover:scale-125 transition-transform" />
            
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 group-hover:border-blue-100 group-hover:shadow-sm transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-black text-[9px] uppercase tracking-widest rounded-lg mb-2">
                    {update.type}
                  </span>
                  <h4 className="font-bold text-slate-800 text-base">{update.title}</h4>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-slate-400">{new Date(update.createdAt).toLocaleDateString()}</p>
                  <p className="text-[10px] font-medium text-slate-400 mt-0.5">{new Date(update.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
              </div>

              {update.description && (
                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4 whitespace-pre-wrap">
                  {update.description}
                </p>
              )}

              {update.attachmentUrl && (
                <a 
                  href={update.attachmentUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                >
                  <Paperclip size={14} />
                  Ver Archivo Adjunto
                </a>
              )}

              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[9px] font-black">
                  {getInitials(update.lawyer.user.name, update.lawyer.user.lastname)}
                </div>
                <p className="text-xs font-medium text-slate-500">
                  Reportado por: <span className="font-bold text-slate-700">{update.lawyer.user.name} {update.lawyer.user.lastname}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
