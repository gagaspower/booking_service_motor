import React,{useEffect, useState, useContext} from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput, Platform, TouchableOpacity, LogBox, ScrollView,StatusBar, SafeAreaView, Alert } from 'react-native'
import { AuthContext } from '../../AuthProvider'
import axios from 'axios';

import DateTimePicker from '@react-native-community/datetimepicker';
import { API_URL } from '@env'

const ServisScreen = ({navigation}) => {
    const { user, logout } = useContext(AuthContext)

    axios.defaults.baseURL = 'https://laravel-api.cctvonlinecilacap.com';

    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    const [kode, setKode] = useState('');
    const [date, setDate] = useState(new Date());
    const [jenis, setJenis] = useState('');
    const [plat, setPlat] = useState('');
    const [keluhan, setKeluhan] = useState('');
    const [nama, setNama] = useState('');
    const [noHp, setNohp] = useState('');
    const [alamat, setAlamat] = useState('');
    const [show, setShow] = useState(false);
    const [tanggal, setTanggal] = useState();
    const [email, setEmail] = useState(null);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear()+'-'+('0' + (tempDate.getMonth()+1)).slice(-2) +'-'+('0' + tempDate.getDate()).slice(-2);
        setTanggal(fDate);
        console.log(fDate);

      };
    const showDatepicker = () => {
        setShow(true);
    };

    useEffect(() => {
        getKode();
        getEmail();
    }, []);

    const getEmail = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        axios.get(`${API_URL}/api/auth/user`)
        .then(response => {
          setEmail(response.data.email);
        })
        .catch(error => {
          console.log(error.response);
        })
    }


    const getKode = async () => {

        try {
            const response = await axios.get(`${API_URL}/api/booking/kodebooking`);
            console.log(response);
            setKode(response.data.kode);
        } catch (error) {
            console.log(error);
        }
    }


    const sendOrder = async () => {

        if(tanggal && jenis && plat && keluhan && nama && nama && noHp && alamat && email){

            try {
                await axios.post(`${API_URL}/api/booking/order`,{
                    kode : kode,
                    tanggal : tanggal,
                    jenis : jenis,
                    plat : plat,
                    keluhan : keluhan,
                    nama : nama,
                    noHp : noHp,
                    alamat : alamat,
                    email : email
                });
                Alert.alert('Success','Booking berhasil dilakukan, mekanik akan segera datang ke lokasi');
                navigation.replace('Booking');
            } catch (error) {
                console.log(error);
                Alert.alert('Error',error.msg);
            }
        }else{
            Alert.alert('Error','Semua data wajib diisi');
        }
    }

    return (
<SafeAreaView>
<ScrollView style={styles.scrollView}>
        <View style={styles.container}>
            {/* <Text style={styles.pagetitle}>Profile Page</Text> */}
            {/* <View style={styles.conten}>
                <Text style={styles.textcontent}>Form pemesanan service</Text>
            </View> */}
            
                    <View style={styles.formcontainer}>
                        <Text style={styles.label}>Kode Booking :</Text>
                        <TextInput
                                style={styles.input}
                                onChangeText={text => setKode(text)}
                                value={kode}
                                editable={false}
                            />
                    <Text style={styles.label}>Tgl Service :</Text>
                    <TouchableOpacity onPress={showDatepicker}>
                        <View>
                            <Text style={styles.inputDate}>{tanggal}</Text>
                        </View>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="calendar"
                        dateFormat= "yy-mm-dd"
                        onChange={onChange}
                        />
                    )}
                    <Text style={styles.label}>Jenis Motor :</Text>
                        <TextInput
                                style={styles.input}
                                onChangeText={text => setJenis(text)}
                                placeholder="Honda Supra X"
                            />
                        <Text style={styles.label}>Plat Motor :</Text>
                        <TextInput
                                style={styles.input}
                                onChangeText={text => setPlat(text)}
                                placeholder="A 1234 B"
                            />
                        <Text style={styles.label}>Keluhan :</Text>
                        <TextInput
                                style={styles.textArea}
                                onChangeText={text => setKeluhan(text)}
                                numberOfLines={10}
                                multiline={true}
                                placeholder="Detail keluhan"
                            />
                        <Text style={styles.label}>Atas Nama :</Text>
                        <TextInput
                                style={styles.input}
                                onChangeText={text => setNama(text)}
                                placeholder="Nama anda atau nama pemilik kendaraan"
                            />
                        <Text style={styles.label}>No. HP Pemesan :</Text>
                        <TextInput
                                style={styles.input}
                                onChangeText={text => setNohp(text)}
                                placeholder="081xxxxxxxxx"
                                keyboardType="numeric"
                            />
                        <Text style={styles.label}>Alamat :</Text>
                        <TextInput
                                style={styles.textArea}
                                onChangeText={text => setAlamat(text)}
                                numberOfLines={10}
                                multiline={true}
                                placeholder="Mohon isikan alamat lengkap sesuai KTP"
                            />

                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => sendOrder() }>
                            <View style={styles.textcontainer}>
                                <Text style={styles.textButton}>Buat Pesanan</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            
        </View>
        </ScrollView>
</SafeAreaView>

      
    )
}

export default ServisScreen

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container:{
        flex : 1, 
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#FFFFFF',
        marginTop : 60,
        paddingTop: StatusBar.currentHeight,
        paddingBottom : 15
    }, 
    conten:{
        width : windowWidth * 0.9,
        // height : windowHeight * 0.50,
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
        margin: 10
        
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
        marginTop : 15
    },  
    input:{
        borderColor : 'grey', 
        borderWidth : 1, 
        margin : 10, 
        width: windowWidth * 0.8,
        borderRadius: 5,
        fontFamily:'TitilliumWeb-Regular'
    },
    inputDate:{
        borderColor : 'grey', 
        borderWidth : 1, 
        margin : 10, 
        width: windowWidth * 0.8,
        paddingLeft : 5,
        textAlignVertical : 'center',
        height : 50,
        borderRadius: 5,
        fontFamily:'TitilliumWeb-Regular'
    },
    textArea:{
        borderColor : 'grey', 
        borderWidth : 1, 
        margin : 10, 
        width: windowWidth * 0.8,
        borderRadius: 5,
        fontFamily:'TitilliumWeb-Regular',
        textAlignVertical: 'top'
    },
    label:{
        marginLeft : 10, 
        fontFamily:'TitilliumWeb-Regular'
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
        color: '#ffffff'
    },
    titlecontainer:{
        alignItems : 'center',
        justifyContent : 'center'
    },
    titletext:{
        fontWeight : "700", 
        fontSize : 18
    },
    scrollView: {
        marginHorizontal: 20,
      },
})

