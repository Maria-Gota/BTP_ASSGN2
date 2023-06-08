import React, {useState, useEffect,} from "react";
import {StyleSheet, Dimensions, View, Text, TextInput} from "react-native";
import {
    createFrequenciesMap,
    computeAbsoluteFrequencies,
    computeRelativeFrequencies,
    getUniques
} from "../../util/StatisticsUtils";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const width = screenWidth * 0.9;
const height = screenHeight * 0.6;
const tableHeight = height * 0.65;
const requirementHeight = height * 0.3;
const rowWidth = width * 0.9;

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
        borderRadius: 5,
        width: rowWidth,
        maxHeight: tableHeight,
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
        margin: 4,
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
})

export const RelativeFrequencyDistributionTable = ({disabled, exercise, providedInput, inputFromOutside, onChange}) => {


    const [input, setInput] = useState(providedInput ? inputFromOutside : {
        absoluteFrequency: createFrequenciesMap(exercise.data),
        relativeFrequency: createFrequenciesMap(exercise.data)
    })

    const absoluteFrequency = computeAbsoluteFrequencies(exercise.data);
    const relativeFrequency = computeRelativeFrequencies(exercise.data, absoluteFrequency);
    const unique = getUniques(exercise.data);
    const listString = exercise.data.join("  ")

    const updateAbsoluteFrequencies = (key, value) => {

        const copy = new Map(input.absoluteFrequency);
        copy.set(key, value);
        const inputCopy = {...input};

        inputCopy.absoluteFrequency = copy;
        setInput(inputCopy);
    }

    const updateRelativeFrequencies = (key, value) => {

        const copy = new Map(input.relativeFrequency);
        copy.set(key, value);

        const inputCopy = {...input};
        inputCopy.relativeFrequency = copy;
        setInput(inputCopy);
    }

    const checkAbsoluteFrequencies = () => {

        let noMatch = 0;
        unique.forEach(el => {
            if (absoluteFrequency.get(el) !== parseInt(input.absoluteFrequency.get(el))) {
                noMatch += 1;
            }
        })
        return noMatch === 0;
    }

    const checkRelativeFrequencies = () => {

        let noMatch = 0;
        unique.forEach(el => {
            if (relativeFrequency.get(el) !== parseFloat(input.relativeFrequency.get(el))) {
                noMatch += 1;
            }
        })
        return noMatch === 0;
    }

    useEffect(() => {
        if (checkAbsoluteFrequencies() && checkRelativeFrequencies()) {
            onChange(true, input);
        } else {
            onChange(false, input);
        }
    }, [input])

    return (
        <View style={styles.container}>
            <View style={styles.requirementContainer}>
                <Text style={styles.requirement}>{exercise.question}</Text>
                <View style={styles.list}>
                    <Text style={styles.data}>{listString}</Text>
                </View>
            </View>

            <View style={styles.table}>

                <View style={styles.header}>
                    <View style={[styles.headerCell, {borderRightWidth: 1}]}>
                        <Text style={styles.data}>Element</Text>
                    </View>
                    <View style={[styles.headerCell, {borderRightWidth: 1}]}>
                        <Text style={styles.data}>Absolute Frequency</Text>
                    </View>
                    <View style={styles.headerCell}>
                        <Text style={styles.data}>Relative Frequency (%)</Text>
                    </View>
                </View>


                {unique.map((a, i) => (
                    <View key={i} style={styles.row}>
                        <View style={[styles.rowCell, {borderRightWidth: 1,}]}>
                            <Text style={styles.rowCellText}>{unique[i]}</Text>
                        </View>
                        <View style={[styles.rowCell, {borderRightWidth: 1,}]}>
                            <TextInput
                                editable={!disabled}
                                value={input.absoluteFrequency.get(unique[i])}
                                onChangeText={(value) => updateAbsoluteFrequencies(unique[i], value)}
                                keyboardType="numeric"
                                style={styles.rowInputCell}
                            />
                        </View>
                        <View style={styles.rowCell}>
                            <TextInput
                                editable={!disabled}
                                value={input.relativeFrequency.get(unique[i])}
                                onChangeText={(value) => {
                                    updateRelativeFrequencies(unique[i], value);
                                    console.log(parseFloat(value))
                                }}
                                keyboardType="numeric"
                                style={styles.rowInputCell}
                            />
                        </View>
                    </View>

                ))
                }
            </View>
        </View>
    );

}