// components/DashboardSkeleton.tsx
const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-28 bg-zinc-800 rounded-xl animate-pulse shadow-md border border-zinc-700"
        >
          <div className="p-4">
            <div className="h-4 w-1/2 bg-zinc-700 rounded mb-2" />
            <div className="h-6 w-1/3 bg-zinc-600 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSkeleton;
