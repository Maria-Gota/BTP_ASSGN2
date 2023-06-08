import React, {useEffect, useState} from "react";
import {
    TouchableOpacity,
    Platform,
    StatusBar,
    ScrollView,
    Dimensions,
    StyleSheet,
    Modal,
    Text,
    View,
    SafeAreaView
} from "react-native";
import {AntDesign} from '@expo/vector-icons';

import {listItem} from "../../components/ListItem";
import {Loading} from "../universal/Loading";

const screenWidth = Dimensions.get('window').width;
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
    box: {
        justifyContent: 'space-evenly',
        borderRadius: 20,
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
    message: {
        fontSize: 14,
        margin: 15,
    }
})

export const PerformanceSummary = ({isVisible, makeInvisible, studentQuiz, quiz}) => {

    const [visible, setVisible] = useState(false);
    const lastAccessedDate = new Date(studentQuiz.lastAccessed).toDateString();
    const lastAccessedTime = new Date(studentQuiz.lastAccessed).toTimeString().slice(0, 5);

    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible])

    const close = () => {
        makeInvisible();
    }
    return (
        <Modal
            animationType="fade"
            visible={visible}
            transparent
        >
            <View style={styles.container}>
                <View style={[styles.box]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenWidth * 0.90}}>
                        <View style={{borderRadius: 20, backgroundColor: '#90bae0', margin: 15, alignItems: 'center'}}>
                            <Text
                                style={styles.title}>{studentQuiz.studentDto.firstName} {studentQuiz.studentDto.lastName} </Text>
                        </View>
                        <AntDesign
                            name="close"
                            size={30}
                            color="black"
                            style={styles.closeIcon}
                            onPress={() => close()}
                        />
                    </View>

                    <View style={{marginTop: 5, borderBottomWidth: 2, borderColor: '#e6dfd9'}}/>

                    <ScrollView>

                        <View style={{margin: 10, flexDirection: 'column'}}>
                            <View style={{
                                alignItems: 'center',
                                backgroundColor: '#90bae0',
                                borderRadius: 20,
                                margin: 5,
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    padding: 10,
                                    fontStyle: 'italic',
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>Score:</Text>
                            </View>
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
                                }]}>{studentQuiz.score} / 100</Text>
                            </View>
                        </View>

                        <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                        <View style={{margin: 10, flexDirection: 'column'}}>
                            <View
                                style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                                <Text style={{fontSize: 17, padding: 10, fontStyle: 'italic', fontWeight: 'bold',}}>Times
                                    accessed:</Text>
                            </View>
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
                                }]}>{studentQuiz.timesAccessed}</Text>
                            </View>
                        </View>

                        <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                        <View style={{margin: 10, flexDirection: 'column'}}>
                            <View
                                style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                                <Text style={{fontSize: 17, padding: 10, fontStyle: 'italic', fontWeight: 'bold',}}>Last
                                    accessed:</Text>
                            </View>
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
                                }]}>{lastAccessedDate} , {lastAccessedTime}</Text>
                            </View>
                        </View>

                        <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                        <View style={{margin: 10, flexDirection: 'column'}}>
                            <View
                                style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                                <Text style={{fontSize: 17, padding: 10, fontStyle: 'italic', fontWeight: 'bold',}}>Exercises
                                    solved correctly:</Text>
                            </View>

                            {quiz.exercises.length > 0 ?

                                quiz.exercises.map((item, index) => (

                                    studentQuiz.quizExercises[index].correct === true ? (
                                            listItem(item, quiz.quizType, false, undefined))
                                        : null
                                ))
                                :
                                <Loading/>
                            }
                        </View>

                        <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                        <View style={{margin: 10, flexDirection: 'column'}}>
                            <View
                                style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                                <Text style={{fontSize: 17, padding: 10, fontStyle: 'italic', fontWeight: 'bold',}}>Exercises
                                    solved incorrectly:</Text>
                            </View>

                            {quiz.exercises.length > 0 ?

                                quiz.exercises.map((item, index) => (

                                    studentQuiz.quizExercises[index].correct === false ? (
                                            listItem(item, quiz.quizType, false, undefined))
                                        : null
                                ))
                                :
                                <Loading/>
                            }
                        </View>

                        <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );

}

