import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BottomNavigation = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Home');

  const handlePress = (tab) => {
    setSelectedTab(tab); // Update state when tab is clicked
    navigation.navigate(tab); // Navigate to corresponding screen
  };

  return (
    <View style={styles.bottomNavigation}>
      <TouchableOpacity
        onPress={() => handlePress('Home')}
        style={[styles.bottomButton, selectedTab === 'Home' && styles.selectedButton]}
      >
        <Ionicons
          name="home-outline"
          size={24}
          color={selectedTab === 'Home' ? '#FF9900' : 'black'}
          style={styles.bottomIcon}
        />
        <Text style={[styles.bottomText, selectedTab === 'Home' && styles.selectedText]}>Trang chủ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePress('Search')}
        style={[styles.bottomButton, selectedTab === 'Search' && styles.selectedButton]}
      >
        <Ionicons
          name="search-outline"
          size={24}
          color={selectedTab === 'Search' ? '#FF9900' : 'black'}
          style={styles.bottomIcon}
        />
        <Text style={[styles.bottomText, selectedTab === 'Search' && styles.selectedText]}>Tìm kiếm</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePress('BookingListScreen')}
        style={[styles.bottomButton, selectedTab === 'BookingListScreen' && styles.selectedButton]}
      >
        <Ionicons
          name="calendar-outline"
          size={24}
          color={selectedTab === 'BookingListScreen' ? '#FF9900' : 'black'}
          style={styles.bottomIcon}
        />
        <Text style={[styles.bottomText, selectedTab === 'BookingListScreen' && styles.selectedText]}>Lịch hẹn</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePress('ProfileScreen')}
        style={[styles.bottomButton, selectedTab === 'ProfileScreen' && styles.selectedButton]}
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={selectedTab === 'ProfileScreen' ? '#FF9900' : 'black'}
          style={styles.bottomIcon}
        />
        <Text style={[styles.bottomText, selectedTab === 'ProfileScreen' && styles.selectedText]}>Cá nhân</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
  bottomButton: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  selectedButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  bottomIcon: {
    marginBottom: 5,
    alignSelf: 'center',
  },
  bottomText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
  },
  selectedText: {
    color: '#FF9900', // Highlight color when selected
    fontWeight: 'bold', // Optional: Make text bold when selected
  },
});

export default BottomNavigation;
