import { useMemo } from "react";

export default function ExpenseStatsCompact({ expenses }) {
  const stats = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const categoryTotals = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});
    return {
      total,
      count: expenses.length,
      avg: expenses.length ? total / expenses.length : 0,
      topCategories: Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3),
    };
  }, [expenses]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="neon-card p-3 sm:p-4 rounded-xl border border-cyan-400/30">
        <p className="text-[11px] uppercase tracking-wide font-semibold text-cyan-300">
          Total
        </p>
        <p className="text-lg sm:text-xl font-black text-cyan-200">
          ₹{stats.total.toFixed(2)}
        </p>
      </div>
      <div className="neon-card p-3 sm:p-4 rounded-xl border border-pink-400/30">
        <p className="text-[11px] uppercase tracking-wide font-semibold text-pink-300">
          Count
        </p>
        <p className="text-lg sm:text-xl font-black text-pink-200">
          {stats.count}
        </p>
      </div>
      <div className="neon-card p-3 sm:p-4 rounded-xl border border-purple-400/30">
        <p className="text-[11px] uppercase tracking-wide font-semibold text-purple-300">
          Average
        </p>
        <p className="text-lg sm:text-xl font-black text-purple-200">
          ₹{stats.avg.toFixed(2)}
        </p>
      </div>
      <div className="neon-card p-3 sm:p-4 rounded-xl border border-fuchsia-400/30 col-span-2 md:col-span-1">
        <p className="text-[11px] uppercase tracking-wide font-semibold text-fuchsia-300">
          Top Categories
        </p>
        <div className="flex flex-wrap gap-1 mt-1">
          {stats.topCategories.length === 0 && (
            <span className="text-[11px] text-slate-400">None</span>
          )}
          {stats.topCategories.map(([cat, amt]) => (
            <span
              key={cat}
              className="text-[11px] px-2 py-1 rounded-full bg-slate-800/60 border border-slate-600/40 text-slate-300"
            >
              {cat}: ₹{amt.toFixed(0)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
