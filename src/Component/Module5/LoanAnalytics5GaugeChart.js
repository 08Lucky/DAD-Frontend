import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../header';
import Footer from '../Footer/footer';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import GaugeChart from 'react-gauge-chart';
import BirdLoader from "../BirdLoader/BirdLoader";

const LoanAnalytics5GaugeChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios
        .get('http://localhost:8080/analytics/cbo-srm-wise-failure4-count', {
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

  const failureCounts = Object.values(data);

  // Assuming you want the first value
  const gaugeValue = failureCounts.length > 0 ? failureCounts[0] : 0;

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
      <div
        style={{
          paddingBlockStart: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '30px',
        }}
      >
        <h1 style={{ alignItems: 'center' }}>
          CBO_SRM_ID wise failure 4 count
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
        <div style={{ width: '75%', padding: '10px', textAlign: 'center' }}>
          <GaugeChart
            id="gauge-chart1"
            textColor="#000"
            percent={gaugeValue / 100}
            needleColor="#000"
            colors={['#ff0000', '#ffa500', '#00ff00']}
            hideText={false}
            arcWidth={0.2} 
            nrOfLevels={5} 
            cornerRadius={3} 
            formatTextValue={(value) => `${value}%`} 
          />
        </div>
        <button
          onClick={handleDownloadPDF}
          style={{ backgroundColor: '#98144d', marginBottom: '20px' }}
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

export default LoanAnalytics5GaugeChart;