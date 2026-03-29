// src/screens/dasboard/index.tsx
import { AppDrawer } from "@/components/AppDrawer";

const Dashboard = () => {
  return (
    <AppDrawer>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Bienvenido al panel de administración
          </p>
        </div>

        {/* Contenido del dashboard irá aquí */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Usuarios", "Abogados", "Casos"].map((label) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
            >
              <h3 className="font-semibold text-slate-700">{label}</h3>
              <p className="text-3xl font-bold text-slate-900 mt-2">—</p>
            </div>
          ))}
        </div>
      </div>
    </AppDrawer>
  );
};

export default Dashboard;