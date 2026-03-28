// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthService } from "../service/auth";

const authService = new AuthService();

type User = {
  id: string;
  email: string;
  name: string;
  lastName: string;
  role: "admin" | "bishop" | "clerk";
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string): Promise<boolean> => {
        try {
          const data = await authService.login(email, password); // ← aquí usamos tu service
          const { accessToken } = data;

          // Decodificamos el payload del JWT
          const payload = JSON.parse(atob(accessToken.split(".")[1]));

          set({
            token: accessToken,
            user: {
              id: payload.sub,
              email: payload.email,
              role: payload.role,
              name: payload.name,
              lastName: payload.lastName,
            },
            isAuthenticated: true,
          });
          console.log("User logged in:", payload);
          return true;
        } catch (error) {
          set({ user: null, token: null, isAuthenticated: false });
          console.error("Login failed:", error);
          return false;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "socio-legal-auth",
    },
  ),
);
