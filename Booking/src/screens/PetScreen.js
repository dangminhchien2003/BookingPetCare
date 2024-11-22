import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import url from '../../ipconfig';

const PetScreen = () => {
  const navigation = useNavigation();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const user = userData ? JSON.parse(userData) : null;

        if (user && user.idnguoidung) {
          const response = await fetch(`${url}/api/getthucungbynguoidung.php?idnguoidung=${user.idnguoidung}`);
          const petsData = await response.json();
          setPets(petsData);
          setFilteredPets(petsData);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách thú cưng:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = pets.filter(pet => pet.tenthucung.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredPets(filtered);
    } else {
      setFilteredPets(pets);
    }
  }, [searchTerm, pets]);

  const handleEdit = (petId) => {
    // Thực hiện hành động sửa ở đây
    navigation.navigate('EditPet', { petId });
  };

  const handleDelete = (petId) => {
    // Thực hiện hành động xóa ở đây
    console.log(`Xóa thú cưng với ID: ${petId}`);
  };

  const renderPetItem = ({ item }) => (
    <View style={styles.petItem}>
      <TouchableOpacity style={styles.petInfo} onPress={() => navigation.navigate('PetDetail', { petId: item.idthucung })}>
        <Text style={styles.petName}>{item.tenthucung}</Text>
        <Text style={styles.petDetails}>
          Loại: {item.loaithucung} | Giống: {item.giongloai} | Tuổi: {item.tuoi} | Cân nặng: {item.cannang}kg | Sức khỏe: {item.suckhoe}
        </Text>
      </TouchableOpacity>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={() => handleEdit(item.idthucung)}>
          <Icon name="edit" size={20} color="#FF9900" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.idthucung)}>
          <Icon name="trash" size={20} color="#FF0000" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý thú cưng</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm thú cưng..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddPet')}>
        <Icon name="plus" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Thêm thú cưng</Text>
      </TouchableOpacity>

      {filteredPets.length > 0 ? (
        <FlatList
          data={filteredPets}
          renderItem={renderPetItem}
          keyExtractor={(item) => item.idthucung.toString()}
        />
      ) : (
        <Text style={styles.noPetsText}>Chưa có thú cưng nào.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9900',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
  },
  petItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  petDetails: {
    fontSize: 14,
    color: '#555',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  noPetsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default PetScreen;
