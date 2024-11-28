import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps'; // Nhập MapView và Marker
import url from '../../../ipconfig';

const CenterDetails = ({ route, navigation }) => {
  const { center } = route.params;
  const [services, setServices] = useState([]);

  useEffect(() => {
    console.log('Thông tin trung tâm:', center); 
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${url}/api/getdichvu_trungtam.php?idtrungtam=${center.idtrungtam}`);
        console.log(response.data);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
  
    fetchServices();
  }, [center.idtrungtam]);

  return (
    <ScrollView style={styles.container}>
      <Image 
        style={styles.centerImage}
        source={{ uri: center.hinhanh }} 
      />
      <Text style={styles.title}>{center.tentrungtam}</Text>
      <Text style={styles.description}>{center.mota}</Text>
      <View style={styles.contactContainer}>
        <View style={styles.contactItem}>
            <Icon name="map-marker" size={20} color="#f9b233" />
            <Text style={styles.text}>{center.diachi}</Text>
        </View>
        <View style={styles.contactItem}>
          <Icon name="phone" size={20} color="#f9b233" />
          <Text style={styles.text}>{center.sodienthoai}</Text>
        </View>
        <View style={styles.contactItem}>
          <Icon name="envelope" size={20} color="#f9b233" />
          <Text style={styles.text}>{center.email}</Text>
        </View>
      </View>

      {/* Hiển thị bản đồ */}
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: parseFloat(center.Y_location), // Sử dụng vĩ độ
          longitude: parseFloat(center.X_location), // Sử dụng kinh độ
          latitudeDelta: 0.01, // Tùy chỉnh khoảng cách zoom
          longitudeDelta: 0.01,
        }}
      >
        <Marker 
          coordinate={{ 
            latitude: parseFloat(center.Y_location), 
            longitude: parseFloat(center.X_location) 
          }} 
          title={center.tentrungtam}
          description={center.mota}
        />
      </MapView>

      {/* Danh sách dịch vụ theo chiều ngang */}
      <View style={styles.servicesContainer}>
        <Text style={styles.sectionTitle}>Dịch vụ tại trung tâm</Text>
        {services && services.length > 0 ? (
          <FlatList
            data={services}
            renderItem={({ item }) => (
              <View style={styles.serviceItem}>
                <Image 
                  style={styles.serviceImage}
                  source={{ uri: item.hinhanh }} // Hiển thị ảnh dịch vụ
                />
                <Text style={styles.serviceText}>{item.tendichvu}</Text>
              </View>
            )}
            keyExtractor={item => item.iddichvu.toString()}
            horizontal={true} // Hiển thị theo chiều ngang
            showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
          />
        ) : (
          <Text style={styles.noServicesText}>Không có dịch vụ nào.</Text>
        )}
      </View>

      <TouchableOpacity style={styles.scheduleButton} onPress={() => navigation.navigate('Booking', { centerId: center.idtrungtam })}>
        <Text style={styles.scheduleButtonText}>Đặt lịch</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  centerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
  },
  contactContainer: {
    marginVertical: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  text: {
    fontSize: 14,
    marginLeft: 10,
    color: '#333',
  },
  servicesContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceItem: {
    marginRight: 15,
    alignItems: 'center',
    padding: 5,
  },
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: '500',
  },
  noServicesText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
  },
  scheduleButton: {
    backgroundColor: '#f9b233',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: 300, // Chiều cao của bản đồ
    marginVertical: 20,
  },
});

export default CenterDetails;
