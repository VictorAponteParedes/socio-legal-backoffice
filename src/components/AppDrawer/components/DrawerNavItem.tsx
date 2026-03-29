// src/components/AppDrawer/components/DrawerNavItem.tsx
import { motion } from "framer-motion";
import type { DrawerNavItemProps } from "../types";

export const DrawerNavItem = ({ item, isActive, onClick }: DrawerNavItemProps) => {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      title={item.label}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
        transition-all duration-200 group relative overflow-hidden
        ${
          isActive
            ? "bg-white/15 text-white shadow-lg shadow-black/20"
            : "text-slate-300 hover:bg-white/8 hover:text-white"
        }
      `}
    >
      {/* Indicador activo */}
      {isActive && (
        <motion.span
          layoutId="activeIndicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-400 rounded-r-full"
        />
      )}

      <span
        className={`flex-shrink-0 transition-colors ${
          isActive ? "text-indigo-300" : "text-slate-400 group-hover:text-slate-200"
        }`}
      >
        {item.icon}
      </span>

      <span className="truncate">{item.label}</span>

      {item.badge !== undefined && item.badge > 0 && (
        <span className="ml-auto flex-shrink-0 bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
          {item.badge > 99 ? "99+" : item.badge}
        </span>
      )}
    </motion.button>
  );
};
