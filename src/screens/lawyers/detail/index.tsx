// src/screens/lawyers/detail/index.tsx
import { AppDrawer } from "@/components/AppDrawer";
import { useLawyerDetail } from "./hooks/useLawyerDetail";
import { LawyerSensitiveData } from "./components/LawyerSensitiveData";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, Star, Calendar, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RoutesView } from "@/navigation/routes";
import { motion } from "framer-motion";

const LawyerDetailPage = () => {
  const { lawyer, isLoading, error } = useLawyerDetail();
  const navigate = useNavigate();

  if (isLoading) return <AppDrawer><div className="flex items-center justify-center h-full text-slate-400 font-medium animate-pulse">Cargando perfil...</div></AppDrawer>;
  if (error || !lawyer) return <AppDrawer><div className="p-8 text-center text-red-500 font-bold">{error || "Perfil no encontrado"}</div></AppDrawer>;

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
            onClick={() => navigate(RoutesView.LAWYERS)}
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

              <div className="w-28 h-28 rounded-[2.5rem] bg-linear-to-br from-indigo-500 to-purple-600 mx-auto flex items-center justify-center text-white text-4xl font-black shadow-2xl mb-6 ring-8 ring-slate-50 transition-transform duration-500 hover:scale-105">
                {lawyer.user.name.charAt(0)}{lawyer.user.lastname.charAt(0)}
              </div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">
                {lawyer.user.name} {lawyer.user.lastname}
              </h1>
              <p className="text-slate-400 font-mono text-xs mt-2 tracking-widest uppercase font-bold">Matrícula: {lawyer.license}</p>
              
              <div className="mt-6 flex justify-center">
                <StatusBadge variant={lawyer.isAvailable ? "success" : "neutral"} dot>
                  {lawyer.isAvailable ? "Disponible" : "Inactivo"}
                </StatusBadge>
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

          {/* Detalles Técnicos y Sensibles (Derecha) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Sección de Datos Sensibles */}
            <LawyerSensitiveData />

            {/* Perfil Profesional */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
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
          </div>
        </div>
      </motion.div>
    </AppDrawer>
  );
};

export default LawyerDetailPage;
