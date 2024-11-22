import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure you have this import for Ionicons

const ServiceDetails = ({ route, navigation }) => {
  // Nhận các tham số từ route (được truyền khi nhấn vào dịch vụ)
  const { tenDichVu, hinhAnhDichVu, moTaDichVu, giaDichVu, thoiGianThucHien } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Phần hình ảnh dịch vụ */}
        <View style={styles.imageContainer}>
          <Image style={styles.serviceImage} source={{ uri: hinhAnhDichVu }} />
        </View>

        {/* Phần tiêu đề và mô tả dịch vụ */}
        <View style={styles.contentContainer}>
          <Text style={styles.serviceTitle}>{tenDichVu}</Text>
          <Text style={styles.serviceDescription}>{moTaDichVu}</Text>
          <Text style={styles.servicePrice}>Giá: {giaDichVu}</Text>
          <Text style={styles.serviceTime}>Thời gian: {thoiGianThucHien}</Text>
        </View>

        {/* Nút Đặt lịch */}
        <View style={styles.bookingContainer}>
          <TouchableOpacity style={styles.bookingButton} onPress={() => navigation.navigate('Booking')}>
            <Text style={styles.bookingButtonText}>Đặt lịch ngay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="black" style={styles.bottomIcon} />
          <Text style={styles.bottomText}>Trang chủ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search-outline" size={24} color="black" style={styles.bottomIcon} />
          <Text style={styles.bottomText}>Tìm kiếm</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BookingListScreen')}>
          <Ionicons name="calendar-outline" size={24} color="black" style={styles.bottomIcon} />
          <Text style={styles.bottomText}>Lịch hẹn</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Ionicons name="person-outline" size={24} color="black" style={styles.bottomIcon} />
          <Text style={styles.bottomText}>Cá nhân</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  serviceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f9b233',
    marginVertical: 10,
  },
  serviceTime: {
    fontSize: 16,
    color: '#555',
  },
  bookingContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  bookingButton: {
    backgroundColor: '#f9b233',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookingButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  bottomIcon: {
    alignSelf: 'center',
  },
  bottomText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ServiceDetails;
