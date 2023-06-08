import React, {useContext, useEffect, useState} from "react";
import {StatusBar, StyleSheet, View, Text, FlatList, Dimensions, TouchableOpacity, Platform} from "react-native";
import {AuthContext} from "../../context/AuthContext";
import {Loading} from "../universal/Loading";
import {getStudentStatsByTeacherId} from "../../api/StudentStatsService";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        padding: 10,
    }
})

export const StudentItem = ({studentObject, viewStudent}) => {

    const [student, setStudent] = useState(studentObject);

    return (
        <TouchableOpacity
            style={{
                margin: 5,
                padding: 5,
                width: screenWidth * 0.9,
                backgroundColor: 'lightblue',
                height: 50,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'flex-start'
            }}
            onPress={() => viewStudent(student)}
        >
            <Text
                style={{fontSize: 17, fontWeight: '500'}}
            >
                {student.studentDto.firstName} {student.studentDto.lastName}
            </Text>

        </TouchableOpacity>
    );
}

export default ({navigation}) => {

    const {userAccessToken, userInfo} = useContext(AuthContext);
    const [students, setStudents] = useState([]);

    const get = async () => {
        const res = await getStudentStatsByTeacherId(userAccessToken, userInfo.otherId);
        setStudents(res);
    }

    const viewStudent = (studentObject) => {
        navigation.navigate('StudentInfo', {studentObject})
    }

    useEffect(() => {
        get();
    }, []);


    return (
        <View style={styles.container}>
            <StatusBar barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}/>

            <View style={{
                backgroundColor: 'lightpink',
                borderRadius: 20,
                margin: 5,
                width: screenWidth * 0.95,
                height: 70,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',

            }}
            >
                <Text style={{fontSize: 17, fontWeight: 'bold', fontStyle: 'italic'}}>See what your students have been
                    up to!</Text>
            </View>


            {students.length > 0 ? (
                    <FlatList
                        data={students}
                        renderItem={({item}) => <StudentItem studentObject={item} viewStudent={viewStudent} key={item.id}/>}
                        keyExtractor={item => item.id}
                    />
                )
                : <Loading/>
            }
        </View>
    );
}