import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyContextControllerProvider } from './src/store';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';
import Router from './src/routers/Router';

function App() {
  const USERS = firestore().collection("USER");
  const admin = {
    fullname: "Admin",
    email: "alibaboneuro@gmail.com",
    password: "123456",
  };

  useEffect(() => {
    USERS.doc(admin.email).onSnapshot(u => {
      if (!u.exists) {
        auth().createUserWithEmailAndPassword(admin.email, admin.password)
          .then(response => {
            USERS.doc(admin.email).set(admin);
            console.log("Thêm tài khoản Admin thành công");
          });
      }
    });
  }, []);

  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </MyContextControllerProvider>
  );
}

export default App;
