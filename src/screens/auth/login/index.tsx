// src/screens/auth/login/index.tsx
import { motion } from "framer-motion";
import { MessageToast } from "@/components/form/MessageToast";
import { useLoginForm } from "./hooks/useLoginForm";
import { LoginBackground } from "./components/LoginBackground";
import { LoginPanelLeft } from "./components/LoginPanelLeft";
import { LoginFormPanel } from "./components/LoginFormPanel";

export default function LoginPage() {
  const { methods, isLoading, message, setMessage, onSubmit } = useLoginForm();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex items-center justify-center font-poppins overflow-hidden"
    >
      <LoginBackground />

      {/* Card principal */}
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl shadow-2xl rounded-3xl overflow-hidden bg-white/96 backdrop-blur-2xl border border-white/50"
      >
        <div className="flex flex-col md:flex-row">
          <LoginPanelLeft />
          <LoginFormPanel
            methods={methods}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />
        </div>
      </motion.div>

      {message && (
        <MessageToast {...message} onClose={() => setMessage(null)} />
      )}
    </motion.div>
  );
}