// src/screens/auth/login/components/LoginBackground.tsx
import { fondoLogin } from "@/assets/index";

export const LoginBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${fondoLogin})`,
          backgroundPosition: "center 20%",
          filter: "brightness(0.92) contrast(1.05) saturate(1.1)",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-white/40 via-transparent to-white/30" />
    </div>
  );
};
