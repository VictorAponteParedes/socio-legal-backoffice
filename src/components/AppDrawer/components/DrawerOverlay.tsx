// src/components/AppDrawer/components/DrawerOverlay.tsx
import { AnimatePresence, motion } from "framer-motion";
import type { DrawerOverlayProps } from "../types";

export const DrawerOverlay = ({ isOpen, onClick }: DrawerOverlayProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClick}
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}
    </AnimatePresence>
  );
};
