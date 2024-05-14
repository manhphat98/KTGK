import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { Alert } from 'react-native';
import firebase from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const MyContext = createContext();

MyContext.displayName = 'My store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, userLogin: action.value };
    case 'LOGOUT':
      return { ...state, userLogin: null };
    default:
      throw new Error('Action không tồn tại');
  }
};

const MyContextControllerProvider = ({ children }) => {
  const initialState = {
    userLogin: null,
    jobs: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContextProvider = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext phải ở trong MyContextProvider');
  }
  return context;
};

const USERS = firebase().collection('USERS');

const createAccount = (navigation, email, password, fullname) => {
  auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
      USERS.doc(email).set({
        email,
        password,
        fullname,
      });
      navigation.navigate("Login");
    })
    .catch(e => Alert.alert("Tài khoản đã tồn tại!"));
};

const login = (dispatch, email, password) => {
  auth().signInWithEmailAndPassword(email, password)
    .then(response =>
      USERS.doc(email).get()
        .then(u => dispatch({ type: "USER_LOGIN", value: u.data() }))
        .catch(e => Alert.alert("Lỗi khi lấy dữ liệu người dùng:", e))
    )
    .catch(e => Alert.alert("Email hoặc Password không đúng!!!"));
};

const logout = (dispatch) => {
  auth().signOut().then(() => dispatch({ type: 'LOGOUT' }));
};

export {
  MyContextControllerProvider,
  useMyContextProvider,
  createAccount,
  login,
  logout,
};
