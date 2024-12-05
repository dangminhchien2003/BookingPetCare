import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaUser, FaDollarSign, FaServicestack, FaCalendarAlt } from 'react-icons/fa';
import './Dashboard.css'; // Import CSS

// Đăng ký các thành phần cần thiết cho ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const stats = {
    users: 1500,
    revenue: 50000,
    services: 200,
    appointments: 300,
  };

  const data = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Doanh thu (triệu VNĐ)',
        data: [100, 200, 150, 300, 250, 400],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Doanh thu theo tháng',
      },
    },
  };

  return (
    <div id="dashboard" className="content-section">
      {/* Khu vực hiển thị 4 thẻ (card) */}
      <div className="card-container">
        <div className="card">
          <FaUser size={30} style={{ marginBottom: '5px' }} />
          <h3>Người dùng</h3>
          <p>{stats.users}</p>
        </div>
        <div className="card">
          <FaDollarSign size={30} style={{ marginBottom: '5px' }} />
          <h3>Doanh thu</h3>
          <p>{stats.revenue} triệu VNĐ</p>
        </div>
        <div className="card">
          <FaServicestack size={30} style={{ marginBottom: '5px' }} />
          <h3>Dịch vụ</h3>
          <p>{stats.services}</p>
        </div>
        <div className="card">
          <FaCalendarAlt size={30} style={{ marginBottom: '5px' }} />
          <h3>Tổng lịch hẹn</h3>
          <p>{stats.appointments}</p>
        </div>
      </div>

      {/* Khu vực hiển thị biểu đồ */}
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
