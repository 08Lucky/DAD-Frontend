import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Header from "../header";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import Footer from "../Footer/footer";
import BirdLoader from "../BirdLoader/BirdLoader";

const LoanAnalyticsChartTop = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      // Sort data by totalInterest in descending order
      const sortedData = [...data].sort((a, b) => b.totalInterest - a.totalInterest);

      // Extract top 10 items
      const top10Data = sortedData.slice(0, 10);

      const labels = top10Data.map((item) => item.cboSrmId);
      const totalInterest = top10Data.map((item) => item.totalInterest);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Total Interest",
            data: totalInterest,
            fill: false,
            borderColor: "#98144d",
            backgroundColor: "transparent",
            pointBackgroundColor: "#98144d",
            pointRadius: 5,
            pointHoverRadius: 7,
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
          marginTop: "30px"
        }}
      >
        <h1 style={{ alignItems: "center" }}>Top 10 Total Interest by CBO_SRM_ID</h1>
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
            <div style={{ width: "100%", overflowX: "auto", padding: "30px", display: "flex", justifyContent: "center" }}>
              {chartData && (
                <div style={{ width: "65%" }}>
                  <Line
                    data={chartData}
                    options={{
                      plugins: {
                        legend: { display: false },
                      },
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: "CBO_SRM_ID",
                          },
                          type: "category",
                          beginAtZero: true,
                          ticks: {
                            maxRotation: 90,
                            minRotation: 90,
                            autoSkip: false,
                            padding: 10,
                            fontSize: 10,
                          },
                        },
                        y: {
                          title: {
                            display: true,
                            text: "Total Interest",
                          },
                          type: "logarithmic",
                          min: 100,
                        },
                      },
                    }}
                  />
                </div>
              )}
            </div>
            <button onClick={handleDownloadPDF} style={{ backgroundColor: "#98144d", marginBottom: "20px" }} class="btn btn-dark btn-lg btn-block">Download</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LoanAnalyticsChartTop;