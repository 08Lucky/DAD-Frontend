import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Header from '../header';
import Footer from '../Footer/footer';
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

const LoanAnalytics6ChartTop = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      axios
        .get('http://localhost:8080/analytics/good-customer', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          // Sort the data by good customer in descending order and take the top 10 values
          const sortedData = Object.entries(response.data)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
            
          setData(sortedData);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, []);

  const labels = Object.keys(data);
  const failureCounts = Object.values(data);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Good Customer',
        data: failureCounts,
        backgroundColor: '#98144d',
        hoverBackgroundColor: "#fc248184"
      },
    ],
  };

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
      <div style={{
        paddingBlockStart: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop:"30px"
      }}>
        <h1 style={{ alignItems: "center" }}>CBO_SRM_ID wise Top 10 Good customers count</h1>
        <div style={{ width: '100%', overflowX: "auto", padding: "20px",  display:"flex", justifyContent:"center" }}>
          {chartData && (
            <div style={{ width: "1000px" }}>
              <Bar
                data={chartData}
                options={{
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'CBO_SRM_ID',
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
                        text: 'Good Customer',
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
        <button onClick={handleDownloadPDF} style={{backgroundColor: "#98144d", marginBottom:"20px"}} class="btn btn-dark btn-lg btn-block">Download</button>
      </div>
      <Footer/>
    </div>
  );
};

export default LoanAnalytics6ChartTop;
