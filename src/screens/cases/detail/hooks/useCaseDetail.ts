// src/screens/cases/detail/hooks/useCaseDetail.ts
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCasesStore } from "../../store/casesStore";
import { useAuth } from "@/store/authStore";

export const useCaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedCase: caseItem, isLoading, error, fetchCase, clearSelected } = useCasesStore();
  const { token } = useAuth();

  useEffect(() => {
    if (token && id) {
      fetchCase(id, token);
    }
    return () => clearSelected();
  }, [id, token, fetchCase, clearSelected]);

  return { caseItem, isLoading, error };
};
