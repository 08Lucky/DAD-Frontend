import React, { useState, useEffect } from "react";
import axios from "axios";
import { PolarArea  } from "react-chartjs-2";
import Header from "../header";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

const LoanAnalyticsChartBottom = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      axios
        .get("http://localhost:8080/analytics/total-interest-by-cbo-srm", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const filteredData = data.filter((item) => item.totalInterest !== 0);

      // Sort data by totalInterest in ascending order
      const sortedData = [...filteredData].sort(
        (a, b) => a.totalInterest - b.totalInterest
      );

      const bottom10Data = sortedData.slice(0, 10);

      const labels = bottom10Data.map((item) => item.cboSrmId);
      const totalInterest = bottom10Data.map((item) => item.totalInterest);

      const backgroundColor = totalInterest.map(() => "rgba(152, 20, 77, 0.6)");

      setChartData({
        labels: labels,
        datasets: [
          {
            data: totalInterest,
            backgroundColor: [
              "rgba(152, 20, 77, 0.6)",
              "rgba(255, 107, 107, 0.6)",
              "rgba(255, 167, 38, 0.6)",
              "rgba(102, 187, 106, 0.6)",
              "rgba(33, 150, 243, 0.6)",
              "rgba(156, 39, 176, 0.6)",
              "rgba(76, 175, 80, 0.6)",
              "rgba(255, 193, 7, 0.6)",
              "rgba(96, 125, 139, 0.6)",
              "rgba(233, 30, 99, 0.6)",
            ],
          },
        ],
      });
    }
  }, [data]);

  const handleDownloadPDF = () => {
    const chartDiv = document.getElementById("chart-container");

    if (chartDiv) {
      html2canvas(chartDiv).then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, "chart.png");
          } else {
            console.error("Blob creation failed.");
          }
        });
      }).catch((error) => {
        console.error("html2canvas failed:", error);
      });
    }
  };

  return (
    <div id="chart-container">
      <Header />
      <div
        style={{
          paddingBlockStart: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <h1 style={{ alignItems: "center" }}>
          Bottom 10 Total Interest by CBO_SRM_ID
        </h1>
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            padding: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {chartData && (
            <div style={{ width: "800px" }}>
              <PolarArea // Use the PolarArea component
                data={chartData}
                options={{
                  elements: {
                    arc: {
                      borderWidth: 0, // Remove borders from the arcs
                    },
                  },
                  scale: {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
        <button
          onClick={handleDownloadPDF}
          style={{ backgroundColor: "#98144d", marginBottom: "20px" }}
          className="btn btn-dark btn-lg btn-block"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default LoanAnalyticsChartBottom;
