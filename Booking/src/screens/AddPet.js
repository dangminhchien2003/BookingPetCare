import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../ipconfig';

const AddPet = ({ navigation }) => {
    const [tenthucung, setTenThucUng] = useState('');
    const [loaithucung, setLoaiThucUng] = useState('');
    const [giongloai, setGiongLoai] = useState('');
    const [tuoi, setTuoi] = useState('');
    const [cannang, setCanNang] = useState('');
    const [suckhoe, setSucKhoe] = useState('');
    const [idnguoidung, setIdNguoiDung] = useState(null);

    useEffect(() => {
        // Lấy idnguoidung từ AsyncStorage
        const getIdNguoiDung = async () => {
          try {
              const user = await AsyncStorage.getItem('user');
              if (user !== null) {
                  const parsedUser = JSON.parse(user); // Chuyển đổi chuỗi JSON thành đối tượng
                  setIdNguoiDung(parsedUser.idnguoidung); // Lưu idnguoidung
              } else {
                  Alert.alert('Lỗi', 'Không tìm thấy id người dùng');
              }
          } catch (error) {
              console.error(error);
          }
      };
      
        getIdNguoiDung();
    }, []);

    const handleAddPet = () => {
      if (!tenthucung || !loaithucung || !giongloai || !tuoi || !cannang || !suckhoe || !idnguoidung) {
          Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
          return;
      }
  
      const petData = {
          tenthucung,
          idnguoidung,
          loaithucung,
          giongloai,
          tuoi,
          cannang,
          suckhoe
      };
  
      console.log("Đang gửi dữ liệu:", petData); 
  
      fetch(`${url}/api/themthucung.php`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(petData)
      })
      .then(response => response.text()) // Lấy phản hồi dưới dạng text
      .then(text => {
          console.log(text); // Log ra nội dung phản hồi để kiểm tra
          try {
              const data = JSON.parse(text); // Parse text thành JSON
              if (data.success) {
                  Alert.alert('Thành công', data.message);
                  navigation.goBack(); // Quay lại trang trước
              } else {
                  Alert.alert('Lỗi', data.message);
              }
          } catch (error) {
              console.error('JSON Parse Error:', error);
              Alert.alert('Lỗi', 'Đã xảy ra lỗi khi phân tích phản hồi từ máy chủ.');
          }
      })
      .catch(error => {
          console.error(error);
          Alert.alert('Lỗi', 'Không thể thêm thú cưng');
      });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Tên thú cưng</Text>
            <TextInput 
                style={styles.input}
                placeholder="Nhập tên thú cưng"
                value={tenthucung}
                onChangeText={setTenThucUng}
            />

            <Text style={styles.label}>Loại thú cưng</Text>
            <TextInput 
                style={styles.input}
                placeholder="Nhập loại thú cưng"
                value={loaithucung}
                onChangeText={setLoaiThucUng}
            />

            <Text style={styles.label}>Giống loại</Text>
            <TextInput 
                style={styles.input}
                placeholder="Nhập giống loại"
                value={giongloai}
                onChangeText={setGiongLoai}
            />

            <Text style={styles.label}>Tuổi</Text>
            <TextInput 
                style={styles.input}
                placeholder="Nhập tuổi"
                keyboardType="numeric"
                value={tuoi}
                onChangeText={setTuoi}
            />

            <Text style={styles.label}>Cân nặng</Text>
            <TextInput 
                style={styles.input}
                placeholder="Nhập cân nặng"
                keyboardType="numeric"
                value={cannang}
                onChangeText={setCanNang}
            />

            <Text style={styles.label}>Sức khỏe</Text>
            <TextInput 
                style={styles.input}
                placeholder="Nhập tình trạng sức khỏe"
                value={suckhoe}
                onChangeText={setSucKhoe}
            />

            <Button title="Thêm thú cưng" onPress={handleAddPet} disabled={!idnguoidung} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
    }
});

export default AddPet;
