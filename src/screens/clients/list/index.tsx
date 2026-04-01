// src/screens/clients/list/index.tsx
import { AppDrawer } from "@/components/AppDrawer";
import { Users, RefreshCw } from "lucide-react";
import { ClientsTable } from "./components/ClientsTable";
import { useClientsList } from "./hooks/useClientsList";

const ClientsList = () => {
  const { clients, isLoading, error, handleViewDetail } = useClientsList();

  return (
    <AppDrawer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Clientes</h1>
            <p className="text-slate-500 text-sm mt-1">
              {isLoading
                ? "Cargando..."
                : `${clients.length} cliente${clients.length !== 1 ? "s" : ""} registrado${clients.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 px-4 py-2 rounded-xl transition-all shadow-sm"
          >
            <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
            Actualizar
          </button>
        </div>

        {/* Card contenedor */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Sub-header de la card */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Users size={16} className="text-indigo-600" />
            </div>
            <p className="text-sm font-semibold text-slate-700">
              Lista de clientes
            </p>
          </div>

          {/* Estado de error */}
          {error && (
            <div className="mx-6 mt-4 mb-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Skeleton loading */}
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 bg-slate-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <ClientsTable clients={clients} onViewDetail={handleViewDetail} />
          )}
        </div>
      </div>
    </AppDrawer>
  );
};

export default ClientsList;
