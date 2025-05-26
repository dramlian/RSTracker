import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import DataLabelsPlugin from "chartjs-plugin-datalabels";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  DataLabelsPlugin
);

export default function BarChartWelness({ chartData }) {
  const [fontSize, setFontSize] = useState(13);
  const labels = Object.keys(chartData);
  const values = Object.values(chartData);

  useEffect(() => {
    const handleResize = () => {
      const newSize = Math.min(Math.max(window.innerWidth / 100, 10), 16);
      setFontSize(newSize);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Wellness Score",
        data: values,
        backgroundColor: "rgba(10, 204, 238, 0.85)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      title: {
        display: true,
        text: "Wellness Bar Chart",
        font: {
          size: 18,
        },
      },
      datalabels: {
        display: true,
        color: "#000",
        font: {
          size: fontSize,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
      },
      x: {
        ticks: {
          color: "#000",
          font: {
            size: fontSize,
          },
        },
      },
    },
  };

  return (
    <div style={{ height: "55vh", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
