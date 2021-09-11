import React,{useContext, useEffect, useState} from 'react'

import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native'

import { AuthContext } from '../../AuthProvider'

import axios from 'axios'

import moment from 'moment'

import 'moment/locale/id'

import { API_URL } from '@env'

const DetailScreen = ({ navigation, route }) => {
    
    const [ value ] = useState(route.params.id); // ambil id dari parameter
    const { user, logout } = useContext(AuthContext);


    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    const [ kode, setKode ] = useState('');
    const [ jenis, setJenis ] = useState('');
    const [ plat, setPlat ] = useState('');
    const [ keluhan, setKeluhan ] = useState('');
    const [ nama, setNama ] = useState('');
    const [ noHp, setNohp ] = useState('');
    const [ alamat, setAlamat] = useState('');
    const [ tanggal, setTanggal ] = useState('');


    useEffect(() => {
        DetailService();
    }, [])


    const DetailService = async () => {
        console.log(value);
        try {
            const response = await axios.get(`${API_URL}/api/booking/detail/`+value);
            console.log(response.data);

            setKode(response.data.kode_booking);
            setJenis(response.data.jenis_motor);
            setPlat(response.data.plat_motor);
            setKeluhan(response.data.keluhan);
            setNama(response.data.nama_booking);
            setNohp(response.data.no_hp_booking);
            setAlamat(response.data.alamat_lengkap_booking);
            setTanggal(response.data.tgl_booking);
        } catch (error) {
            console.log(error);
        }
    }

    // fungsi ini agar tidak muncul invalid date saat data masih di load
    const renderTanggal = () => {
        if(tanggal)
           return moment(tanggal).format('LL');
        return null;
     }


    return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.values}>
                            <Text style={styles.labels}>No.Booking</Text>
                            <Text style={styles.titikdua}>: </Text>
                            <Text style={styles.dataValue}>{kode}</Text>
                        </View>

                        <View>
                            <Text style={styles.line}></Text>
                        </View>
                        
                        <View style={styles.values}>
                            <Text style={styles.labels}>Tgl Service</Text>
                            <Text style={styles.titikdua}>: </Text>
                            <Text style={styles.dataValue}>{renderTanggal()}</Text>
                        </View>

                        <View>
                            <Text style={styles.line}></Text>
                        </View>

                        <View style={styles.values}>
                            <Text style={styles.labels}>Motor</Text>
                            <Text style={styles.titikdua}>: </Text>
                            <Text style={styles.dataValue}>{jenis}</Text>
                        </View>

                        <View>
                            <Text style={styles.line}></Text>
                        </View>

                        <View style={styles.values}>
                            <Text style={styles.labels}>No. Motor</Text>
                            <Text style={styles.titikdua}>: </Text>
                            <Text style={styles.dataValue}>{plat}</Text>
                        </View>

                        <View>
                            <Text style={styles.line}></Text>
                        </View>


                        <View style={styles.values}>
                            <Text style={styles.labels}>Keluhan</Text>
                            <Text style={styles.titikdua}>: </Text>
                            <Text style={styles.dataValue}>{keluhan}</Text>
                        </View>

                        <View>
                            <Text style={styles.line}></Text>
                        </View>

                        <View style={styles.values}>
                            <Text style={styles.labels}>Atas nama</Text>
                            <Text style={styles.titikdua}>: </Text>
                            <Text style={styles.dataValue}>{nama}</Text>
                        </View>

                        <View>
                            <Text style={styles.line}></Text>
                        </View>

                        <View style={styles.values}>
                            <Text style={styles.labels}>No. HP</Text>
                            <Text style={styles.titikdua}>: </Text>
                            <Text style={styles.dataValue}>{noHp}</Text>
                        </View>

                        <View>
                            <Text style={styles.line}></Text>
                        </View>

                        <View style={styles.values}>
                            <Text style={styles.labels}>Alamat</Text>
                            <Text style={styles.titikdua}>: </Text>
                            <Text style={styles.dataValue}>{alamat}</Text>
                        </View>

                        <View>
                            <Text style={styles.line}></Text>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
    )
}

export default DetailScreen

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container:{
        flex : 1, 
        justifyContent : 'center',
        backgroundColor : '#FFFFFF',
        marginTop : 50,
        marginLeft : 10,
        marginRight : 10
    }, 
    values:{
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    labels:{
        fontFamily: 'TitilliumWeb-Regular',
        fontSize : 16,
        padding : 13,
        width : windowWidth * 0.27
    },
    dataValue : {
        fontFamily : 'TitilliumWeb-Regular',
        paddingTop : 13,
        paddingRight : 13,
        width : windowWidth * 0.65
    },
    line:{
        borderBottomWidth: 1,
        borderColor : '#DDDDDD',
        marginBottom : 10,
        marginLeft : 10,
        marginRight : 10, 
        marginTop : - 15
    },
    titikdua:{
        paddingTop : 13,
        paddingRight : 5
    }
})
