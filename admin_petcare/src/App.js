// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar"; 
import Dashboard from "./components/Dashboard/Dashboard";
import Services from "./components/Services/Services";
import Users from "./components/Users/Users";
import Bookings from "./components/Booking/Bookings";
import Center from "./components/Center/Center";
import Login from "./components/Login/Login";
import Promotions from "./components/Promotions/Promotions";
import Setting from "./components/Setting/Setting";
import ServiceCenter from "./components/Services_Center/ServiceCenter";

import { Box } from "@mui/material";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Điều hướng từ trang gốc ("/") đến trang đăng nhập ("/login") */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Định nghĩa các đường dẫn cho trang đăng nhập và đăng ký - nằm ngoài AppGlass */}
          <Route path="/login" element={<Login />} />
         
          {/* Các trang sau khi đăng nhập sẽ nằm trong AppGlass */}
          <Route
            path="*"
            element={
              <div className="AppGlass">
                <Sidebar />
                <Box sx={{ flexGrow: 1, padding: "20px" }}>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/center" element={<Center />} />
                    <Route path="/ServiceCenter" element={<ServiceCenter />} />
                    <Route path="/promotions" element={<Promotions/>} />
                    <Route path="/setting" element={<Setting />} />
                  </Routes>
                </Box>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
