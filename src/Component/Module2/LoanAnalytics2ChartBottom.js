import React, { useState, useEffect } from "react";
import axios from "axios";
import { Radar } from "react-chartjs-2";
import Header from "../header";
import Footer from "../Footer/footer";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import BirdLoader from "../BirdLoader/BirdLoader"; 

const LoanAnalytics2ChartBottom = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      axios
        .get("http://localhost:8080/analytics/total-interest-by-sol-id", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
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

      const labels = bottom10Data.map((item) => item.sol_id);
      const totalInterest = bottom10Data.map((item) => item.totalInterest);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Total Interest",
            data: totalInterest,
            backgroundColor: "rgba(152, 20, 77, 0.4)", // Set the background color for the radar area
            borderColor: "#98144d", // Set the border color for the radar lines
            pointBackgroundColor: "#98144d", // Set the color for the radar points
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
          saveAs(blob, "chart.png");
        });
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
          marginTop: "20px",
        }}
      >
        <h1 style={{ alignItems: "center" }}>
          Bottom 10 Values of Total Interest by SOL_ID
        </h1>
        {loading ? (
          <BirdLoader />
        ) : (
          <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {chartData && (
            <div style={{ width: "40%" }}>
              <Radar
                data={chartData}
                options={{
                  elements: {
                    line: {
                      borderWidth: 2, 
                    },
                  },
                  scales: {
                    r: {
                      beginAtZero: true,
                      suggestedMax: 100, 
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
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default LoanAnalytics2ChartBottom;
