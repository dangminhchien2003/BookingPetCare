import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../../ipconfig';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';


const BookingScreen = () => {
  const [centers, setCenters] = useState([]);
  const [pets, setPets] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const navigation = useNavigation();
  
  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await fetch(`${url}/api/trungtam.php`);
        const data = await response.json();
        setCenters(data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu trung tâm:', error);
      }
    };

    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setCustomerName(parsedUserData.tennguoidung);
          setPhoneNumber(parsedUserData.sodienthoai);
          setAddress(parsedUserData.diachi);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu người dùng:', error);
      }
    };

    const loadPets = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const parsedUserData = JSON.parse(userData);
        const response = await fetch(`${url}/api/getthucungbynguoidung.php?idnguoidung=${parsedUserData.idnguoidung}`);
        const petData = await response.json();
        setPets(petData);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu thú cưng:', error);
      }
    };

    fetchCenters();
    loadUserData();
    loadPets();
  }, []);

  // Sử dụng useFocusEffect để tải lại danh sách thú cưng khi quay lại trang
  useFocusEffect(
    React.useCallback(() => {
      const loadPets = async () => {
        try {
          const userData = await AsyncStorage.getItem('user');
          const parsedUserData = JSON.parse(userData);
          const response = await fetch(`${url}/api/getthucungbynguoidung.php?idnguoidung=${parsedUserData.idnguoidung}`);
          const petData = await response.json();
          setPets(petData);
        } catch (error) {
          console.error('Lỗi khi tải dữ liệu thú cưng:', error);
        }
      };

      loadPets();

      // cleanup function không cần thiết trong trường hợp này
    }, [])
  );

  const handleCenterSelect = async (centerId) => {
    const selected = centers.find(center => center.idtrungtam === centerId);
    setSelectedCenter(selected);
    setSelectedServices([]);
    try {
      const response = await fetch(`${url}/api/getdichvu_trungtam.php?idtrungtam=${centerId}`);
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Lỗi khi tải dịch vụ:', error);
    }
  };

  const onConfirmBooking = async () => {
    if (!selectedCenter || selectedServices.length === 0 || !selectedPet) {
      Alert.alert('Lỗi', 'Vui lòng chọn đầy đủ trung tâm, dịch vụ và thú cưng.');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem('user');
      const parsedUserData = JSON.parse(userData);

      const bookingData = {
        idnguoidung: parsedUserData.idnguoidung,
        idthucung: selectedPet,
        idtrungtam: selectedCenter.idtrungtam,
        ngayhen: selectedDate.toISOString().split('T')[0],
        thoigianhen: selectedTime.toTimeString().split(' ')[0],
        dichvu: selectedServices,
      };

      // Gửi yêu cầu tạo lịch hẹn
      const response = await fetch(`${url}/api/themlichhen.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      if (result.message === "Lịch hẹn đã được lưu thành công!") {
        Alert.alert('Thành công', 'Đặt lịch hẹn thành công!');
        // Có thể reset các trường sau khi đặt lịch thành công nếu cần
      } else {
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi đặt lịch hẹn.');
      }
    } catch (error) {
      console.error('Lỗi khi đặt lịch hẹn:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra');
    }
  };

  const handleServiceToggle = (service) => {
    setSelectedServices((prevSelected) => {
      if (prevSelected.includes(service.iddichvu)) {
        return prevSelected.filter((s) => s !== service.iddichvu);
      } else {
        return [...prevSelected, service.iddichvu];
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Đặt lịch dịch vụ</Text>

      {/* Hiển thị thông tin người dùng */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoText}>Tên: {customerName}</Text>
        <Text style={styles.userInfoText}>Số điện thoại: {phoneNumber}</Text>
        <Text style={styles.userInfoText}>Địa chỉ: {address}</Text>
      </View>

     {/* Thêm thú cưng */}
<View style={styles.inputContainer}>
  <Text style={styles.label}>Chọn thú cưng</Text>
  <TouchableOpacity
    style={styles.button}
    onPress={() => navigation.navigate('AddPet')} // Thay 'AddPetScreen' bằng tên của trang thêm thú cưng
  >
    <Text style={styles.buttonText}>Thêm thú cưng</Text>
  </TouchableOpacity>
  <Picker
    selectedValue={selectedPet}
    onValueChange={(itemValue) => setSelectedPet(itemValue)}
    style={styles.picker}
  >
    <Picker.Item label="Chọn thú cưng" value={null} />
    {pets.map(pet => (
      <Picker.Item key={pet.idthucung} label={pet.tenthucung} value={pet.idthucung} />
    ))}
  </Picker>
</View>


      {/* Chọn trung tâm */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Chọn trung tâm</Text>
        <Picker
          selectedValue={selectedCenter?.idtrungtam}
          onValueChange={(itemValue) => handleCenterSelect(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Chọn trung tâm" value={null} />
          {centers.map(center => (
            <Picker.Item key={center.idtrungtam} label={center.tentrungtam} value={center.idtrungtam} />
          ))}
        </Picker>
      </View>

      {/* Chọn dịch vụ */}
      <Text style={styles.label}>Chọn dịch vụ</Text>
      {services.map(service => (
        <TouchableOpacity key={service.iddichvu} style={styles.serviceContainer} onPress={() => handleServiceToggle(service)}>
          <Text style={styles.serviceText}>{service.tendichvu}</Text>
          {selectedServices.includes(service.iddichvu) && <Icon name="check" size={20} color="#4caf50" />}
        </TouchableOpacity>
      ))}

      {/* Chọn ngày */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>Chọn ngày: {selectedDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) {
              setSelectedDate(date);
            }
          }}
        />
      )}

      {/* Chọn giờ */}
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.timeButton}>
        <Text style={styles.timeButtonText}>Chọn giờ: {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={(event, time) => {
            setShowTimePicker(false);
            if (time) {
              setSelectedTime(time);
            }
          }}
        />
      )}

      <TouchableOpacity onPress={onConfirmBooking} style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Xác nhận đặt lịch</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfoContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  userInfoText: {
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 16,
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginBottom: 20,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  timeButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginBottom: 20,
  },
  timeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  confirmButton: {
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BookingScreen;
