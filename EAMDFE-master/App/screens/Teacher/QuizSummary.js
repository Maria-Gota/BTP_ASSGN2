import React, {useContext, useEffect, useState} from "react"
import {
    Platform,
    ScrollView,
    StyleSheet,
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    SafeAreaView,
} from "react-native"
import {AntDesign} from '@expo/vector-icons';

import {Loading} from "../universal/Loading";
import {listItem} from "../../components/ListItem";
import {deleteQuizById, updateQuizVisibility} from "../../api/QuizService";
import {getStudentQuizByQuizIdAndNotSolved, getStudentQuizByQuizIdAndSolved} from "../../api/StudentQuizService"
import {AuthContext} from "../../context/AuthContext";

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    listItem: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'lightblue'
    },
    box: {
        justifyContent: 'space-evenly',
        borderRadius: 20,
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
})

export default ({navigation, route}) => {


    const {userAccessToken, userInfo} = useContext(AuthContext);
    const [studentsThatSolved, setStudentsThatSolved] = useState([]);
    const [studentsThatDidNotSolve, setStudentsThatDidNotSolve] = useState([]);

    const quiz = route.params.quiz;
    const exercises = quiz.exercises;
    const difficultyBackground = quiz.difficulty === 'LOW' ? '#5DF355' : quiz.difficulty === 'MEDIUM' ? '#F3E655' : '#F65757'
    const visibilityBackground = quiz.visibility ? '#0cf49b' : '#a8e0ca';


    const getStudentsThatSolved = async () => {

        const res = await getStudentQuizByQuizIdAndSolved(userAccessToken, quiz.id);
        setStudentsThatSolved(res);
    }

    const getStudentsThatDidNotSolve = async () => {

        const res = await getStudentQuizByQuizIdAndNotSolved(userAccessToken, quiz.id, userInfo.otherId);
        setStudentsThatDidNotSolve(res);
    }

    useEffect(() => {
        getStudentsThatSolved();
        getStudentsThatDidNotSolve();
    }, [])


    const close = () => {
        navigation.pop();
    }

    const changeQuizVisibility = async () => {

        const res = await updateQuizVisibility(userAccessToken, quiz.id);
        if (res === 200) {
            // Alert.alert("DONE", "Quiz visibility updated successfully", [{
            //     text: 'Ok',
            //     onPress: () => close()
            // }])
            navigation.navigate('SuccessfulActionPopup', {
                message: `Changed quiz ${quiz.quizName} visibility successfully.`,
                okButtonAction: successOkAction,
                okButtonTitle: 'Ok'
            });
        } else {
            // Alert.alert("ERROR", 'Please try again later.', [{
            //     text: 'Ok',
            //     onPress: () => close()
            // }]);
            navigation.navigate('FailedActionPopup', {
                message: `Failed to change quiz ${quiz.quizName} visibility.\n Please try again.`,
                okButtonAction: failOkAction,
                okButtonTitle: 'Ok'
            });

        }
    }

    const viewQuizPerformanceSummary = (studentQuiz) => {

        navigation.navigate('QuizPerformanceSummary', {studentQuiz: studentQuiz, quiz: quiz})

    }

    const failOkAction = () => {
        navigation.pop();
    }

    const successOkAction = () => {
        navigation.navigate('Resources');
    }

    const deleteQuiz = async () => {

        const res = await deleteQuizById(userAccessToken, quiz.id);
        if (res === 200) {
            // Alert.alert("DONE", "Quiz deleted successfully", [{
            //     text: 'Ok',
            //     onPress: () => close()
            // }])

            navigation.navigate('SuccessfulActionPopup', {
                message: `Deleted quiz ${quiz.quizName}.`,
                okButtonAction: successOkAction,
                okButtonTitle: 'Ok'
            });


        } else {
            // Alert.alert("ERROR", 'Please try again later.', [{
            //     text: 'Ok',
            //     onPress: () => close()
            // }]);
            navigation.navigate('FailedActionPopup', {
                message: `Failed to delete quiz ${quiz.quizName}.\n Please try again.`,
                okButtonAction: failOkAction,
                okButtonTitle: 'Ok'
            });

        }
    }

    const seePreview = (exercise) => {
        navigation.navigate('PreviewScreen', {exerciseType: quiz.quizType, exercise: exercise})
    }
    return (

        <View style={styles.container}>
            <StatusBar barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}/>
            <SafeAreaView/>
            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{quiz.quizName}</Text>
                </View>
                <TouchableOpacity style={styles.closeIcon} onPress={() => close()}>
                    <AntDesign
                        name="close"
                        size={25}
                        color="white"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.box}
                showsVerticalScrollIndicator={false}
            >
                <View style={{margin: 10, backgroundColor: '#90bae0', borderRadius: 20,}}>
                    <Text style={{
                        fontSize: 17,
                        padding: 10,
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>Quiz contents</Text>

                </View>
                {exercises.length > 0 ?

                    exercises.map((item, index) => (

                        <TouchableOpacity key={item.id} onPress={() => seePreview(item)}>
                            {listItem(item, quiz.quizType, false, undefined)}
                        </TouchableOpacity>
                    ))
                    :
                    <Loading/>}
                <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                <View style={{margin: 10, flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                        <Text style={{
                            fontSize: 17,
                            padding: 10,
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>Difficulty:</Text>
                    </View>
                    <View style={[{backgroundColor: difficultyBackground, borderRadius: 20, margin: 5}]}>
                        <Text style={[{
                            fontSize: 15,
                            padding: 10,
                            fontStyle: 'italic',
                            fontWeight: '500',
                            textAlign: 'center'
                        }]}>{quiz.difficulty}</Text>
                    </View>
                </View>

                <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                <View style={{flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', margin: 10, backgroundColor: '#90bae0', borderRadius: 20,}}>
                        <Text style={{
                            fontSize: 17,
                            padding: 10,
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>Solved by:</Text>
                    </View>

                    {studentsThatSolved.length === 0 ? null : (
                        studentsThatSolved.map((item, index) => (
                            <View key={item.id}>
                                <TouchableOpacity onPress={() => viewQuizPerformanceSummary(item)} style={{
                                    marginLeft: 20,
                                    margin: 5,
                                    backgroundColor: '#0cf49b',
                                    borderRadius: 25,
                                    height: 40,
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        padding: 10,
                                        fontStyle: 'italic',
                                        fontWeight: '500',
                                        textAlign: 'center'
                                    }}>{item.studentDto.firstName} {item.studentDto.lastName}</Text>
                                </TouchableOpacity>
                            </View>
                        ))

                    )}
                </View>

                <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>


                <View style={{flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', margin: 10, backgroundColor: '#90bae0', borderRadius: 20}}>
                        <Text style={{
                            fontSize: 17,
                            padding: 10,
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>Not solved by:</Text>
                    </View>

                    {studentsThatDidNotSolve.length === 0 ? null : (
                        studentsThatDidNotSolve.map((item, index) => (

                            <TouchableOpacity key={item.studentId} style={{
                                marginLeft: 20,
                                margin: 5,
                                backgroundColor: '#f99b3c',
                                borderRadius: 25,
                                height: 40,
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    padding: 10,
                                    fontStyle: 'italic',
                                    fontWeight: '500',
                                    textAlign: 'center'
                                }}>{item.firstName} {item.lastName} </Text>
                            </TouchableOpacity>
                        ))

                    )}
                </View>

                <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>


                <View style={{flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', margin: 10, backgroundColor: '#90bae0', borderRadius: 20}}>
                        <Text style={{
                            fontSize: 17,
                            padding: 10,
                            fontStyle: 'italic',
                            fontWeight: 'bold'
                        }}>Visibility:</Text>
                    </View>
                    <View style={[{
                        alignItems: 'center',
                        backgroundColor: visibilityBackground,
                        borderRadius: 20,
                        margin: 10
                    }]}>
                        <Text style={[{
                            fontSize: 15,
                            padding: 10,
                            fontStyle: 'italic',
                            fontWeight: '500',
                            textAlign: 'center'
                        }]}>{quiz.visibility ? 'Unlocked' : 'Locked'}</Text>
                    </View>
                    <TouchableOpacity/>
                </View>

                <View style={{marginTop: 10, borderBottomWidth: 2, borderColor: '#e6dfd9'}}/>


                <TouchableOpacity style={[{
                    margin: 10,
                    backgroundColor: visibilityBackground,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'
                }]} onPress={() => changeQuizVisibility()}>
                    <Text style={{fontSize: 15, padding: 10, fontStyle: 'italic', fontWeight: 'bold', color: 'white'}}>Change
                        visibility</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    margin: 10,
                    marginBottom: 50,
                    backgroundColor: '#F65757',
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'
                }} onPress={() => deleteQuiz()}>
                    <Text style={{fontSize: 15, padding: 10, fontStyle: 'italic', fontWeight: 'bold', color: 'white'}}>Delete
                        quiz</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}