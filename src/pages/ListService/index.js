import React, {useEffect, useContext, useState} from 'react'
import { StyleSheet, Text, View, StatusBar, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/id'

import { AuthContext } from '../../AuthProvider'
import { API_URL } from '@env'
const ListScreen = ({navigation}) => {

    const { user, logout } = useContext(AuthContext)
    const [datas, setData] = useState([]);


    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    useEffect(() => {
        getData();
    }, []);



    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/booking/riwayat`);
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.list}>
                        {datas.map((item) => (
               
                         <TouchableOpacity key={item.id} onPress={() => navigation.navigate('DetailScreen', { id : item.id } )}>
                            <View >
                                <Text style={styles.kode}>{item.kode_booking}</Text>
                                    <View style={styles.tglService}>
                                        <Text style={styles.label}>Tanggal Service</Text>
                                        <Text>:</Text>
                                        <Text style={styles.detail}>{moment(item.tgl_booking).format('LL')}</Text>
                                    </View>
                                    <View style={styles.tglService}>
                                        <Text style={styles.label}>Jenis Motor</Text>
                                        <Text>:</Text>
                                        <Text style={styles.detail}>{item.jenis_motor}</Text>
                                    </View>
                                    <View style={styles.tglService}>
                                        <Text style={styles.label}>Status Service</Text>
                                        <Text>:</Text>
                                        <Text style={styles.detail}>{item.status_booking}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.line}></Text>
                                    </View>
                            </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default ListScreen

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
    list:{
        justifyContent : 'flex-start'
    },
    kode:{
        fontFamily : 'TitilliumWeb-Bold',
        fontSize : 16, 
        padding : 10
        
    },
    tglService:{
        flexDirection : 'row',
        paddingLeft: 10,
        paddingBottom: 10,
        justifyContent : 'space-between'
    },
    label:{
        fontFamily: 'TitilliumWeb-Regular',
        fontSize : 14,
        width : windowWidth*0.3
    },
    detail:{
        fontFamily : 'TitilliumWeb-Regular',
        paddingRight : 15,
        width : windowWidth*0.5
        },
    line:{
        borderColor : '#DDDDDD',
        borderBottomWidth : 1
    }
})
