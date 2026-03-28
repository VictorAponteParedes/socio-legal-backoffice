// src/screens/auth/login/components/LoginPanelLeft.tsx
import { fondoIzquierda } from "@/assets/index";

export const LoginPanelLeft = () => {
  return (
    <div className="hidden md:flex flex-1 bg-slate-900 items-center justify-center p-12 relative overflow-hidden">
      <div className="text-center text-white z-10">
        <img
          src={fondoIzquierda}
          alt="Socio Legal Logo"
          className="w-52 mx-auto mb-8 drop-shadow-2xl rounded-lg"
        />
        <h1 className="text-5xl font-bold mb-4">Socio Legal</h1>
        <p className="text-xl text-gray-300 opacity-95">
          Bienvenido a tu plataforma
        </p>
      </div>
    </div>
  );
};
