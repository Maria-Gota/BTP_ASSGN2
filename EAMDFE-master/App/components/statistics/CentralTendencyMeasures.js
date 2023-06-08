import React, {useEffect, useState} from "react";
import {StyleSheet, Dimensions, View, Text, Platform,} from "react-native";
import {FormItem} from "react-native-form-component";
import {getUniques, computeAbsoluteFrequencies, mean, mode, median} from "../../util/StatisticsUtils"

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const width = screenWidth * 0.9;
const height = screenHeight * 0.6;
const requirementHeight = height * 0.3;
const rowWidth = width * 0.9;

const keyboard = Platform.OS === "android" ? "numeric" : "numbers-and-punctuation"

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        width: width,
    },
    table: {
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'lightblue',
        alignSelf: 'center',
        borderRadius: 5,
        width: rowWidth,
        margin: 10,
    },
    requirementContainer: {
        borderRadius: 10,
        backgroundColor: 'lightblue',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 5,
        maxHeight: requirementHeight
    },
    requirement: {
        margin: 5,
        fontSize: 12,
        fontWeight: '500',
        fontStyle: 'italic',
        textAlign: 'justify'
    },
    list: {
        borderRadius: 5,
        backgroundColor: 'white'
    },
    data: {
        margin: 5,
        fontSize: 13,
        fontWeight: '500',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    header: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    headerCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        width: rowWidth,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    rowCell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        borderTopWidth: 1
    },
    rowCellText: {
        fontSize: 15,
        fontWeight: '500'
    },
    rowInputCell: {
        width: rowWidth / 4,
        fontSize: 17,
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 2,
        margin: 5,
    },
    favorableOutcomesContainer: {
        flexDirection: 'column',
        margin: 5
    },
    favorableOutcomesInput: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 7,
        height: 40,
        width: 70,
        textAlign: 'center'
    },

    form: {
        alignSelf: 'center',
        width: rowWidth,
        padding: 5,
        borderRadius: 20,
        backgroundColor: 'lightblue',

    },
    possibleOutcomesContainer: {
        flexDirection: 'column',
        margin: 10,
        justifyContent: 'flex-start'
    },
    possibleOutcomesInput: {
        backgroundColor: 'white',
        padding: 1,
        borderRadius: 7,
        margin: 5,
        height: 40,
        width: 70,
        textAlign: 'center'
    },
    probabilityContainer: {
        flexDirection: 'column',
        width: 100,
        backgroundColor: 'white',
        borderRadius: 7,
    },
    label: {
        fontSize: 15,
        margin: 5,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },

});

export const MeasuresOfCT = ({disabled, exercise, providedInput, inputFromOutside, onChange}) => {

    const absoluteFrequencies = computeAbsoluteFrequencies(exercise.data);
    const meanVal = mean(exercise.data);
    const modeVals = mode(absoluteFrequencies);
    const medianVal = median(exercise.data);
    const unique = getUniques(exercise.data);

    const [input, setInput] = useState(providedInput ? inputFromOutside : {
        mean: "",
        median: "",
        mode: modeVals.length > 0 ? new Array(modeVals.length).fill("") : [],
    })

    const updateInputField = (fieldName, value) => {
        const copy = {...input};
        copy[`${fieldName}`] = value;
        setInput(copy);
    }

    const updateInputMode = (index, val) => {
        const copy = [...input.mode];
        copy[index] = val;

        const inputCopy = {...input};
        inputCopy.mode = copy;
        setInput(inputCopy);
    }

    console.log(meanVal, medianVal, modeVals)

    const checkMedian = () => {
        return parseInt(input.median) === medianVal;
    }

    const checkMean = () => {
        return parseFloat(input.mean) === meanVal;
    }

    const checkMode = () => {
        if (input.mode.length !== modeVals.length) {
            console.log("modes don't have the same length")
            return false;
        }

        let same = 0;
        modeVals.forEach(el => {
            if (input.mode.includes(JSON.stringify(el))) {
                same += 1;
            }
        })

        return same === modeVals.length;
    }

    const validateMedian = (candidateMedian) => {

        let exists = 0;

        unique.forEach(el => {
            if (parseInt(candidateMedian) === el) {
                exists += 1;
            }
        });

        if (exists === 0 && !Number.isNaN(parseInt(input.median))) {
            return {
                status: false,
                message: 'Element not in population.'
            }
        }

        return {
            status: true,
            message: ''
        }
    }

    useEffect(() => {

        if (modeVals.length > 0) {
            if (checkMean() && checkMedian() && checkMode()) {
                onChange(true, input);
            } else {
                onChange(false, input);
            }
        } else if (checkMean() && checkMedian()) {
            onChange(true, input);
        } else {
            onChange(false, input);
        }
    }, [input])

    return (
        <View style={styles.container}>
            <View style={styles.requirementContainer}>
                <Text style={styles.requirement}>{exercise.question}</Text>
            </View>

            <View style={styles.table}>
                <View style={styles.header}>
                    <View style={[styles.headerCell, {borderRightWidth: 1}]}>
                        <Text style={styles.data}>Element</Text>
                    </View>
                    <View style={styles.headerCell}>
                        <Text style={styles.data}>Absolute Frequency</Text>
                    </View>
                </View>

                {unique.map((a, i) => (
                    <View style={styles.row} key={i}>
                        <View style={[styles.rowCell, {borderRightWidth: 1}]}>
                            <Text style={styles.rowCellText}>{unique[i]}</Text>
                        </View>
                        <View style={styles.rowCell}>
                            <Text style={styles.rowCellText}>{absoluteFrequencies.get(unique[i])}</Text>
                        </View>
                    </View>
                ))
                }


            </View>

            <View style={styles.form}>
                <FormItem
                    editable={!disabled}
                    isRequired
                    label="Median"
                    value={input.median}
                    customValidation={() => validateMedian(input.median)}
                    onChangeText={(value) => updateInputField("median", value)}
                    keyboardType={keyboard}
                    style={styles.field}
                    textInputStyle={styles.rowInputCellText}
                    underneathTextStyle={styles.errorTextStyle}
                />

                <FormItem
                    editable={!disabled}
                    isRequired
                    label="Mean"
                    value={input.mean}
                    onChangeText={(value) => updateInputField("mean", value)}
                    keyboardType={keyboard}
                    style={styles.field}
                    textInputStyle={styles.rowInputCellText}
                    underneathTextStyle={styles.errorTextStyle}
                />

                {modeVals.length === 0 ? null :
                    (
                        modeVals.map((val, index) => (
                                <FormItem
                                    editable={!disabled}
                                    key={index}
                                    isRequired
                                    label={modeVals.length === 1 ? "Mode" : `Mode ${index + 1}`}
                                    value={input.mode[index]}
                                    onChangeText={(value) => updateInputMode(index, value)}
                                    keyboardType={keyboard}
                                    style={styles.field}
                                    textInputStyle={styles.rowInputCellText}
                                    underneathTextStyle={styles.errorTextStyle}
                                />
                            )
                        )
                    )
                }
            </View>

        </View>
    );

}
  