import { useMemo } from "react";

const CATEGORY_COLORS = {
  Food: "#FF6B6B",
  Travel: "#4ECDC4",
  Bills: "#45B7D1",
  Entertainment: "#FFA07A",
  Shopping: "#98D8C8",
  Healthcare: "#F7DC6F",
  Education: "#BB8FCE",
  Others: "#95A5A6",
};

export default function ExpenseStats({ expenses }) {
  const stats = useMemo(() => {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    const categoryWise = expenses.reduce((acc, exp) => {
      const category = exp.category;
      acc[category] = (acc[category] || 0) + exp.amount;
      return acc;
    }, {});

    const averagePerExpense = expenses.length > 0 ? total / expenses.length : 0;

    return {
      total,
      categoryWise,
      averagePerExpense,
      expenseCount: expenses.length,
    };
  }, [expenses]);

  const sortedCategories = Object.entries(stats.categoryWise).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 text-white rounded-xl p-6 shadow-xl border border-cyan-400/50">
        <p className="text-sm font-semibold opacity-80 text-cyan-100 mb-1">
          Total Spending
        </p>
        <p className="text-4xl font-black tracking-tight">
          ₹{stats.total.toFixed(2)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-purple-900/60 to-slate-900 rounded-lg p-4 border-2 border-purple-500/50">
          <p className="text-xs font-semibold text-purple-300 mb-2 uppercase tracking-wide">
            Expenses
          </p>
          <p className="text-3xl font-black text-purple-200">
            {stats.expenseCount}
          </p>
        </div>
        <div className="bg-gradient-to-br from-pink-900/60 to-slate-900 rounded-lg p-4 border-2 border-pink-500/50">
          <p className="text-xs font-semibold text-pink-300 mb-2 uppercase tracking-wide">
            Average
          </p>
          <p className="text-2xl font-black text-pink-200">
            ₹{stats.averagePerExpense.toFixed(2)}
          </p>
        </div>
      </div>

      {sortedCategories.length > 0 && (
        <div className="pt-3 border-t border-slate-700">
          <h3 className="font-black text-cyan-300 mb-4 text-sm uppercase tracking-widest">
            Category Breakdown
          </h3>
          <div className="space-y-3">
            {sortedCategories.map(([category, amount]) => (
              <div
                key={category}
                className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border-l-4 border-cyan-400/50 hover:bg-slate-800/80 transition-all duration-300"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-4 h-4 rounded-full shadow-lg"
                    style={{
                      backgroundColor: CATEGORY_COLORS[category],
                      boxShadow: `0 0 10px ${CATEGORY_COLORS[category]}`,
                    }}
                  />
                  <span className="text-sm font-medium text-slate-300">
                    {category}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-cyan-300">
                    ₹{amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-400 font-semibold">
                    {((amount / stats.total) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
