import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AddExpensePage from "./pages/AddExpensePage";
import ExpensesPage from "./pages/ExpensesPage";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (newExpense) => {
    const expense = { ...newExpense, id: Date.now().toString() };
    setExpenses((prev) => [expense, ...prev]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-hidden neon-bg">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                expenses={expenses}
                onDeleteExpense={handleDeleteExpense}
              />
            }
          />
          <Route
            path="/add"
            element={<AddExpensePage onAddExpense={handleAddExpense} />}
          />
          <Route
            path="/expenses"
            element={
              <ExpensesPage
                expenses={expenses}
                onDeleteExpense={handleDeleteExpense}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
