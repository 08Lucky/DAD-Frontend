import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../header';
import Footer from '../Footer/footer';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { Line } from 'react-chartjs-2'; 

const LoanAnalytics3LineChart = () => {
    const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios
        .get('http://localhost:8080/analytics/sol-id-wise-failure1-count', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
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
        label: 'Failure Count',
        data: failureCounts,
        borderColor: '#98144d', 
        pointBackgroundColor: '#fc248184', 
        fill: false, 
      },
    ],
  };

  const handleDownloadPDF = () => {
    const chartDiv = document.getElementById('chart-container');

    if (chartDiv) {
      html2canvas(chartDiv).then((canvas) => {
        canvas.toBlob((blob) => {
          saveAs(blob, 'chart.png');
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
        marginTop: "30px"
      }}>
        <h1 style={{ alignItems: "center" }}>SOL_ID wise No. Of Failure 1 & 4</h1>
        <div style={{ width: '80%', padding: "10px" }}>
          <Line 
            data={chartData}
            options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'SOL_ID',
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
                    text: 'Failure Count',
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
        <button onClick={handleDownloadPDF} style={{ backgroundColor: "#98144d", marginBottom: "20px" }} className="btn btn-dark btn-lg btn-block">Download</button>
      </div>
      <Footer/>
    </div>
  );
};

export default LoanAnalytics3LineChart;
