// src/screens/clients/list/components/ClientsStatsBar.tsx
import { Users, CheckCircle, Clock, RefreshCw } from "lucide-react";
import type { Client } from "../../types";

interface ClientsStatsBarProps {
  clients: Client[];
  filteredCount: number;
  isLoading: boolean;
  onRefetch: () => void;
}

export const ClientsStatsBar = ({
  clients,
  filteredCount,
  isLoading,
  onRefetch,
}: ClientsStatsBarProps) => {
  const totalActive = clients.filter((c) => c.user.status === "active").length;
  const totalPending = clients.filter((c) => c.user.status === "pending").length;

  const stats = [
    {
      label: "Total registrados",
      value: isLoading ? "—" : clients.length,
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
      label: "Activos",
      value: isLoading ? "—" : totalActive,
      icon: <CheckCircle size={18} className="text-emerald-500" />,
      bg: "bg-emerald-50",
    },
    {
      label: "Pendientes",
      value: isLoading ? "—" : totalPending,
      icon: <Clock size={18} className="text-amber-500" />,
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl ${stat.bg} border border-white shadow-sm flex-1 min-w-[200px]`}
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
                   transition-colors disabled:opacity-50 shadow-sm"
      >
        <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
        Actualizar
      </button>
    </div>
  );
};
