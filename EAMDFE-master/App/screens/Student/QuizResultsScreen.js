import React from "react"
import {
    SafeAreaView,
    ScrollView,
    Platform,
    StyleSheet,
    Dimensions,
    View,
    StatusBar,
    Text,
    TouchableOpacity
} from "react-native"
import {AntDesign} from '@expo/vector-icons';
import {Loading} from "../universal/Loading";
import {listItem} from "../../components/ListItem";

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
})

export default ({navigation, route}) => {

    const studentQuiz = route.params.studentQuiz;
    const quiz = route.params.quiz;
    const numberOfQuestions = quiz.exercises.length;
    const scoreColor = studentQuiz === undefined ? undefined : studentQuiz.solved === false ? '#F99149' : studentQuiz.score <= 25 ? '#F84F4F' : studentQuiz.score <= 50 ? '#F99149' : studentQuiz.score <= 75 ? '#FEDB63' : '#50E078';

    const close = () => {
        navigation.navigate('StudentResources');
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content'/>
            <SafeAreaView/>
            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{quiz.quizName} overview</Text>
                </View>
                <TouchableOpacity style={styles.closeIcon} onPress={() => close()}>
                    <AntDesign
                        name="close"
                        size={25}
                        color="white"
                    />
                </TouchableOpacity>
            </View>

            <View style={{margin: 5, borderBottomWidth: 2, borderColor: '#e6dfd9'}}/>

            <ScrollView
                contentContainerStyle={styles.box}
                showsVerticalScrollIndicator={false}
            >

                {studentQuiz === undefined ? (
                    <Loading/>
                ) : (
                    <View>
                        <View style={{margin: 15, flexDirection: 'column'}}>
                            <View
                                style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                                <Text style={{fontSize: 15, padding: 10, fontStyle: 'italic', fontWeight: 'bold',}}>Number
                                    of exercises:</Text>
                            </View>
                            <View style={[{
                                alignItems: 'center',
                                backgroundColor: '#a8e0ca',
                                borderRadius: 30,
                                margin: 5
                            }]}>
                                <Text style={[{
                                    fontSize: 15,
                                    padding: 10,
                                    fontStyle: 'italic',
                                    fontWeight: 'bold'
                                }]}>{numberOfQuestions}</Text>
                            </View>
                        </View>

                        <View style={{margin: 5, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                        {studentQuiz.solved === true ? (
                            <View style={{margin: 15, flexDirection: 'column'}}>
                                <View style={{
                                    alignItems: 'center',
                                    backgroundColor: '#90bae0',
                                    borderRadius: 20,
                                    margin: 5
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        padding: 10,
                                        fontStyle: 'italic',
                                        fontWeight: 'bold',
                                    }}>Score:</Text>
                                </View>
                                <View style={[{
                                    alignItems: 'center',
                                    backgroundColor: scoreColor,
                                    borderRadius: 30,
                                    margin: 5
                                }]}>
                                    <Text style={[{
                                        fontSize: 15,
                                        padding: 10,
                                        fontStyle: 'italic',
                                        fontWeight: 'bold'
                                    }]}>{studentQuiz.score}/100</Text>
                                </View>
                            </View>
                        ) : null}

                        <View style={{margin: 5, borderBottomWidth: 2, borderColor: '#e6dfd9'}}/>

                        {studentQuiz.solved === false ? null : (
                            <View>
                                <View style={{margin: 10, flexDirection: 'column'}}>
                                    <View style={{
                                        alignItems: 'center',
                                        backgroundColor: '#50E078',
                                        borderRadius: 20,
                                        margin: 5
                                    }}>
                                        <Text style={{
                                            fontSize: 17,
                                            padding: 10,
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                        }}>Exercises solved correctly:</Text>
                                    </View>

                                    {quiz.exercises.length > 0 ?

                                        quiz.exercises.map((item, index) => (

                                            studentQuiz.quizExercises[index].correct === true ? (
                                                    listItem(item, quiz.quizType, true, 'lightgreen'))
                                                : null
                                        ))
                                        :
                                        <Loading/>
                                    }
                                </View>

                                <View style={{
                                    marginTop: 10,
                                    marginBottom: 10,
                                    borderBottomWidth: 1,
                                    borderColor: '#e6dfd9'
                                }}/>

                                <View style={{margin: 10, flexDirection: 'column'}}>
                                    <View style={{
                                        alignItems: 'center',
                                        backgroundColor: '#F99149',
                                        borderRadius: 20,
                                        margin: 5
                                    }}>
                                        <Text style={{
                                            fontSize: 17,
                                            padding: 10,
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                        }}>Exercises solved incorrectly:</Text>
                                    </View>

                                    {quiz.exercises.length > 0 ?

                                        quiz.exercises.map((item, index) => (

                                            studentQuiz.quizExercises[index].correct === false ? (
                                                    listItem(item, quiz.quizType, true, '#f48e92'))
                                                : null
                                        ))
                                        :
                                        <Loading/>
                                    }
                                </View>
                            </View>
                        )}
                    </View>
                )
                }
            </ScrollView>
        </View>
    );
}