import ExpenseList from "../components/ExpenseList";
import { FaListAlt } from "react-icons/fa";

export default function ExpensesPage({ expenses, onDeleteExpense }) {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-10 animate-fade-in flex flex-col items-center">
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-3 sm:p-4 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 shadow-[0_0_18px_rgba(234,88,12,0.55)]">
            <FaListAlt className="text-3xl sm:text-4xl text-white drop-shadow-[0_0_6px_#f97316]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black neon-text tracking-tight">
            All Expenses
          </h1>
        </div>
        <p className="text-orange-300 font-medium sm:font-semibold text-base sm:text-lg tracking-wide">
          View all your recorded expenses
        </p>
      </div>

      {expenses.length > 0 ? (
        <div className="w-full max-w-4xl mx-auto">
          <div className="neon-card rounded-2xl p-6 sm:p-8 border-2 border-orange-500/40 hover:border-orange-300 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block w-2 h-8 bg-gradient-to-b from-orange-400 to-pink-500 rounded-full" />
              <h2 className="text-2xl font-bold text-orange-200">
                Total Expenses ({expenses.length})
              </h2>
            </div>
            <ExpenseList
              expenses={expenses}
              onDeleteExpense={onDeleteExpense}
            />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl mx-auto neon-card rounded-2xl p-12 sm:p-16 text-center border-2 border-dashed border-orange-500/50">
          <p className="text-orange-300 text-base sm:text-lg font-semibold">
            No expenses recorded yet. Start adding!
          </p>
        </div>
      )}
    </div>
  );
}
