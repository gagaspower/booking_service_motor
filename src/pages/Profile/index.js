import React,{useContext, useEffect, useState} from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native'
import { AuthContext } from '../../AuthProvider'
import axios from 'axios'
import { API_URL } from '@env'

const ProfileScreen = ({navigation}) => {
    const { user, logout } = useContext(AuthContext)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    
        axios.get(`${API_URL}/api/auth/user`)
          .then(response => {
            setName(response.data.name);
            setEmail(response.data.email);
          })
          .catch(error => {
            console.log(error.response);
          })
    
      }, []);
  

     const updateUser = () => {
        const reg = /^[a-z0-9]+$/;
        // jika password di isi, maka lakukan validasi
        if(password){

            if(password.length > 8){
                Alert.alert('error','Password maksimal 8 karakter');
                return false;
            }

            if(reg.test(String(password)) === false){
                Alert.alert('error','Kombinasi password hanya huruf dan angka tanpa spasi');
                return false;
            }

        } // password cek selesai.

        fetch(`${API_URL}/api/auth/user/update`, {
            method: 'POST',
            headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}` 
                    },
            body: JSON.stringify({
                name: name,
                email : email,
                password : password
            })
          })
          .then((response) => response.json())
          .then((json) => {
                console.log(json);
                Alert.alert('success','Akun berhasil diupdate. anda akan dialihkan ke halaman utama');
                navigation.replace('Dashboard');
           })
          .catch((err) => { console.log(err); });
      }

    return (
        <View style={styles.container}>
            {/* <Text style={styles.pagetitle}>Profile Page</Text> */}
            {/* <View style={styles.conten}>
                <Text style={styles.textcontent}>Profil saya</Text>
            </View> */}
            <View style={styles.formcontainer}>
                <Text style={styles.label}>Email :</Text>
                <TextInput
                        style={styles.input}
                        onChangeText={text => setEmail(text)}
                        placeholder="Email"
                        textContentType="emailAddress"
                        autoCapitalize = 'none'
                        value={email}
                        editable={false}
                    />
                <Text style={styles.label}>Nama :</Text>
                <TextInput
                        style={styles.input}
                        onChangeText={text => setName(text)}
                        placeholder="Name"
                        autoCapitalize = 'none'
                        value={name}
                    />
                <Text style={styles.label}>Password :</Text>
                <TextInput
                        style={styles.input}
                        onChangeText={text => setPassword(text)}
                        placeholder="Masukan password jika diganti"
                        secureTextEntry={true}
                    />
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => updateUser() }>
                    <View style={styles.textcontainer}>
                        <Text style={styles.textButton}>Update Akun</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProfileScreen

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container:{
        flex : 1, 
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#E7E9EB',
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
        fontFamily:'TitilliumWeb-Regular'
    },
    button:{
        backgroundColor : '#008CBA',
        width : windowWidth * 0.8, 
        height : 45, 
        // marginTop : windowHeight * 0.5
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
    textButton:{
        color: '#ffffff',
        fontFamily:'TitilliumWeb-Regular'
    },
    pagetitle:{
        fontSize : 24,
        fontFamily : 'TitilliumWeb-Bold',
        marginTop : -windowHeight*0.3
    },
    formcontainer:{
        marginTop : -100,
        backgroundColor :'#FFFFFF', 
        borderRadius : 5,
        padding : 10,
        height : windowHeight*0.5,
    }, 
    label:{
        marginLeft: 10,
        fontFamily:'TitilliumWeb-Bold'
    },
    input:{
        borderColor : 'grey', 
        borderWidth : 1, 
        margin : 10, 
        width: windowWidth * 0.8,
        borderRadius: 5,
        fontFamily:'TitilliumWeb-Regular'
    },
    button:{
        backgroundColor : '#008CBA',
        width : windowWidth * 0.8, 
        height : 45,
        marginTop : -75
    }, 
    textcontainer:{
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    text:{
        color: '#ffffff'
    },
    titlecontainer:{
        alignItems : 'center',
        justifyContent : 'center'
    },
    titletext:{
        fontWeight : "700", 
        fontSize : 18
    }
})
