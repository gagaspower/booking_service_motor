import React, {useState} from 'react'

import { Alert, StyleSheet, Text, View } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import { API_URL } from '@env'

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);



        const signIn = (email, password) => {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if(email && password){

            if (re.test(String(email).toLowerCase()) === false) 
                {
                    Alert.alert('error','Email tidak valid');
                    return false;
                }

                else{

                    axios.post(`${API_URL}/api/login`, {
                      email,
                      password,
                    })
                    .then(response => {
                      const userResponse = {
                        email: response.data.user.email,
                        token: response.data.token,
                      }
                      setUser(userResponse);
                      AsyncStorage.setItem('user', JSON.stringify(userResponse));
                    })
                    .catch(function(error) {
                      Alert.alert('error',error.response.data.msg);
                      });
                }

          }else{
            Alert.alert('error','Email dan Password wajib diisi');
            return false;
          }

        };
        const logout = () => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            axios.post(`${API_URL}/api/auth/logout`)
            .then(response => {
              setUser(null);
              AsyncStorage.removeItem('user')
            })
            .catch(error => {
              console.log(error.response);
            })
          };


  return (
    <AuthContext.Provider value={{user, setUser, signIn, logout}}>
      {children}
    </AuthContext.Provider>
  );
}