export default ({navigation, route}) => {

    const studentQuiz = route.params.studentQuiz;
    const quiz = route.params.quiz;
    const lastAccessed = (studentQuiz.lastAccessed).replace("T", ",\n");

    const scoreColor = studentQuiz.score <= 25 ? '#F84F4F' : studentQuiz.score <= 50 ? '#F99149' : studentQuiz.score <= 75 ? '#FEDB63' : '#50E078';
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
                        style={styles.titleText}>{studentQuiz.studentDto.firstName} {studentQuiz.studentDto.lastName} </Text>
                </View>
                <TouchableOpacity style={styles.closeIcon} onPress={() => close()}>
                    <AntDesign
                        name="close"
                        size={25}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 5, borderBottomWidth: 2, borderColor: '#e6dfd9'}}/>

            <ScrollView
                contentContainerStyle={styles.box}
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
                        }}>Score:</Text>
                    </View>
                    <View style={[{backgroundColor: scoreColor, borderRadius: 20, marginLeft: 20, marginRight: 20}]}>
                        <Text style={[{
                            fontSize: 15,
                            padding: 10,
                            fontStyle: 'italic',
                            fontWeight: '500',
                            textAlign: 'center'
                        }]}>{studentQuiz.score} / 100</Text>
                    </View>
                </View>

                <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                <View style={{margin: 10, flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                        <Text style={{fontSize: 17, padding: 10, fontStyle: 'italic', fontWeight: 'bold',}}>Times
                            accessed:</Text>
                    </View>
                    <View style={[{backgroundColor: '#a8e0ca', borderRadius: 20, marginLeft: 20, marginRight: 20}]}>
                        <Text style={[{
                            fontSize: 15,
                            padding: 10,
                            fontStyle: 'italic',
                            fontWeight: '500',
                            textAlign: 'center'
                        }]}>{studentQuiz.timesAccessed}</Text>
                    </View>
                </View>

                <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                <View style={{margin: 10, flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                        <Text style={{fontSize: 17, padding: 10, fontStyle: 'italic', fontWeight: 'bold',}}>Last
                            accessed:</Text>
                    </View>
                    <View style={[{backgroundColor: '#a8e0ca', borderRadius: 20, marginLeft: 20, marginRight: 20}]}>
                        <Text style={[{
                            fontSize: 15,
                            padding: 10,
                            fontStyle: 'italic',
                            fontWeight: '500',
                            textAlign: 'center'
                        }]}>{lastAccessed}</Text>
                    </View>
                </View>

                <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                <View style={{margin: 10, flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', backgroundColor: '#50E078', borderRadius: 20, margin: 5}}>
                        <Text style={{fontSize: 17, padding: 10, fontStyle: 'italic', fontWeight: 'bold',}}>Exercises
                            solved correctly:</Text>
                    </View>

                    {quiz.exercises.length > 0 ?

                        quiz.exercises.map((item, index) => (

                            studentQuiz.quizExercises[index].correct === true ? (
                                    listItem(item, quiz.quizType, false, undefined))
                                : null
                        ))
                        :
                        <Loading/>
                    }
                </View>

                <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                <View style={{margin: 10, flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', backgroundColor: '#F99149', borderRadius: 20, margin: 5}}>
                        <Text style={{fontSize: 17, padding: 10, fontStyle: 'italic', fontWeight: 'bold',}}>Exercises
                            solved incorrectly:</Text>
                    </View>

                    {quiz.exercises.length > 0 ?

                        quiz.exercises.map((item, index) => (

                            studentQuiz.quizExercises[index].correct === false ? (
                                    listItem(item, quiz.quizType, false, undefined))
                                : null
                        ))
                        :
                        <Loading/>
                    }
                </View>

                <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>
            </ScrollView>
            {/* </View> */}
        </View>
    );

}