// src/screens/lawyers/components/LawyersStatsBar.tsx
import { Users, CheckCircle, Star, RefreshCw } from "lucide-react";
import type { Lawyer } from "../types";

interface LawyersStatsBarProps {
  lawyers: Lawyer[];
  filteredCount: number;
  isLoading: boolean;
  onRefetch: () => void;
}

export const LawyersStatsBar = ({
  lawyers,
  filteredCount,
  isLoading,
  onRefetch,
}: LawyersStatsBarProps) => {
  const totalAvailable = lawyers.filter((l) => l.isAvailable).length;
  const avgRating =
    lawyers.length > 0
      ? (
          lawyers.reduce((sum, l) => sum + Number(l.rating), 0) / lawyers.length
        ).toFixed(1)
      : "—";

  const stats = [
    {
      label: "Total registrados",
      value: isLoading ? "—" : lawyers.length,
      icon: <Users size={18} className="text-indigo-500" />,
      bg: "bg-indigo-50",
    },
    {
      label: "Mostrando",
      value: isLoading ? "—" : filteredCount,
      icon: <Users size={18} className="text-slate-500" />,
      bg: "bg-slate-50",
    },
    {
      label: "Disponibles",
      value: isLoading ? "—" : totalAvailable,
      icon: <CheckCircle size={18} className="text-emerald-500" />,
      bg: "bg-emerald-50",
    },
    {
      label: "Rating promedio",
      value: isLoading ? "—" : avgRating,
      icon: <Star size={18} className="text-amber-500" />,
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl ${stat.bg} border border-white`}
        >
          {stat.icon}
          <div>
            <p className="text-xs text-slate-500 leading-none">{stat.label}</p>
            <p className="text-lg font-bold text-slate-800 leading-tight">
              {stat.value}
            </p>
          </div>
        </div>
      ))}

      <button
        onClick={onRefetch}
        disabled={isLoading}
        title="Actualizar lista"
        className="ml-auto flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-200
                   text-sm text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600
                   transition-colors disabled:opacity-50"
      >
        <RefreshCw
          size={15}
          className={isLoading ? "animate-spin" : ""}
        />
        Actualizar
      </button>
    </div>
  );
};
