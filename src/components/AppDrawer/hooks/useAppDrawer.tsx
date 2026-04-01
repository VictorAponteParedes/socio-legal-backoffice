// src/components/AppDrawer/hooks/useAppDrawer.tsx
import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Settings,
  BarChart3,
  ShieldCheck,
  UserSquare,
} from "lucide-react";
import { RoutesView } from "@/navigation/routes";
import type { NavSection } from "../types";

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Principal",
    items: [
      {
        label: "Dashboard",
        path: RoutesView.DASHBOARD,
        icon: <LayoutDashboard size={20} />,
      },
      {
        label: "Reportes",
        path: RoutesView.REPORTS,
        icon: <BarChart3 size={20} />,
      },
    ],
  },
  {
    title: "Gestión",
    items: [
      {
        label: "Usuarios",
        path: RoutesView.USERS,
        icon: <Users size={20} />,
      },
      {
        label: "Abogados",
        path: RoutesView.LAWYERS,
        icon: <Briefcase size={20} />,
      },
      {
        label: "Clientes",
        path: RoutesView.CLIENTS,
        icon: <UserSquare size={20} />,
      },
      {
        label: "Casos",
        path: RoutesView.CASES,
        icon: <FileText size={20} />,
      },
    ],
  },
  {
    title: "Sistema",
    items: [
      {
        label: "Roles y Permisos",
        path: RoutesView.ROLES,
        icon: <ShieldCheck size={20} />,
      },
      {
        label: "Configuración",
        path: RoutesView.SETTINGS,
        icon: <Settings size={20} />,
      },
    ],
  },
];

export const useAppDrawer = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
      // En mobile, cerramos el drawer al navegar
      if (window.innerWidth < 768) {
        close();
      }
    },
    [navigate, close]
  );

  return {
    isOpen,
    toggle,
    close,
    open,
    activePath: location.pathname,
    navSections: NAV_SECTIONS,
    handleNavigate,
  };
};
