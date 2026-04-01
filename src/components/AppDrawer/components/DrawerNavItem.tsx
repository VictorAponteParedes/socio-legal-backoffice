// src/components/AppDrawer/components/DrawerNavItem.tsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { DrawerNavItemProps } from "../types";

export const DrawerNavItem = ({ item, isActive, onNavigate }: DrawerNavItemProps) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const [isExpanded, setIsExpanded] = useState(hasSubItems && isActive);

  const handleToggle = (e: React.MouseEvent) => {
    if (hasSubItems) {
      e.stopPropagation();
      setIsExpanded((prev) => !prev);
    } else {
      onNavigate(item.path);
    }
  };

  const isAnySubItemActive = useMemo(() => {
    if (!hasSubItems) return false;
    return item.subItems?.some((sub) => sub.path === window.location.pathname);
  }, [item.subItems]);

  const mainActive = isActive || isAnySubItemActive;

  return (
    <div className="space-y-1">
      <motion.button
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleToggle}
        title={item.label}
        className={`
          w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
          transition-all duration-200 group relative overflow-hidden
          ${
            mainActive
              ? "bg-white/12 text-white shadow-lg shadow-black/10"
              : "text-slate-300 hover:bg-white/8 hover:text-white"
          }
        `}
      >
        {/* Indicador activo */}
        {mainActive && (
          <motion.span
            layoutId="activeIndicator"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-400 rounded-r-full"
          />
        )}

        <span
          className={`shrink-0 transition-colors ${
            mainActive ? "text-indigo-300" : "text-slate-400 group-hover:text-slate-200"
          }`}
        >
          {item.icon}
        </span>

        <span className="truncate flex-1 text-left">{item.label}</span>

        {hasSubItems ? (
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className={`transition-colors ${isExpanded ? "text-indigo-400" : "text-slate-500"}`}
          >
            <ChevronDown size={16} />
          </motion.div>
        ) : (
          item.badge !== undefined && item.badge > 0 && (
            <span className="ml-auto shrink-0 bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
              {item.badge > 99 ? "99+" : item.badge}
            </span>
          )
        )}
      </motion.button>

      <AnimatePresence>
        {hasSubItems && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden flex flex-col pl-9 space-y-1"
          >
            {item.subItems?.map((sub) => {
              const isSubActive = sub.path === window.location.pathname;
              return (
                <button
                  key={sub.path}
                  className={`
                    w-full py-2 px-4 rounded-lg text-xs font-medium text-left transition-all
                    ${isSubActive ? "text-indigo-400 bg-indigo-500/10" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"}
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(sub.path);
                  }}
                >
                  {sub.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
