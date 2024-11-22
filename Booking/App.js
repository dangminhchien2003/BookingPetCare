import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/screens/Splash';
import HomeScreen from './src/screens/HomeScreen';
import BookingScreen from './src/screens/BookingScreen';
import ServiceDetails from './src/screens/ServiceDetails';
import LoginScreen from './src/screens/LoginScreen'; 
import SignUpScreen from './src/screens/SignUpScreen'; 
import CenterDetails from './src/screens/CenterDetails';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import BookingListScreen from './src/screens/BookingListScreen';
import PetScreen from './src/screens/PetScreen';
import AddPet from './src/screens/AddPet';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown:false }}/> 
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown:false }} /> 
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown:false }}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown:false }}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown:false }}/>
        <Stack.Screen name="BookingListScreen" component={BookingListScreen} options={{ headerShown:false }}/>
        <Stack.Screen name="Booking" component={BookingScreen} options={{ headerShown:false }}/>
        <Stack.Screen name="PetScreen" component={PetScreen} options={{ headerShown:false }}/>
        <Stack.Screen name="AddPet" component={AddPet} options={{ headerShown:false }}/>
        <Stack.Screen name="ServiceDetails" component={ServiceDetails} options={{ title: 'Chi tiết dịch vụ' }} />
        <Stack.Screen name="CenterDetails" component={CenterDetails} options={{ title: 'Chi tiết trung tâm' }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
