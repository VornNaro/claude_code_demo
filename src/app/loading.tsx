export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="animate-pulse space-y-8">
        {/* Hero placeholder */}
        <div className="h-64 bg-gray-200 rounded-2xl" />

        {/* Category links placeholder */}
        <div className="flex gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-20 h-24 bg-gray-200 rounded-2xl" />
          ))}
        </div>

        {/* Grid placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-80 bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
