import React from "react";
import logoPet from "../../assets/images/petlogo.avif";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";
import "./Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import PersonIcon from "@mui/icons-material/Person";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import EventNoteIcon from "@mui/icons-material/EventNote"; 
import LogoutIcon from "@mui/icons-material/Logout"; 
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const items = [
    { text: "Tổng quan", icon: <DashboardIcon />, link: "/dashboard" },
    { text: "Người dùng", icon: <PersonIcon />, link: "/Users" },
    { text: "Dịch vụ", icon: <RoomServiceIcon />, link: "/Services" },
    { text: "Trung tâm", icon: <MapsHomeWorkIcon />, link: "/center" },
    { text: "Dịch vụ-Trung tâm", icon: <SettingsIcon />, link: "/ServiceCenter" },
    { text: "Khuyến mãi", icon: <LoyaltyIcon />, link: "/Promotions" },
    { text: "Lịch hẹn", icon: <EventNoteIcon />, link: "/Bookings" }, 
    { text: "Cài đặt", icon: <SettingsIcon />, link: "/setting" },
    { text: "Đăng xuất", icon: <LogoutIcon />, link: "/login" }, 
  ];

 return (
  <Drawer classes={{ paper: "sidebar-container" }} variant="permanent">
   <div className="sidebar-header">
  <div className="sidebar-logo-container">
    <img 
       src={logoPet}
      alt="Petcare Logo" 
      className="sidebar-logo" 
    />
    <h2 className="sidebar-title">Quản trị hệ thống</h2>
  </div>
</div>

    <List className="sidebar-list">
      {items.slice(0, items.length - 1).map((item, index) => (
        <ListItem
          button
          component={Link}
          to={item.link}
          key={index}
          className={`sidebar-item ${
            location.pathname === item.link ? "active" : ""
          }`}
        >
          <ListItemIcon
            className={`sidebar-icon ${
              location.pathname === item.link ? "active" : ""
            }`}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
    <ListItem
      button
      component={Link}
      to="/login"
      className="logout-button"
    >
      <ListItemIcon className="logout-icon">
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Đăng xuất" />
    </ListItem>
  </Drawer>
);

};

export default Sidebar;
