// src/navigation/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { RoutesView } from "./routes";

import LoginPage from "../screens/auth/login/index"
import NotFound from "../screens/notFound/index";

import { DASHBOARD_ROUTES } from "../screens/dasboard/routes";
import { CLIENTS_ROUTES } from "../screens/clients/routes";
import { LAWYERS_ROUTES } from "../screens/lawyers/routes";
import { CASES_ROUTES } from "../screens/cases/routes";
import { USERS_ROUTES } from "../screens/users/routes";
import { SPECIALIZATIONS_ROUTES } from "../screens/specializations/routes";
import { TIPS_ROUTES } from "../screens/tips/routes";
import { TERMS_ROUTES } from "../screens/terms/routes";
import { REGISTRY_ROUTES } from "../screens/registry/routes";

// Todas las rutas privadas (con lazy + ProtectedRoute automático)
const PRIVATE_ROUTES = [
  ...DASHBOARD_ROUTES,
  ...CLIENTS_ROUTES,
  ...LAWYERS_ROUTES,
  ...CASES_ROUTES,
  ...USERS_ROUTES,
  ...SPECIALIZATIONS_ROUTES,
  ...TIPS_ROUTES,
  ...TERMS_ROUTES,
  ...REGISTRY_ROUTES,
];

import { PrivateLayout } from "./PrivateLayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path={RoutesView.LOGIN} element={<LoginPage />} />
      <Route path="/" element={<Navigate to={RoutesView.DASHBOARD} replace />} />

      {/* RUTAS PRIVADAS (Con layout persistente que envuelve a todas) */}
      <Route element={<PrivateLayout />}>
        {PRIVATE_ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}