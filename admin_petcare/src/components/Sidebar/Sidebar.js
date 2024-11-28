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
 
import LogoutIcon from "@mui/icons-material/Logout"; 
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ items }) => {
  const location = useLocation();


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
