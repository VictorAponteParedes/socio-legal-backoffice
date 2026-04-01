// src/screens/users/list/index.tsx
import { useUsersList } from "./hooks/useUsersList";
import { useUserFilters } from "./hooks/useUserFilters";
import { UsersSearchBar } from "./components/UsersSearchBar";
import { UsersStatsBar } from "./components/UsersStatsBar";
import { UsersTable } from "./components/UsersTable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { User } from "../types";

const UsersList = () => {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter,
    clearFilters,
    hasActiveFilters,
  } = useUserFilters();

  const { users, totalPages, currentPage, totalUsers, setPage, isLoading, error, refetch } = useUsersList(search, roleFilter, statusFilter);

  const handleViewDetail = (user: User) => {
    // Navigate or open modal depending on future plans
    console.log("View user detail:", user.id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Usuarios</h1>
        <p className="text-slate-500 text-sm mt-1">
          Visualiza y administra todos los usuarios sin importar su entidad o rol.
        </p>
      </div>

      <UsersStatsBar
        users={users}
        filteredCount={totalUsers}
        isLoading={isLoading}
        onRefetch={refetch}
      />

      <UsersSearchBar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {error && (
          <div className="mx-6 mt-4 mb-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-slate-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <UsersTable users={users} onViewDetail={handleViewDetail} />
        )}

        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
            <span className="text-sm font-medium text-slate-500">
              Página <span className="text-slate-700 font-bold">{currentPage}</span> de <span className="text-slate-700 font-bold">{totalPages}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setPage(page)}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                        currentPage === page
                          ? "bg-purple-600 text-white shadow-sm"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-purple-600"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
