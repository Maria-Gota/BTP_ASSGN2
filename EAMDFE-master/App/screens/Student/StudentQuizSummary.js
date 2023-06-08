import React, { useContext, useEffect, useState } from "react"
import { SafeAreaView, ScrollView,Platform, StyleSheet , Dimensions , View , StatusBar , Text , TouchableOpacity, Alert } from "react-native"
import { AntDesign } from '@expo/vector-icons'; 

// import { SafeAreaView } from "react-native-safe-area-context";
import { getStudentQuizByStudentIdAndQuizId, updateStudentQuiz, updateStudentQuizTriesLeft } from "../../api/StudentQuizService";
import { decreaseQuizTryGrant, getStudentStatsByStudentId } from "../../api/StudentStatsService";

import { AuthContext } from "../../context/AuthContext";
import {Loading} from "../universal/Loading";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const navigationBarHeight = Dimensions.get('screen').height - screenHeight - StatusBar.currentHeight;

const styles = StyleSheet.create({
    container:{
      marginBottom: navigationBarHeight,
      flex: 1,
      top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
      flexDirection: 'row',
      justifyContent:'space-between',
      padding: 10,
    },
    titleText:{
      fontSize: 15, 
      fontWeight: 'bold', 
      fontStyle:'italic',
      color:'white',
    },
    title: {
      borderRadius: 20,
      justifyContent:'center',
      padding: 5,
      backgroundColor:'#8DA9B6'
    },
    closeIcon: {
      padding: 10,
      backgroundColor:'#8DA9B6',
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
      borderRadius:20,
    },
})

