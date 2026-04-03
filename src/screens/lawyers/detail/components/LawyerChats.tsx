import { useState } from "react";
import { MessageSquare, Users, ArrowRight, ArrowLeft, ChevronRight, Search, FileText } from "lucide-react";
import { lawyersService } from "../../service/lawyersService";
import { useAuth } from "@/store/authStore";
import { motion } from "framer-motion";

interface LawyerChatsProps {
  chats: any[];
  isLoading: boolean;
}

type ViewState = 
  | { type: 'clients' } 
  | { type: 'client-chats', client: any } 
  | { type: 'audit', chat: any, client: any };

export const LawyerChats = ({ chats, isLoading }: LawyerChatsProps) => {
  const [viewState, setViewState] = useState<ViewState>({ type: 'clients' });
  const [auditData, setAuditData] = useState<any>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const { token } = useAuth();

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-slate-50 rounded-2xl w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 p-12 shadow-sm text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
          <MessageSquare size={32} />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Sin conversaciones</h3>
        <p className="text-slate-500 text-sm mt-1">Este abogado aún no ha iniciado chats con clientes.</p>
      </div>
    );
  }

  const handleAuditChat = async (chat: any, client: any) => {
    if (!token) return;
    setViewState({ type: 'audit', chat, client });
    setIsAuditing(true);
    setAuditData(null);
    try {
      const fullChat = await lawyersService.getChatAudit(chat.id, token);
      setAuditData(fullChat);
    } catch {
      // Error manejable
    } finally {
      setIsAuditing(false);
    }
  };

  // 1. Vista de Clientes
  if (viewState.type === 'clients') {
    const uniqueClients = Array.from(new Set(chats.map(chat => chat.client.id)))
      .map(id => chats.find(chat => chat.client.id === id).client);

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Users size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Clientes Asociados</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Selecciona un cliente para ver sus casos</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {uniqueClients.map((client) => {
              const clientChatsCount = chats.filter(c => c.client.id === client.id).length;
              return (
                <button
                  key={client.id}
                  onClick={() => setViewState({ type: 'client-chats', client })}
                  className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all group text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg group-hover:scale-110 transition-transform">
                    {client.name.charAt(0)}{client.lastname.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 truncate">{client.name} {client.lastname}</p>
                    <p className="text-xs text-slate-500 font-medium">
                      {clientChatsCount} {clientChatsCount === 1 ? 'conversación' : 'conversaciones'}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  }

  // 2. Vista de Chats del Cliente
  if (viewState.type === 'client-chats') {
     const clientChats = chats.filter(c => c.client.id === viewState.client.id);

     return (
       <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
         <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
           <button 
             onClick={() => setViewState({ type: 'clients' })}
             className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest mb-6 transition-colors"
           >
             <ArrowLeft size={14} /> Volver a clientes
           </button>

           <div className="flex items-center gap-4 mb-8">
             <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 font-black text-xs">
                {viewState.client.name.charAt(0)}{viewState.client.lastname.charAt(0)}
             </div>
             <div>
               <h3 className="text-lg font-black text-slate-800 tracking-tight">Chats con {viewState.client.name}</h3>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                 {clientChats.length} {clientChats.length === 1 ? 'caso activo' : 'casos activos'} con este cliente
               </p>
             </div>
           </div>

           <div className="space-y-3">
             {clientChats.map((chat) => (
               <button 
                 key={chat.id}
                 onClick={() => handleAuditChat(chat, viewState.client)}
                 className="w-full flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all group"
               >
                 <div className="flex items-center gap-4">
                   <div className="p-2.5 rounded-xl bg-white border border-slate-100 text-slate-400 group-hover:text-indigo-500 shadow-xs">
                     {chat.case ? <FileText size={18} /> : <MessageSquare size={18} />}
                   </div>
                   <div className="text-left">
                     <p className="font-bold text-slate-800 flex items-center gap-2">
                       {chat.case ? chat.case.title : 'Consulta Directa'}
                       {chat.case && (
                         <span className="text-[10px] bg-slate-50 text-slate-400 px-2 rounded-lg py-0.5 font-black border border-slate-100">
                           #{chat.case.id}
                         </span>
                       )}
                     </p>
                     <p className="text-xs text-slate-400 font-medium mt-0.5">Última actividad: {new Date(chat.updatedAt).toLocaleDateString()}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                   Auditar <ArrowRight size={14} />
                 </div>
               </button>
             ))}
           </div>
         </div>
       </motion.div>
     );
  }

  // 3. Auditoría de Mensajes (Bubble Audit)
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
       <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col min-h-[600px] max-h-[800px] overflow-hidden">
          {/* Header del Chat */}
          <div className="p-6 border-b border-slate-50 bg-white flex items-center justify-between sticky top-0 z-10 shadow-xs">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setViewState({ type: 'client-chats', client: viewState.client })}
                className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-xs"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h4 className="font-black text-slate-800 tracking-tight flex items-center gap-2">
                  {viewState.chat.case ? viewState.chat.case.title : `Chat con ${viewState.client.name}`}
                </h4>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                  {viewState.chat.case ? `Expediente #${viewState.chat.case.id}` : 'Consulta Directa'}
                </p>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-3 bg-red-50 text-red-600 px-4 py-2 rounded-2xl border border-red-100">
               <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest">Modo Monitor</span>
            </div>
          </div>

          {/* Cuerpo del Chat */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 scroll-smooth">
             {isAuditing ? (
               <div className="flex flex-col items-center justify-center h-full space-y-4">
                 <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                 <p className="text-slate-400 font-bold text-sm">Extrayendo registro de mensajes...</p>
               </div>
             ) : auditData?.messages && auditData.messages.length > 0 ? (
               auditData.messages.map((msg: any, idx: number) => {
                 const isLawyer = msg.sender.id === chats[0].lawyer.user.id;
                 return (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={msg.id} 
                      className={`flex ${isLawyer ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] flex flex-col ${isLawyer ? 'items-end' : 'items-start'}`}>
                         <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1 px-2">
                            {isLawyer ? 'Abogado' : 'Cliente'} • {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                         </span>
                         <div className={`px-5 py-3.5 rounded-2xl shadow-sm border text-[14px] leading-relaxed font-medium
                           ${isLawyer 
                             ? 'bg-indigo-600 border-indigo-500 text-white rounded-tr-none' 
                             : 'bg-white border-slate-100 text-slate-700 rounded-tl-none'}`}
                         >
                            {msg.content === '[🔒 Oculto por seguridad]' ? (
                              <span className="flex items-center gap-2 opacity-70 italic text-xs">
                                <Search size={12} /> Datos sensibles filtrados
                              </span>
                            ) : msg.content}
                         </div>
                      </div>
                    </motion.div>
                 );
               })
             ) : (
               <div className="flex flex-col items-center justify-center h-full text-slate-300">
                  <MessageSquare size={48} className="opacity-20 mb-4" />
                  <p className="font-bold">No hay mensajes registrados en este chat</p>
               </div>
             )}
          </div>

          <div className="p-4 bg-white border-t border-slate-50 text-center">
             <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                Registro de auditoría inmutable • Solo lectura administrativa
             </p>
          </div>
       </div>
    </motion.div>
  );
};
