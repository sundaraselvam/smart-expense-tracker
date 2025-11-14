import FilterPanel from "../components/FilterPanel";
import ExpenseList from "../components/ExpenseList";
import { FaFilter } from "react-icons/fa";

export default function FilterPage({
  expenses,
  filteredExpenses,
  filters,
  onFilterChange,
  onDeleteExpense,
}) {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-10 animate-fade-in">
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-3 sm:p-4 rounded-full bg-gradient-to-br from-lime-400 via-green-500 to-cyan-500 shadow-[0_0_18px_rgba(132,204,22,0.55)]">
            <FaFilter className="text-3xl sm:text-4xl text-white drop-shadow-[0_0_6px_#84cc16]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black neon-text tracking-tight">
            Filter Expenses
          </h1>
        </div>
        <p className="text-lime-300 font-medium sm:font-semibold text-base sm:text-lg tracking-wide">
          Search and filter your expenses
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="neon-card rounded-2xl p-6 sm:p-7 border-2 border-lime-500/40 hover:border-lime-300 transition-colors duration-300 sticky top-24 sm:top-28">
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-block w-1 h-6 bg-gradient-to-b from-lime-400 to-cyan-500 rounded-full" />
              <h2 className="text-2xl font-bold text-lime-200">Filters</h2>
            </div>
            <FilterPanel onFilterChange={onFilterChange} filters={filters} />
          </div>
        </div>

        <div className="lg:col-span-3">
          {expenses.length > 0 ? (
            <div className="neon-card rounded-2xl p-6 sm:p-7 border-2 border-orange-500/40 hover:border-orange-300 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-block w-1 h-6 bg-gradient-to-b from-orange-400 to-pink-500 rounded-full" />
                <h2 className="text-2xl font-bold text-orange-200">
                  Results ({filteredExpenses.length})
                </h2>
              </div>
              <ExpenseList
                expenses={filteredExpenses}
                onDeleteExpense={onDeleteExpense}
              />
            </div>
          ) : (
            <div className="neon-card rounded-2xl p-12 sm:p-16 text-center border-2 border-dashed border-orange-500/50">
              <p className="text-orange-300 text-base sm:text-lg font-semibold">
                No expenses to filter. Add some first!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
