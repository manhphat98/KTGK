import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  const handleLogout = () => {
    // Điều hướng quay lại màn hình đăng nhập khi người dùng đăng xuất
    navigation.navigate('Login');
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
