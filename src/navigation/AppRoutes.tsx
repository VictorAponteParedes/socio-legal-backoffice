// src/navigation/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { RoutesView } from "./routes";
import { ProtectedRoute } from "./ProtectedRoute";

import LoginPage from "../screens/auth/login/index"
import NotFound from "../screens/notFound/index";

import { DASHBOARD_ROUTES } from "../screens/dasboard/routes";
import { CLIENTS_ROUTES } from "../screens/clients/routes";
import { LAWYERS_ROUTES } from "../screens/lawyers/routes";
import { CASES_ROUTES } from "../screens/cases/routes";
import { USERS_ROUTES } from "../screens/users/routes";
import { SPECIALIZATIONS_ROUTES } from "../screens/specializations/routes";

// Todas las rutas privadas (con lazy + ProtectedRoute automático)
const PRIVATE_ROUTES = [
  ...DASHBOARD_ROUTES,
  ...CLIENTS_ROUTES,
  ...LAWYERS_ROUTES,
  ...CASES_ROUTES,
  ...USERS_ROUTES,
  ...SPECIALIZATIONS_ROUTES,
];

export default function AppRoutes() {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path={RoutesView.LOGIN} element={<LoginPage />} />
      <Route path="/" element={<Navigate to={RoutesView.DASHBOARD} replace />} />
      <Route path="*" element={<NotFound />} />

      {/* TODAS LAS RUTAS PRIVADAS (lazy + protegidas en un solo lugar) */}
      {PRIVATE_ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<ProtectedRoute>{route.element}</ProtectedRoute>}
        />
      ))}
    </Routes>
  );
}