import ExpenseList from "../components/ExpenseList";
import { FaWallet } from "react-icons/fa";

export default function DashboardPage({ expenses, onDeleteExpense }) {
  return (
    <div className="container mx-auto px-4 py-10 animate-fade-in">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-4 rounded-full bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-purple-600 shadow-[0_0_25px_rgba(34,211,238,0.6)]">
            <FaWallet className="text-4xl text-white drop-shadow-[0_0_6px_#22d3ee]" />
          </div>
          <h1 className="text-5xl font-black neon-text tracking-tight">
            Dashboard
          </h1>
        </div>
        <p className="text-cyan-300 font-semibold text-lg tracking-wide">
          Recent expenses at a glance
        </p>
      </div>

      {expenses.length > 0 ? (
        <div className="neon-card p-8 rounded-2xl backdrop-blur-xl border-2 border-cyan-500/40 hover:border-cyan-300 transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-cyan-200 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-gradient-to-b from-cyan-400 to-fuchsia-500 rounded-full" />
              All Expenses ({expenses.length})
            </h2>
          </div>
          <ExpenseList expenses={expenses} onDeleteExpense={onDeleteExpense} />
        </div>
      ) : (
        <div className="neon-card p-16 text-center rounded-2xl border-2 border-dashed border-cyan-500/50">
          <p className="text-cyan-300 text-lg font-semibold">
            No expenses yet. Head to Add Expense to create one.
          </p>
        </div>
      )}
    </div>
  );
}
