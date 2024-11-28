import React, { useEffect, useState } from "react";
import "./Setting.css"; // Thêm CSS nếu cần

const Settings = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  console.log(JSON.parse(localStorage.getItem("user")));

  return (
    <div className="settings-page">
      <h2>Thông tin tài khoản</h2>
      <div className="user-info">
        <p><strong>Tên người dùng:</strong> {user.tennguoidung}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Số điện thoại:</strong> {user.sodienthoai}</p>
        <p><strong>Địa chỉ:</strong> {user.diachi}</p>
      </div>
    </div>
  );
};

export default Settings;
