// src/screens/users/list/components/UsersTable.tsx
import { Mail, Phone, Calendar, ShieldCheck, UserCheck } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import type { User } from "../../types";

interface UsersTableProps {
  users: User[];
  onViewDetail: (user: User) => void;
}

const STATUS_MAP: Record<string, { label: string; variant: "success" | "warning" | "error" | "neutral" }> = {
  active: { label: "Activo", variant: "success" },
  inactive: { label: "Inactivo", variant: "neutral" },
  suspended: { label: "Suspendido", variant: "error" },
  pending: { label: "Pendiente", variant: "warning" },
};

const getInitials = (name: string, lastname: string) =>
  `${name?.charAt(0) || ""}${lastname?.charAt(0) || ""}`.toUpperCase() || "US";

export const UsersTable = ({ users, onViewDetail }: UsersTableProps) => {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <span className="text-5xl mb-4">👥</span>
        <p className="text-lg font-medium">No hay usuarios registrados</p>
        <p className="text-sm mt-1">Ajusta los filtros o invita nuevos usuarios</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Usuario
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Roles
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Contacto
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Estado
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Registro
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {users.map((user) => {
            const status = STATUS_MAP[user.status] ?? {
              label: user.status,
              variant: "neutral" as const,
            };

            const isAdmin = user.role.includes("admin");

            return (
              <tr
                key={user.id}
                onClick={() => onViewDetail(user)}
                className="hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0 ${isAdmin ? 'bg-linear-to-br from-indigo-500 to-purple-600' : 'bg-linear-to-br from-emerald-400 to-teal-500'}`}>
                      {getInitials(user.name, user.lastname)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 line-clamp-1">
                        {user.name} {user.lastname}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono tracking-widest mt-0.5 uppercase flex gap-1 items-center">
                        {user.cedula || "S/N Doc"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-widest ${isAdmin ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                    {isAdmin ? <ShieldCheck size={12}/> : <UserCheck size={12}/>}
                    {user.role.replace("_", " ")}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                      <Mail size={12} className="text-slate-400" />
                      {user.email}
                    </span>
                    {user.phone && (
                      <span className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                        <Phone size={12} className="text-slate-400" />
                        {user.phone}
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <StatusBadge variant={status.variant} dot>
                    {status.label}
                  </StatusBadge>
                </td>

                <td className="py-3.5 px-4">
                  <span className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                    <Calendar size={12} className="text-slate-400" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
