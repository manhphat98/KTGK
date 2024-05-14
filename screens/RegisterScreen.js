import React, { useState } from 'react';
import { View, Alert, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Logo from '../assets/firebase_logo.png';
import { HelperText, Button } from 'react-native-paper';

export default function RegisterScreen({ navigation }) {
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const hasErrorFullName = () => fullname === '';
  const hasErrorEmail = () => !email.includes('@');
  const hasErrorPassword = () => password.length < 6;
  const hasErrorPasswordComfirm = () => password !== confirmPassword;

  const USERS = firestore().collection("USER");

  const handleCreateAccount = () => {
    auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        USERS.doc(email).set({
          fullname, email, password
        });
        Alert.alert('Đăng ký thành công', 'Bạn đã đăng ký tài khoản thành công!');
        navigation.navigate('Login');
      })
      .catch(e => Alert.alert("Tài khoản đã tồn tại!"));
  };


  const handleRegisterTouch = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <TextInput
        placeholder="Full Name"
        value={fullname}
        onChangeText={setFullname}
        style={styles.textInput}
      />
      
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
      />
      
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
      />

      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.textInput}
      />      

      <Button mode="contained" onPress={handleCreateAccount} style={styles.button}>
        Đăng ký
      </Button>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <Text style={styles.registerText}>If you have account. </Text>
        <TouchableOpacity onPress={handleRegisterTouch}>
          <Text style={styles.registerLink}>Login here.</Text>
        </TouchableOpacity>
      </View>

      <HelperText type='error' visible={hasErrorFullName()}>
        Không để trống tên!
      </HelperText>
      <HelperText type='error' visible={hasErrorEmail()}>
        Địa chỉ Email không hợp lệ!
      </HelperText>
      <HelperText type='error' visible={hasErrorPassword()}>
        Vui lòng nhập Mật khẩu tối thiểu có 6 ký tự trở lên.
      </HelperText>
      <HelperText type='error' visible={hasErrorPasswordComfirm()}>
        Mật khẩu xác nhận không khớp!
      </HelperText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: 300,
    marginBottom: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  button: {
    width: 300,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  registerText: {
    marginRight: 10,
  },
  registerLink: {
    color: 'blue',
  },
});
