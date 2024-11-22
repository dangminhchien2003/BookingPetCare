import React, { useEffect, useState } from 'react';
import AddServiceCenter from './AddServiceCenter'; // Giả sử bạn đã tạo một component cho thêm trung tâm dịch vụ
import EditServiceCenter from './EditServiceCenter'; // Giả sử bạn đã tạo một component cho sửa trung tâm dịch vụ
import './ServiceCenter.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import url from '../../ipconfig';

function ServiceCenter() {
  const [serviceCenter, setServiceCenter] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServiceCenter, setFilteredServiceCenter] = useState([]);
  const [showAddServiceCenter, setShowAddServiceCenter] = useState(false);
  const [showEditServiceCenter, setShowEditServiceCenter] = useState(false);
  const [serviceCenterToEdit, setServiceCenterToEdit] = useState(null);

  const loadServiceCenter = async () => {
    try {
      const response = await fetch(`${url}/api/getdichvutrungtam.php`);
      if (!response.ok) {
        throw new Error('Lỗi khi tải dữ liệu');
      }
      const data = await response.json();
      setServiceCenter(data);
      setFilteredServiceCenter(data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      alert('Không thể tải danh sách dịch vụ. Vui lòng kiểm tra kết nối hoặc dữ liệu.');
    }
  };

  // Hàm tìm kiếm dịch vụ
  const searchServiceCenter = async (searchTerm) => {
    try {
      const response = await fetch(`${url}/api/timkiemdichvutrungtam.php?searchTerm=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Lỗi khi tìm kiếm dịch vụ trung tâm');
      }
      const data = await response.json();
      setFilteredServiceCenter(data);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      alert('Không thể tìm kiếm dịch vụ trung tâm. Vui lòng thử lại.');
    }
  };

  useEffect(() => {
    loadServiceCenter();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredServiceCenter(serviceCenter); // Nếu ô tìm kiếm rỗng, hiển thị tất cả dịch vụ
    } else {
      searchServiceCenter(searchTerm); // Gọi hàm tìm kiếm dịch vụ trung tâm
    }
  }, [searchTerm, serviceCenter]);

  const editServiceCenter = (serviceCenter) => {
    setServiceCenterToEdit(serviceCenter);
    setShowEditServiceCenter(true);
  };

  const deleteServiceCenter = async (id) => {
    const confirmDelete = window.confirm("Bạn có muốn xóa dịch vụ trung tâm này không?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${url}/api/xoadichvutrungtam.php?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const result = await response.json();
          alert(result.message);
          loadServiceCenter();
        } else {
          const errorResult = await response.json();
          alert("Có lỗi xảy ra khi xóa dịch vụ trung tâm: " + errorResult.message);
        }
      } catch (error) {
        console.error('Lỗi khi xóa dịch vụ trung tâm:', error);
        alert('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    }
  };

  return (
    <div id="services" className="serviceCenter-content-section">
      <div className="serviceCenter-header-section">
        <h2>Quản lý dịch vụ trung tâm</h2>

        {/* Thanh tìm kiếm với icon */}
        <div className="serviceCenter-search-container">
          <i className="fas fa-search serviceCenter-search-icon"></i>
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="serviceCenter-search-input"
          />
        </div>
      </div>

      <div id="serviceCenterTable">
        {filteredServiceCenter.length > 0 ? (
          <table className="serviceCenter-table">
            <thead>
              <tr>
                <th>Tên dịch vụ</th>
                <th>Tên trung tâm</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredServiceCenter.map((serviceCenter) => (
                <tr key={serviceCenter.tendichvu}>
                  <td>{serviceCenter.tendichvu}</td>
                  <td>{serviceCenter.tentrungtam}</td>
                  <td>
                    <button className="serviceCenter-edit" onClick={() => editServiceCenter(serviceCenter)}>Sửa</button>
                    <button className="serviceCenter-delete" onClick={() => deleteServiceCenter(serviceCenter.id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Không có dịch vụ trung tâm nào</p>
        )}
      </div>
      
      <button className="serviceCenter-floating-btn" onClick={() => setShowAddServiceCenter(true)}>+</button>

      {showAddServiceCenter && (
        <AddServiceCenter 
          closeForm={() => setShowAddServiceCenter(false)} 
          onServiceCenterAdded={loadServiceCenter} 
        />
      )}
      
      {showEditServiceCenter && (
        <EditServiceCenter 
          serviceCenterToEdit={serviceCenterToEdit} 
          closeForm={() => setShowEditServiceCenter(false)} 
          onServiceUpdated={loadServiceCenter}  
        />
      )}
    </div>
  );
}

export default ServiceCenter;
