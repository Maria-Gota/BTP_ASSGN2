import React, {useContext, useEffect, useState} from "react";
import {
    Platform,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    FlatList,
    Dimensions,
    SafeAreaView
} from "react-native";
import {AntDesign} from '@expo/vector-icons';

import {AuthContext} from "../../context/AuthContext";
import {getMultipleChoicePracticeByCreatedByAndStudentIdGroupBySolved} from "../../api/MultipleChoiceExerciseService"
import {
    getLinearSignTablePracticeByCreatedByAndStudentIdGroupBySolved,
    getQuadraticSignTablePracticeByCreatedByAndStudentIdGroupBySolved
} from "../../api/SignTableExerciseService"
import {getProbabilitiesPracticeByCreatedByAndStudentIdGroupBySolved} from "../../api/ProbabilitiesExerciseService"
import {getStatisticsPracticeByCreatedByAndStudentIdGroupBySolved} from "../../api/StatisticsExerciseService"
import {getPracticeFinancialExerciseByCreatedByAndStudentIdGroupBySolved} from "../../api/FinancialExerciseService"
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
    exercisesContainer: {
        margin: 10,
        height: screenHeight * 0.8
    },
    purposeButton: {
        margin: 5,
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%'
    },
    purposeButtonText: {
        fontSize: 13,
        fontWeight: 'bold',
        fontStyle: 'italic',
        margin: 5
    },
})
export default ({navigation, route}) => {


    const exerciseType = route.params.exerciseType;
    const {userAccessToken, userInfo} = useContext(AuthContext);

    const [exercises, setExercises] = useState([]);
    const [solvedExercises, setSolvedExercises] = useState([]);
    const [notSolvedExercises, setNotSolvedExercises] = useState([]);

    const [showSolved, setShowSolved] = useState(false);
    const [showNotSolved, setShowNotSolved] = useState(false);
    const [showAll, setShowAll] = useState(true);

    const getLinearSignTableExercises = async () => {
        const res = await getLinearSignTablePracticeByCreatedByAndStudentIdGroupBySolved(userAccessToken, userInfo.teacherId, userInfo.otherId);
        setExercises(res['SOLVED'].concat(res['NOT SOLVED']));
        setSolvedExercises(res['SOLVED']);
        setNotSolvedExercises(res['NOT SOLVED']);
    }

    const getQuadraticSignTableExercises = async () => {
        const res = await getQuadraticSignTablePracticeByCreatedByAndStudentIdGroupBySolved(userAccessToken, userInfo.teacherId, userInfo.otherId);
        setExercises(res['SOLVED'].concat(res['NOT SOLVED']));
        setSolvedExercises(res['SOLVED']);
        setNotSolvedExercises(res['NOT SOLVED']);
    }

    const getProbabilitiesExercises = async () => {

        const res = await getProbabilitiesPracticeByCreatedByAndStudentIdGroupBySolved(userAccessToken, userInfo.teacherId, userInfo.otherId);
        setExercises(res['SOLVED'].concat(res['NOT SOLVED']));
        setSolvedExercises(res['SOLVED']);
        setNotSolvedExercises(res['NOT SOLVED']);
    }

    const getMultipleChoiceExercises = async () => {
        const res = await getMultipleChoicePracticeByCreatedByAndStudentIdGroupBySolved(userAccessToken, userInfo.teacherId, userInfo.otherId);
        setExercises(res['SOLVED'].concat(res['NOT SOLVED']));
        setSolvedExercises(res['SOLVED']);
        setNotSolvedExercises(res['NOT SOLVED']);
    }

    const getStatisticsExercises = async () => {

        const res = await getStatisticsPracticeByCreatedByAndStudentIdGroupBySolved(userAccessToken, userInfo.teacherId, userInfo.otherId);
        setExercises(res['SOLVED'].concat(res['NOT SOLVED']));
        setSolvedExercises(res['SOLVED']);
        setNotSolvedExercises(res['NOT SOLVED']);
    }

    const getFinancialExercises = async () => {

        const res = await getPracticeFinancialExerciseByCreatedByAndStudentIdGroupBySolved(userAccessToken, userInfo.teacherId, userInfo.otherId);
        setExercises(res['SOLVED'].concat(res['NOT SOLVED']));
        setSolvedExercises(res['SOLVED']);
        setNotSolvedExercises(res['NOT SOLVED']);
    }

    // what type of exercises to request from the server
    const getExercises = () => {
        switch (exerciseType) {
            case "Linear function sign table":
                getLinearSignTableExercises();
                break;

            case "Quadratic function sign table":
                getQuadraticSignTableExercises();
                break;

            case "Multiple choice":
                getMultipleChoiceExercises();
                break;

            case "Probabilities":
                getProbabilitiesExercises();
                break;

            case "Statistics":
                getStatisticsExercises();
                break;

            case "Financial":
                getFinancialExercises();
                break;

            default:
                break;
        }
    }


    useEffect(() => {
        getExercises();
    }, []);

    useEffect(() => {
        setExercises(solvedExercises.concat(notSolvedExercises));
    }, [solvedExercises, notSolvedExercises]);

    const close = () => {
        navigation.pop();
    }

    const changeForShowSolved = () => {
        if (showSolved) {
            setShowSolved(false);
        } else {
            setShowSolved(true);
            if (showNotSolved) {
                setShowNotSolved(false);
            }
        }
    }

    const changeForShowNotSolved = () => {
        if (showNotSolved) {
            setShowNotSolved(false);
        } else {
            setShowNotSolved(true);
            if (showSolved) {
                setShowSolved(false);
            }
        }
    }

    useEffect(() => {
        setShowAll(!(showSolved ^ showNotSolved))
    }, [showSolved, showNotSolved])


    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content'/>
            <SafeAreaView/>
            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{exerciseType}</Text>
                </View>
                <TouchableOpacity style={styles.closeIcon} onPress={() => close()}>
                    <AntDesign
                        name="close"
                        size={25}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.exercisesContainer}>

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        style={[styles.purposeButton, {backgroundColor: showSolved ? "#C8A2C8" : '#90bae0'}]}
                        onPress={() => changeForShowSolved()}
                    >

                        <Text style={styles.purposeButtonText}>Solved</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.purposeButton, {backgroundColor: showNotSolved ? "#C8A2C8" : '#90bae0'}]}
                        onPress={() => changeForShowNotSolved()}
                    >
                        <Text style={styles.purposeButtonText}>Not solved</Text>
                    </TouchableOpacity>

                </View>
                <FlatList
                    data={showAll ? exercises : showSolved ? solvedExercises : notSolvedExercises}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ExerciseScreen', {type: exerciseType, exercise: item})}>
                            {listItem(item, exerciseType, false, undefined)}
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}