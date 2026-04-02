// src/screens/tips/list/hooks/useTipsList.ts
import { useEffect, useCallback } from "react";
import { useTipsStore } from "../../store/tipsStore";
import { tipsService } from "../../service/tips.service";
import { useAuth } from "@/store/authStore";
import type { CreateTipDto, TipTargetRole } from "../../types";

export const useTipsList = (roleFilter?: TipTargetRole) => {
  const { tips, isLoading, error, setTips, addTip, removeTip, setLoading, setError } = useTipsStore();
  const { token } = useAuth();

  const fetchTips = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await tipsService.findAll(token, roleFilter);
      setTips(data);
    } catch {
      setError("Error al cargar los consejos del día.");
    } finally {
      setLoading(false);
    }
  }, [token, roleFilter]);

  useEffect(() => {
    fetchTips();
  }, [fetchTips]);

  const createTip = async (dto: CreateTipDto) => {
    if (!token) return;
    try {
      const newTip = await tipsService.create(dto, token);
      addTip(newTip);
    } catch {
      setError("Error al crear el consejo.");
    }
  };

  const deleteTip = async (id: string) => {
    if (!token) return;
    try {
      await tipsService.remove(id, token);
      removeTip(id);
    } catch {
      setError("Error al eliminar el consejo.");
    }
  };

  return { tips, isLoading, error, createTip, deleteTip, refetch: fetchTips };
};
