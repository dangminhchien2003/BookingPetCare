import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaUser, FaDollarSign, FaServicestack, FaCalendarAlt } from 'react-icons/fa';

// Đăng ký các thành phần cần thiết cho ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Dữ liệu số liệu cho các thẻ
  const stats = {
    users: 1500,
    revenue: 50000,
    services: 200,
    appointments: 300
  };

  // Dữ liệu biểu đồ doanh thu theo tháng
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

  // Tùy chọn cho biểu đồ
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
      <h2>Tổng quan</h2>

      {/* Khu vực hiển thị 4 thẻ (card) */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ ...cardStyle, backgroundColor: '#ff6384' }}>
          <FaUser size={30} style={{ marginBottom: '5px' }} /> {/* Icon người dùng */}
          <h3 style={{ fontSize: '1rem' }}>Người dùng</h3>
          <p style={{ fontSize: '1.2rem' }}>{stats.users}</p>
        </div>
        <div className="card" style={{ ...cardStyle, backgroundColor: '#36a2eb' }}>
          <FaDollarSign size={30} style={{ marginBottom: '5px' }} /> {/* Icon doanh thu */}
          <h3 style={{ fontSize: '1rem' }}>Doanh thu</h3>
          <p style={{ fontSize: '1.2rem' }}>{stats.revenue} triệu VNĐ</p>
        </div>
        <div className="card" style={{ ...cardStyle, backgroundColor: '#4bc0c0' }}>
          <FaServicestack size={30} style={{ marginBottom: '5px' }} /> {/* Icon dịch vụ */}
          <h3 style={{ fontSize: '1rem' }}>Dịch vụ</h3>
          <p style={{ fontSize: '1.2rem' }}>{stats.services}</p>
        </div>
        <div className="card" style={{ ...cardStyle, backgroundColor: '#ffcd56' }}>
          <FaCalendarAlt size={30} style={{ marginBottom: '5px' }} /> {/* Icon lịch hẹn */}
          <h3 style={{ fontSize: '1rem' }}>Tổng lịch hẹn</h3>
          <p style={{ fontSize: '1.2rem' }}>{stats.appointments}</p>
        </div>
      </div>

      {/* Khu vực hiển thị biểu đồ */}
      <div style={{ maxWidth: '75%', margin: '0 auto' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

// CSS style cho các thẻ (card)
const cardStyle = {
  flex: 1,
  padding: '15px', // Giảm padding
  color: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  textAlign: 'center',
  fontSize: '1rem', // Giảm kích thước font
  fontWeight: 'bold',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

export default Dashboard;
