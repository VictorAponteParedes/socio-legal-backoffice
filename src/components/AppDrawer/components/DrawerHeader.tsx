// src/components/AppDrawer/components/DrawerHeader.tsx
import { motion } from "framer-motion";
import { Menu, X, Bell, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store/authStore";
import { RoutesView } from "@/navigation/routes";
import type { DrawerHeaderProps } from "../types";

export const DrawerHeader = ({ isOpen, onToggle }: DrawerHeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(RoutesView.LOGIN, { replace: true });
  };

  const initials = user
    ? `${user.name.charAt(0)}${user.lastname.charAt(0)}`.toUpperCase()
    : "??";

  const roleLabel: Record<string, string> = {
    admin: "Administrador",
    super_admin: "Super Admin",
    lawyer: "Abogado",
    client: "Cliente",
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-10 shadow-sm">
      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600
                   flex items-center justify-center transition-colors text-slate-600"
        title={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        <motion.span
          initial={false}
          animate={{ rotate: isOpen ? 0 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </motion.span>
      </motion.button>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Notificaciones */}
        <button className="relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-50
                           flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Divider */}
        <div className="w-px h-7 bg-slate-200" />

        {/* User menu */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600
                          flex items-center justify-center text-white text-sm font-bold shadow-md">
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-tight">
              {user ? `${user.name} ${user.lastname}` : "Usuario"}
            </p>
            <p className="text-xs text-slate-500 leading-tight">
              {user?.role ? roleLabel[user.role] ?? user.role : "—"}
            </p>
          </div>
          <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
        </div>

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          title="Cerrar sesión"
          className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 flex items-center
                     justify-center text-red-500 hover:text-red-600 transition-colors"
        >
          <LogOut size={17} />
        </motion.button>
      </div>
    </header>
  );
};
