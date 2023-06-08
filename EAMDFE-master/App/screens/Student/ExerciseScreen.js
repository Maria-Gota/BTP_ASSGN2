import React, {useContext, useEffect, useState} from "react";
import { TouchableOpacity, Platform, ScrollView, View, Text, Dimensions, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {LinSignTable} from "../../components/sign_table/LinSignTable";
import {QuadSignTable} from "../../components/sign_table/QuadSignTable";
import {MultipleChoice} from "../../components/multiple_choice/MultipleChoice";
import {Loading} from "../universal/Loading";
import {ProbabilitiesExercise} from "../../components/probabilities/Probabilities";
import {FrequencyDistributionTable} from "../../components/statistics/FrequencyDistributionTable";
import {RelativeFrequencyDistributionTable} from "../../components/statistics/RelativeFrequencyDistributionTable";
import {MeasuresOfCT} from "../../components/statistics/CentralTendencyMeasures";
import {
    CapitalComp, CompoundInterestComp, InterestRateComp, SimpleInterestComp
} from "../../components/financial/FinancialExercise";
import {
    getStudentPracticeExerciseByStudentIdAndExerciseIdOrCreate, updateStudentPracticeExercise
} from "../../api/StudentPracticeExerciseService";
import {AuthContext} from "../../context/AuthContext";
import {
    computeAbsoluteFrequencies, computeRelativeFrequencies, mode, mean, median, stringifyMapValues, stringifyArr
} from "../../util/StatisticsUtils";


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const navigationBarHeight = Dimensions.get('screen').height - screenHeight - StatusBar.currentHeight;

const styles = StyleSheet.create({

    container: {
        marginBottom: navigationBarHeight, flex: 1, top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }, header: {
        flexDirection: 'row', justifyContent: 'space-between', padding: 10,
    }, closeIcon: {
        padding: 10, backgroundColor: '#8DA9B6', borderRadius: 30,
    }, titleText: {
        fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', color: 'white',
    }, title: {
        borderRadius: 20, justifyContent: 'center', padding: 5, backgroundColor: '#8DA9B6'
    }, box: {
        justifyContent: 'space-evenly', padding: 30,
    }, button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8DA9B6',
        alignSelf: 'center',
        borderRadius: 30,
        width: 150,
        height: 50,
        margin: 30,
    }, buttonText: {
        color: 'white', fontSize: 17, fontStyle: 'italic', fontWeight: 'bold',
    },
})

export const PracticeExercise = ({exerciseType, exercise, passToParent}) => {
    return (<View style={{alignSelf: 'center', marginTop: 10,}}>
            {exerciseType === "Linear function sign table" ? (<LinSignTable
                    disabled={false}
                    exercise={exercise}
                    providedInput={false}
                    onChange={passToParent}
                />) : exerciseType === "Quadratic function sign table" ? (<QuadSignTable
                    disabled={false}
                    exercise={exercise}
                    providedInput={false}
                    onChange={passToParent}
                />) : exerciseType === "Multiple choice" ? (<MultipleChoice
                        disabled={false}
                        exercise={exercise}
                        providedInput={false}
                        onChange={passToParent}
                    />)

                : exerciseType === "Probabilities" ? (

                    <ProbabilitiesExercise
                        disabled={false}
                        exercise={exercise}
                        providedInput={false}
                        onChange={passToParent}
                    />) : exerciseType === "Statistics" ? (exercise.exerciseType === "ABSOLUTE_FREQUENCY_TABLE" ? (
                                <FrequencyDistributionTable
                                    exercise={exercise}
                                    providedInput={false}
                                    onChange={passToParent}
                                    disabled={false}
                                />)

                            : exercise.exerciseType === "RELATIVE_FREQUENCY_TABLE" ? (<RelativeFrequencyDistributionTable
                                    exercise={exercise}
                                    providedInput={false}
                                    onChange={passToParent}
                                    disabled={false}
                                />) : (<MeasuresOfCT
                                    exercise={exercise}
                                    providedInput={false}
                                    onChange={passToParent}
                                    disabled={false}
                                />)) :

                    exerciseType === "Financial" ? (exercise.exerciseType === "SIMPLE_INTEREST" ? (<SimpleInterestComp
                                exercise={exercise}
                                providedInput={false}
                                onChange={passToParent}
                                disabled={false}
                            />) : exercise.exerciseType === "COMPOUND_INTEREST" ? (<CompoundInterestComp
                                exercise={exercise}
                                providedInput={false}
                                onChange={passToParent}
                                disabled={false}
                            />) : exercise.exerciseType === "INTEREST_RATE" ? (<InterestRateComp
                                exercise={exercise}
                                providedInput={false}
                                onChange={passToParent}
                                disabled={false}
                            />) : (<CapitalComp
                                exercise={exercise}
                                providedInput={false}
                                onChange={passToParent}
                                disabled={false}
                            />)) : <Loading/>}
        </View>);
}


