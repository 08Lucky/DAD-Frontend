import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Header from "../header";
import Footer from "../Footer/footer";

const LoanAnalyticsChart2 = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    // Only make the request if token is available
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
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const labels = data.map((item) => item.sol_id);
      const totalInterest = data.map((item) => item.totalInterest);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Total Interest",
            data: totalInterest,
            backgroundColor: "#98144d",
            hoverBackgroundColor: "#fc248184", // Set hover color
          },
        ],
      });
    }
  }, [data]);

  return (
    <div>
      <Header/>
      <div
      style={{
        paddingBlockStart: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop:"30px",
        marginBottom:"70px"
      }}
    >
      <h1 style={{ alignItems: "center" }}>Total Interest by SOL_ID</h1>
      <div style={{ width: "100%", overflowX: "auto", padding: "30px" }}>
        {chartData && (
          <div style={{ width: "5000px" }}>
            <Bar
              data={chartData}
              options={{
                indexAxis: "x",
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "SOL_ID",
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
    </div>
    <Footer/>
    </div>
  );
};

export default LoanAnalyticsChart2;
