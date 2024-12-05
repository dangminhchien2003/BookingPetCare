import React, { useEffect, useState } from "react";
import "./Booking.css";
import url from "../../ipconfig";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("0"); // Trạng thái được chọn

  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái của modal
  const [cancelReason, setCancelReason] = useState(""); // Lý do hủy
  const [bookingIdToCancel, setBookingIdToCancel] = useState(null); // ID lịch hẹn cần hủy

  const trangthai = {
    0: "Chờ xác nhận",
    1: "Đang thực hiện",
    2: "Hoàn thành",
    3: "Đã thanh toán",
    4: "Đã hủy",
  };

  const openCancelModal = (idlichhen) => {
    setBookingIdToCancel(idlichhen);
    setIsModalOpen(true); // Mở modal
  };

  const closeCancelModal = () => {
    setIsModalOpen(false); // Đóng modal
    setCancelReason(""); // Xóa lý do đã nhập
  };

  // Hàm tải danh sách đặt lịch
  const loadBookings = async (status) => {
    try {
      const response = await fetch(
        `${url}/api/Lichhen_Admin/getlichhen.php?status=${status}`
      );
      if (!response.ok) {
        throw new Error("Lỗi khi tải danh sách đặt lịch");
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      alert(
        "Không thể tải danh sách đặt lịch. Vui lòng kiểm tra kết nối hoặc dữ liệu."
      );
    }
  };

  // Hàm tìm kiếm đặt lịch
  const searchBookings = async (searchTerm) => {
    try {
      const response = await fetch(
        `${url}/api/timkiemlichhen.php?searchTerm=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Lỗi khi tìm kiếm đặt lịch");
      }
      const data = await response.json();
      setFilteredBookings(data); // Cập nhật filteredBookings với kết quả tìm kiếm
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
      alert("Không thể tìm kiếm. Vui lòng thử lại.");
    }
  };

  // Hàm xác nhận đặt lịch
  const confirmBooking = async (idlichhen) => {
    try {
      const response = await fetch(
        `${url}/api/Lichhen_Admin/xacnhanlichhen.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idlichhen }), // Gửi id lịch hẹn để xác nhận
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi xác nhận lịch hẹn");
      }

      // Cập nhật danh sách bookings sau khi xác nhận
      const updatedBookings = bookings.map((booking) =>
        booking.idlichhen === idlichhen
          ? { ...booking, trangthai: "1" }
          : booking
      );

      setBookings(updatedBookings);
      setFilteredBookings(updatedBookings); // Cập nhật danh sách sau khi xác nhận
      alert("Lịch hẹn đã được xác nhận");
    } catch (error) {
      console.error("Lỗi khi xác nhận:", error);
      alert("Không thể xác nhận lịch hẹn. Vui lòng thử lại.");
    }
  };

  const completeBooking = async (idlichhen) => {
    try {
      const response = await fetch(
        `${url}/api/Lichhen_Admin/hoanthanhlichhen.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idlichhen }), // Gửi id lịch hẹn để đánh dấu hoàn thành
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi hoàn thành lịch hẹn");
      }

      // Cập nhật danh sách bookings sau khi hoàn thành
      const updatedBookings = bookings.map((booking) =>
        booking.idlichhen === idlichhen
          ? { ...booking, trangthai: "2" }
          : booking
      );

      setBookings(updatedBookings);
      setFilteredBookings(updatedBookings); // Cập nhật danh sách hiển thị
      alert("Lịch hẹn đã được hoàn thành");
    } catch (error) {
      console.error("Lỗi khi hoàn thành:", error);
      alert("Không thể hoàn thành lịch hẹn. Vui lòng thử lại.");
    }
  };

  const payBooking = async (idlichhen) => {
    try {
      const response = await fetch(
        `${url}/api/Lichhen_Admin/Xacnhanthanhtoan.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idlichhen }), // Gửi id lịch hẹn để đánh dấu hoàn thành
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi hoàn thành lịch hẹn");
      }

      // Cập nhật danh sách bookings sau khi hoàn thành
      const updatedBookings = bookings.map((booking) =>
        booking.idlichhen === idlichhen
          ? { ...booking, trangthai: "3" }
          : booking
      );

      setBookings(updatedBookings);
      setFilteredBookings(updatedBookings); // Cập nhật danh sách hiển thị
      alert("Lịch hẹn đã được hoàn thành");
    } catch (error) {
      console.error("Lỗi khi hoàn thành:", error);
      alert("Không thể hoàn thành lịch hẹn. Vui lòng thử lại.");
    }
  };
  const cancelBooking = async () => {
    console.log("Lý do:", cancelReason, "ID Lịch Hẹn:", bookingIdToCancel); 
    try {
      const response = await fetch(`${url}/api/Lichhen_Admin/huylichhen.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idlichhen: bookingIdToCancel,
          reason: cancelReason,
        }),
      });
  
      const data = await response.json(); // Xử lý phản hồi từ API
      console.log("Phản hồi từ API:", data);
  
      if (!response.ok) {
        throw new Error("Lỗi khi hủy lịch hẹn");
      }
  
      // Cập nhật danh sách bookings sau khi hủy
      const updatedBookings = bookings.map((booking) =>
        booking.idlichhen === bookingIdToCancel
          ? { ...booking, trangthai: "4" }
          : booking
      );
  
      setBookings(updatedBookings);
      setFilteredBookings(updatedBookings);
      closeCancelModal();
      alert("Lịch hẹn đã được hủy");
    } catch (error) {
      console.error("Lỗi khi hủy lịch hẹn:", error);
      alert("Không thể hủy lịch hẹn. Vui lòng thử lại.");
    }
  };
  

  // Hàm thay đổi trạng thái filter
  const filterByStatus = (status) => {
    setSelectedStatus(status);
    setFilteredBookings(
      bookings.filter((booking) => booking.trangthai === status) // Lọc danh sách theo trạng thái
    );
  };

  useEffect(() => {
    loadBookings(selectedStatus);
  }, [selectedStatus]);

  useEffect(() => {
    // Lọc danh sách dựa trên trạng thái được chọn
    setFilteredBookings(
      bookings.filter((booking) => booking.trangthai === selectedStatus)
    );
  }, [selectedStatus, bookings]);

  console.log(bookings);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBookings(bookings); // Nếu ô tìm kiếm rỗng, hiển thị tất cả đặt lịch
    } else {
      searchBookings(searchTerm); // Gọi hàm tìm kiếm đặt lịch
    }
  }, [searchTerm, bookings]);

  return (
    <div id="bookings" className="booking-content-section">
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

      {/* Thanh tab trạng thái */}
      <div className="status-tabs">
        {Object.keys(trangthai).map((key) => (
          <button
            key={key}
            className={`status-tab ${selectedStatus === key ? "active" : ""}`}
            onClick={() => filterByStatus(key)}
          >
            {trangthai[key]}
          </button>
        ))}
      </div>

      <div id="bookingsTable">
        {bookings?.filter((v) => v?.trangthai === selectedStatus).length > 0 ? (
          <table className="booking-table">
            <thead>
              <tr>
                <th>ID Lịch Hẹn</th>
                <th>Người Dùng</th>
                <th>Thú Cưng</th>
                <th>Trung Tâm</th>
                <th>Tên Dịch Vụ</th>
                <th>Ngày Hẹn</th>
                <th>Thời Gian Hẹn</th>
                <th>Trạng Thái</th>
                <th>Ngày Tạo</th>
                <th>Chức Năng</th>
              </tr>
            </thead>
            <tbody>
              {bookings
                ?.filter((v) => v?.trangthai === selectedStatus)
                .map((booking) => (
                  <tr key={booking.idlichhen}>
                    <td>{booking.idlichhen}</td>
                    <td>{booking.tennguoidung}</td>
                    <td>{booking.tenthucung}</td>
                    <td>{booking.tentrungtam}</td>
                    <td>{booking.tendichvu}</td>
                    <td>{booking.ngayhen}</td>
                    <td>{booking.thoigianhen}</td>
                    <td>
                      {booking.trangthai === "0"
                        ? "Chưa xác nhận"
                        : booking.trangthai === "1"
                        ? "Đang thực hiện"
                        : booking.trangthai === "2"
                        ? "Hoàn thành"
                        : booking.trangthai === "3"
                        ? "Đã thanh toán"
                        : "Đã hủy"}
                    </td>
                    <td>{booking.ngaytao}</td>
                    <td>
                      {booking.trangthai === "0" ? ( // Nếu trạng thái là "Chờ xác nhận"
                        <div className="booking-actions">
                          <button
                            onClick={() => confirmBooking(booking.idlichhen)}
                            className="confirm-button"
                          >
                            Xác Nhận
                          </button>
                          <button
                            onClick={() => openCancelModal(booking.idlichhen)}
                            className="cancel-button"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : booking.trangthai === "1" ? ( // Nếu trạng thái là "Đang thực hiện"
                        <button
                          onClick={() => completeBooking(booking.idlichhen)}
                          className="complete-button"
                        >
                          Hoàn thành
                        </button>
                      ) : booking.trangthai === "2" ? ( // Nếu trạng thái là "Hoàn thành"
                        <button
                          onClick={() => payBooking(booking.idlichhen)}
                          className="pay-button"
                        >
                          Xác nhận thanh toán
                        </button>
                      ) : (
                        <button
                          className="disabled-button"
                          disabled
                          style={{ backgroundColor: "gray", color: "white" }}
                        >
                          Không khả dụng
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>Không có đặt lịch nào</p>
        )}
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Vui lòng nhập lý do hủy</h3>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Nhập lý do hủy..."
            ></textarea>
            <div className="modal-actions">
              <button
                onClick={cancelBooking}
                disabled={!cancelReason}
              >
                Xác nhận hủy
              </button>
              <button onClick={closeCancelModal}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
