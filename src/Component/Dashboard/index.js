import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Dashboard.css";
import FileUpload from "../FileUpload";
import Header from "../header/index";
import Footer from "../Footer/footer";
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const openVisualizationPage = (path) => {
    window.open(path, "_blank"); // Open in a new tab
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ display: "flex", alignItems: "center", marginTop: "60px"}}>
        <MDBCarousel showControls showIndicators className="w-70" style={{marginLeft:"10px",marginRight:"30px", border:"1px", width:"65%"}}>
          <MDBCarouselItem
            className='w-70 d-block'
            itemId={1}
            src="/images/carousel1.jpg"
            alt='...'
            style={{height:"355px"}}
          />
          <MDBCarouselItem
            className='w-70 d-block'
            itemId={2}
            src="/images/carousel2.jpg"
            alt='...'
            style={{height:"355px"}}
          />
          <MDBCarouselItem
            className='w-70 d-block'
            itemId={3}
            src="/images/carousel3.jpg"
            alt='...'
            style={{height:"355px"}}
          />
        </MDBCarousel>
        <div>
          <h3><span>My</span> Offers</h3>
          <img src="/images/MyOffer.jpg" />
        </div>
      </div>
      <div style={{background:"#98144d", width:"45%", height:"40px",display:"flex", alignItems:"center", marginLeft:"20px", marginTop:"20px", borderRadius:"5px"}}>
        <span style={{color:"white", fontWeight:"bold", marginLeft:"20px"}}>Visualization Dashboard</span>
      </div>
      <div className="dashboard-container">
        <div className="option-selector">
          <label>Select an option:</label>
          <select
            className="select-option"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">Select an option</option>
            <option value="totalInterestByCboSrm">
              Total Interest by CBO_SRM_ID
            </option>
            <option value="totalInterestBySolId">
              Total Interest by SOL_ID
            </option>
            <option value="failure1&4CountBySolId">
              SOL_ID wise failure 1 & 4 count
            </option>
            <option value="failure1CountByCboSrm">
            CBO_SRM_ID wise failure 1 count
            </option>
            <option value="failure4CountByCboSrm">
            CBO_SRM_ID wise failure 4 count
            </option>
            <option value="CboSrmWiseGoodCustomer">
            CBO_SRM_ID wise Good Customer Count
            </option>
          </select>
        </div>

        {selectedOption === "totalInterestByCboSrm" && (
          <div className="option-content">
            <h2 className="option-title">Total Interest by CBO_SRM_ID</h2>
            <ul className="option-list">
              <li>
                <button
                  className="chart-button"
                  onClick={() =>
                    openVisualizationPage("/dashboard/loanAnalyticChart1")
                  }
                >
                  Total Interest by CBO_SRM_ID
                </button>
              </li>
              <li>
                <button
                  className="chart-button"
                  onClick={() =>
                    openVisualizationPage("/dashboard/loanAnalyticsChartTop")
                  }
                >
                  Top 10 values of total interest by CBO_SRM_ID
                </button>
              </li>
              <li>
                <button
                  className="chart-button"
                  onClick={() =>
                    openVisualizationPage("/dashboard/loanAnalyticsChartBottom")
                  }
                >
                  Bottom 10 values of total interest by CBO_SRM_ID
                </button>
              </li>
            </ul>
          </div>
        )}

        {selectedOption === "totalInterestBySolId" && (
          <div className="option-content">
            <h2 className="option-title">Total Interest by SOL_ID</h2>
            <ul className="option-list">
              <li>
                <button
                  className="chart-button"
                  onClick={() =>
                    openVisualizationPage("/dashboard/loanAnalyticChart2")
                  }
                >
                  Total Interest by SOL_ID
                </button>
              </li>
              <li>
                <button
                  className="chart-button"
                  onClick={() =>
                    openVisualizationPage("/dashboard/loanAnalytics2ChartTop")
                  }
                >
                  Top 10 values of Total Interest by SOL_ID
                </button>
              </li>
              <li>
                <button
                  className="chart-button"
                  onClick={() =>
                    openVisualizationPage(
                      "/dashboard/loanAnalytics2ChartBottom"
                    )
                  }
                >
                  Bottom 10 values of Total Interest by SOL_ID
                </button>
              </li>
            </ul>
          </div>
        )}

        {selectedOption === "failure1&4CountBySolId" && (
          <div className="option-content">
            <h2 className="option-title">SOL_ID wise No. of failure 1 & 4 </h2>
            <ul className="option-list">
              <li>
                <button
                  className="chart-button"
                  onClick={() =>
                    openVisualizationPage("/dashboard/loanAnalyticChart3")
                  }
                >
                  SOL_ID by No. of failure 1 & 4 {" "}
                </button>
              </li>
              <li>
                <button
                  className="chart-button"
                  onClick={() =>
                    openVisualizationPage("/dashboard/loanAnalytics3LineChart")
                  }
                >
                  Line Chart SOL_ID by No. of failure 1 & 4 {" "}
                </button>
              </li>
              <li>
                <button
                  className="chart-button"
                  onClick={() =>
                    openVisualizationPage("/dashboard/loanAnalytics3ScatterPlot")
                  }
                >
                  Scatter Plot SOL_ID by No. of failure 1 & 4 {" "}
                </button>
              </li>
            </ul>
          </div>
        )}

        {selectedOption === "failure1CountByCboSrm" && (
          <div className="option-content">
            <h2 className="option-title">CBO_SRM_ID wise failure 1 count</h2>
            <ul className="option-list">
              <li>
                <button
                  className="chart-button"
                  onClick={() =>
                    openVisualizationPage("/dashboard/failureCountChart")
                  }
                >
                  FailureCount Bar Chart
                </button>
              </li>
              <li>
                <button
                  className="chart-button"
                  onClick={() =>
                    openVisualizationPage(
                      "/dashboard/failureCountDoughnutChart"
                    )
                  }
                >
                  FailureCount Doughnut Chart
                </button>
              </li>
              <li>
                <button
                  className="chart-button"
                  onClick={() =>
                    openVisualizationPage("/dashboard/FailureCountPieChart")
                  }
                >
                  FailureCount Pie Chart
                </button>
              </li>
            </ul>
          </div>
        )}

        {selectedOption === "failure4CountByCboSrm" && (
          <div className="option-content">
            <h2 className="option-title">CBO_SRM_ID wise failure 4 count</h2>
            <ul className="option-list">
              <li>
                <button
                  className="chart-button"
                  onClick={() =>
                    openVisualizationPage("/dashboard/loanAnalyticChart5")
                  }
                >
                  CBO_SRM_ID by No. of failure 4{" "}
                </button>
              </li>
              <li>
                <button
                  className="chart-button"
                  onClick={() =>
                    openVisualizationPage("/dashboard/loanAnalytics5GaugeChart")
                  }
                >
                  Gauge Chart CBO_SRM_ID by No. of failure 4{" "}
                </button>
              </li>
            </ul>
          </div>
        )}

        {selectedOption === "CboSrmWiseGoodCustomer" && (
          <div className="option-content">
            <h2 className="option-title">
              CBO_SRM_ID wise Good Customer Count
            </h2>
            <ul className="option-list">
              <li>
                <button
                  className="chart-button"
                  onClick={() =>
                    openVisualizationPage("/dashboard/loanAnalyticChart6")
                  }
                >
                  CBO_SRM_ID wise Good Customer Count
                </button>
              </li>
              <li>
                <button
                  className="chart-button"
                  onClick={() =>
                    openVisualizationPage("/dashboard/loanAnalytics6ChartTop10")
                  }
                >
                  Top 10 Good Customers as per CBO_SRM_ID
                </button>
              </li>
            </ul>
          </div>
        )}

        <Outlet />
      </div>
      <div style={{background:"#98144d", width:"45%", height:"40px",display:"flex", alignItems:"center", marginLeft:"20px", marginTop:"20px", borderRadius:"5px"}}>
        <span style={{color:"white", fontWeight:"bold", marginLeft:"20px"}}>Upload Excel Sheet</span>
      </div>
      <FileUpload/>
      <Footer/>
    </div>
  );
};

export default Dashboard;
