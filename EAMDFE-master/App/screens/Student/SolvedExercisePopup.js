import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, LogBox} from "react-native";
import Lottie from 'lottie-react-native';
import {Foundation} from '@expo/vector-icons';
import {decreaseExerciseSolutionGrant, getStudentStatsByStudentId} from "../../api/StudentStatsService";
import {getStudentPracticeExerciseByStudentIdAndExerciseId} from "../../api/StudentPracticeExerciseService";
import {AuthContext} from "../../context/AuthContext";


LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        borderRadius: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column'
    },
    cross: {
        width: 110,
        height: 110
    },
    check: {
        width: 150,
        height: 150
    },
    message: {
        fontSize: 15,
        margin: 20,
        marginBottom: 40,
        fontStyle: 'italic',
        fontWeight: '500',
        overflow: 'visible',
        color: 'white',
        textAlign: 'center',
    },
    okButtonAction: {
        borderWidth: 1,
        padding: 20,
        margin: 20,
        borderRadius: 35,
        backgroundColor: '#ff0000',
    },
    okButtonTitle: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
})


export default ({navigation, route}) => {

    const {userAccessToken, userInfo} = useContext(AuthContext);
    const studentSolution = route.params.studentSolution;
    const correctSolution = route.params.correctSolution;
    const exerciseType = route.params.exerciseType;
    const [studentPractice, setStudentPractice] = useState(undefined);
    const [studentStats, setStudentStats] = useState(undefined);
    const exercise = route.params.exercise;
    const message = 'No worries, you can try again.';
    const pointsMessage = studentPractice !== undefined ? ` + 1 effort point` : '';


    const getPr = async () => {
        const res = await getStudentPracticeExerciseByStudentIdAndExerciseId(userAccessToken, userInfo.otherId, exercise.id);
        setStudentPractice(res);
    }

    const getStats = async () => {
        const res = await getStudentStatsByStudentId(userAccessToken, userInfo.otherId);
        setStudentStats(res);
    }

    const exit = () => {
        navigation.navigate('StudentDrawer');
    }

    const decreaseSolutionPeeks = async () => {
        const response = await decreaseExerciseSolutionGrant(userAccessToken, studentStats.id);
    }

    const goToSolution = () => {
        decreaseSolutionPeeks();
        navigation.navigate('ExerciseSolution', {
            exercise: exercise,
            studentSolution: studentSolution,
            correctSolution: correctSolution,
            exerciseType: exerciseType
        })
    }

    useEffect(() => {
        getPr();
        getStats();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Lottie style={styles.cross} source={require("../../assets/animations/87558-red-cross.json")} autoPlay/>
                <Text style={styles.message}>{message}</Text>
                <Text style={styles.message}>{pointsMessage}</Text>
                <TouchableOpacity style={styles.okButtonAction} onPress={exit}>
                    <Text style={styles.okButtonTitle}>Ok</Text>
                </TouchableOpacity>
                {studentStats !== undefined && studentStats.exerciseSolutionGrant > 0 ? (
                    <TouchableOpacity style={[styles.okButtonAction, {
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }]} onPress={goToSolution}>
                        <Foundation name="lightbulb" size={25} color="#ece11a"/>
                        <Text style={[styles.okButtonTitle, {color: '#ff0000'}]}>View solution</Text>
                    </TouchableOpacity>
                ) : (
                    <Text style={styles.message}>Get more solution peeks by redeeming your earned effort points!</Text>
                )
                }

            </View>
        </View>
    );
}
