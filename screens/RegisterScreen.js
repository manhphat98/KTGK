import React from 'react';
import { View, Alert, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { firestore } from '@react-native-firebase/firestore';
import { auth } from '@react-native-firebase/auth';
import Logo from '../assets/firebase_logo.png';
import { HelperText, Button, Text, TextInput } from 'react-native-paper';

export default function RegisterScreen({ navigation }) {
  const [fullname, setFullname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const hasErrorFullName = ()=> fullname==""
  const hasErrorEmail = ()=> !email.includes("@");
  const hasErrorPassword = ()=> password.length < 6;
  const hasErrorPasswordComfirm = ()=> password != confirmPassword;

  const USER = firestore().collection("USER")
  const handleCreateAccount = ()=>{
    auth().createUserWithEmailAndPassword(email, password)
    .then(reponse => {
      USER.doc(email).set({
        fullname, email, password
      }) 
      navigation.navigate("Login")
    }).catch(e => Alert.alert("Tài khoản đã tồn tại!"))
  }

  const handleRegister = () => {
    if (!fullname || !email || !password || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Xác thực mật khẩu không trùng khớp');
      return;
    }

    // Xử lý logic đăng ký ở đây (có thể gửi dữ liệu đến máy chủ, lưu trữ trong cơ sở dữ liệu, vv.)
    // Sau đó, chuyển hướng đến màn hình Home
    navigation.navigate('Home');
    Alert.alert('Đăng ký thành công', 'Bạn có đã đăng ký tài khoản thành công !!');
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <TextInput
        placeholder="fullname"
        value={fullname}
        onChangeText={setFullname}
        style={styles.textInput}
      />
      <HelperText type='error' visible={hasErrorFullName()}>
        Không để trống tên!
      </HelperText>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
      />
      <HelperText type='error' visible={hasErrorEmail()}>
        Địa chỉ Email không hợp lệ!
      </HelperText>
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
      />
      <HelperText type='error' visible={hasErrorPassword()}>
        Vui lòng nhập Mật khẩu tối thiểu có 6 ký tự trở lên.
      </HelperText>
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.textInput}
      />
      <HelperText type='error' visible={hasErrorPasswordComfirm()}>
        Không để trống tên!
      </HelperText>
      <Button title="Register" onPress={handleRegister} style={styles.button} titleStyle={styles.buttonText} />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10,}}>
        <Text style={styles.registerText}>If you have account. </Text>
        <TouchableOpacity onPress={handleRegisterTouch}>
          <Text style={styles.registerLink}>Login here.</Text>
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
      padding: 15,
      backgroundColor: '#007bff',
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
  });