export const getCorrectSolution = (exerciseType, exercise) => {
    switch (exerciseType) {
        case "Linear function sign table":
            return exercise;

        case "Quadratic function sign table":
            return exercise;

        case "Multiple choice":
            const choiceArr = [];
            exercise.choices.forEach(choice => {
                if (choice === exercise.correctChoice) {
                    choiceArr.push(true);
                } else {
                    choiceArr.push(false);
                }

            })
            return choiceArr;
        case "Probabilities":
            return {
                id: exercise.id,
                question: exercise.question,
                createdBy: exercise.createdBy,
                purpose: exercise.purpose,
                favorableOutcomes: JSON.stringify(exercise.favorableOutcomes),
                possibleOutcomes: JSON.stringify(exercise.possibleOutcomes),
                probabilityNumerator: JSON.stringify(exercise.favorableOutcomes),
                probabilityDenominator: JSON.stringify(exercise.possibleOutcomes),
            }

        case "Statistics":
            if (exercise.exerciseType === "ABSOLUTE_FREQUENCY_TABLE") {
                return stringifyMapValues(computeAbsoluteFrequencies(exercise.data));
            }
            if (exercise.exerciseType === "RELATIVE_FREQUENCY_TABLE") {
                return {
                    absoluteFrequency: stringifyMapValues(computeAbsoluteFrequencies(exercise.data)),
                    relativeFrequency: stringifyMapValues(computeRelativeFrequencies(exercise.data))
                }
            }
            return {
                mean: JSON.stringify(mean(exercise.data)),
                median: JSON.stringify(median(exercise.data)),
                mode: stringifyArr(mode(computeAbsoluteFrequencies(exercise.data)))
            }


        case "Financial":
            if (exercise.exerciseType === "SIMPLE_INTEREST") {
                return {
                    id: exercise.id,
                    question: exercise.question,
                    capital: JSON.stringify(exercise.capital),
                    interestRate: JSON.stringify(exercise.interestRate),
                    timePeriod: JSON.stringify(exercise.timePeriod),
                    interest: JSON.stringify(exercise.interest),
                    interestType: exercise.interestType,
                    exerciseType: exerciseType,
                    purpose: exercise.purpose,
                    createdBy: exercise.createdBy,
                    formulaInterestRate: JSON.stringify(exercise.interestRate),
                    formulaTimePeriod: JSON.stringify(exercise.timePeriod),
                    formulaCapital: JSON.stringify(exercise.capital),
                }
            }

            if (exercise.exerciseType === "COMPOUND_INTEREST") {
                return {
                    id: exercise.id,
                    question: exercise.question,
                    capital: JSON.stringify(exercise.capital),
                    interestRate: JSON.stringify(exercise.interestRate),
                    timePeriod: JSON.stringify(exercise.timePeriod),
                    interest: JSON.stringify(exercise.interest),
                    interestType: exercise.interestType,
                    exerciseType: exerciseType,
                    purpose: exercise.purpose,
                    createdBy: exercise.createdBy,
                    formulaInterestRate: JSON.stringify(exercise.interestRate),
                    formulaTimePeriod: JSON.stringify(exercise.timePeriod),
                    formulaCapital: JSON.stringify(exercise.capital),
                }
            }

            if (exercise.exerciseType === "INTEREST_RATE") {
                return {
                    id: exercise.id,
                    question: exercise.question,
                    capital: JSON.stringify(exercise.capital),
                    interestRate: JSON.stringify(exercise.interestRate),
                    timePeriod: JSON.stringify(exercise.timePeriod),
                    interest: JSON.stringify(exercise.interest),
                    interestType: exercise.interestType,
                    exerciseType: exerciseType,
                    purpose: exercise.purpose,
                    createdBy: exercise.createdBy,
                    formulaInterest: JSON.stringify(exercise.interest),
                    formulaCapitalAndTimePeriod: JSON.stringify(exercise.capital * exercise.timePeriod),
                }
            }

            return {
                id: exercise.id,
                question: exercise.question,
                capital: JSON.stringify(exercise.capital),
                interestRate: JSON.stringify(exercise.interestRate),
                timePeriod: JSON.stringify(exercise.timePeriod),
                interest: JSON.stringify(exercise.interest),
                interestType: exercise.interestType,
                exerciseType: exerciseType,
                purpose: exercise.purpose,
                createdBy: exercise.createdBy,
                formulaInterestRate: JSON.stringify(exercise.interestRate),
                formulaTimePeriod: JSON.stringify(exercise.timePeriod),
                formulaInterest: JSON.stringify(exercise.interest),
            }

        default:
            return "Not done";
    }
}


