// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthService } from "../service/auth";

const authService = new AuthService();

type User = {
  id: string;
  email: string;
  name: string;
  lastname: string;
  role: "client" | "lawyer" | "admin" | "super_admin";
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
          const data = await authService.login(email, password);
          const { token, user: userData } = data;

          set({
            token,
            user: {
              id: userData.id,
              email: userData.email,
              role: userData.role,
              name: userData.name,
              lastname: userData.lastname,
            },
            isAuthenticated: true,
          });
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
