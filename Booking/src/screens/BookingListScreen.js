import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../ipconfig';

const BookingListScreen = ({ navigation }) => {
    const [bookingList, setBookingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    const getUserId = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                const parsedUser = JSON.parse(user);
                setUserId(parsedUser.idnguoidung);
            }
        } catch (error) {
            console.error('Lỗi khi lấy id người dùng:', error);
        }
    };

    useEffect(() => {
        getUserId();
    }, []);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!userId) return;

            try {
                const response = await axios.get(`${url}/api/getlichhen_bynguoidung.php?idnguoidung=${userId}`);
                console.log('Danh sách lịch:', response.data);
                setBookingList(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy lịch:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchBookings();
        }
    }, [userId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const trangthai = {
        0: "Chưa xác nhận",
        1: "Đã xác nhận",
    };

    console.log('Dữ liệu danh sách lịch:', bookingList);

    // Đảm bảo lịch hẹn là duy nhất
    const uniqueBookings = bookingList.filter((item, index, self) =>
        index === self.findIndex((t) => t.idlichhen === item.idlichhen)
    );

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Danh sách lịch hẹn</Text>
        </View>

        {uniqueBookings.length > 0 ? (
          <FlatList
            data={uniqueBookings}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.bookingCard}
                onPress={() =>
                  navigation.navigate("BookingDetails", { booking: item })
                }
              >
                <View style={styles.bookingInfo}>
                  <Icon name="paw" size={20} color="#fff" />
                  <Text style={styles.text}>Thú cưng: {item.tenthucung}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Icon name="map-marker" size={20} color="#fff" />
                  <Text style={styles.text}>Trung tâm: {item.tentrungtam}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Icon name="calendar" size={20} color="#fff" />
                  <Text style={styles.text}>Ngày hẹn: {item.ngayhen}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Icon name="clock-o" size={20} color="#fff" />
                  <Text style={styles.text}>Thời gian: {item.thoigianhen}</Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Icon name="info-circle" size={20} color="#fff" />
                  <Text style={styles.text}>
                    Trạng thái: {trangthai[item.trangthai]}
                  </Text>
                </View>
                <View style={styles.bookingInfo}>
                  <Icon name="cogs" size={20} color="#fff" />
                  <Text style={styles.text}>
                    Dịch vụ: {item.dichvu.join(", ")}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.idlichhen.toString()} // Sử dụng idlichhen làm khóa
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.noBookingsText}>Không có lịch hẹn nào.</Text>
        )}
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 10, 
        paddingVertical:10
    },
    backIcon: {
        position: 'absolute', 
        left: 10,             
    },
    title: {
        flex: 1,              
        textAlign: 'center',  
        fontSize: 24,
        fontWeight: 'bold',
    },
    

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookingCard: {
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#FFCC33',
    },
    bookingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    text: {
        fontSize: 16,
        marginLeft: 10,
        color: '#333',
    },
    noBookingsText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default BookingListScreen;
