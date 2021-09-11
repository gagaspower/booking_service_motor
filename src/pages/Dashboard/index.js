import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import { AuthContext } from '../../AuthProvider'
import axios from 'axios'
import { ArchiveIcon, IconAccount, IconBooking, IconHistory, IconLogout, ToolsIcon, UserAccount, UserIcon, HistoryIcon, SignOutIcon } from '../../assets';




axios.defaults.baseURL = 'https://laravel-api.cctvonlinecilacap.com';

const DashboardScreen = ({navigation}) => {
   
    const { user, logout } = useContext(AuthContext)
    const [name, setName] = useState(null);
  
    useEffect(() => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  
      axios.get('/api/auth/user')
        .then(response => {
          setName(response.data.name);
        })
        .catch(error => {
          console.log(error.response);
        })
  
    }, []);


    return (
        <View style={styles.container}>

            <View style={styles.welcome}>
                <Text style={styles.welcomeText}>Selamat datang kembali,</Text>
                <Text style={styles.welcomeUser}>{name}</Text>
            </View>

            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Settings')}>
                    <Image source={UserAccount} />
                    <Text style={styles.iconText}>Akun</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Booking')}>
                    <Image source={ToolsIcon} />
                    <Text style={styles.iconText}>Booking</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('ListService')} >
                    <Image source={HistoryIcon} />
                    <Text style={styles.iconText}>Histori</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={() => logout()} >
                    <Image source={SignOutIcon} />
                    <Text style={styles.iconText}>Keluar</Text>
                </TouchableOpacity>
                
            </View>

        </View>
    )
}
export default DashboardScreen


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({

    container:{
        flex : 1, 
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#FFFFFF',
    }, 
    conten:{
        width : windowWidth * 0.9,
        height : windowHeight * 0.50,
        borderRadius : 5,
        alignItems : 'center',
        backgroundColor : '#FFFFFF',
        margin: 10
    }, 
    textcontent:{
        padding : 10,
        fontFamily : 'TitilliumWeb-Regular'
    },
    button:{
        backgroundColor : '#008CBA',
        width : windowWidth * 0.8, 
        height : 45, 
        marginTop : windowHeight * 0.1
    },
    buttonmenu:{
        width : windowWidth * 0.8, 
        height : 45, 
        borderWidth : 1,
        borderColor : '#E7E9EB',
        margin : 10
    },  
    textcontainer:{
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    text:{
        color: '#ffffff',
        fontFamily: 'TitilliumWeb-Regular'
    },
    pagetitle:{
        fontSize : 24,
        fontFamily : 'TitilliumWeb-Bold'
    },
    textMenu : {
        fontFamily : 'TitilliumWeb-Regular'
    },
    iconContainer:{
        flexDirection : 'row',
        // marginTop : -windowHeight * 0.001,
        paddingTop : 50,
        justifyContent : 'center',
        flexWrap : 'wrap'
    },
    icon:{
        padding : 10,
        marginHorizontal : 20
    },
    iconText : {
        fontFamily : 'TitilliumWeb-Regular',
        fontSize : 16,
        textAlign : 'center'
    },
    welcome:{
        width : windowWidth * 0.8,
        height : 100,
        marginTop : -windowHeight * 0.1,
        backgroundColor : '#0099cc',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 5,
    },
    welcomeText:{
        fontSize : 18,
        fontFamily : 'TitilliumWeb-Regular',
        color : '#ffffff',
        padding : 15
    },
    welcomeUser:{
        fontSize : 18,
        fontFamily : 'TitilliumWeb-Bold',
        color : '#ffffff',
        paddingLeft : 15,
    }




})
