import { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DataLabelsPlugin from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  DataLabelsPlugin
);

const StackedBarChartRPE = ({ rpeData }) => {
  const [fontSize, setFontSize] = useState(13);

  useEffect(() => {
    const handleResize = () => {
      const newSize = Math.min(Math.max(window.innerWidth / 100, 10), 16);
      setFontSize(newSize);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dummy data for RPE stacked bar chart with percentages
  const dummyData = {
    labels: [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
    ],
    datasets: [
      {
        label: "Intensity",
        data: [45, 40, 52, 35, 42, 48, 37],
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        stack: "Stack 0",
      },
      {
        label: "Volume",
        data: [55, 60, 48, 65, 58, 52, 63],
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        stack: "Stack 0",
      },
    ],
  };

  const data = rpeData || dummyData;

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
        text: "Intensity vs Volume Distribution (%)",
        font: {
          size: 18,
        },
      },
      datalabels: {
        display: true,
        color: "#000",
        font: {
          size: fontSize,
          weight: "bold",
        },
        formatter: (value, context) => {
          // Only show percentage if value is greater than 5% to avoid clutter
          return value > 5 ? value + "%" : "";
        },
        anchor: "center",
        align: "center",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        stacked: true,
        ticks: {
          display: true,
          color: "#000",
          font: {
            size: fontSize,
          },
          callback: function (value) {
            return value + "%";
          },
        },
        title: {
          display: true,
          text: "Percentage (%)",
          color: "#000",
        },
      },
      x: {
        stacked: true,
        ticks: {
          color: "#000",
          font: {
            size: fontSize,
          },
        },
        title: {
          display: true,
          text: "Weeks",
          color: "#000",
        },
      },
    },
  };

  return (
    <div>
      <div style={{ height: "45vh", width: "100%" }}>
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  );
};

export default StackedBarChartRPE;
