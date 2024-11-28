import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../../ipconfig';

const HomeScreen = ({ navigation }) => {
  const [dichvu, setDichvu] = useState([]);
  const [centers, setCenters] = useState([]);
  const [filteredDichvu, setFilteredDichvu] = useState([]);
  const [user, setUser] = useState(''); // Trạng thái để lưu tên người dùng

  // Lấy danh sách dịch vụ
  useEffect(() => {
    axios.get(`${url}api/dichvu.php`)
      .then(response => {
        setDichvu(response.data);
        setFilteredDichvu(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách dịch vụ:', error);
      });
  }, []);

  // Lấy danh sách trung tâm
  useEffect(() => {
    axios.get(`${url}api/trungtam.php`)
      .then(response => {
        setCenters(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách trung tâm:', error);
      });
  }, []);

  // Lấy tên người dùng từ AsyncStorage
  useEffect(() => {
    const getUser = async () => {
        try {
            const userString = await AsyncStorage.getItem('user'); // Lấy chuỗi JSON từ AsyncStorage
            if (userString) {
                const userObject = JSON.parse(userString); // Chuyển đổi chuỗi JSON thành đối tượng
                console.log('Fetched user object:', userObject);
                setUser(userObject.tennguoidung); // Cập nhật tên người dùng từ đối tượng
            }
        } catch (error) {
            console.error('Lỗi khi lấy tên người dùng:', error);
        }
    };
    getUser();
}, []);


  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              style={styles.headerImage}
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWfPErtZFdVTSou4C-suTujw24ouJDZJ4Ljw&s' }} 
              resizeMode="contain"
            />
            <Text style={styles.welcomeText}>Chào mừng,{"\n"}{user}!</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={28} color="#fff" style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image 
            style={styles.bannerImage} 
            source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632/de1207169601075.6450bfb33a626.jpg' }} 
          />
        </View>

        {/* Danh sách dịch vụ */}
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Dịch vụ</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filteredDichvu.map(dichvu => (
              <TouchableOpacity 
                key={dichvu.iddichvu}
                style={styles.serviceCard} 
                onPress={() => navigation.navigate('ServiceDetails', {
                  tenDichVu: dichvu.tendichvu,
                  hinhAnhDichVu: dichvu.hinhanh,
                  moTaDichVu: dichvu.mota,
                  giaDichVu: dichvu.gia, 
                  thoiGianThucHien: dichvu.thoigianthuchien,
                })}
                
              >
                <Image 
                  style={styles.serviceImage} 
                  source={{ uri: dichvu.hinhanh }} 
                />
                <Text style={styles.serviceText}>{dichvu.tendichvu}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Danh sách trung tâm */}
        <View style={styles.centersContainer}>
          <Text style={styles.sectionTitle}>Trung tâm</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {centers.map(center => (
              <TouchableOpacity 
                key={center.idtrungtam} 
                style={styles.centerCard} 
                onPress={() => navigation.navigate('CenterDetails', {
                  center: {
                    idtrungtam: center.idtrungtam,
                    hinhanh: center.hinhanh,
                    tentrungtam: center.tentrungtam,
                    diachi: center.diachi,
                    sodienthoai: center.sodienthoai,
                    email: center.email,
                    X_location: center.X_location,
                    Y_location: center.Y_location,
                    mota: center.mota,
                  },
                })}
              >
                <Image 
                  style={styles.centerImage} 
                  source={{ uri: center.hinhanh }} 
                />
                <Text style={styles.centerText}>{center.tentrungtam}</Text>
                <View style={styles.addressContainer}>
                  <Ionicons name="location-outline" size={16} color="#555" style={styles.addressIcon} />
                  <Text style={styles.centerAddress}>{center.diachi}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    // backgroundColor: '#f9b233',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  notificationIcon: {
    marginRight: 10,
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  bannerContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  bannerImage: {
    width: '90%',
    height: 180,
    borderRadius: 10,
  },
  servicesContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceCard: {
    marginRight: 15,
    alignItems: 'center',
    padding: 5,
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2, // Thêm viền
    borderColor: '#f9b233', // Màu viền
  },
  serviceText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
  },
  centersContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  centerCard: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  centerImage: {
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  centerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  addressIcon: {
    marginRight: 5,
  },
  centerAddress: {
    fontSize: 14,
    color: '#555',
  },
 
});

export default HomeScreen;
