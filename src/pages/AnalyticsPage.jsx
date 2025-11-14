import ChartDisplay from "../components/ChartDisplay";
import ExpenseStats from "../components/ExpenseStats";
import { FaChartPie } from "react-icons/fa";

export default function AnalyticsPage({ expenses, filteredExpenses }) {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-10 animate-fade-in">
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-3 sm:p-4 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 shadow-[0_0_18px_rgba(192,38,211,0.55)]">
            <FaChartPie className="text-3xl sm:text-4xl text-white drop-shadow-[0_0_6px_#c026d3]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black neon-text tracking-tight">
            Analytics
          </h1>
        </div>
        <p className="text-pink-300 font-medium sm:font-semibold text-base sm:text-lg tracking-wide">
          Visualize your spending patterns
        </p>
      </div>

      {expenses.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="neon-card rounded-2xl p-6 sm:p-7 border-2 border-purple-500/40 hover:border-purple-300 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-block w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full" />
                <h2 className="text-2xl font-bold text-purple-200">
                  Distribution Charts
                </h2>
              </div>
              <ChartDisplay expenses={expenses} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="neon-card rounded-2xl p-6 sm:p-7 border-2 border-pink-500/40 hover:border-pink-300 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-block w-1 h-6 bg-gradient-to-b from-pink-400 to-purple-500 rounded-full" />
                <h2 className="text-2xl font-bold text-pink-200">Statistics</h2>
              </div>
              <ExpenseStats expenses={filteredExpenses} />
            </div>
          </div>
        </div>
      ) : (
        <div className="neon-card rounded-2xl p-12 sm:p-16 text-center border-2 border-dashed border-purple-500/50">
          <p className="text-purple-300 text-base sm:text-lg font-semibold">
            No data to analyze yet. Add some expenses first!
          </p>
        </div>
      )}
    </div>
  );
}
