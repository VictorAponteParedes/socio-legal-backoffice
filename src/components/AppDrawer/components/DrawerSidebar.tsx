// src/components/AppDrawer/components/DrawerSidebar.tsx
import { motion, AnimatePresence } from "framer-motion";
import { X, Scale } from "lucide-react";
import { DrawerNavItem } from "./DrawerNavItem";
import type { DrawerSidebarProps } from "../types";

const DRAWER_WIDTH = 260;

export const DrawerSidebar = ({
  isOpen,
  navSections,
  activePath,
  onNavigate,
  onClose,
}: DrawerSidebarProps) => {
  return (
    <AnimatePresence initial={false}>
      <motion.aside
        animate={{ width: isOpen ? DRAWER_WIDTH : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 h-full z-30 overflow-hidden
                   md:relative md:shrink-0"
        style={{ minWidth: 0 }}
      >
        <div
          className="h-full flex flex-col"
          style={{
            width: DRAWER_WIDTH,
            background: "linear-gradient(160deg, #1e1b4b 0%, #312e81 40%, #1e293b 100%)",
          }}
        >
          {/* Logo / Brand */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center">
                <Scale size={18} className="text-indigo-300" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight whitespace-nowrap">
                  Socio Legal
                </p>
                <p className="text-indigo-300 text-xs whitespace-nowrap">Backoffice</p>
              </div>
            </div>

            {/* Cerrar en mobile */}
            <button
              onClick={onClose}
              className="md:hidden text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
            {navSections.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 px-4 mb-2 whitespace-nowrap">
                  {section.title}
                </p>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <DrawerNavItem
                      key={item.path}
                      item={item}
                      isActive={activePath === item.path}
                      onNavigate={onNavigate}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer versión */}
          <div className="px-5 py-4 border-t border-white/10">
            <p className="text-xs text-slate-500 text-center whitespace-nowrap">
              v1.0.0 · Socio Legal © 2025
            </p>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};
