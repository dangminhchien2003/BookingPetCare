import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { AccountCircle, Notifications, Menu as MenuIcon } from '@mui/icons-material';

import { useLocation } from 'react-router-dom';
import './Topbar.css';

const TopBar = ({ items }) => {
  const location = useLocation();

  // Tìm `title` dựa trên đường dẫn hiện tại
  const currentItem = items.find(item => item.link === location.pathname);
  const title = currentItem ? currentItem.title : "Tiêu đề ứng dụng";

  return (
    <AppBar position="fixed" className="topbar">
      <Toolbar className="topbar-toolbar">
        {/* Icon Menu */}
        <IconButton edge="start" aria-label="menu" className="menu-icon">
          <MenuIcon />
        </IconButton>

        {/* Tiêu đề */}
        <Typography variant="h6" component="div" className="topbar-title">
          {title}
        </Typography>

        {/* Các icon bên phải */}
        <div className="topbar-actions">
          <AccountCircle className="icon" />
          <Notifications className="icon" />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
