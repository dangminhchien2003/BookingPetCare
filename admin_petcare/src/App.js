// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./View/Dashboard/Dashboard";
import Services from "./View/Services/Services";
import Users from "./View/Users/Users";
import Bookings from "./View/Booking/Bookings";
import Center from "./View/Center/Center";
import Login from "./View/Login/Login";
import Promotions from "./View/Promotions/Promotions";
import Profile from "./View/Profile/Profile";
import ServiceCenter from "./View/Services_Center/ServiceCenter";
import TopBar from "./components/Topbar/Topbar";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { Box } from "@mui/material";
import "./App.css";

function App() {
  const items = [
    {
      title: "Quản lý tổng quan",
      text: "Tổng quan",
      icon: <DashboardIcon />,
      link: "/dashboard",
    },
    {
      title: "Quản lý người dùng",
      text: "Người dùng",
      icon: <PersonIcon />,
      link: "/users",
    },
    {
      title: "Quản lý dịch vụ",
      text: "Dịch vụ",
      icon: <RoomServiceIcon />,
      link: "/services",
    },
    {
      title: "Quản lý trung tâm",
      text: "Trung tâm",
      icon: <MapsHomeWorkIcon />,
      link: "/center",
    },
    {
      title: "Quản lý dịch vụ-trung tâm",
      text: "Dịch vụ-Trung tâm",
      icon: <SettingsIcon />,
      link: "/servicecenter",
    },
    {
      title: "Quản lý khuyến mãi",
      text: "Khuyến mãi",
      icon: <LoyaltyIcon />,
      link: "/promotions",
    },
    {
      title: "Quản lý lịch hẹn",
      text: "Lịch hẹn",
      icon: <EventNoteIcon />,
      link: "/bookings",
    },
    {
      title: "Thông tin tài khoản",
      text: "Thông tin tài khoản",
      icon: <SettingsIcon />,
      link: "/profile",
    },
    {
      title: "Đăng xuất",
      text: "Đăng xuất",
      icon: <LogoutIcon />,
      link: "/login",
    },
  ];
  // Tạo một mảng Sidebar mà không có mục "Thông tin tài khoản"
  const sidebarItems = items.filter(
    (item) => item.title !== "Thông tin tài khoản"
  );

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="*"
            element={
              <div
                className="AppGlass"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <TopBar items={items} />
                <div style={{ display: "flex", flex: 1 }}>
                  <Sidebar items={sidebarItems} />
                  <Box sx={{ flexGrow: 1, padding: "20px" }}>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/bookings" element={<Bookings />} />
                      <Route path="/center" element={<Center />} />
                      <Route
                        path="/ServiceCenter"
                        element={<ServiceCenter />}
                      />
                      <Route path="/promotions" element={<Promotions />} />
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  </Box>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
