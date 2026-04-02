// src/screens/tips/store/tipsStore.ts
import { create } from "zustand";
import type { Tip } from "../types";

interface TipsState {
  tips: Tip[];
  isLoading: boolean;
  error: string | null;
  setTips: (tips: Tip[]) => void;
  addTip: (tip: Tip) => void;
  removeTip: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTipsStore = create<TipsState>((set) => ({
  tips: [],
  isLoading: false,
  error: null,
  setTips: (tips) => set({ tips }),
  addTip: (tip) => set((state) => ({ tips: [tip, ...state.tips] })),
  removeTip: (id) => set((state) => ({ tips: state.tips.filter((t) => t.id !== id) })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
