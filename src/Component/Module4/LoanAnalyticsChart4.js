import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import Header from '../header';
import Footer from '../Footer/footer';
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import BirdLoader from "../BirdLoader/BirdLoader";

const FailureCountDoughnutChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      axios
        .get('http://localhost:8080/analytics/cbo-srm-wise-failure1-count', {
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

  const labels = Object.keys(data);
  const failureCounts = Object.values(data);

  // Generate random colors for each segment
  const randomColors = Array.from({ length: labels.length }, () =>
    `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.6)`
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: failureCounts,
        backgroundColor: randomColors,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    height: 400,
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
        marginTop: "30px"
      }}>
        <h1 style={{ alignItems: "center" }}>CBO_SRM_ID wise No. Of Failure 1</h1>
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
        <div style={{ width: '80%', height: '76vh', margin: '0 auto', marginBottom:"15px" }}>
          <Doughnut data={chartData} options={chartOptions} />
        </div>
        <button onClick={handleDownloadPDF} style={{backgroundColor: "#98144d", marginBottom:"20px"}} class="btn btn-dark btn-lg btn-block">Download</button>
        </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default FailureCountDoughnutChart;
