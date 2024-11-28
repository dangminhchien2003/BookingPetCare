import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import url from '../../../ipconfig';

const EditPet = () => {
  const route = useRoute();  // Lấy tham số từ navigation
  const navigation = useNavigation();

  
  // Lấy dữ liệu thú cưng từ params của route
  const { petId, petData } = route.params;

  const [pet, setPet] = useState({
    idthucung: petData?.idthucung || '',
    tenthucung: petData?.tenthucung || '',
    idnguoidung: petData?.idnguoidung || '',
    loaithucung: petData?.loaithucung || '',
    giongloai: petData?.giongloai || '',
    tuoi: petData?.tuoi || '',
    cannang: petData?.cannang || '',
    suckhoe: petData?.suckhoe || '',
  });

  // Cập nhật thông tin thú cưng
  const handleUpdatePet = async () => {
    console.log("Pet data being sent:", pet);
    try {
      const response = await fetch(`${url}/api/suathucung.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pet),
      });

      const result = await response.json();
      if (result.success) {
        Alert.alert('Thành công', 'Thông tin thú cưng đã được cập nhật!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Lỗi', 'Cập nhật thông tin thú cưng không thành công.');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật thú cưng:', error);
      Alert.alert('Lỗi', 'Đã có sự cố xảy ra!');
    }
  };

  // Xử lý thay đổi các trường thông tin
  const handleChange = (name, value) => {
    setPet({ ...pet, [name]: value });
    console.log("Pet data being sent:", pet);
  };

  return (
    <View style={styles.container}>
    
      <TextInput
        style={styles.input}
        placeholder="Tên thú cưng"
        value={pet.tenthucung}
        onChangeText={(text) => handleChange('tenthucung', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Loại thú cưng"
        value={pet.loaithucung}
        onChangeText={(text) => handleChange('loaithucung', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Giống loài"
        value={pet.giongloai}
        onChangeText={(text) => handleChange('giongloai', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tuổi"
        value={pet.tuoi.toString()}
        onChangeText={(text) => handleChange('tuoi', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Cân nặng (kg)"
        value={pet.cannang.toString()}
        onChangeText={(text) => handleChange('cannang', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Sức khỏe"
        value={pet.suckhoe}
        onChangeText={(text) => handleChange('suckhoe', text)}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdatePet}>
        <Icon name="save" size={20} color="#fff" />
        <Text style={styles.saveButtonText}>Lưu Thông Tin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9900',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default EditPet;
