"use client";

import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { FaChartLine } from "react-icons/fa"; // Sales trend icon
import styled from "styled-components";
import { AdminNavbar } from "../components/AdminNavbar";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PageContainer = styled.div`
  background: #eeeeee;
  min-height: 100vh;
  padding-top: 130px;
`;

const Section = styled.div`
  padding: 40px 80px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const PageTitle = styled.h1`
  color: #665A38;
  font-size: 28px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchBar = styled.div`
  position: relative;
  max-width: 400px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 42px;
  border-radius: 8px;
  border: 1px solid #e0dfd6;
  background: #fff;
  color: #665A38;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #8B8055;
  }

  &::placeholder {
    color: #a9a28c;
  }
`;

const TableWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(102, 90, 56, 0.1);
  overflow: hidden;
  margin-bottom: 30px;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  padding: 16px 24px;
  background: #f0efe6;
  color: #665A38;
  font-weight: 600;
  font-size: 14px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  padding: 16px 24px;
  border-bottom: 1px solid #f0efe6;
  align-items: center;

  &:hover {
    background: #fdfcf7;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: block;
    padding: 16px;
  }
`;

const TableCell = styled.div`
  color: #665A38;
  font-size: 14px;

  @media (max-width: 768px) {
    display: flex;
    padding: 4px 0;

    &::before {
      content: attr(data-label);
      font-weight: 600;
      width: 100px;
      margin-right: 16px;
    }
  }
`;

const SalesTrendSection = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(102, 90, 56, 0.1);
`;

const TrendTitle = styled.h3`
  font-size: 20px;
  color: #665A38;
  margin-bottom: 16px;
`;

const TrendContent = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #665A38;
`;

const SmallChart = styled.div`
  margin-top: 20px;
  padding: 16px;
  background: #f9f8f2;
  border-radius: 12px;
`;

const Sales = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample sales data
  const salesData = [
    {
      date: "2025-05-01",
      totalIncome: "Rs. 25,000.00",
      orders: 10,
      totalOrders: 12,
    },
    {
      date: "2025-05-02",
      totalIncome: "Rs. 18,750.00",
      orders: 8,
      totalOrders: 11,
    },
  ];

  // Trend data (could be calculated from actual data)
  const totalIncomeLastMonth = 500000;
  const totalIncomeThisMonth = 600000;

  const incomeGrowth = ((totalIncomeThisMonth - totalIncomeLastMonth) / totalIncomeLastMonth) * 100;

  const filteredSalesData = salesData.filter((day) =>
    day.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Data for small chart (Income trend over the last 7 days)
  const incomeTrendData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Income Trend (Rs.)",
        data: [25000, 18000, 20000, 22000, 19000, 24000, 26000],
        fill: false,
        borderColor: "#8B8055",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `Rs. ${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <PageContainer>
      <AdminNavbar />
      <Section>
        <PageTitle>
          <FaChartLine size={24} /> Sales Overview
        </PageTitle>

        <SearchBar>
          <SearchInput
            placeholder="Search by date or order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>

        <TableWrapper>
          <TableHeader>
            <div>Date</div>
            <div>Total Income</div>
            <div>Orders Completed</div>
            <div>Total Orders</div>
            <div>Income Trend</div>
          </TableHeader>

          {filteredSalesData.map((day) => (
            <TableRow key={day.date}>
              <TableCell data-label="Date">{day.date}</TableCell>
              <TableCell data-label="Total Income">{day.totalIncome}</TableCell>
              <TableCell data-label="Orders Completed">{day.orders}</TableCell>
              <TableCell data-label="Total Orders">{day.totalOrders}</TableCell>
              <TableCell data-label="Income Trend">
                <div style={{ color: incomeGrowth > 0 ? "#2ecc71" : "#e67e22" }}>
                  {incomeGrowth > 0 ? "+" : ""}
                  {incomeGrowth.toFixed(2)}%
                </div>
              </TableCell>
            </TableRow>
          ))}

          {filteredSalesData.length === 0 && (
            <TableRow>
              <TableCell style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                No sales data found
              </TableCell>
            </TableRow>
          )}
        </TableWrapper>

        <SalesTrendSection>
          <TrendTitle>Sales Growth Trend</TrendTitle>
          <TrendContent>
            <div>Total Income (Last Month): {totalIncomeLastMonth}</div>
            <div>Total Income (This Month): {totalIncomeThisMonth}</div>
            <div>
              Growth:{" "}
              <span style={{ color: incomeGrowth > 0 ? "#2ecc71" : "#e67e22" }}>
                {incomeGrowth > 0 ? "+" : ""}
                {incomeGrowth.toFixed(2)}%
              </span>
            </div>
          </TrendContent>
        </SalesTrendSection>

        <SmallChart>
          <h4>Income Trend (Past Week)</h4>
          <Line data={incomeTrendData} options={chartOptions} />
        </SmallChart>
      </Section>
    </PageContainer>
  );
};

export default Sales;
