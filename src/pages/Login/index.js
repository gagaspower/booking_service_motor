import React,{useContext, useState} from 'react'
import {  StyleSheet, Text, View, TextInput, Dimensions,  TouchableOpacity, Image } from 'react-native'
import { LogoApk } from '../../assets';
import { AuthContext } from '../../AuthProvider'

const LoginScreen = ({navigation}) => {
    
    const { signIn } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>

            {/* <View style={styles.titlecontainer}>
                <Text style={styles.titletext}>Login</Text>
            </View> */}
                <View style={styles.titlecontainer}>
                    <Image source={LogoApk} />
                    <Text style={styles.logoText}>Booking Service Tool</Text>
                </View>
                <View>
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
                    <TouchableOpacity style={styles.button} onPress={ () => signIn(email,password) }>
                        <View style={styles.textcontainer}>
                            <Text style={styles.text}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.registrasi} >
                    <TouchableOpacity onPress={() => navigation.navigate('Registrasi')}>
                        <Text style={styles.textRegistrasi} >Registrasi</Text>
                    </TouchableOpacity>
                </View>

      </View>

    )
}

export default LoginScreen


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
    textRegistrasi:{
        fontFamily : 'TitilliumWeb-Regular'
    },
    titlecontainer:{
        alignItems : 'center',
        justifyContent : 'center'
    },
    titletext:{
        fontSize : 36,
        fontFamily : 'TitilliumWeb-Bold'
    }, 
    registrasi:{
        margin: 15
    },
    logoText:{
        fontFamily : 'TitilliumWeb-Light',
        fontSize : 14,
        color: '#0079f0'
    }

})
