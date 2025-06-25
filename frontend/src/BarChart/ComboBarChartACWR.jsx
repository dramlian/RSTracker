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

  // Create empty data structure if no data, otherwise process real data
  const processedData =
    !acwrData || acwrData.length === 0
      ? {
          labels: [],
          datasets: [
            {
              type: "bar",
              label: "Total Week RPE",
              data: [],
              backgroundColor: "rgba(54, 162, 235, 0.7)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              yAxisID: "y",
              order: 2,
            },
            {
              type: "line",
              label: "ACWR Calculated",
              data: [],
              borderColor: "#FF0000",
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              borderWidth: 3,
              fill: false,
              pointRadius: 5,
              pointBackgroundColor: "#FF0000",
              yAxisID: "y1",
              order: 1,
            },
          ],
        }
      : {
          labels: acwrData.map((item) => {
            const date = new Date(item.firstDayOfWeek);
            return `Week ${date.getMonth() + 1}/${date.getDate()}`;
          }),
          datasets: [
            {
              type: "bar",
              label: "Total Week RPE",
              data: acwrData.map((item) =>
                parseFloat(item.totalWeekRpe.toFixed(1))
              ),
              backgroundColor: "rgba(54, 162, 235, 0.7)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              yAxisID: "y",
              order: 2,
            },
            {
              type: "line",
              label: "ACWR Calculated",
              data: acwrData.map((item) =>
                parseFloat(item.acwrCalculated.toFixed(2))
              ),
              borderColor: "#FF0000",
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              borderWidth: 3,
              fill: false,
              pointRadius: 5,
              pointBackgroundColor: "#FF0000",
              yAxisID: "y1",
              order: 1,
            },
          ],
        };

  const data = processedData;

  // Calculate dynamic max value for ACWR axis - handle empty data case
  const acwrMax =
    !acwrData || acwrData.length === 0
      ? 2 // Default max value when no data
      : Math.max(...acwrData.map((item) => item.acwrCalculated)) * 1.1;

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
          return true;
        },
        color: function (context) {
          return context.dataset.type === "line" ? "#FF0000" : "#000";
        },
        font: {
          size: fontSize,
          weight: "bold",
        },
        formatter: (value, context) => {
          if (context.dataset.type === "line") {
            return value.toFixed(2);
          } else {
            return parseFloat(value).toFixed(1);
          }
        },
        align: function (context) {
          return context.dataset.type === "line" ? "right" : "center";
        },
        offset: function (context) {
          return context.dataset.type === "line" ? 8 : 0;
        },
        anchor: function (context) {
          return context.dataset.type === "line" ? "end" : "center";
        },
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
          text: "Total Week RPE",
          color: "#000",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        beginAtZero: true,
        max: acwrMax,
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
          text: "ACWR Calculated",
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
