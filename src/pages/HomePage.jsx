import ExpenseStatsCompact from "../components/ExpenseStatsCompact";
import ChartDisplayCompact from "../components/ChartDisplayCompact";
import { FaHome } from "react-icons/fa";

export default function HomePage({ expenses, onDeleteExpense }) {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-10 animate-fade-in flex flex-col items-center">
      <div className="text-center mb-8 sm:mb-10">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="p-3 sm:p-4 rounded-full bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-purple-600 shadow-[0_0_18px_rgba(34,211,238,0.5)]">
            <FaHome className="text-3xl sm:text-4xl text-white drop-shadow-[0_0_6px_#22d3ee]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black neon-text tracking-tight">
            Home
          </h1>
        </div>
        <p className="text-cyan-300 font-medium sm:font-semibold text-base sm:text-lg tracking-wide">
          Recent expenses at a glance
        </p>
      </div>

      <div className="space-y-6 w-full max-w-5xl">
        <ExpenseStatsCompact expenses={expenses} />
        <ChartDisplayCompact expenses={expenses} />
      </div>
    </div>
  );
}
