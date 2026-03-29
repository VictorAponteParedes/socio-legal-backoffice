// src/components/AppDrawer/index.tsx
import { DrawerSidebar } from "./components/DrawerSidebar";
import { DrawerHeader } from "./components/DrawerHeader";
import { DrawerOverlay } from "./components/DrawerOverlay";
import { useAppDrawer } from "./hooks/useAppDrawer.tsx";
import type { AppDrawerProps } from "./types";

export const AppDrawer = ({ children }: AppDrawerProps) => {
  const { isOpen, toggle, close, activePath, navSections, handleNavigate } =
    useAppDrawer();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Overlay mobile */}
      <DrawerOverlay isOpen={isOpen} onClick={close} />

      {/* Sidebar izquierdo */}
      <DrawerSidebar
        isOpen={isOpen}
        navSections={navSections}
        activePath={activePath}
        onNavigate={handleNavigate}
        onClose={close}
      />

      {/* Área de contenido principal */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header fijo */}
        <DrawerHeader isOpen={isOpen} onToggle={toggle} />

        {/* Contenido dinámico (children) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
