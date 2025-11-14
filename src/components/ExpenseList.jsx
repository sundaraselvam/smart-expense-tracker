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
      <div className="text-center py-12 text-orange-300">
        <p className="text-lg font-semibold">No expenses to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
      {sortedDates.map((date) => (
        <div key={date}>
          <h3 className="text-xs font-black text-orange-400 mb-3 px-3 uppercase tracking-widest">
            {date}
          </h3>
          <div className="space-y-2">
            {groupedExpenses[date].map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between bg-gradient-to-r from-slate-800 to-slate-800/50 p-4 rounded-lg border-l-4 border-orange-500 hover:from-slate-700 hover:to-slate-700/50 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-3xl">
                    {CATEGORY_EMOJIS[expense.category] || "📌"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-orange-300 text-sm">
                        {expense.category}
                      </p>
                      {expense.note && (
                        <p className="text-xs text-slate-400 line-clamp-1">
                          ({expense.note})
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      {new Date(expense.date).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
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
                    className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white px-3 py-2 rounded-lg transition duration-300 text-xs font-bold shadow-lg hover:shadow-red-500/50"
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
