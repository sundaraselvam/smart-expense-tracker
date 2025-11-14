import { useMemo } from "react";

const CATEGORY_EMOJIS = {
  Food: "🍔",
  Travel: "✈️",
  Bills: "📄",
  Entertainment: "🎬",
  Shopping: "🛍️",
  Healthcare: "⚕️",
  Education: "📚",
  Others: "📦",
};

export default function ExpenseList({ expenses, onDeleteExpense }) {
  const groupedExpenses = useMemo(() => {
    const groups = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date).toLocaleDateString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(expense);
    });

    return groups;
  }, [expenses]);

  const sortedDates = Object.keys(groupedExpenses).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  if (expenses.length === 0) {
    return (
      <div className="py-12 text-center text-orange-300">
        <p className="text-lg font-semibold">No expenses to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[65vh] sm:max-h-[60vh] overflow-y-auto pr-1 sm:pr-2">
      {sortedDates.map((date) => (
        <div key={date}>
          <h3 className="px-3 mb-3 text-xs font-black tracking-widest text-orange-400 uppercase">
            {date}
          </h3>
          <div className="space-y-2">
            {groupedExpenses[date].map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 transition-all duration-300 border-l-4 border-orange-500 rounded-lg bg-gradient-to-r from-slate-800 to-slate-800/50 hover:from-slate-700 hover:to-slate-700/50 hover:shadow-lg hover:shadow-orange-500/20"
              >
                <div className="flex items-center flex-1 gap-4">
                  <div className="text-3xl">
                    {CATEGORY_EMOJIS[expense.category] || "📌"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-orange-300">
                        {expense.category}
                      </p>
                      {expense.note && (
                        <p className="text-xs text-slate-400 line-clamp-1">
                          ({expense.note})
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-lg font-black text-cyan-300">
                      ₹{expense.amount.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    className="px-3 py-2 text-xs font-bold text-white transition duration-300 rounded-lg shadow-lg bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 hover:shadow-red-500/50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
