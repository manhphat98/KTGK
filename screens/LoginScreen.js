import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { useMyContextProvider } from '../src/store';

// Import logo
import Logo from '../assets/firebase_logo.png';
import { HelperText } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
  const [controller, dispatch] = useMyContextProvider()
  const {userLogin} = controller
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const hasErrorEmail = ()=> !email.includes("@");
  const hasErrorPassword = ()=> password.length < 6;

  const handleLogin = () => {
    // Kiểm tra xem tên người dùng và mật khẩu có hợp lệ không
    if (username === 'admin' && password === 'admin') {
      // Nếu hợp lệ, điều hướng đến màn hình Home
      navigation.navigate('Home');
    } else {
      // Nếu không hợp lệ, hiển thị thông báo lỗi
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  const handleRegisterTouch = () => {
    // Chuyển hướng đến màn hình đăng ký khi chạm vào khu vực tương ứng
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
      />
      <HelperText type='error' visible={hasErrorEmail()}>
        Địa chỉ Email không hợp lệ!
      </HelperText>

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.textInput}
      />
      <HelperText type='error' visible={hasErrorPassword()}>
        Password ít nhất phải có 6 ký tự!
      </HelperText>
      <View style={{ marginTop: 10,}}/>
      <Button title="Login" onPress={handleLogin} ></Button>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10,}}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleRegisterTouch}>
          <Text style={styles.registerLink}>Register here.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  textInput: {
    width: 300,
    marginBottom: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  registerText: {
    marginRight: 10,
  },
  registerLink: {
    color: 'blue',
  },
});