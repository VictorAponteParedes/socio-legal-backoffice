// src/screens/lawyers/detail/index.tsx
import { useLawyerDetail } from "./hooks/useLawyerDetail";
import { LawyerSensitiveData } from "./components/LawyerSensitiveData";
import { LawyerChats } from "./components/LawyerChats";
import { AuditSecurityModal } from "./components/AuditSecurityModal";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, Mail, MapPin, Briefcase, Star, Calendar, ShieldCheck, Save, MessageSquare, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RoutesView } from "@/navigation/routes";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { lawyersService } from "../service/lawyersService";
import { useAuth } from "@/store/authStore";

const LawyerDetailPage = () => {
  const { lawyer, chats, isLoading, isLoadingChats, isUpdatingStatus, error, handleUpdateStatus } = useLawyerDetail();
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"profile" | "chats">("profile");
  
  // Seguridad de Auditoría
  const [isAuditUnlocked, setIsAuditUnlocked] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [securityError, setSecurityError] = useState("");

  useEffect(() => {
    if (lawyer) {
      setSelectedStatus(lawyer.user.status);
    }
  }, [lawyer]);

  const handleTabChange = (tab: "profile" | "chats") => {
    if (tab === "chats" && !isAuditUnlocked) {
      setIsSecurityModalOpen(true);
      return;
    }
    setActiveTab(tab);
  };

  const handleVerifyPassword = async (password: string) => {
    if (!token) return;
    setIsVerifying(true);
    setSecurityError("");
    try {
      const isValid = await lawyersService.verifyAuditPassword(password, token);
      if (isValid) {
        setIsAuditUnlocked(true);
        setIsSecurityModalOpen(false);
        setActiveTab("chats");
      } else {
        setSecurityError("Contraseña de auditoría incorrecta.");
      }
    } catch {
      setSecurityError("Error al verificar la seguridad.");
    } finally {
      setIsVerifying(false);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-full text-slate-400 font-medium animate-pulse">Cargando perfil...</div>;
  if (error || !lawyer) return <div className="p-8 text-center text-red-500 font-bold">{error || "Perfil no encontrado"}</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8 pb-10"
    >
      {/* Header Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <button 
          onClick={() => navigate(RoutesView.LAWYERS)}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all font-bold text-sm group"
        >
          <div className="p-2 rounded-xl group-hover:bg-indigo-50 transition-colors">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          Volver al listado
        </button>

        {/* Tab Selector premium */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner border border-slate-200 w-full sm:w-auto">
          <button
            onClick={() => handleTabChange("profile")}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === "profile" 
                ? "bg-white text-indigo-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50/50"
            }`}
          >
            <Briefcase size={16} />
            Perfil Profesional
          </button>
          <button
            onClick={() => handleTabChange("chats")}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === "chats" 
                ? "bg-white text-indigo-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50/50"
            }`}
          >
            <div className="relative">
               <MessageSquare size={16} />
               {!isAuditUnlocked && (
                 <div className="absolute -top-1.5 -right-1.5 text-[8px] bg-red-500 text-white p-0.5 rounded-full border border-white">
                   <Lock size={8} />
                 </div>
               )}
            </div>
            Chats y Clientes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Card de Perfil (Izquierda) - Siempre visible */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm text-center relative overflow-hidden group">
            {/* Decoración sutil */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <ShieldCheck size={100} />
            </div>

            <div className="w-28 h-28 rounded-[2.5rem] bg-linear-to-br from-indigo-500 to-purple-600 mx-auto flex items-center justify-center text-white text-4xl font-black shadow-2xl mb-6 ring-8 ring-slate-50 transition-transform duration-500 hover:scale-105">
              {lawyer.user.name.charAt(0)}{lawyer.user.lastname.charAt(0)}
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">
              {lawyer.user.name} {lawyer.user.lastname}
            </h1>
            <p className="text-slate-400 font-mono text-xs mt-2 tracking-widest uppercase font-bold">Matrícula: {lawyer.license}</p>
            
            <div className="mt-6 flex justify-center">
              <StatusBadge 
                variant={(lawyer.user.status as string) === "active" ? "success" : (lawyer.user.status as string) === "pending" ? "warning" : (lawyer.user.status as string) === "suspended" ? "error" : "neutral"} 
                dot
              >
                {(lawyer.user.status as string) === "active" ? "Activo" : (lawyer.user.status as string) === "pending" ? "Pendiente" : (lawyer.user.status as string) === "suspended" ? "Suspendido" : "Inactivo"}
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
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  disabled={isUpdatingStatus}
                  className={`flex-1 min-w-0 pr-8 pl-4 py-2.5 rounded-xl border appearance-none text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500
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

                {selectedStatus !== lawyer.user.status && (
                  <button
                    onClick={() => handleUpdateStatus(selectedStatus)}
                    disabled={isUpdatingStatus}
                    className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-1.5 font-bold text-sm px-4"
                  >
                    <Save size={16} />
                    Guardar
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-50">
              <div className="text-center group-hover:scale-105 transition-transform">
                <p className="text-2xl font-black text-slate-800">{lawyer.yearsOfExperience}</p>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Años Exp.</p>
              </div>
              <div className="text-center border-l border-slate-50 group-hover:scale-105 transition-transform">
                <p className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1.5">
                  <Star size={18} className="fill-current" /> {Number(lawyer.rating).toFixed(1)}
                </p>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{lawyer.totalReviews} Reviews</p>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-5">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Información General</h3>
            <div className="flex items-center gap-4 text-slate-600 group">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors shrink-0 font-bold"><Mail size={16}/></div>
              <span className="text-sm font-bold truncate">{lawyer.user.email}</span>
            </div>
            <div className="flex items-center gap-4 text-slate-600 group text-wrap">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors shrink-0"><MapPin size={16}/></div>
              <span className="text-sm font-bold">Asunción, Paraguay</span>
            </div>
            <div className="flex items-center gap-4 text-slate-600 group">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors shrink-0"><Calendar size={16}/></div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-black text-slate-300">Registrado el</p>
                <p className="text-sm font-bold">{new Date(lawyer.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detalles Dinámicos (Derecha) */}
        <div className="lg:col-span-8 space-y-8">
          {activeTab === "profile" ? (
             <motion.div
               key="profile-tab"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-8"
             >
                <LawyerSensitiveData />

                {/* Perfil Profesional */}
                <div className="bg-white rounded-4xl border border-slate-100 p-8 shadow-sm">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-800 tracking-tight">Perfil Profesional</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Resumen curricular</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-6 border-l-4 border-indigo-500">
                    <p className="text-slate-600 text-[15px] leading-relaxed font-medium italic">
                      "{lawyer.bio || "Este profesional aún no ha proporcionado una biografía detallada para su perfil."}"
                    </p>
                  </div>

                  <div className="mt-10">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Especialidades Certificadas</h4>
                    <div className="flex flex-wrap gap-2">
                      {lawyer.specializations.map(s => (
                        <div key={s.id} className="px-5 py-2.5 bg-white border border-slate-100 rounded-2xl text-xs font-black text-indigo-600 shadow-xs flex items-center gap-2.5 hover:border-indigo-200 transition-colors group">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                          {s.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
             </motion.div>
          ) : (
             <motion.div
               key="chats-tab"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
             >
                <LawyerChats chats={chats} isLoading={isLoadingChats} />
             </motion.div>
          )}
        </div>
      </div>

      <AuditSecurityModal 
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        onConfirm={handleVerifyPassword}
        isVerifying={isVerifying}
        error={securityError}
      />
    </motion.div>
  );
};

export default LawyerDetailPage;
