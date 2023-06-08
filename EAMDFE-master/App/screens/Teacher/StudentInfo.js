/* eslint-disable react/self-closing-comp */
import React from "react";
import {
    ScrollView,
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    Platform,
    TouchableOpacity
} from "react-native";
import {AntDesign} from '@expo/vector-icons';

import {Loading} from "../universal/Loading";

const screenHeight = Dimensions.get('window').height;
const navigationBarHeight = Dimensions.get('screen').height - screenHeight - StatusBar.currentHeight;


const styles = StyleSheet.create({

    container: {
        marginBottom: navigationBarHeight,
        flex: 1,
        top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    closeIcon: {
        padding: 10,
        backgroundColor: '#8DA9B6',
        borderRadius: 30,
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'white',
    },
    title: {
        borderRadius: 20,
        justifyContent: 'center',
        padding: 5,
        backgroundColor: '#8DA9B6'
    },
    listItem: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
    }
})

export default ({navigation, route}) => {

    const studentInfo = route.params.studentObject;

    const getQuizById = (id) => {
        let q;
        studentInfo.quizPerformanceDto.quizList.forEach((quiz) => {

            if (quiz.id === id) {
                q = quiz;
            }
        })
        return q;
    }

    const openQuizPerformanceSummary = (studentQuiz, quiz) => {
        navigation.navigate('QuizPerformanceSummary', {studentQuiz: studentQuiz, quiz: quiz});
    }

    const close = () => {
        navigation.pop();
    }

    return (

        <View style={styles.container}>
            <StatusBar barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}/>
            <SafeAreaView/>

            <View style={styles.header}>
                <View style={styles.title}>
                    <Text
                        style={styles.titleText}>{studentInfo.studentDto.firstName} {studentInfo.studentDto.lastName}</Text>
                </View>
                <TouchableOpacity style={styles.closeIcon} onPress={() => close()}>
                    <AntDesign
                        name="close"
                        size={25}
                        color="white"
                    />
                </TouchableOpacity>
            </View>

            <View style={{marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: '#e6dfd9'}}/>

            {studentInfo === undefined ? (
                <Loading/>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >

                    <View style={{margin: 10, flexDirection: 'column'}}>
                        <View style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5,}}>
                            <Text style={{
                                fontSize: 17,
                                padding: 10,
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>Solved quizzes:</Text>
                        </View>
                        {
                            studentInfo.quizPerformanceDto.studentQuizList.length === 0 ? (

                                <View style={[{
                                    backgroundColor: '#a8e0ca',
                                    borderRadius: 20,
                                    marginLeft: 20,
                                    marginRight: 20
                                }]}>
                                    <Text style={[{
                                        fontSize: 15,
                                        padding: 10,
                                        fontStyle: 'italic',
                                        fontWeight: '500',
                                        textAlign: 'center'
                                    }]}>-</Text>
                                </View>
                            ) : (

                                studentInfo.quizPerformanceDto.studentQuizList.map((item, index) => (

                                    <View key={item.id}>
                                        <TouchableOpacity
                                            onPress={() => openQuizPerformanceSummary(item, getQuizById(item.quizId))}
                                            style={[{
                                                backgroundColor: '#a8e0ca',
                                                borderRadius: 20,
                                                marginLeft: 20,
                                                marginRight: 20,
                                                marginBottom: 5,
                                            }]}>
                                            <Text style={[{
                                                fontSize: 15,
                                                padding: 10,
                                                fontStyle: 'italic',
                                                fontWeight: '500',
                                                textAlign: 'center'
                                            }]}>{getQuizById(item.quizId).quizName}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )))
                        }
                    </View>

                    <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                    <View style={{margin: 10, flexDirection: 'column'}}>
                        <View style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                            <Text style={{fontSize: 17, padding: 10, fontStyle: 'italic', fontWeight: 'bold',}}>Solved
                                practice exercises:</Text>
                        </View>
                        <View style={[{backgroundColor: '#a8e0ca', borderRadius: 20, marginLeft: 20, marginRight: 20}]}>
                            <Text style={[{
                                fontSize: 15,
                                padding: 10,
                                fontStyle: 'italic',
                                fontWeight: '500',
                                textAlign: 'center'
                            }]}>-</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                    <View style={{margin: 10, flexDirection: 'column'}}>
                        <View style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                            <Text style={{
                                fontSize: 17,
                                padding: 10,
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                            }}>Rank:</Text>
                        </View>
                        <View style={[{backgroundColor: '#a8e0ca', borderRadius: 20, marginLeft: 20, marginRight: 20}]}>
                            <Text style={[{
                                fontSize: 15,
                                padding: 10,
                                fontStyle: 'italic',
                                fontWeight: '500',
                                textAlign: 'center'
                            }]}>-</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                    <View style={{margin: 10, flexDirection: 'column'}}>
                        <View style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                            <Text style={{fontSize: 17, padding: 10, fontStyle: 'italic', fontWeight: 'bold',}}>Assessment
                                points:</Text>
                        </View>
                        <View style={[{backgroundColor: '#a8e0ca', borderRadius: 20, marginLeft: 20, marginRight: 20}]}>
                            <Text style={[{
                                fontSize: 15,
                                padding: 10,
                                fontStyle: 'italic',
                                fontWeight: '500',
                                textAlign: 'center'
                            }]}>{studentInfo.assessmentPoints}</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>


                    <View style={{margin: 10, flexDirection: 'column'}}>
                        <View style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                            <Text style={{fontSize: 17, padding: 10, fontStyle: 'italic', fontWeight: 'bold',}}>Effort
                                points:</Text>
                        </View>
                        <View style={[{backgroundColor: '#a8e0ca', borderRadius: 20, marginLeft: 20, marginRight: 20}]}>
                            <Text style={[{
                                fontSize: 15,
                                padding: 10,
                                fontStyle: 'italic',
                                fontWeight: '500',
                                textAlign: 'center'
                            }]}>{studentInfo.effortPoints}</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>
                </ScrollView>
            )}
        </View>
    );
}