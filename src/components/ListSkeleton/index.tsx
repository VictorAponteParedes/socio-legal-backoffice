
interface ListSkeletonProps {
  rows?: number;
  hasStats?: boolean;
  hasSearch?: boolean;
}

export const ListSkeleton = ({ 
  rows = 6, 
  hasStats = true, 
  hasSearch = true 
}: ListSkeletonProps) => {
  return (
    <div className="space-y-6 w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-slate-200 rounded-lg" />
        <div className="h-4 w-72 bg-slate-100 rounded-md" />
      </div>

      {/* Stats Skeleton */}
      {hasStats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-3 w-20 bg-slate-100 rounded" />
                <div className="h-6 w-12 bg-slate-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search Bar Skeleton */}
      {hasSearch && (
        <div className="h-16 bg-white rounded-2xl border border-slate-100 p-4 flex gap-4">
          <div className="flex-1 bg-slate-50 rounded-xl" />
          <div className="w-40 bg-slate-200 rounded-xl hidden md:block" />
        </div>
      )}

      {/* Table Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        {/* Table Header mock */}
        <div className="h-12 bg-slate-50 border-b border-slate-100 flex items-center px-6 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`h-3 bg-slate-200 rounded-full flex-1 ${i === 3 ? "hidden md:block" : ""}`} />
          ))}
          <div className="w-10" />
        </div>

        {/* Table Rows mock */}
        <div className="divide-y divide-slate-50">
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="px-6 py-5 flex items-center gap-6">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-slate-100 shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-32 bg-slate-200 rounded" />
                  <div className="h-2 w-24 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="h-3 w-24 bg-slate-100 rounded flex-1 hidden sm:block" />
              <div className="h-3 w-20 bg-slate-100 rounded flex-1 hidden md:block" />
              <div className="h-6 w-20 bg-slate-100 rounded-full shrink-0" />
              <div className="w-10 h-10 rounded-xl bg-slate-50 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
