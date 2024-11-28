import React, { useEffect, useState } from 'react';
import './Booking.css'; 
import url from '../../ipconfig';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);

  // Hàm tải danh sách đặt lịch
  const loadBookings = async () => {
    try {
      const response = await fetch(`${url}/api/getlichhen.php`);
      if (!response.ok) {
        throw new Error('Lỗi khi tải danh sách đặt lịch');
      }
      const data = await response.json();
      setBookings(data);
      setFilteredBookings(data); // Khởi tạo filteredBookings giống bookings
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      alert('Không thể tải danh sách đặt lịch. Vui lòng kiểm tra kết nối hoặc dữ liệu.');
    }
  };

  // Hàm tìm kiếm đặt lịch
  const searchBookings = async (searchTerm) => {
    try {
      const response = await fetch(`${url}/api/timkiemlichhen.php?searchTerm=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Lỗi khi tìm kiếm đặt lịch');
      }
      const data = await response.json();
      setFilteredBookings(data); // Cập nhật filteredBookings với kết quả tìm kiếm
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      alert('Không thể tìm kiếm. Vui lòng thử lại.');
    }
  };

  // Hàm xác nhận đặt lịch
  const confirmBooking = async (idlichhen) => {
    try {
      const response = await fetch(`${url}/api/xacnhanlichhen.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idlichhen }), // Gửi id lịch hẹn để xác nhận
      });
  
      if (!response.ok) {
        throw new Error('Lỗi khi xác nhận lịch hẹn');
      }
  
      // Cập nhật danh sách bookings sau khi xác nhận
      const updatedBookings = bookings.map((booking) =>
        booking.idlichhen === idlichhen ? { ...booking, trangthai: '1' } : booking
      );

      setBookings(updatedBookings);
      setFilteredBookings(updatedBookings); // Cập nhật danh sách sau khi xác nhận
      alert('Lịch hẹn đã được xác nhận');
    } catch (error) {
      console.error('Lỗi khi xác nhận:', error);
      alert('Không thể xác nhận lịch hẹn. Vui lòng thử lại.');
    }
  };
  
  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBookings(bookings); // Nếu ô tìm kiếm rỗng, hiển thị tất cả đặt lịch
    } else {
      searchBookings(searchTerm); // Gọi hàm tìm kiếm đặt lịch
    }
  }, [searchTerm, bookings]);

  return (
    <div id="bookings" className="booking-content-section">
      <div className="bookings-header-section">
        <h2>Danh sách lịch hẹn</h2>

        {/* Thanh tìm kiếm với icon */}
        <div className="bookings-search-container">
          <i className="fas fa-search bookings-search-icon"></i>
          <input
            type="text"
            placeholder="Tìm kiếm lịch hẹn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bookings-search-input"
          />
        </div>
      </div>

      <div id="bookingsTable">
        {filteredBookings.length > 0 ? (
          <table className="booking-table">
            <thead>
              <tr>
                <th>ID Lịch Hẹn</th>
                <th>ID Người Dùng</th>
                <th>ID Thú Cưng</th>
                <th>ID Trung Tâm</th>
                <th>Tên Dịch Vụ</th> 
                <th>Ngày Hẹn</th>
                <th>Thời Gian Hẹn</th>
                <th>Trạng Thái</th>
                <th>Ngày Tạo</th>
                <th>Chức Năng</th> {/* Cột chức năng */}
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.idlichhen}>
                  <td>{booking.idlichhen}</td>
                  <td>{booking.tennguoidung}</td>   
                  <td>{booking.tenthucung}</td>     
                  <td>{booking.tentrungtam}</td>      
                  <td>{booking.tendichvu}</td>
                  <td>{booking.ngayhen}</td>
                  <td>{booking.thoigianhen}</td>
                  <td>{booking.trangthai === '0' ? 'Chưa xác nhận' : 'Đã xác nhận'}</td>
                  <td>{booking.ngaytao}</td>
                  <td>
                    <button 
                      onClick={() => confirmBooking(booking.idlichhen)} 
                      className="confirm-button"
                      style={{ backgroundColor: booking.trangthai === '1' ? 'green' : 'blue', color: 'white' }} // Thay đổi màu sắc
                    >
                      {booking.trangthai === '1' ? 'Đã xác nhận' : 'Xác Nhận'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Không có đặt lịch nào</p>
        )}
      </div>
    </div>
  );
};

export default Bookings;
