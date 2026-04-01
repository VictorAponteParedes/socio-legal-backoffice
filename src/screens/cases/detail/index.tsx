// src/screens/cases/detail/index.tsx
import { AppDrawer } from "@/components/AppDrawer";
import { useCaseDetail } from "./hooks/useCaseDetail";
import { ArrowLeft, User, Mail, Calendar, Scale, Briefcase, ChevronRight, FileText, CheckCircle, Wallet, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RoutesView } from "@/navigation/routes";
import { motion } from "framer-motion";
import { StatusBadge } from "@/components/StatusBadge";

const getInitials = (name: string, lastname: string) =>
  `${name?.charAt(0) || ""}${lastname?.charAt(0) || ""}`.toUpperCase() || "CL";

const CaseDetailPage = () => {
  const { caseItem, isLoading, error } = useCaseDetail();
  const navigate = useNavigate();

  if (isLoading) return <AppDrawer><div className="flex items-center justify-center h-full text-slate-400 font-medium animate-pulse">Cargando caso...</div></AppDrawer>;
  if (error || !caseItem) return <AppDrawer><div className="p-8 text-center text-red-500 font-bold">{error || "Caso no encontrado"}</div></AppDrawer>;

  return (
    <AppDrawer>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8 pb-10"
      >
        {/* Header Action */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(RoutesView.CASES)}
            className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all font-bold text-sm group"
          >
            <div className="p-2 rounded-xl group-hover:bg-indigo-50 transition-colors">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            Volver a Casos
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card de Detalles Principales (Izquierda) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <Briefcase size={100} />
              </div>

              <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-blue-500 to-indigo-600 mx-auto flex items-center justify-center text-white shadow-2xl mb-6 ring-8 ring-slate-50 transition-transform duration-500 hover:scale-105">
                <FileText size={40} />
              </div>
              
              <h1 className="text-xl font-black text-slate-800 tracking-tight leading-tight line-clamp-2">
                {caseItem.title}
              </h1>
              <p className="text-slate-400 font-mono text-xs mt-2 font-bold uppercase tracking-widest leading-relaxed">
                Categoría: {caseItem.category}
              </p>
              
              <div className="mt-6 flex justify-center">
                <StatusBadge 
                  variant={
                    caseItem.status === "aceptado" ? "success" : 
                    caseItem.status === "cerrado" ? "neutral" : 
                    "warning"
                  } 
                  dot
                >
                  {caseItem.status}
                </StatusBadge>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-50">
                <div className="text-center group-hover:scale-105 transition-transform">
                  <p className="text-xl font-black text-amber-500 capitalize flex justify-center items-center gap-1.5 line-clamp-1">
                    <AlertCircle size={16} />
                    {caseItem.urgency}
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Urgencia</p>
                </div>
                <div className="text-center border-l border-slate-50 group-hover:scale-105 transition-transform">
                  <p className="text-xl font-black text-slate-800 line-clamp-1">
                    {caseItem.budget ? `$${caseItem.budget}` : "A Convenir"}
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Presupuesto</p>
                </div>
              </div>
            </div>

            {/* Abogado Asignado (Si lo hay) */}
            {caseItem.assignedLawyer && (
              <div className="bg-indigo-50/50 rounded-3xl border border-indigo-100 p-6 flex flex-col justify-center items-center gap-4 text-center">
                <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest w-full">Representante Legal</h3>
                <div className="w-16 h-16 rounded-2xl bg-indigo-500 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-indigo-500/20">
                  {getInitials(caseItem.assignedLawyer.user.name, caseItem.assignedLawyer.user.lastname)}
                </div>
                <div>
                  <p className="text-slate-800 font-bold text-lg leading-tight line-clamp-1">
                    {caseItem.assignedLawyer.user.name} {caseItem.assignedLawyer.user.lastname}
                  </p>
                  <p className="text-indigo-500 font-mono text-[10px] font-bold mt-1 tracking-widest line-clamp-1">{caseItem.assignedLawyer.license}</p>
                </div>
                <button 
                  onClick={() => navigate(RoutesView.LAWYERS_DETAIL.replace(":id", caseItem.assignedLawyer!.id))}
                  className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center justify-center bg-white px-4 py-2 rounded-xl transition-all hover:shadow-sm"
                >
                  Ver Perfil
                </button>
              </div>
            )}
          </div>

          {/* Bloque Central de Información (Derecha) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Descripción del Caso */}
            <div className="bg-white rounded-4xl border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 tracking-tight leading-none">Descripción del Caso</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 border-0">Narrativa y Reporte</p>
                </div>
              </div>
              <div className="bg-slate-50/50 rounded-2xl p-6 border-l-4 border-orange-400">
                <p className="text-slate-600 text-sm leading-relaxed font-medium whitespace-pre-wrap">
                  {caseItem.description || "No hay detalles proporcionados por el cliente."}
                </p>
              </div>
            </div>

            {/* Tarjeta del Cliente Originador */}
            <div className="bg-white rounded-4xl border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-800 tracking-tight leading-none">Detalles del Cliente</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Originador de la Solicitud</p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate(RoutesView.CLIENTS_DETAIL.replace(":id", caseItem.clientId))}
                  className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 hover:bg-emerald-100 font-bold px-4 py-2.5 rounded-xl transition-colors"
                >
                  Ver Cliente <ChevronRight size={14} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5"><User size={12}/> Nombre Completo</span>
                  <p className="text-sm font-bold text-slate-700">{caseItem.client.name} {caseItem.client.lastname}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5"><Mail size={12}/> Correo Electrónico</span>
                  <p className="text-sm font-bold text-slate-700">{caseItem.client.email}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5"><Calendar size={12}/> Fecha de Registro</span>
                  <p className="text-sm font-bold text-slate-700">{new Date(caseItem.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Propuestas Realizadas al Caso */}
            {caseItem.proposals && caseItem.proposals.length > 0 && (
              <div className="bg-white rounded-4xl border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                    <Scale size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-800 tracking-tight leading-none">Propuestas Recibidas</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Licitaciones de abogados para el caso</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {caseItem.proposals.map(proposal => (
                    <div key={proposal.id} className={`flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border ${proposal.status === "accepted" ? "border-indigo-200 bg-indigo-50/30" : "border-slate-100 bg-slate-50"} gap-4`}>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex justify-center items-center font-bold text-xs">
                          {getInitials(proposal.lawyer.user.name, proposal.lawyer.user.lastname)}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-800">{proposal.lawyer.user.name} {proposal.lawyer.user.lastname}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">{proposal.message}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0 px-2 lg:px-0">
                        <div className="text-right">
                          <p className="font-bold text-sm text-slate-800 flex items-center gap-1"><Wallet size={14}/> ${proposal.proposedFee}</p>
                          <p className="text-xs text-slate-400">{proposal.estimatedDuration}</p>
                        </div>
                        <StatusBadge variant={proposal.status === "accepted" ? "success" : proposal.status === "rejected" ? "error" : "warning"}>
                          {proposal.status}
                        </StatusBadge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cierre del caso (Si lo hay) */}
            {caseItem.closure && (
              <div className="bg-slate-800 rounded-4xl p-8 shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <CheckCircle size={150} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white backdrop-blur-sm">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black tracking-tight leading-none">Resolución del Caso</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Cierre oficializado el {new Date(caseItem.closure.closedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md mb-6">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Resultado</p>
                    <p className="text-lg font-bold text-emerald-400 capitalize">{caseItem.closure.result}</p>
                    <hr className="border-white/10 my-4" />
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Justificación del Cierre</p>
                    <p className="text-sm font-medium text-slate-200 mt-2">{caseItem.closure.closureReason}</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </motion.div>
    </AppDrawer>
  );
};

export default CaseDetailPage;
