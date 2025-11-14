import ExpenseForm from "../components/ExpenseForm";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function AddExpensePage({ onAddExpense }) {
  const navigate = useNavigate();

  const handleAddAndRedirect = (data) => {
    onAddExpense(data);
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-10 animate-fade-in flex flex-col items-center">
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-3 sm:p-4 rounded-full bg-gradient-to-br from-green-400 via-cyan-500 to-blue-500 shadow-[0_0_18px_rgba(16,185,129,0.55)]">
            <FaPlus className="text-3xl sm:text-4xl text-white drop-shadow-[0_0_6px_#10b981]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black neon-text tracking-tight">
            Add Expense
          </h1>
        </div>
        <p className="text-green-300 font-medium sm:font-semibold text-base sm:text-lg tracking-wide">
          Record a new expense and return home
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto">
        <div className="neon-card rounded-2xl p-8 sm:p-10 border-2 border-green-500/40 hover:border-green-300 transition-colors duration-300 backdrop-blur-xl">
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <span className="inline-block w-1 sm:w-2 h-6 sm:h-8 bg-gradient-to-b from-green-400 to-cyan-500 rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold text-green-200">
              New Expense
            </h2>
          </div>
          <ExpenseForm onAddExpense={handleAddAndRedirect} />
        </div>
      </div>
    </div>
  );
}
