import { useMemo } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const COLORS = {
  Food: "#FF6B6B",
  Travel: "#4ECDC4",
  Bills: "#45B7D1",
  Entertainment: "#FFA07A",
  Shopping: "#98D8C8",
  Healthcare: "#F7DC6F",
  Education: "#BB8FCE",
  Others: "#95A5A6",
};

export default function ChartDisplayCompact({ expenses }) {
  const pieData = useMemo(() => {
    const categoryTotals = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});
    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    const colors = labels.map((l) => COLORS[l] || "#64748b");
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderColor: "#0f172a",
          borderWidth: 2,
        },
      ],
    };
  }, [expenses]);

  const barData = pieData;

  const commonTooltip = {
    callbacks: {
      label: (ctx) => `₹${ctx.parsed.y ?? ctx.parsed}`,
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: commonTooltip },
  };
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: commonTooltip },
    scales: { y: { beginAtZero: true } },
  };

  if (!expenses.length) {
    return (
      <div className="neon-card p-4 rounded-xl border border-slate-600/40 text-center">
        <p className="text-xs text-slate-400">Add expenses to see charts.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="neon-card p-4 rounded-xl h-56 border border-cyan-400/30">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-300 mb-2">
          Category Pie
        </p>
        <div className="h-44">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
      <div className="neon-card p-4 rounded-xl h-56 border border-purple-400/30">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-300 mb-2">
          Category Bar
        </p>
        <div className="h-44">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}
