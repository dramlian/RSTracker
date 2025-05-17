import { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DataLabelsPlugin from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  DataLabelsPlugin
);

const ComboChartRPE = ({ dayDictionary, norms, averages }) => {
  const [fontSize, setFontSize] = useState(13);
  const labels = Object.values(dayDictionary);

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
        type: "bar",
        label: "Monthly Sales",
        data: averages ? Object.values(averages) : [],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        type: "line",
        label: "Target Line",
        data: norms ? Object.values(norms) : [],
        borderColor: "#FF0000",
        borderWidth: 2,
        borderDash: [],
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
    <div>
      <div style={{ height: "55vh", width: "100%" }}>
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  );
};

export default ComboChartRPE;
