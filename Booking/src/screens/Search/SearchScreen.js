import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import url from "../../../ipconfig";

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) return; // Không thực hiện tìm kiếm nếu không có từ khóa

    setLoading(true);
    setError(null); // Đặt lại lỗi trước khi gọi API

    try {
      const response = await fetch(
        `${url}/api/timkiemdv_tt.php?searchTerm=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      console.log("API Response:", data); // Thêm log để kiểm tra dữ liệu

      const combinedResults = [
        ...data.services.map((service) => ({
          id: service.iddichvu,
          name: service.tendichvu,
          type: "service",
          image: service.hinhanh,
          price: service.gia,
          mota: service.mota,
          time: service.thoigianthuchien,
        })),
        ...data.centers.map((center) => ({
          id: center.idtrungtam,
          name: center.tentrungtam,
          type: "center",
          image: center.hinhanh,
          diachi: center.diachi,
          sodienthoai: center.sodienthoai,
          email: center.email,
          X_location: center.X_location,
          Y_location: center.Y_location,
          mota: center.mota,
        })),
      ];

      const validResults = combinedResults.filter(
        (item) => item.id !== undefined
      );
      setResults(validResults);
    } catch (err) {
      setError("Có lỗi xảy ra khi tìm kiếm.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => {
        if (item.type === "service") {
          navigation.navigate("ServiceDetails", {
            tenDichVu: item.name,
            hinhAnhDichVu: item.image,
            moTaDichVu: item.mota,
            giaDichVu: item.price,
            thoiGianThucHien: item.time,
          });
        } else if (item.type === "center") {
          navigation.navigate("CenterDetails", {
            center: {
              idtrungtam: item.id,
              tentrungtam: item.name,
              hinhanh: item.image,
              diachi: item.diachi,
              sodienthoai: item.sodienthoai,
              email: item.email,
              X_location: item.X_location,
              Y_location: item.Y_location,
              mota: item.mota,
            },
          });
        }
      }}
      key={`${item.id}-${item.type}`} // Sử dụng id kết hợp với type để tạo key duy nhất
    >
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultText} numberOfLines={1} ellipsizeMode="tail">
          {item.name} ({item.type === "service" ? "Dịch vụ" : "Trung tâm"})
        </Text>
        {item.type === "service" && (
          <>
            <View style={styles.infoRow}>
              <Icon
                name="money"
                size={16}
                color="#f9b233"
                style={styles.iconStyle}
              />
              <Text style={styles.productPrice}>
                {formatPrice(item.price)} VND
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Icon
                name="clock-o"
                size={16}
                color="#f9b233"
                style={styles.iconStyle}
              />
              <Text style={styles.productTime}>
                {item.time ? item.time : "Chưa có"}
              </Text>
            </View>
          </>
        )}

        {item.type === "center" && (
          <>
            <View style={styles.infoRow}>
              <Icon
                name="map-marker"
                size={16}
                color="#f9b233"
                style={styles.iconStyle}
              />
              <Text style={styles.centerAddress}>{item.diachi}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon
                name="phone"
                size={16}
                color="#f9b233"
                style={styles.iconStyle}
              />
              <Text style={styles.centerPhone}>{item.sodienthoai}</Text>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  const formatPrice = (Gia) => {
    return Gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm dịch vụ hoặc trung tâm..."
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Tìm kiếm</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {results.length === 0 && !loading && (
        <Text style={styles.noResultsText}>
          Không có kết quả nào được tìm thấy.
        </Text>
      )}
      {query === "" && (
        <Image
          source={{
            uri: "https://png.pngtree.com/png-clipart/20231208/original/pngtree-dog-and-cat-cartoon-illustration-vector-png-image_13797203.png",
          }}
          style={styles.petImage}
        />
      )}
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${item.type}-${index}`} // Kết hợp id, type và index để tạo key duy nhất
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 16,
  },
  backIcon: {
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    marginRight: 40,
  },

  searchInput: {
    height: 50,
    borderColor: "#f9b233",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  searchButton: {
    backgroundColor: "#f9b233",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 4,
    elevation: 1,
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderColor: "#f9b233",
    borderWidth: 2,
  },
  resultInfo: {
    flex: 1,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    color: "#f9b233",
  },
  productTime: {
    fontSize: 14,
    color: "#555",
  },
  iconStyle: {
    marginRight: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },

  errorText: {
    color: "red",
    marginVertical: 10,
    textAlign: "center",
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "grey",
  },
  petImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginTop: 50,
    marginLeft: 40,
    resizeMode: "cover",
  },
});

export default SearchScreen;
