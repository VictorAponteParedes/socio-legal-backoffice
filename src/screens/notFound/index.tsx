// src/screens/notFound/index.tsx
import { useNavigate } from "react-router-dom";
import { RoutesView } from "@/navigation/routes";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-purple-100 rounded-full blur-[100px] opacity-40" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full text-center relative z-10"
      >
        <div className="relative mb-12">
          {/* Main 404 text with glassmorphism */}
          <h1 className="text-[150px] font-black text-slate-100 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div
               animate={{ 
                 y: [0, -20, 0],
                 rotate: [0, 5, -5, 0]
               }}
               transition={{ 
                 duration: 6, 
                 repeat: Infinity, 
                 ease: "easeInOut" 
               }}
               className="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-indigo-600 border border-slate-100/50 backdrop-blur-xl"
             >
               <Search size={64} strokeWidth={1.5} />
             </motion.div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Vaya, parece que te has perdido...
          </h2>
          <p className="text-slate-500 font-medium max-w-sm mx-auto">
            La página que buscas no existe o ha sido movida. No te preocupes, ¡un tropezón no es caída! 
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-600 font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            <ArrowLeft size={18} />
            Regresar
          </button>
          
          <button
            onClick={() => navigate(RoutesView.DASHBOARD)}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-black text-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-200"
          >
            <Home size={18} />
            Ir al Dashboard
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200/50">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
            Socio-Legal Backoffice • v1.0.0
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;