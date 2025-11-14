import { useState, useEffect, useCallback } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import FilterPanel from "./components/FilterPanel";
import ExpenseStats from "./components/ExpenseStats";
import ChartDisplay from "./components/ChartDisplay";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    dateFrom: "",
    dateTo: "",
    amountMin: "",
    amountMax: "",
    sortBy: "recent",
  });

  const applyFilters = useCallback(() => {
    let filtered = [...expenses];

    if (filters.category) {
      filtered = filtered.filter((exp) => exp.category === filters.category);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(
        (exp) => new Date(exp.date) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(
        (exp) => new Date(exp.date) <= new Date(filters.dateTo)
      );
    }

    if (filters.amountMin) {
      filtered = filtered.filter(
        (exp) => exp.amount >= parseFloat(filters.amountMin)
      );
    }
    if (filters.amountMax) {
      filtered = filtered.filter(
        (exp) => exp.amount <= parseFloat(filters.amountMax)
      );
    }

    if (filters.sortBy === "recent") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (filters.sortBy === "highest") {
      filtered.sort((a, b) => b.amount - a.amount);
    } else if (filters.sortBy === "lowest") {
      filtered.sort((a, b) => a.amount - b.amount);
    }

    setFilteredExpenses(filtered);
  }, [expenses, filters]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAddExpense = (newExpense) => {
    const expense = {
      ...newExpense,
      id: Date.now().toString(),
    };
    setExpenses([expense, ...expenses]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            💰 Expense Tracker
          </h1>
          <p className="text-gray-600">
            Track your expenses, manage your budget
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Add Expense
              </h2>
              <ExpenseForm onAddExpense={handleAddExpense} />
            </div>

            {expenses.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Statistics
                </h2>
                <ExpenseStats expenses={filteredExpenses} />
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            {expenses.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Spending Distribution
                </h2>
                <ChartDisplay expenses={expenses} />
              </div>
            )}

            {expenses.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Filters
                </h2>
                <FilterPanel
                  onFilterChange={handleFilterChange}
                  filters={filters}
                />
              </div>
            )}

            {expenses.length > 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Expenses ({filteredExpenses.length})
                </h2>
                <ExpenseList
                  expenses={filteredExpenses}
                  onDeleteExpense={handleDeleteExpense}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <p className="text-gray-500 text-lg">
                  No expenses yet. Start by adding your first expense!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
