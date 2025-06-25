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

  // Create empty data structure if no data, otherwise process real data
  const processedData =
    !rpeData || rpeData.length === 0
      ? {
          labels: [],
          datasets: [
            {
              label: "Volume",
              data: [],
              backgroundColor: "rgba(54, 162, 235, 0.8)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              stack: "Stack 0",
            },
            {
              label: "Intensity",
              data: [],
              backgroundColor: "rgba(255, 99, 132, 0.8)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              stack: "Stack 0",
            },
          ],
        }
      : {
          labels: rpeData.map((item) => {
            const date = new Date(item.firstDayOfWeek);
            return `Week ${date.getMonth() + 1}/${date.getDate()}`;
          }),
          datasets: [
            {
              label: "Volume",
              data: rpeData.map((item) =>
                parseFloat(item.averageVolume.toFixed(1))
              ),
              backgroundColor: "rgba(54, 162, 235, 0.8)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              stack: "Stack 0",
            },
            {
              label: "Intensity",
              data: rpeData.map((item) =>
                parseFloat(item.averageIntensity.toFixed(1))
              ),
              backgroundColor: "rgba(255, 99, 132, 0.8)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              stack: "Stack 0",
            },
          ],
        };

  const data = processedData;

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
        text: "Intensity vs Volume Distribution",
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
          return parseFloat(value).toFixed(1) + "%";
        },
        anchor: "center",
        align: "center",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: true,
        ticks: {
          display: true,
          color: "#000",
          font: {
            size: fontSize,
          },
        },
        title: {
          display: true,
          text: "Values (%)",
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
