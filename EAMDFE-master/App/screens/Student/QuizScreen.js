import React, {useContext, useEffect, useState} from "react";
import {
    TouchableOpacity,
    Platform,
    ScrollView,
    View,
    Text,
    Dimensions,
    StyleSheet,
    StatusBar,
    SafeAreaView
} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";

import {decreaseStudentQuizTriesLeft, updateStudentQuiz} from "../../api/StudentQuizService";
import {AuthContext} from "../../context/AuthContext";
import {mode, computeAbsoluteFrequencies, createFrequenciesMap} from "../../util/StatisticsUtils";
import {Loading} from "../universal/Loading";
import {LinSignTable} from "../../components/sign_table/LinSignTable";
import {QuadSignTable} from "../../components/sign_table/QuadSignTable";
import {MultipleChoice} from "../../components/multiple_choice/MultipleChoice";
import {ProbabilitiesExercise} from "../../components/probabilities/Probabilities";
import {MeasuresOfCT} from "../../components/statistics/CentralTendencyMeasures";
import {FrequencyDistributionTable} from "../../components/statistics/FrequencyDistributionTable";
import {RelativeFrequencyDistributionTable} from "../../components/statistics/RelativeFrequencyDistributionTable";
import {
    SimpleInterestComp,
    CompoundInterestComp,
    InterestRateComp,
    CapitalComp
} from "../../components/financial/FinancialExercise";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
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
    exerciseContainer: {
        borderWidth: 1,
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
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8DA9B6',
        alignSelf: 'center',
        borderRadius: 30,
        width: 200,
        height: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
})

export const QuizExercise = ({exerciseType, exercise, passToParent, input}) => {

    return (
        <View style={{alignSelf: 'center', marginTop: 10,}}>
            {exerciseType === "Linear function sign table" ? (
                    <LinSignTable
                        disabled={false}
                        exercise={exercise}
                        providedInput={true}
                        inputFromOutside={input}
                        onChange={passToParent}
                    />
                )
                : exerciseType === "Quadratic function sign table" ? (
                        <QuadSignTable
                            disabled={false}
                            exercise={exercise}
                            providedInput={true}
                            inputFromOutside={input}
                            onChange={passToParent}
                        />
                    )
                    : exerciseType === "Multiple choice" ? (
                            <MultipleChoice
                                disabled={false}
                                exercise={exercise}
                                providedInput={true}
                                inputFromOutside={input}
                                onChange={passToParent}
                            />
                        )

                        : exerciseType === "Probabilities" ? (

                                <ProbabilitiesExercise
                                    disabled={false}
                                    exercise={exercise}
                                    providedInput={true}
                                    inputFromOutside={input}
                                    onChange={passToParent}
                                />
                            )
                            : exerciseType === "Statistics" ? (
                                    exercise.exerciseType === "ABSOLUTE_FREQUENCY_TABLE" ? (
                                            <FrequencyDistributionTable
                                                exercise={exercise}
                                                providedInput={true}
                                                inputFromOutside={input}
                                                onChange={passToParent}
                                                disabled={false}
                                            />
                                        )

                                        : exercise.exerciseType === "RELATIVE_FREQUENCY_TABLE" ? (
                                                <RelativeFrequencyDistributionTable
                                                    exercise={exercise}
                                                    providedInput={true}
                                                    inputFromOutside={input}
                                                    onChange={passToParent}
                                                    disabled={false}
                                                />
                                            )
                                            : (
                                                <MeasuresOfCT
                                                    exercise={exercise}
                                                    providedInput={true}
                                                    inputFromOutside={input}
                                                    onChange={passToParent}
                                                    disabled={false}
                                                />
                                            )
                                ) :

                                exerciseType === "Financial" ?
                                    (exercise.exerciseType === "SIMPLE_INTEREST" ? (
                                                <SimpleInterestComp
                                                    exercise={exercise}
                                                    providedInput={true}
                                                    inputFromOutside={input}
                                                    onChange={passToParent}
                                                    disabled={false}
                                                />
                                            )
                                            : exercise.exerciseType === "COMPOUND_INTEREST" ? (
                                                    <CompoundInterestComp
                                                        exercise={exercise}
                                                        providedInput={true}
                                                        inputFromOutside={input}
                                                        onChange={passToParent}
                                                        disabled={false}
                                                    />
                                                )
                                                : exercise.exerciseType === "INTEREST_RATE" ? (
                                                        <InterestRateComp
                                                            exercise={exercise}
                                                            providedInput={true}
                                                            inputFromOutside={input}
                                                            onChange={passToParent}
                                                            disabled={false}
                                                        />
                                                    )
                                                    : (
                                                        <CapitalComp
                                                            exercise={exercise}
                                                            providedInput={true}
                                                            inputFromOutside={input}
                                                            onChange={passToParent}
                                                            disabled={false}
                                                        />
                                                    )
                                    )
                                    : <Loading/>
            }
        </View>
    );
}

