import React, { useEffect, useState } from 'react';
import './AddServiceCenter.css'; 
import url from '../../ipconfig';

function AddServiceCenter({ closeForm, onServiceCenterAdded }) {
  const [serviceCenter, setServiceCenter] = useState({
    iddichvu: '',
    idtrungtam: '',
  });

  const [services, setServices] = useState([]); // State to hold services
  const [centers, setCenters] = useState([]); // State to hold centers

  useEffect(() => {
    const loadServicesAndCenters = async () => {
      try {
        // Fetch services
        const servicesResponse = await fetch(`${url}/api/getdichvu.php`);
        const servicesData = await servicesResponse.json();
        setServices(servicesData);

        // Fetch centers
        const centersResponse = await fetch(`${url}/api/gettrungtam.php`);
        const centersData = await centersResponse.json();
        setCenters(centersData);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu dịch vụ hoặc trung tâm:', error);
        alert('Không thể tải danh sách dịch vụ hoặc trung tâm. Vui lòng kiểm tra kết nối hoặc dữ liệu.');
      }
    };

    loadServicesAndCenters();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceCenter({ ...serviceCenter, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu trước khi gửi
    if (!serviceCenter.iddichvu || !serviceCenter.idtrungtam) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }

    console.log("Dữ liệu gửi đi:", JSON.stringify(serviceCenter)); // Kiểm tra dữ liệu

    try {
        const response = await fetch(`${url}/api/themdichvutrungtam.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceCenter),
        });

        const result = await response.json();
        console.log(result); // Kiểm tra kết quả từ API

        if (response.ok) {
            alert(result.message); // Hiển thị thông báo thành công
            onServiceCenterAdded(); // Gọi callback để tải lại danh sách dịch vụ
            closeForm();
            setServiceCenter({
                iddichvu: '',
                idtrungtam: '',
            });
        } else {
            alert("Có lỗi xảy ra: " + result.message); // Hiển thị thông báo lỗi nếu có
        }
    } catch (error) {
        console.error('Lỗi khi thêm dịch vụ:', error);
        alert('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={closeForm}>&times;</span>
        <h3>Thêm Dịch Vụ Trung Tâm</h3>
        <form onSubmit={handleSubmit}>
          <label>ID Dịch Vụ:</label>
          <select 
            name="iddichvu" 
            value={serviceCenter.iddichvu} 
            onChange={handleChange} 
            required
          >
            <option value="">Chọn dịch vụ...</option>
            {services.map((service) => (
              <option key={service.iddichvu} value={service.iddichvu}>
                {service.tendichvu}
              </option>
            ))}
          </select>

          <label>ID Trung Tâm:</label>
          <select 
            name="idtrungtam" 
            value={serviceCenter.idtrungtam} 
            onChange={handleChange} 
            required
          >
            <option value="">Chọn trung tâm...</option>
            {centers.map((center) => (
              <option key={center.idtrungtam} value={center.idtrungtam}>
                {center.tentrungtam}
              </option>
            ))}
          </select>

          <button type="submit">Thêm Dịch Vụ</button>
        </form>
      </div>
    </div>
  );
}

export default AddServiceCenter;
