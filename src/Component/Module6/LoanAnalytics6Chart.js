import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Header from '../header';

const LoanAnalytics6Chart = () => {
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
          setData(response.data);
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


  return (
    <div>
      <Header />
      <div style={{
        paddingBlockStart: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop:"30px"
      }}>
        <h1 style={{ alignItems: "center" }}>CBO_SRM_ID wise Good Customer Count</h1>
        <div style={{ width: '100%', overflowX: "auto", padding: "10px" }}>
          {chartData && (
            <div style={{ width: "4000px" }}>
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
      </div>
    </div>
  );
};


export default LoanAnalytics6Chart;