export const getDefaultInputObject = (quizType, exerciseType, exercise) => {

    switch (quizType) {
        case "Linear function sign table":
            return {
                id: NaN,
                purpose: "",
                createdBy: NaN,
                a: "",
                b: "",
                domainLowerBound: "",
                domainUpperBound: "",
                firstIntervalSign: "-",
                secondIntervalSign: "-",
            }

        case "Quadratic function sign table":
            return {
                id: NaN,
                purpose: "",
                createdBy: NaN,
                a: "",
                b: "",
                c: "",
                domainLowerBound: "",
                domainUpperBound: "",
                firstIntervalSign: "-",
                secondIntervalSign: "-",
                thirdIntervalSign: "-",
                x1: "",
                x2: "",
            }

        case "Multiple choice":
            return [false, false, false, false]

        case "Probabilities":
            return {
                id: NaN,
                question: "",
                createdBy: NaN,
                purpose: "",
                favorableOutcomes: "",
                possibleOutcomes: "",
                probabilityNumerator: "",
                probabilityDenominator: "",
            }

        case "Statistics":
            if (exerciseType === "ABSOLUTE_FREQUENCY_TABLE") {
                return createFrequenciesMap(exercise.data);
            }
            if (exerciseType === "RELATIVE_FREQUENCY_TABLE") {
                return {
                    absoluteFrequency: createFrequenciesMap(exercise.data),
                    relativeFrequency: createFrequenciesMap(exercise.data)
                }
            }
            return {
                mean: "",
                median: "",
                mode: new Array(mode(computeAbsoluteFrequencies(exercise.data)).length).fill("")
            }


        case "Financial":
            if (exerciseType === "SIMPLE_INTEREST") {
                return {
                    id: NaN,
                    question: "",
                    capital: "",
                    interestRate: "",
                    timePeriod: "",
                    interest: "",
                    interestType: "",
                    exerciseType: "",
                    purpose: "",
                    createdBy: NaN,
                    formulaInterestRate: "",
                    formulaTimePeriod: "",
                    formulaCapital: "",
                }
            }

            if (exerciseType === "COMPOUND_INTEREST") {
                return {
                    id: NaN,
                    question: "",
                    capital: "",
                    interestRate: "",
                    timePeriod: "",
                    interest: "",
                    interestType: "",
                    exerciseType: "",
                    purpose: "",
                    createdBy: NaN,
                    formulaInterestRate: "",
                    formulaTimePeriod: "",
                    formulaCapital: "",
                }
            }

            if (exerciseType === "INTEREST_RATE") {
                return {
                    id: NaN,
                    question: "",
                    capital: "",
                    interestRate: "",
                    timePeriod: "",
                    interest: "",
                    interestType: "",
                    exerciseType: "",
                    purpose: "",
                    createdBy: NaN,
                    formulaInterest: "",
                    formulaCapitalAndTimePeriod: "",
                }
            }

            return {
                id: NaN,
                question: "",
                capital: "",
                interestRate: "",
                timePeriod: "",
                interest: "",
                interestType: "",
                exerciseType: "",
                purpose: "",
                createdBy: NaN,
                formulaInterestRate: "",
                formulaTimePeriod: "",
                formulaInterest: "",
            }

        default:
            return "Not done";
    }
}


