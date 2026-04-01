// src/navigation/PrivateLayout.tsx
import { Outlet } from "react-router-dom";
import { AppDrawer } from "@/components/AppDrawer";
import { ProtectedRoute } from "./ProtectedRoute";

export const PrivateLayout = () => {
  return (
    <ProtectedRoute>
      <AppDrawer>
        <Outlet />
      </AppDrawer>
    </ProtectedRoute>
  );
};
