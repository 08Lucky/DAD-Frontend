// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoanAnalyticChart1 from "./Component/Module1/LoanAnalyticsChart1";
import LoanAnalyticsChartTop from './Component/Module1/LoanAnalyticsChartTop';
import LoanAnalyticsChartBottom from './Component/Module1/LoanAnalyticsChartBottom';
import LoanAnalyticsChart2 from './Component/Module2/LoanAnalyticsChart2';
import LoanAnalytics2ChartBottom from './Component/Module2/LoanAnalytics2ChartBottom';
import LoanAnalytics2ChartTop from './Component/Module2/LoanAnalytics2ChartTop';
import LoanAnalytics3Chart from './Component/Module3/LoanAnalytics3Chart';
import LoanAnalytics3LineChart from './Component/Module3/LoanAnalytics3LineChart';
import LoanAnalytics3ScatterPlot from './Component/Module3/LoanAnalytics3ScatterPlot';
import FailureCountChart from './Component/Module4/FailureCountBarChart';
import FailureCountDoughnutChart from './Component/Module4/LoanAnalyticsChart4';
import FailureCountPieChart from './Component/Module4/FailureCountPieChart';
import LoanAnalytics5Chart from './Component/Module5/LoanAnalytics5Chart';
import LoanAnalytics5GaugeChart from './Component/Module5/LoanAnalytics5GaugeChart';
import LoanAnalytics6Chart from './Component/Module6/LoanAnalytics6Chart';
import LoanAnalytics6ChartTop from './Component/Module6/LoanAnalytics6ChartTop';
import Login from './Component/userLogin/index';
import Dashboard from './Component/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/loanAnalyticChart1" element={<LoanAnalyticChart1 />} />
        <Route path="/dashboard/loanAnalyticsChartTop" element={<LoanAnalyticsChartTop />} />
        <Route path="/dashboard/loanAnalyticsChartBottom" element={<LoanAnalyticsChartBottom />} />
        <Route path="/dashboard/loanAnalyticChart2" element={<LoanAnalyticsChart2/>} />
        <Route path="/dashboard/loanAnalytics2ChartTop" element={<LoanAnalytics2ChartTop />} />
        <Route path="/dashboard/loanAnalytics2ChartBottom" element={<LoanAnalytics2ChartBottom />} />
        <Route path="/dashboard/loanAnalyticChart3" element={<LoanAnalytics3Chart/>} />
        <Route path="/dashboard/loanAnalytics3LineChart" element={<LoanAnalytics3LineChart/>} />
        <Route path="/dashboard/loanAnalytics3ScatterPlot" element={<LoanAnalytics3ScatterPlot/>} />

        <Route path="/dashboard/failureCountChart" element={<FailureCountChart />} />
        <Route path="/dashboard/failureCountDoughnutChart" element={<FailureCountDoughnutChart />} />
        <Route path="/dashboard/FailureCountPieChart" element={<FailureCountPieChart />} />
        <Route path="/dashboard/loanAnalyticChart5" element={<LoanAnalytics5Chart/>} />
        <Route path="/dashboard/loanAnalytics5GaugeChart" element={<LoanAnalytics5GaugeChart/>} />
        <Route path="/dashboard/loanAnalyticChart6" element={<LoanAnalytics6Chart/>} />
        <Route path="/dashboard/loanAnalytics6ChartTop10" element={<LoanAnalytics6ChartTop/>} />

      </Routes>
    </Router>
  );
}

export default App;
