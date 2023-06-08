import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {MathJaxSvg} from "react-native-mathjax-html-to-svg";

const styles = StyleSheet.create({
    listItem: {
        margin: 10,
        padding: 5,
        borderRadius: 30,
        flexDirection: 'column',
    },
})

export const LinearSignTableListItem = ({
                                            exercise,
                                            shouldChangeColorOnClick,
                                            colorToChangeToOnClick,
                                        }) => {


    const lowerBound = exercise.domainLowerBound.trim().length === 0 ? " - \\infty " : exercise.domainLowerBound;
    const upperBound = exercise.domainUpperBound.trim().length === 0 ? " \\infty " : exercise.domainUpperBound;
    const coeffA = exercise.a;
    const coeffB = parseInt(exercise.b) < 0 ? `${exercise.b}` : `+${exercise.b}`;

    return (
        <View
            style={[styles.listItem, {backgroundColor: shouldChangeColorOnClick ? colorToChangeToOnClick : 'lightblue'}]}>
            <Text style={{margin: 10, fontSize: 13, fontWeight: 'bold', fontStyle: 'italic'}}>Complete the sign
                table for the following function:</Text>
            <View style={{alignSelf: 'center'}}>
                <MathJaxSvg
                    fontSize={17}
                    fontCache
                >
                    {`$$ f(x) = ${coeffA}x ${coeffB} ,  [ ${lowerBound} , ${upperBound}] $$`}

                </MathJaxSvg>
            </View>
        </View>
    )
}

export const QuadraticSignTableListItem = ({
                                               exercise,
                                               shouldChangeColorOnClick,
                                               colorToChangeToOnClick,
                                           }) => {

    const lowerBound = exercise.domainLowerBound.trim().length === 0 ? " - \\infty " : exercise.domainLowerBound;
    const upperBound = exercise.domainUpperBound.trim().length === 0 ? " \\infty " : exercise.domainUpperBound;
    const coeffA = exercise.a;
    const coeffB = parseInt(exercise.b) > 0 ? `+${exercise.b}` : exercise.b;
    const coeffC = parseInt(exercise.c) > 0 ? `+${exercise.c}` : exercise.c;

    return (
        <View
            style={[styles.listItem, {backgroundColor: shouldChangeColorOnClick ? colorToChangeToOnClick : 'lightblue'}]}>

            <Text style={{margin: 10, fontSize: 13, fontWeight: 'bold', fontStyle: 'italic'}}>Complete the sign
                table for the following function:</Text>
            <View style={{alignSelf: 'center'}}>
                <MathJaxSvg
                    fontSize={17}
                    fontCache
                >
                    {`$$ f(x) = ${coeffA}x^2 ${coeffB}x ${coeffC} ,  [ ${lowerBound} , ${upperBound}] $$`}

                </MathJaxSvg>
            </View>
        </View>
    )
}

export const MultipleChoiceListItem = ({
                                           exercise,
                                           shouldChangeColorOnClick,
                                           colorToChangeToOnClick,
                                       }) => {

    return (
        <View
            style={[styles.listItem, {backgroundColor: shouldChangeColorOnClick ? colorToChangeToOnClick : 'lightblue'}]}>
            <Text style={{
                margin: 10,
                fontSize: 17,
                fontWeight: '500',
                fontStyle: 'italic'
            }}>{exercise.question}</Text>
        </View>
    )
}

export const ProbabilitiesListItem = ({
                                          exercise,
                                          shouldChangeColorOnClick,
                                          colorToChangeToOnClick,
                                      }) => {

    return (
        <View
            style={[styles.listItem, {backgroundColor: shouldChangeColorOnClick ? colorToChangeToOnClick : 'lightblue'}]}>
            <Text style={{
                margin: 10,
                fontSize: 13,
                fontWeight: 'bold',
                fontStyle: 'italic'
            }}>{exercise.question}</Text>
        </View>
    )
}

export const StatisticsExerciseListItem = ({
                                               exercise,
                                               shouldChangeColorOnClick,
                                               colorToChangeToOnClick,
                                           }) => {

    const req = exercise.exerciseType === "ABSOLUTE_FREQUENCY_TABLE" ? `Complete the absolute frequency table for the data: ${exercise.data}`
        : exercise.exerciseType === "RELATIVE_FREQUENCY_TABLE" ? `Complete the relative frequency table for the data: ${exercise.data}` : `Compute the measures of central tendency for the data: ${exercise.data}`;

    return (
        <View
            style={[styles.listItem, {backgroundColor: shouldChangeColorOnClick ? colorToChangeToOnClick : 'lightblue'}]}>
            <Text style={{margin: 10, fontSize: 13, fontWeight: 'bold', fontStyle: 'italic'}}>{req}</Text>
        </View>
    )
}

export const FinancialExerciseListItem = ({
                                              exercise,
                                              shouldChangeColorOnClick,
                                              colorToChangeToOnClick,
                                          }) => {

    const req = exercise.question;

    return (
        <View
            style={[styles.listItem, {backgroundColor: shouldChangeColorOnClick ? colorToChangeToOnClick : 'lightblue'}]}>
            <Text style={{margin: 10, fontSize: 13, fontWeight: 'bold', fontStyle: 'italic'}}>{req}</Text>
        </View>
    )
}


export const listItem = (exercise, type, shouldChangeColorOnClick, colorToChangeToOnClick) => {

    switch (type) {
        case "Linear function sign table":
            return <LinearSignTableListItem key={exercise.id} exercise={exercise}
                                            shouldChangeColorOnClick={shouldChangeColorOnClick}
                                            colorToChangeToOnClick={colorToChangeToOnClick}/>;

        case "Quadratic function sign table":
            return <QuadraticSignTableListItem key={exercise.id} exercise={exercise}
                                               shouldChangeColorOnClick={shouldChangeColorOnClick}
                                               colorToChangeToOnClick={colorToChangeToOnClick}/>;

        case "Multiple choice":
            return <MultipleChoiceListItem key={exercise.id} exercise={exercise}
                                           shouldChangeColorOnClick={shouldChangeColorOnClick}
                                           colorToChangeToOnClick={colorToChangeToOnClick}/>;

        case "Probabilities":
            return <ProbabilitiesListItem key={exercise.id} exercise={exercise}
                                          shouldChangeColorOnClick={shouldChangeColorOnClick}
                                          colorToChangeToOnClick={colorToChangeToOnClick}/>;

        case "Statistics":
            return <StatisticsExerciseListItem key={exercise.id} exercise={exercise}
                                               shouldChangeColorOnClick={shouldChangeColorOnClick}
                                               colorToChangeToOnClick={colorToChangeToOnClick}/>;

        case "Financial":
            return <FinancialExerciseListItem key={exercise.id} exercise={exercise}
                                              shouldChangeColorOnClick={shouldChangeColorOnClick}
                                              colorToChangeToOnClick={colorToChangeToOnClick}/>

        default:
            return null;
    }
}