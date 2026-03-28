const Skeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm animate-pulse">
        <div className="h-56 bg-slate-200" />
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-6 bg-slate-200 rounded-lg w-3/4" />
            <div className="h-6 bg-slate-200 rounded-lg w-1/8" />
          </div>
          <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
          <div className="flex gap-2">
            <div className="h-5 bg-slate-50 rounded-full w-20" />
            <div className="h-5 bg-slate-50 rounded-full w-20" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;