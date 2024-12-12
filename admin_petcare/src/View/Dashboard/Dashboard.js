import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaDollarSign,
  FaServicestack,
  FaCalendarAlt,
} from "react-icons/fa";
import "./Dashboard.css";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import url from "../../ipconfig";
import { RiLoader2Fill } from "react-icons/ri";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const [month, setMonth] = useState(new Date().getMonth() + 1); // Tháng hiện tại
  const [year, setYear] = useState(new Date().getFullYear()); // Năm hiện tại
  const [data, setData] = useState([]); // Dữ liệu biểu đồ

  const fetchData = (selectedMonth, selectedYear) => {
    setLoading(true);

    fetch(
      `${url}/api/TongQuan/thongkeTheoThang.php?month=${selectedMonth}&year=${selectedYear}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Format data for Recharts
          const formattedData = data.daily_stats.map((item) => ({
            name: item.date, // Use the actual date as the name
            users: item.users, // Users count per day
            bookings: item.bookings, // Bookings count per day
          }));
          setData(formattedData);
          // setUserCount(data.total_users);
          // setBookingCount(data.total_bookings);
        } else {
          toast.error(data.message || "Error fetching data");
        }
      })
      .catch(() => toast.error("Unable to connect to API"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(month, year);
  }, [month, year]);

  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value, 10));
  };

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value, 10));
  };

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
    }

    setLoading(true);
    fetch(`${url}/api/TongQuan/demnguoidung.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setUserCount(data.total_users);
        } else {
          toast.error(data.message || "Lỗi khi lấy số người dùng");
        }
      })
      .catch(() => toast.error("Không thể kết nối tới API"));

    fetch(`${url}/api/TongQuan/demlichhen.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setBookingCount(data.total_booking);
        } else {
          toast.error(data.message || "Lỗi khi lấy số lịch hẹn");
        }
      })
      .catch(() => toast.error("Không thể kết nối tới API"));

    fetch(`${url}/api/TongQuan/demdichvu.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setServiceCount(data.total_service);
        } else {
          toast.error(data.message || "Lỗi khi lấy số dịch vụ");
        }
      })
      .catch(() => toast.error("Không thể kết nối tới API"))
      .finally(() => setLoading(false));
  }, [location]);

  const stats = { revenue: 50000 };

  return (
    <div id="dashboard" className="content-section">
      <ToastContainer style={{ top: 70 }} />
      <div className="card-container">
        <div className="card">
          <FaUser size={30} style={{ marginBottom: "5px" }} />
          <h3>Người dùng</h3>
          {loading ? (
            <RiLoader2Fill className="spinner"></RiLoader2Fill>
          ) : (
            <p>{userCount}</p>
          )}
        </div>
        <div className="card">
          <FaDollarSign size={30} style={{ marginBottom: "5px" }} />
          <h3>Doanh thu</h3>
          <p>{stats.revenue} triệu VNĐ</p>
        </div>
        <div className="card">
          <FaServicestack size={30} style={{ marginBottom: "5px" }} />
          <h3>Dịch vụ</h3>
          {loading ? (
            <RiLoader2Fill className="spinner"></RiLoader2Fill>
          ) : (
            <p>{serviceCount}</p>
          )}
        </div>
        <div className="card">
          <FaCalendarAlt size={30} style={{ marginBottom: "5px" }} />
          <h3>Tổng lịch hẹn</h3>
          {loading ? (
            <RiLoader2Fill className="spinner"></RiLoader2Fill>
          ) : (
            <p>{bookingCount}</p>
          )}
        </div>
      </div>
      {/* Biểu đồ */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <label className="label-container">
          Chọn tháng:{" "}
          <select className="select" value={month} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Tháng {i + 1}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: "10px" }}>
          Chọn năm:{" "}
          <select className="select" value={year} onChange={handleYearChange}>
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i} value={2023 + i}>
                {2023 + i}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ textAlign: "center" }}>
        <text>Biểu đồ Thống kê Người Dùng và Lịch Hẹn theo tháng</text>
      </div>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <RiLoader2Fill className="spinner"> </RiLoader2Fill>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <div className="dashboard-chart-container">
          <BarChart
            width={900}
            height={400}
            data={data}
            // margin={{ top: 15, right: 10, left: 150, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip /> 
            <Legend />
            <Bar dataKey="users" fill="#8884d8" name="Số người dùng" />
            <Bar dataKey="bookings" fill="#82ca9d" name="Số lịch hẹn" />
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
