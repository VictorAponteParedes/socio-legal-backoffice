// src/screens/clients/list/components/ClientsTable.tsx
import { Eye, Mail, Phone, MapPin } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { getMediaUrl } from "@/helper/media";
import type { Client } from "../../types";

interface ClientsTableProps {
  clients: Client[];
  onViewDetail: (client: Client) => void;
}

const STATUS_MAP: Record<
  string,
  { label: string; variant: "success" | "warning" | "error" | "neutral" }
> = {
  active: { label: "Activo", variant: "success" },
  inactive: { label: "Inactivo", variant: "neutral" },
  suspended: { label: "Suspendido", variant: "error" },
  pending: { label: "Pendiente", variant: "warning" },
};

const getInitials = (name: string, lastname: string) =>
  `${name.charAt(0)}${lastname.charAt(0)}`.toUpperCase();

export const ClientsTable = ({ clients, onViewDetail }: ClientsTableProps) => {
  if (clients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <span className="text-5xl mb-4">👤</span>
        <p className="text-lg font-medium">No hay clientes registrados</p>
        <p className="text-sm mt-1">Los clientes aparecerán aquí una vez registrados</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Cliente
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Contacto
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Ubicación
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Estado
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Registrado
            </th>
            <th className="py-3 px-4" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {clients.map((client) => {
            const status = STATUS_MAP[client.user.status] ?? {
              label: client.user.status,
              variant: "neutral" as const,
            };
            const date = new Date(client.createdAt).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });

            return (
              <tr
                key={client.id}
                className="hover:bg-slate-50 transition-colors group"
              >
                {/* Avatar + nombre */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {client.user.profilePicture ? (
                        <img
                          src={getMediaUrl(client.user.profilePicture)}
                          alt={client.user.name}
                          className="w-9 h-9 rounded-full object-cover"
                          onError={(e) => {
                            // Si la imagen falla, ocultar y mostrar iniciales
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        getInitials(client.user.name, client.user.lastname)
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">
                        {client.user.name} {client.user.lastname}
                      </p>
                      {client.user.cedula && (
                        <p className="text-xs text-slate-400">
                          CI: {client.user.cedula}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Contacto */}
                <td className="py-3.5 px-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Mail size={12} className="text-slate-400" />
                      {client.user.email}
                    </span>
                    {client.user.phone && (
                      <span className="flex items-center gap-1.5 text-slate-500 text-xs">
                        <Phone size={12} className="text-slate-400" />
                        {client.user.phone}
                      </span>
                    )}
                  </div>
                </td>

                {/* Ubicación */}
                <td className="py-3.5 px-4">
                  {client.city || client.country ? (
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <MapPin size={13} className="text-slate-400" />
                      {[client.city, client.country].filter(Boolean).join(", ")}
                    </span>
                  ) : (
                    <span className="text-slate-300">—</span>
                  )}
                </td>

                {/* Estado */}
                <td className="py-3.5 px-4">
                  <StatusBadge variant={status.variant} dot>
                    {status.label}
                  </StatusBadge>
                </td>

                {/* Fecha */}
                <td className="py-3.5 px-4 text-slate-500">{date}</td>

                {/* Acciones */}
                <td className="py-3.5 px-4">
                  <button
                    onClick={() => onViewDetail(client)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg"
                  >
                    <Eye size={13} />
                    Ver detalle
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