export default ({navigation, route}) => {

    const {userAccessToken, userInfo} = useContext(AuthContext);
    const exerciseType = route.params.type;
    const exercise = route.params.exercise;
    const [studentSolution, setStudentSolution] = useState(undefined);
    const [studentPractice, setStudentPractice] = useState(undefined);
    const [correct, setCorrect] = useState(false);
    const correctSolution = getCorrectSolution(exerciseType, exercise);


    const parentFunction = (value, userInput) => {
        setCorrect(value);
        setStudentSolution(userInput);
    }

    const getStudentPracticeExercise = async () => {

        const res = await getStudentPracticeExerciseByStudentIdAndExerciseIdOrCreate(userAccessToken, userInfo.otherId, exercise.id);
        setStudentPractice(res);
    }

    useEffect(() => {
        getStudentPracticeExercise();
    }, [])

    const update = async (practice) => {

        const res = await updateStudentPracticeExercise(userAccessToken, practice);
    }

    const close = () => {
        navigation.pop();
    }

    const successfulActionButton = () => {
        navigation.navigate('StudentDrawer');
    }

    const check = () => {

        if (correct) {

            let pointsMessage = "";

            if (studentPractice.timesSolvedCorrectly === 0) {

                update({
                    id: studentPractice.id,
                    studentId: studentPractice.studentId,
                    exerciseId: studentPractice.exerciseId,
                    timesSolved: studentPractice.timesSolved + 1,
                    timesSolvedCorrectly: studentPractice.timesSolvedCorrectly + 1,
                    points: 6,
                })

                pointsMessage = `Keep it up!\n\n + ${1} effort points \n + ${5} correctness points`;

            } else {

                update({
                    id: studentPractice.id,
                    studentId: studentPractice.studentId,
                    exerciseId: studentPractice.exerciseId,
                    timesSolved: studentPractice.timesSolved + 1,
                    timesSolvedCorrectly: studentPractice.timesSolvedCorrectly + 1,
                    points: 2,
                })

                pointsMessage = `Keep it up!\n\n + ${1} effort points \n + ${1} correctness points`;

            }

            navigation.navigate('SuccessfulActionPopup', {
                message: pointsMessage, okButtonAction: successfulActionButton, okButtonTitle: 'Ok'
            });

        } else {

            update({
                id: studentPractice.id,
                studentId: studentPractice.studentId,
                exerciseId: studentPractice.exerciseId,
                timesSolved: studentPractice.timesSolved + 1,
                timesSolvedCorrectly: studentPractice.timesSolvedCorrectly,
                points: 1,
            })

            navigation.navigate('SolvedExercisePopup', {
                exercise: exercise,
                studentSolution: studentSolution,
                correctSolution: correctSolution,
                exerciseType: exerciseType
            });
        }
    }

    return (<View style={styles.container}>
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
            <View style={{width: screenWidth * 0.9, borderWidth: 1, alignSelf: 'center'}}/>
            <ScrollView
                keyboardDismissMode="onDrag"
                keyboardShouldPersistTaps="never"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.box}
            >
                <PracticeExercise exerciseType={exerciseType} exercise={exercise} passToParent={parentFunction}/>

                <TouchableOpacity style={styles.button} onPress={() => check()}>
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>);

}