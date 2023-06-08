import React from "react";
import {StatusBar, Dimensions, StyleSheet, Text, View, TouchableOpacity, LogBox, ScrollView} from "react-native";
import {FrequencyDistributionTable} from "../../components/statistics/FrequencyDistributionTable";
import {RelativeFrequencyDistributionTable} from "../../components/statistics/RelativeFrequencyDistributionTable";
import {MeasuresOfCT} from "../../components/statistics/CentralTendencyMeasures";
import {
    CapitalComp,
    CompoundInterestComp,
    InterestRateComp,
    SimpleInterestComp
} from "../../components/financial/FinancialExercise";
import {LinSignTable} from "../../components/sign_table/LinSignTable";
import {MultipleChoice} from "../../components/multiple_choice/MultipleChoice";
import {QuadSignTable} from "../../components/sign_table/QuadSignTable";
import {ProbabilitiesExercise} from "../../components/probabilities/Probabilities";
import {Loading} from "../universal/Loading";

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const screenHeight = Dimensions.get('window').height;
const navigationBarHeight = Dimensions.get('screen').height - screenHeight - StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        // top: StatusBar.currentHeight,
        marginBottom: navigationBarHeight,
    },
    box: {
        margin: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
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
        fontSize: 20,
        margin: 20,
        marginBottom: 40,
        fontStyle: 'italic',
        fontWeight: 'bold',
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


export const SolvedExercise = ({exerciseType, exercise, solvedExercise, passToParent}) => {
    return (
        <View style={{alignSelf: 'center', marginTop: 10,}}>
            {exerciseType === "Linear function sign table" ? (
                    <LinSignTable
                        disabled={true}
                        exercise={exercise}
                        providedInput={true}
                        inputFromOutside={solvedExercise}
                        onChange={passToParent}
                    />
                )
                : exerciseType === "Quadratic function sign table" ? (
                        <QuadSignTable
                            disabled={true}
                            exercise={exercise}
                            providedInput={true}
                            inputFromOutside={solvedExercise}
                            onChange={passToParent}
                        />
                    )
                    : exerciseType === "Multiple choice" ? (
                            <MultipleChoice
                                disabled={true}
                                exercise={exercise}
                                providedInput={true}
                                inputFromOutside={solvedExercise}
                                onChange={passToParent}
                            />
                        )

                        : exerciseType === "Probabilities" ? (

                                <ProbabilitiesExercise
                                    disabled={true}
                                    exercise={exercise}
                                    providedInput={true}
                                    inputFromOutside={solvedExercise}
                                    onChange={passToParent}
                                />
                            )
                            : exerciseType === "Statistics" ? (
                                    exercise.exerciseType === "ABSOLUTE_FREQUENCY_TABLE" ? (
                                            <FrequencyDistributionTable
                                                disabled={true}
                                                exercise={exercise}
                                                providedInput={true}
                                                inputFromOutside={solvedExercise}
                                                onChange={passToParent}
                                            />
                                        )

                                        : exercise.exerciseType === "RELATIVE_FREQUENCY_TABLE" ? (
                                                <RelativeFrequencyDistributionTable
                                                    disabled={true}
                                                    exercise={exercise}
                                                    providedInput={true}
                                                    inputFromOutside={solvedExercise}
                                                    onChange={passToParent}
                                                />
                                            )
                                            : (
                                                <MeasuresOfCT
                                                    disabled={true}
                                                    exercise={exercise}
                                                    providedInput={true}
                                                    inputFromOutside={solvedExercise}
                                                    onChange={passToParent}
                                                />
                                            )
                                ) :

                                exerciseType === "Financial" ?
                                    (exercise.exerciseType === "SIMPLE_INTEREST" ? (
                                                <SimpleInterestComp
                                                    disabled={true}
                                                    exercise={exercise}
                                                    providedInput={true}
                                                    inputFromOutside={solvedExercise}
                                                    onChange={passToParent}
                                                />
                                            )
                                            : exercise.exerciseType === "COMPOUND_INTEREST" ? (
                                                    <CompoundInterestComp
                                                        disabled={true}
                                                        exercise={exercise}
                                                        providedInput={true}
                                                        inputFromOutside={solvedExercise}
                                                        onChange={passToParent}
                                                    />
                                                )
                                                : exercise.exerciseType === "INTEREST_RATE" ? (
                                                        <InterestRateComp
                                                            disabled={true}
                                                            exercise={exercise}
                                                            providedInput={true}
                                                            inputFromOutside={solvedExercise}
                                                            onChange={passToParent}
                                                        />
                                                    )
                                                    : (
                                                        <CapitalComp
                                                            disabled={true}
                                                            exercise={exercise}
                                                            providedInput={true}
                                                            inputFromOutside={solvedExercise}
                                                            onChange={passToParent}
                                                        />
                                                    )
                                    )
                                    : <Loading/>
            }
        </View>
    );
}

export default ({navigation, route}) => {

    const exerciseType = route.params.exerciseType;
    const exercise = route.params.exercise;
    const studentSolution = route.params.studentSolution;
    const correctSolution = route.params.correctSolution;


    const goBack = () => {
        navigation.navigate('StudentDrawer');
    }


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.box}>
                <Text style={styles.message}>Your solution: </Text>
                <SolvedExercise exerciseType={exerciseType} exercise={exercise} solvedExercise={studentSolution}
                                passToParent={() => {
                                }}/>
                <Text style={styles.message}>Correct solution: </Text>
                <SolvedExercise exerciseType={exerciseType} exercise={exercise} solvedExercise={correctSolution}
                                passToParent={() => {
                                }}/>
                <TouchableOpacity style={styles.okButtonAction} onPress={goBack}>
                    <Text style={styles.okButtonTitle}>Ok</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}