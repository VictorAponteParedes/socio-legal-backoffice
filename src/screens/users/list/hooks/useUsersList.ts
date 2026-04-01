// src/screens/users/list/hooks/useUsersList.ts
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useUsersStore } from "../../store/usersStore";
import { useAuth } from "@/store/authStore";

export const useUsersList = (search: string, roleFilter: string, statusFilter: string) => {
  const { users, totalPages, currentPage, totalUsers, isLoading, error, fetchUsers } = useUsersStore();
  const { token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        fetchUsers(token, page, 10, search, roleFilter, statusFilter);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [token, page, search, roleFilter, statusFilter, fetchUsers]);

  const setPage = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  const refetch = () => {
    if (token) {
      fetchUsers(token, page, 10, search, roleFilter, statusFilter);
    }
  };

  return { 
    users, 
    totalPages, 
    currentPage, 
    totalUsers, 
    setPage, 
    isLoading, 
    error, 
    refetch, 
  };
};
