// src/screens/tips/list/index.tsx
import { useState, useMemo } from "react";
import { useTipsList } from "./hooks/useTipsList";
import { TipsSearchBar } from "./components/TipsSearchBar";
import { TipsTable } from "./components/TipsTable";
import { CreateTipModal } from "./components/CreateTipModal";
import { ConfirmModal } from "@/components/ConfirmModal";
import { ListSkeleton } from "@/components/ListSkeleton";
import { Lightbulb, UserCheck, Briefcase, Users } from "lucide-react";
import type { TipTargetRole } from "../types";

const TipsList = () => {
  const [roleFilter, setRoleFilter] = useState<TipTargetRole | "">("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; title: string } | null>(null);

  const { tips, isLoading, error, createTip, deleteTip, refetch } = useTipsList(
    roleFilter as TipTargetRole | undefined
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return tips;
    const q = search.toLowerCase();
    return tips.filter(
      (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }, [tips, search]);

  const hasActiveFilters = !!search || !!roleFilter;

  const handleClearFilters = () => {
    setSearch("");
    setRoleFilter("");
  };

  const handleDelete = async () => {
    if (deleteConfirm) {
      await deleteTip(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  const statsData = [
    {
      label: "Total Consejos",
      count: tips.length,
      icon: <Lightbulb size={22} />,
      color: "bg-amber-50 text-amber-500",
    },
    {
      label: "Para Clientes",
      count: tips.filter((t) => t.targetRole === "client" || t.targetRole === "all").length,
      icon: <UserCheck size={22} />,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Para Abogados",
      count: tips.filter((t) => t.targetRole === "lawyer" || t.targetRole === "all").length,
      icon: <Briefcase size={22} />,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Para Todos",
      count: tips.filter((t) => t.targetRole === "all").length,
      icon: <Users size={22} />,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  if (isLoading) return <ListSkeleton rows={8} />;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Consejos del Día</h1>
        <p className="text-slate-500 text-sm mt-1">
          Gestiona los consejos que se muestran a clientes y abogados en la app móvil.
        </p>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
          >
            <div className={`w-11 h-11 rounded-xl ${stat.color} flex items-center justify-center shrink-0`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 leading-none">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-800 mt-1">{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <TipsSearchBar
        search={search}
        onSearchChange={setSearch}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={handleClearFilters}
        onCreateOpen={() => setIsModalOpen(true)}
        onRefetch={refetch}
      />

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl font-bold text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <TipsTable
          tips={filtered}
          onDelete={(id) => {
            const tip = filtered.find((t) => t.id === id);
            if (tip) setDeleteConfirm({ id, title: tip.title });
          }}
        />
      </div>

      {/* Create Modal */}
      <CreateTipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={createTip}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!deleteConfirm}
        title="¿Eliminar este consejo?"
        description={`Estás a punto de eliminar "${deleteConfirm?.title}". Esta acción no se puede deshacer y dejará de mostrarse en la app.`}
        confirmText="Sí, eliminar"
        onConfirm={handleDelete}
        onClose={() => setDeleteConfirm(null)}
      />
    </div>
  );
};

export default TipsList;
