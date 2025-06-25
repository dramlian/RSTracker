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

const ComboBarChartACWR = ({ acwrData }) => {
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

  // Dummy data for ACWR stacked bar chart
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
        type: "bar",
        label: "Acute Workload",
        data: [120, 135, 150, 140, 125, 160, 145],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        yAxisID: "y",
        order: 2,
      },
      {
        type: "line",
        label: "ACWR Ratio",
        data: [0, 1.23, 1.3, 1.18, 1.04, 1.28, 1.13],
        borderColor: "#FF0000",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        borderWidth: 2,
        fill: false,
        pointRadius: 5,
        pointBackgroundColor: "#FF0000",
        yAxisID: "y1",
        order: 1,
      },
    ],
  };

  const data = acwrData || dummyData;

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
        text: "ACWR Combo Chart",
        font: {
          size: 18,
        },
      },
      datalabels: {
        display: function (context) {
          // Only show labels for ACWR Ratio (line chart)
          return context.dataset.type === "line";
        },
        color: "#FF0000",
        font: {
          size: fontSize,
          weight: "bold",
        },
        formatter: (value) => {
          return value.toFixed(2);
        },
        align: "right",
        offset: 8,
        anchor: "end",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        beginAtZero: true,
        ticks: {
          display: true,
          color: "#000",
          font: {
            size: fontSize,
          },
        },
        title: {
          display: true,
          text: "Acute Workload",
          color: "#000",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        beginAtZero: true,
        max: 2,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          display: true,
          color: "#FF0000",
          font: {
            size: fontSize,
          },
        },
        title: {
          display: true,
          text: "ACWR Ratio",
          color: "#FF0000",
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
      <div style={{ height: "45vh", width: "100%" }}>
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  );
};

export default ComboBarChartACWR;
