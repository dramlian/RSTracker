import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChartRPE({ chartData }) {
  const data = {
    labels: Object.keys(chartData),
    datasets: [
      {
        label: "Volume",
        data: Object.values(chartData).map((dayData) => dayData.volume),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderWidth: 1,
      },
      {
        label: "Intensity",
        data: Object.values(chartData).map((dayData) => dayData.intensity),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "55vh", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