export default ({navigation,route}) => {

    const { userAccessToken , userInfo } = useContext(AuthContext);
    const [ studentQuiz , setStudentQuiz ] = useState();
    const [ studentStats , setStudentStats ] = useState();

    const quiz = route.params.quiz;
    const numberOfQuestions = quiz.exercises.length;
    const difficultyBackground = quiz.difficulty === 'LOW' ? '#5DF355' : quiz.difficulty === 'MEDIUM' ? '#F3E655' : '#F65757'
    const triesLeftBackground = (studentQuiz === undefined) ? '#FEDB63' :  studentQuiz.triesLeft === 0 ? '#F84F4F' : '#FEDB63';
    const scoreColor = studentQuiz === undefined ? undefined : studentQuiz.solved === false ? '#F99149' :  studentQuiz.score <= 25 ? '#F84F4F' : studentQuiz.score <= 50 ? '#F99149' : studentQuiz.score <= 75 ? '#FEDB63' : '#50E078';

    const close = () => {
        navigation.pop();
    }

    const getStudentStats = async () => {
      const res = await getStudentStatsByStudentId(userAccessToken , userInfo.otherId);
      setStudentStats(res);
    }

    const getStudentQuiz = async () => {

        const res = await getStudentQuizByStudentIdAndQuizId(userAccessToken , userInfo.otherId , quiz.id);
        setStudentQuiz(res);
    }

    useEffect(() => {
        getStudentQuiz();
        getStudentStats();
    },[])

    const startQuiz = () => {

        navigation.navigate("QuizScreen",{quiz: quiz , studentQuiz: studentQuiz, sender:'default' });
    }

    const useQuizTryGrant = async () => {
      navigation.navigate("QuizScreen",{quiz: quiz , studentQuiz: studentQuiz, sender:'grant' });
    }

    return(
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView />
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

        <View style={{margin: 5, borderBottomWidth: 2, borderColor:'#e6dfd9'}} />

        <ScrollView
          contentContainerStyle={styles.box}
          showsVerticalScrollIndicator={false}
        >

          {studentQuiz === undefined || studentStats === undefined ? (
            <Loading />
          ) : (
            <View>
              <View style={{ margin: 15, flexDirection: 'column' }}>
                <View style={{ alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5 }}>
                  <Text style={{ fontSize: 15, padding: 10, fontStyle: 'italic', fontWeight: 'bold', }}>Number of exercises:</Text>
                </View>
                <View style={[{ alignItems: 'center',backgroundColor: '#a8e0ca', borderRadius: 30, margin: 5 }]}>
                  <Text style={[{ fontSize: 15, padding: 10, fontStyle: 'italic', fontWeight: 'bold' }]}>{numberOfQuestions}</Text>
                </View>
              </View>

              <View style={{margin: 5, borderBottomWidth: 1, borderColor:'#e6dfd9'}} />

              { studentQuiz.solved === true ? (
                <View style={{ margin: 15, flexDirection: 'column' }}>
                  <View style={{ alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5 }}>
                    <Text style={{ fontSize: 15, padding: 10, fontStyle: 'italic', fontWeight: 'bold', }}>Score:</Text>
                  </View>
                  <View style={[{ alignItems: 'center',backgroundColor: scoreColor, borderRadius: 30, margin: 5 }]}>
                    <Text style={[{ fontSize: 15, padding: 10, fontStyle: 'italic', fontWeight: 'bold' }]}>{studentQuiz.score}/100</Text>
                  </View>
                </View>
              ) : null }
              

              <View style={{ margin: 15, flexDirection: 'column' }}>
                <View style={{ alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5 }}>
                  <Text style={{ fontSize: 15, padding: 10, fontStyle: 'italic', fontWeight: 'bold', }}>Tries left:</Text>
                </View>
                <View style={[{ alignItems: 'center',backgroundColor: triesLeftBackground, borderRadius: 20, margin: 5 }]}>
                  <Text style={[{ fontSize: 15, padding: 10, fontStyle: 'italic', fontWeight: 'bold' }]}>{studentQuiz.triesLeft}</Text>
                </View>

                {studentQuiz.triesLeft > 0 ? null : (
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{ alignSelf: 'center', textAlign: 'center', color: 'gray', fontStyle: 'italic', fontSize: 12 }}>{`You used up all available tries for this quiz.\nYou can exchange some of your effort points for extra quiz tries.`}</Text>
                    <View style={{flexDirection:'row'}}>
                      {/* <TouchableOpacity style={[{ margin: 5, backgroundColor: '#90bae0', borderRadius: 25, width: screenWidth * 0.45, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }]} onPress={() => Alert.alert("REQUEST MORE TRIES","to be done")}>
                        <Text style={{ fontSize: 13, padding: 10, fontStyle: 'italic', fontWeight: 'bold', color: 'white' }}>Request more tries</Text>
                      </TouchableOpacity> */}

                      { studentStats.quizTryGrant > 0 ? null : ( 
                        <TouchableOpacity style={[{ margin: 5, backgroundColor: '#90bae0', borderRadius: 25, width: screenWidth * 0.45, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }]} onPress={() => navigation.navigate('StatsTab')}>
                          <Text style={{ fontSize: 13, padding: 10, fontStyle: 'italic', fontWeight: 'bold', color: 'white' }}>Exchange effort points</Text>
                        </TouchableOpacity>
)}
                    </View>
                  </View>
                )}
              </View>

              <View style={{margin: 5, borderBottomWidth: 1, borderColor:'#e6dfd9'}} />

              <View style={{ margin: 15, flexDirection: 'column' }}>
                <View style={{ alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5 }}>
                  <Text style={{ fontSize: 15, padding: 10, fontStyle: 'italic', fontWeight: 'bold', }}>Difficulty:</Text>
                </View>
                <View style={[{ alignItems: 'center',backgroundColor: difficultyBackground, borderRadius: 20, margin: 5 }]}>
                  <Text style={[{ fontSize: 15, padding: 10, fontStyle: 'italic', fontWeight: 'bold' }]}>{quiz.difficulty}</Text>
                </View>
              </View>

              <View style={{margin: 5, borderBottomWidth: 2, borderColor:'#e6dfd9'}} />

              {studentQuiz.triesLeft > 0 ? (
                <TouchableOpacity style={[{ margin: 10, backgroundColor: '#90bae0', borderRadius: 25, width: screenWidth * 0.4, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }]} onPress={() => startQuiz()}>
                  <Text style={{ fontSize: 15, padding: 10, fontStyle: 'italic', fontWeight: 'bold', color: 'white' }}>Start quiz</Text>
                </TouchableOpacity>
                ) : 
                studentStats.quizTryGrant > 0 ? (
                  <TouchableOpacity style={[{ margin: 10, backgroundColor: '#90bae0', borderRadius: 25, width: screenWidth * 0.5, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }]} onPress={() => useQuizTryGrant()}>
                    <Text style={{ fontSize: 15, padding: 10, fontStyle: 'italic', fontWeight: 'bold', color: 'white' }}>Use a quiz try grant</Text>
                  </TouchableOpacity>
                ) : null
                }
              
            </View>
          )
        }
        </ScrollView>

      </View>
    );
}