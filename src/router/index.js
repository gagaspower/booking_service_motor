import React, { useState, useEffect, useContext } from "react";
import { View, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DashboardScreen, LoginScreen, RegistrasiScreen, ServisScreen, ListScreen, DetailScreen} from "../pages";
import { ProfileScreen } from "../pages";

const Stack = createNativeStackNavigator();



export default function Router() {

    const { user, setUser, signIn, logout } = useContext(AuthContext)
    // const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // check if the user is logged in or not
      AsyncStorage.getItem('user')
      .then(response => {
        if(response){
          userObject = JSON.parse(response)
          setUser(userObject);
          console.log(user);
        }       
      })
    .catch(err => {
        console.log(err);
    })
    }, []);


//   if (loading) {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     )
//   }


    return (
      <NavigationContainer>
        {user ? (
          <>
            <Stack.Navigator initialRouteName="Dashboard" >
                <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title :'Dashboard', headerTitleAlign: 'center'}}/>
                <Stack.Screen name="Settings" component={ProfileScreen} options={{title: 'Akun', headerTitleAlign: 'center'}}/>
                <Stack.Screen name="Booking" component={ServisScreen} options={{title: 'Booking Service', headerTitleAlign: 'center'}}/>
                <Stack.Screen name="ListService" component={ListScreen} options={{title: 'Riwayat Pemesanan', headerTitleAlign: 'center'}}/>
                <Stack.Screen name="DetailScreen" component={DetailScreen} options={{title: 'Detail Pemesanan', headerTitleAlign: 'center'}}/>
            </Stack.Navigator>
          </>
        ) : (
            <>
             <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown : false}}/>
                <Stack.Screen name="Registrasi" component={RegistrasiScreen} options={{ headerShown : false}}/>
            </Stack.Navigator>
            </>
        )}
      </NavigationContainer>
    );
}
