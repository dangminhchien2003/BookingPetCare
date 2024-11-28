import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Splash from "../../screens/Login/Splash";
import HomeScreen from "../../screens/Home/HomeScreen";
import BookingScreen from "../../screens/Booking/BookingScreen";
import LoginScreen from "../../screens/Login/LoginScreen";
import SignUpScreen from "../../screens/Login/SignUpScreen";
import CenterDetails from "../../screens/Center/CenterDetails";
import ProfileScreen from "../../screens/Profile/ProfileScreen";
import SearchScreen from "../../screens/Search/SearchScreen";
import BookingListScreen from "../../screens/Booking/BookingListScreen";
import PetScreen from "../../screens/Pet/PetScreen";
import AddPet from "../../screens/Pet/AddPet";
import EditPet from "../../screens/Pet/EditPet";
// import PetDetail from "../../screens/Pet/PetDetail";
import ServiceDetails from "../../screens/Service/ServiceDetails";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Trang chủ") {
            iconName = "home-outline";
          } else if (route.name === "Tìm kiếm") {
            iconName = "search-outline";
          } else if (route.name === "Lịch hẹn") {
            iconName = "calendar-outline";
          } else if (route.name === "Cá nhân") {
            iconName = "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Trang chủ"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Tìm kiếm"
        component={SearchScreen}
        options={{ title: "Tìm kiếm " }}
      />
      <Tab.Screen
        name="Lịch hẹn"
        component={BookingListScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cá nhân"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Rootnavi = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ title: "Splash", headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: "Signup",headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CenterDetails"
          component={CenterDetails}
          options={{ title: "Chi tiết trung tâm" }}
        />
        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{ title: "Đặt lịch dịch vụ" }}
        />
        <Stack.Screen
          name="PetScreen"
          component={PetScreen}
          options={{ title: "Quản lý thú cưng" }}
        />
         <Stack.Screen
          name="AddPet"
          component={AddPet}
          options={{ title: "Thêm thú cưng" }}
        />
         <Stack.Screen
          name="EditPet"
          component={EditPet}
          options={{ title: "Sửa thú cưng" }}
        />
        {/* <Stack.Screen
          name="PetDetail"
          component={PetDetail}
          options={{ title: "PetDetail" }}
        /> */}
        <Stack.Screen
          name="ServiceDetails"
          component={ServiceDetails}
          options={{ title: "Chi tiết dịch vụ" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Rootnavi;
