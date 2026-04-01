// src/screens/clients/detail/index.tsx
import { AppDrawer } from "@/components/AppDrawer";
import { useClientDetail } from "./hooks/useClientDetail";
import { ClientSensitiveData } from "./components/ClientSensitiveData";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, ShieldCheck, User, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RoutesView } from "@/navigation/routes";
import { motion } from "framer-motion";
import { getMediaUrl } from "@/helper/media";
import { useState, useEffect } from "react";

const ClientDetailPage = () => {
  const { client, isLoading, isUpdatingStatus, error, handleUpdateStatus } = useClientDetail();
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<"active" | "inactive" | "suspended" | "pending" | "">("");

  useEffect(() => {
    if (client) {
      setSelectedStatus(client.user.status);
    }
  }, [client]);

  if (isLoading) return <AppDrawer><div className="flex items-center justify-center h-full text-slate-400 font-medium animate-pulse">Cargando perfil...</div></AppDrawer>;
  if (error || !client) return <AppDrawer><div className="p-8 text-center text-red-500 font-bold">{error || "Perfil no encontrado"}</div></AppDrawer>;

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
            onClick={() => navigate(RoutesView.CLIENTS)}
            className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all font-bold text-sm group"
          >
            <div className="p-2 rounded-xl group-hover:bg-indigo-50 transition-colors">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            Volver al listado
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card de Perfil (Izquierda) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm text-center relative overflow-hidden group">
              {/* Decoración sutil */}
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <ShieldCheck size={100} />
              </div>

              <div className="w-28 h-28 rounded-[2.5rem] bg-linear-to-br from-indigo-500 to-purple-600 mx-auto flex items-center justify-center text-white text-4xl font-black shadow-2xl mb-6 ring-8 ring-slate-50 transition-transform duration-500 hover:scale-105 overflow-hidden">
                {client.user.profilePicture ? (
                  <img
                    src={getMediaUrl(client.user.profilePicture)}
                    alt={client.user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  `${client.user.name.charAt(0)}${client.user.lastname.charAt(0)}`
                )}
              </div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">
                {client.user.name} {client.user.lastname}
              </h1>
              {client.user.cedula && (
                <p className="text-slate-400 font-mono text-xs mt-2 tracking-widest uppercase font-bold">CI: {client.user.cedula}</p>
              )}
              
              <div className="mt-6 flex justify-center">
                <StatusBadge variant={client.user.status === "active" ? "success" : client.user.status === "pending" ? "warning" : client.user.status === "suspended" ? "error" : "neutral"} dot>
                  {client.user.status === "active" ? "Activo" : client.user.status === "pending" ? "Pendiente" : client.user.status === "suspended" ? "Suspendido" : "Inactivo"}
                </StatusBadge>
              </div>

              {/* Select de estado interactivo */}
              <div className="mt-8 pt-8 border-t border-slate-50 text-left">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 text-center">
                  Estado de la cuenta
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                    disabled={isUpdatingStatus}
                    className={`flex-1 min-w-0 pr-8 pl-4 py-2.5 rounded-xl border appearance-none text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500
                      ${selectedStatus === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        selectedStatus === "suspended" ? "bg-red-50 text-red-700 border-red-200" :
                        selectedStatus === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                  >
                    <option value="pending">Pendiente de Aprobación</option>
                    <option value="active">Activo y Verificado</option>
                    <option value="inactive">Inactivo temporalmente</option>
                    <option value="suspended">Cuenta Suspendida</option>
                  </select>

                  {selectedStatus !== client.user.status && (
                    <button
                      onClick={() => handleUpdateStatus(selectedStatus as any)}
                      disabled={isUpdatingStatus}
                      className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-1.5 font-bold text-sm px-4"
                    >
                      <Save size={16} />
                      Guardar
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Contacto */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-5">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Información General</h3>
              <div className="flex items-center gap-4 text-slate-600 group">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors shrink-0 font-bold"><Mail size={16}/></div>
                <span className="text-sm font-bold truncate">{client.user.email}</span>
              </div>
              {client.user.phone && (
                <div className="flex items-center gap-4 text-slate-600 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors shrink-0 font-bold"><Phone size={16}/></div>
                  <span className="text-sm font-bold truncate">{client.user.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-4 text-slate-600 group text-wrap">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors shrink-0"><MapPin size={16}/></div>
                <span className="text-sm font-bold">{[client.city, client.country].filter(Boolean).join(", ")} {(!client.city && !client.country) && "—"}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-600 group">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors shrink-0"><Calendar size={16}/></div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-black text-slate-300">Registrado el</p>
                  <p className="text-sm font-bold">{new Date(client.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detalles Técnicos y Sensibles (Derecha) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Perfil del cliente */}
            <div className="bg-white rounded-4xl border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">Perfil de Cliente</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Información adicional</p>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-6 border-l-4 border-indigo-500">
                <p className="text-slate-600 text-[15px] leading-relaxed font-medium italic">
                  "{client.preferences || "Este cliente no tiene preferencias adicionales registradas o notas en su perfil."}"
                </p>
              </div>

              {client.address && (
                <div className="mt-8">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Dirección Especificada</h4>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
                    <MapPin className="text-slate-400 shrink-0" size={16} />
                    <span className="text-sm font-semibold text-slate-700">{client.address}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Sección de Datos Sensibles (Hacia abajo) */}
            <ClientSensitiveData />
          </div>
        </div>
      </motion.div>
    </AppDrawer>
  );
};

export default ClientDetailPage;