export default ({navigation, route}) => {

    const {userAccessToken} = useContext(AuthContext);
    const quiz = route.params.quiz;
    const sender = route.params.sender
    const quizExercises = quiz.exercises;
    const [studentQuiz, setStudentQuiz] = useState(route.params.studentQuiz);
    const [studentInputs, setStudentInputs] = useState(new Map());
    const [studentInputsCorrectness, setStudentInputsCorrectness] = useState(new Map());

    const [current, setCurrent] = useState(0);

    useEffect(() => {

        const exerciseInputs = new Map();
        quizExercises.forEach(element => {
            exerciseInputs.set(element.id, getDefaultInputObject(quiz.quizType, element.exerciseType, element))
        });
        setStudentInputs(exerciseInputs);
    }, [])

    const updateStudentInputCorrectness = (id, value) => {
        const copy = new Map(studentInputsCorrectness);
        copy.set(id, value);
        setStudentInputsCorrectness(copy);
    }

    const updateStudentInput = (id, input) => {
        const copy = new Map(studentInputs);
        copy.set(id, input);
        setStudentInputs(copy);
    }

    const toNext = () => {

        if (current + 1 < quizExercises.length) {
            setCurrent(current + 1);
        }
    }

    const toPrev = () => {
        if (current - 1 >= 0) {
            setCurrent(current - 1);
        }
    }

    const parentFunction = (truthValue, userInput) => {
        updateStudentInput(quizExercises[current].id, userInput);
        updateStudentInputCorrectness(quizExercises[current].id, truthValue);
    }

    const decreaseTriesLeft = async () => {
        const res = await decreaseStudentQuizTriesLeft(userAccessToken, studentQuiz.id);
    }

    const okQuit = () => {
        decreaseTriesLeft();
        navigation.navigate("StudentResources");
    }

    const okStay = () => {
        navigation.pop();
    }

    const okSuccess = () => {
        navigation.navigate("StudentResources");
    }

    const close = () => {

        navigation.navigate("ConfirmationPopup", {
            message: 'Sure you want to exit?\nYour progress will not be saved.',
            okButtonTitle: 'Exit',
            okButtonAction: okQuit,
            dismissButtonTitle: 'Stay',
            dismissButtonAction: okStay
        })
    }
    const seeResults = () => {
        navigation.navigate('QuizResultsScreen', {
            studentQuiz: studentQuiz,
            quiz: quiz,

        })
    }

    const computeScore = () => {
        const pointsPerExercise = 100 / quizExercises.length;
        let score = 0;
        studentInputsCorrectness.forEach((val, key, map) => {
            if (val) {
                score += pointsPerExercise;
            }
        })
        return score;
    }

    const updateStudentQuizData = async () => {
        const copy = [];
        studentQuiz.quizExercises.forEach(quizExercise => {
            const ob = quizExercise;
            ob.correct = studentInputsCorrectness.get(quizExercise.exerciseId);
            copy.push(ob);
        });


        const studentQuizCopy = {...studentQuiz};
        studentQuizCopy.triesLeft = sender === 'default' ? (route.params.studentQuiz.triesLeft - 1) : route.params.studentQuiz.triesLeft
        studentQuizCopy.quizExercises = copy;
        studentQuizCopy.timesAccessed = route.params.studentQuiz.timesAccessed + 1;
        studentQuizCopy.solved = true;
        studentQuizCopy.score = computeScore();
        studentQuizCopy.lastAccessed = new Date();
        setStudentQuiz(studentQuizCopy);
    }

    useEffect(() => {
        updateStudentQuizData();
    }, [studentInputs])

    const submit = async () => {

        const res = await updateStudentQuiz(userAccessToken, studentQuiz);

        if (res === 200) {
            navigation.navigate('ActionStartedPopup', {
                message: 'Quiz submitted successfully.',
                okButtonAction: okSuccess,
                okButtonTitle: 'Ok',
                studentQuiz: studentQuiz,
                quiz: quiz,
                secButtonTitle: 'See results',
                secButtonAction: seeResults,
            });
        } else {
            navigation.navigate('FailedActionPopup', {
                message: 'Something went wrong.\n Please try again.',
                okButtonAction: okSuccess,
                okButtonTitle: 'Ok'
            });
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content'/>
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
            <View style={{width: screenWidth * 0.9, borderWidth: 1, alignSelf: 'center', marginBottom: 20}}/>
            <ScrollView
                keyboardDismissMode="onDrag"
                keyboardShouldPersistTaps="never"
                showsVerticalScrollIndicator={false}
            >

                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#dcddef',
                    justifyContent: 'space-between',
                    padding: 10,
                    borderRadius: 10,
                    margin: 5,
                    marginTop: 20,
                }}>
                    <TouchableOpacity style={styles.closeIcon} onPress={toPrev} disabled={current === 0}>
                        <AntDesign name="arrowleft" size={25} color={current === 0 ? "gray" : "black"}/>
                    </TouchableOpacity>

                    <View style={{
                        padding: 10,
                        width: screenWidth * 0.2,
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        borderRadius: 30,
                        backgroundColor: '#a8e0ca'
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            fontSize: 20
                        }}>{current + 1}/{quizExercises.length}</Text>
                    </View>

                    <TouchableOpacity style={styles.closeIcon} onPress={toNext}
                                      disabled={current === quizExercises.length - 1}>
                        <AntDesign name="arrowright" size={25}
                                   color={current === quizExercises.length - 1 ? "gray" : "black"}/>
                    </TouchableOpacity>
                </View>


                {studentInputs.size > 0 ? (
                        <Animated.View
                            key={current}
                            entering={FadeIn}
                            exiting={FadeOut}
                            style={{
                                alignSelf: 'center',
                                backgroundColor: '#dcddef',
                                padding: 10,
                                borderRadius: 10
                            }}
                        >
                            <QuizExercise
                                key={quizExercises[current].id}
                                exerciseType={quiz.quizType}
                                exercise={quizExercises[current]}
                                input={studentInputs.get(quizExercises[current].id)}
                                passToParent={parentFunction}
                            />

                        </Animated.View>
                    )
                    : <Loading/>}


                <View style={{width: screenWidth * 0.6, alignSelf: 'center', margin: 20}}>

                    {current === quizExercises.length - 1 ? (
                            <TouchableOpacity style={styles.button} onPress={() => submit()}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        )
                        : null
                    }
                </View>
            </ScrollView>
        </View>
    );

}