import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import DataLabelsPlugin from "chartjs-plugin-datalabels";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  DataLabelsPlugin
);

export default function BarChartRPE({ chartData }) {
  const [fontSize, setFontSize] = useState(13);

  useEffect(() => {
    const handleResize = () => {
      const newSize = Math.max(10, Math.min(16, window.innerWidth / 100));
      setFontSize(newSize);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = {
    labels: Object.keys(chartData),
    datasets: [
      {
        label: "Volume",
        data: Object.values(chartData).map((dayData) => dayData.volume),
        backgroundColor: "rgba(238, 255, 0, 0.51)",
        borderWidth: 1,
      },
      {
        label: "Intensity",
        data: Object.values(chartData).map((dayData) => dayData.intensity),
        backgroundColor: "rgba(16, 37, 223, 0.6)",
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
        text: "RPE Bar Chart",
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
        formatter: function (value) {
          return value + "%";
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
