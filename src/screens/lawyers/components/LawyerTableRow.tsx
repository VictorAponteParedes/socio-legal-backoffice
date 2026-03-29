// src/screens/lawyers/components/LawyerTableRow.tsx
import { motion } from "framer-motion";
import { Star, ChevronRight, MapPin } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import type { Lawyer } from "../types";

import { useNavigate } from "react-router-dom";
import { RoutesView } from "@/navigation/routes";

interface Props {
  lawyer: Lawyer;
  index: number;
}

export const LawyerTableRow = ({ lawyer, index }: Props) => {
  const { user, rating, isAvailable, specializations } = lawyer;
  const fullName = `${user.name} ${user.lastname}`;
  const initials = `${user.name.charAt(0)}${user.lastname.charAt(0)}`.toUpperCase();
  const navigate = useNavigate();

  const handleGoToDetail = () => {
    navigate(`${RoutesView.LAWYERS}/${lawyer.id}`);
  };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      onClick={handleGoToDetail}
      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
    >
      {/* Abogado Info */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md shrink-0 ring-4 ring-slate-50">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-slate-800 text-[15px] leading-tight truncate">{fullName}</p>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 group-hover:text-indigo-500 transition-colors">
              <MapPin size={11} className="shrink-0" /> {lawyer.city || 'N/A'}
            </p>
          </div>
        </div>
      </td>

      {/* Matrícula */}
      <td className="px-6 py-5">
        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 uppercase tracking-widest shadow-xs">
          {lawyer.license}
        </span>
      </td>

      {/* Especialidades */}
      <td className="px-6 py-5">
        <div className="flex flex-wrap gap-1.5 max-w-[240px]">
          {specializations.slice(0, 2).map((s) => (
            <StatusBadge key={s.id} variant="info">
              {s.name}
            </StatusBadge>
          ))}
          {specializations.length > 2 && (
            <span className="text-[10px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              +{specializations.length - 2}
            </span>
          )}
        </div>
      </td>

      {/* Experiencia */}
      <td className="px-6 py-5">
        <p className="text-sm font-bold text-slate-700">{lawyer.yearsOfExperience} años</p>
      </td>

      {/* Rating */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-1.5 text-sm font-black text-amber-500">
          <Star size={15} className="fill-current" />
          {Number(rating).toFixed(1)}
        </div>
      </td>

      {/* Estado */}
      <td className="px-6 py-5">
        <StatusBadge variant={isAvailable ? "success" : "neutral"} dot>
          {isAvailable ? "Disponible" : "Inactivo"}
        </StatusBadge>
      </td>

      {/* Acciones */}
      <td className="px-6 py-5 text-right">
        <div className="flex items-center justify-end">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all duration-300 transform group-hover:translate-x-1">
            <ChevronRight size={22} />
          </div>
        </div>
      </td>
    </motion.tr>
  );
};

