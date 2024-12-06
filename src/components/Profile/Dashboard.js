import React from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    color: #666;
    font-size: 1rem;
    margin: 0;
  }

  p {
    font-size: 2rem;
    margin: 0.5rem 0;
    font-weight: bold;
  }

  span {
    color: ${(props) => (props.increase ? "#4caf50" : "#f44336")};
    font-size: 0.9rem;
  }
`;

const ChartSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

function Dashboard() {
  const stats = {
    totalRides: 45,
    totalSpent: 892.5,
    avgRating: 4.8,
    ridesThisMonth: 12,
  };

  const monthlyStats = {
    rides: [8, 12, 15, 10, 14, 12, 16, 18, 14, 12, 15, 12],
    spent: [160, 240, 300, 200, 280, 240, 320, 360, 280, 240, 300, 240],
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = months.map((month, index) => ({
    name: month,
    rides: monthlyStats.rides[index],
    spent: monthlyStats.spent[index],
  }));

  return (
    <DashboardContainer>
      <h2>Your Dashboard</h2>

      <StatsGrid>
        <StatCard>
          <h3>Total Rides</h3>
          <p>{stats.totalRides}</p>
          <span>+15% from last month</span>
        </StatCard>

        <StatCard>
          <h3>Total Spent</h3>
          <p>${stats.totalSpent.toFixed(2)}</p>
          <span>+8% from last month</span>
        </StatCard>

        <StatCard>
          <h3>Average Rating</h3>
          <p>{stats.avgRating} ⭐</p>
          <span>Top rated rider!</span>
        </StatCard>

        <StatCard>
          <h3>Rides This Month</h3>
          <p>{stats.ridesThisMonth}</p>
          <span increase>+2 from last month</span>
        </StatCard>
      </StatsGrid>

      <ChartSection>
        <h3>Monthly Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="rides"
              stroke="#8884d8"
              name="Rides"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="spent"
              stroke="#82ca9d"
              name="Amount Spent ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartSection>
    </DashboardContainer>
  );
}

export default Dashboard;
