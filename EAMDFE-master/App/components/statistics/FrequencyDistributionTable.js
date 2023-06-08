import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, Dimensions, TextInput} from "react-native";
import {createFrequenciesMap, getUniques, computeAbsoluteFrequencies,} from "../../util/StatisticsUtils"

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

export const FrequencyDistributionTable = ({disabled, exercise, providedInput, inputFromOutside, onChange}) => {


    const [absoluteFrequencyInput, setAbsoluteFrequencyInput] = useState(providedInput ? inputFromOutside : createFrequenciesMap(exercise.data));
    const absoluteFrequency = computeAbsoluteFrequencies(exercise.data);
    const unique = getUniques(exercise.data);
    const listString = exercise.data.join("  ");

    const updateAbsoluteFrequencies = (key, value) => {

        const copy = new Map(absoluteFrequencyInput);
        copy.set(key, value);
        setAbsoluteFrequencyInput(copy);
    }

    const checkAbsoluteFrequencies = () => {

        let noMatch = 0;
        unique.forEach(el => {
            if (absoluteFrequency.get(el) !== parseInt(absoluteFrequencyInput.get(el))) {
                noMatch += 1;
            }
        })

        return noMatch === 0;
    }

    useEffect(() => {
        if (checkAbsoluteFrequencies()) {
            onChange(true, absoluteFrequencyInput);
        } else {
            onChange(false, absoluteFrequencyInput);
        }
    }, [absoluteFrequencyInput])

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
                    <View style={[styles.headerCell, {borderRightWidth: 1,}]}>
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
                            <TextInput
                                editable={!disabled}
                                value={absoluteFrequencyInput.get(unique[i])}
                                onChangeText={(input) => updateAbsoluteFrequencies(unique[i], input)}
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

