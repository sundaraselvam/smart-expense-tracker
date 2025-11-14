import { useState } from "react";

const CATEGORIES = [
  "Food",
  "Travel",
  "Bills",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Education",
  "Others",
];

export default function ExpenseForm({ onAddExpense }) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    note: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddExpense({
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      note: formData.note,
    });

    setFormData({
      amount: "",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
      note: "",
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-cyan-300 mb-2">
          Amount (₹)
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          step="0.01"
          min="0"
          className={`w-full px-4 py-3 bg-slate-800 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-white placeholder-slate-500 ${
            errors.amount
              ? "border-red-500 focus:ring-red-500"
              : "border-cyan-500/50 focus:ring-cyan-400 focus:border-cyan-400"
          }`}
        />
        {errors.amount && (
          <p className="text-red-400 text-sm mt-2 font-medium">
            {errors.amount}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-cyan-300 mb-2">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-slate-800 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-white ${
            errors.category
              ? "border-red-500 focus:ring-red-500"
              : "border-cyan-500/50 focus:ring-cyan-400 focus:border-cyan-400"
          }`}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-400 text-sm mt-2 font-medium">
            {errors.category}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-cyan-300 mb-2">
          Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-slate-800 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-white ${
            errors.date
              ? "border-red-500 focus:ring-red-500"
              : "border-cyan-500/50 focus:ring-cyan-400 focus:border-cyan-400"
          }`}
        />
        {errors.date && (
          <p className="text-red-400 text-sm mt-2 font-medium">{errors.date}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-cyan-300 mb-2">
          Note (Optional)
        </label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Add a note about this expense"
          rows="2"
          className="w-full px-4 py-3 bg-slate-800 border-2 border-cyan-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 resize-none text-white placeholder-slate-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-cyan-500/50 hover:shadow-2xl text-base tracking-wide"
      >
        Add Expense
      </button>
    </form>
  );
}
