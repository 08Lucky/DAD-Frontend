import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import Header from '../header';
import Footer from '../Footer/footer';
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

const FailureCountPieChart = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      axios
        .get('http://localhost:8080/analytics/cbo-srm-wise-failure1-count', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, []);


  const labels = Object.keys(data);
  const failureCounts = Object.values(data);


  // Generate an array of random colors
  const colors = labels.map(() =>
    `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`
  );


  const chartData = {
    labels: labels,
    datasets: [
      {
        data: failureCounts,
        backgroundColor: colors,
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
        <h1 style={{ alignItems: "center" }}>CBO_SRM_ID wise No. Of Failure 1</h1>
        <div style={{ width: '80%', height: '80vh', margin: '0 auto', marginBottom:"15px" }}>
          <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <button onClick={handleDownloadPDF} style={{backgroundColor: "#98144d", marginBottom:"20px"}} class="btn btn-dark btn-lg btn-block">Download</button>
      </div>
      <Footer/>
    </div>
  );
};


export default FailureCountPieChart;
