import React,{useState} from 'react'
import {  StyleSheet, Text, View, TextInput, Dimensions,  TouchableOpacity, Alert } from 'react-native'
import axios from 'axios';
import { API_URL } from '@env'

const RegistrasiScreen = ({navigation}) => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const submitRegister = () => {
        const reg = /^[a-z0-9]+$/;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(name && email && password){

                if (re.test(String(email).toLowerCase()) === false) 
                    {
                        Alert.alert('error','Email tidak valid');
                        return false;
                    }
                else if(password.length > 8){
                        Alert.alert('error','Password maksimal 8 karakter');
                        return false;
                    }
                else if(reg.test(String(password)) === false){
                    Alert.alert('error','Kombinasi password hanya huruf dan angka tanpa spasi');
                    return false;
                    }


                    else{

                        axios.post(`${API_URL}/api/registrasi`, {
                            name, 
                            email, 
                            password
                        }).then(async (response) => {
                            Alert.alert('success','Registrasi Berhasil');
                            navigation.replace('Registrasi');
                        }).catch((error) => {
                            console.log(error);
                        });  

                    }

        }else{

            Alert.alert('error','Nama, Email dan Password wajib diisi');
            return false;

        }


    }



    return (
        <View style={styles.container}>

            <View style={styles.titlecontainer}>
                <Text style={styles.titletext}>Registrasi Pengguna</Text>
            </View>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setName(text)}
                        placeholder="Name"
                        autoCapitalize = 'none'
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setEmail(text)}
                        placeholder="Email"
                        textContentType="emailAddress"
                        autoCapitalize = 'none'
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={text => setPassword(text)}
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                </View>

                <View>
                    <TouchableOpacity style={styles.button} onPress={() => submitRegister()}>
                        <View style={styles.textcontainer}>
                            <Text style={styles.text}>Registrasi</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.registrasi} >
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={styles.textLogin}>Login</Text>
                    </TouchableOpacity>
                </View>

      </View>

    )
}

export default RegistrasiScreen


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container:{
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#FFFFFF'
    },
    input:{
        borderColor : 'grey', 
        borderWidth : 1, 
        margin : 10, 
        width: windowWidth * 0.8,
        borderRadius: 5,
        fontFamily : 'TitilliumWeb-Regular'
    },
    button:{
        backgroundColor : '#008CBA',
        width : windowWidth * 0.8, 
        height : 45
    }, 
    textcontainer:{
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    text:{
        color: '#ffffff',
        fontFamily : 'TitilliumWeb-Regular'
    },
    titlecontainer:{
        alignItems : 'center',
        justifyContent : 'center'
    },
    titletext:{
        fontSize : 24,
        fontFamily:'TitilliumWeb-Bold'
    }, 
    registrasi:{
        margin: 15
    },
    textLogin:{
        fontFamily : 'TitilliumWeb-Regular'
    }

})
