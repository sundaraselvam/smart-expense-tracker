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

const CATEGORY_COLORS = {
  Food: "#FF6B6B",
  Travel: "#4ECDC4",
  Bills: "#45B7D1",
  Entertainment: "#FFA07A",
  Shopping: "#98D8C8",
  Healthcare: "#F7DC6F",
  Education: "#BB8FCE",
  Others: "#95A5A6",
};

export default function ChartDisplay({ expenses }) {
  const chartData = useMemo(() => {
    const categoryWise = expenses.reduce((acc, exp) => {
      const category = exp.category;
      acc[category] = (acc[category] || 0) + exp.amount;
      return acc;
    }, {});

    const labels = Object.keys(categoryWise);
    const data = Object.values(categoryWise);
    const colors = labels.map((label) => CATEGORY_COLORS[label]);

    return {
      labels,
      datasets: [
        {
          label: "Spending by Category",
          data,
          backgroundColor: colors,
          borderColor: "#fff",
          borderWidth: 2,
          borderRadius: 5,
        },
      ],
    };
  }, [expenses]);

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 12 },
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return "₹" + context.parsed.y.toFixed(2);
          },
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return "₹" + context.parsed.y.toFixed(2);
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "₹" + value.toFixed(0);
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Pie Chart</h3>
        <div style={{ position: "relative", height: "300px" }}>
          <Pie data={chartData} options={pieOptions} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Bar Chart</h3>
        <div style={{ position: "relative", height: "300px" }}>
          <Bar data={chartData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}
