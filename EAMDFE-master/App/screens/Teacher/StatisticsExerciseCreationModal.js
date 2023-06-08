import React, {useContext, useEffect, useState} from "react";
import {
    TouchableOpacity,
    StatusBar,
    View,
    SafeAreaView,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions, Platform,
} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {Form, FormItem, Picker} from "react-native-form-component";
import {AuthContext} from "../../context/AuthContext";

import {Loading} from "../universal/Loading"
import {max} from "../../util/StatisticsUtils";
import {createStatisticsExercise} from "../../api/StatisticsExerciseService";

const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;
// const navigationBarHeight = Dimensions.get('screen').height - screenHeight - StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6E99AD',
        // marginBottom: navigationBarHeight,
        flex: 1,
        // top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    box: {
        justifyContent: 'space-evenly',
        borderRadius: 20,
    },
    form: {
        padding: 5,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#6E99AD'
    },
    formField: {
        borderRadius: 20,
    },

    formLabel: {
        marginBottom: 5,
        marginLeft: 10,
        fontWeight: '500',
        fontStyle: 'italic',
        color: 'white',
    },
    closeIcon: {
        padding: 10,
        backgroundColor: '#8DA9B6',
        borderRadius: 30,
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
    pickerIconStyle: {
        borderRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    note: {
        fontSize: 15,
        fontStyle: 'italic',
        alignSelf: 'center',
        fontWeight: '500',
        margin: 5,
        color: 'white',
    },
    table: {
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'column',
        margin: 10,
    },
    data: {
        margin: 5,
        fontSize: 13,
        fontWeight: '500',
        fontStyle: 'italic',
        textAlign: 'center',
        color: 'white',
    },
    tableHeader: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: screenWidth * 0.7,

    },
    headerCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#8DA9B6',
        color: 'white',
        margin: 5,
    },
    row: {
        width: screenWidth * 0.7,
        flexDirection: 'row',
        backgroundColor: '#8DA9B6',
        borderRadius: 20,
        margin: 5,
    },
    rowCell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        height: 70,
    },
    rowInputCell: {
        width: (screenWidth * 0.7) / 4,
        height: 40,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 20,
    },
    rowInputCellText: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },
    errorTextStyle: {
        fontSize: 9,
    }
})


export default ({navigation}) => {

    const {userAccessToken, userInfo} = useContext(AuthContext);
    const [requirement, setRequirement] = useState("");
    const [purpose, setPurpose] = useState("PRACTICE");
    const [numberOfUniqueElements, setNumberOfUniqueElements] = useState(0);
    const [numberOfModes, setNumberOfModes] = useState(0);
    const [data, setData] = useState([]);
    const [dataFrequency, setDataFrequency] = useState([]);
    const [exerciseType, setExerciseType] = useState("");
    const createDataAndFrequencyArr = (el) => {

        setData(new Array(el).fill(NaN));
        setDataFrequency(new Array(el).fill(NaN));
    }

    const modes = () => {
        let maxVal = 0;

        dataFrequency.forEach(el => {
            if (el > maxVal) {
                maxVal = el;
            }
        });

        let modesNumber = 0;

        dataFrequency.forEach(el => {
            if (el === maxVal) {
                modesNumber += 1;
            }
        });

        setNumberOfModes(modesNumber);
    }

    const addData = (index, val) => {
        const copy = [...data];
        copy[index] = val;
        setData(copy);
    }

    const addFrequency = (index, fr) => {
        const copy = [...dataFrequency];
        copy[index] = fr;
        setDataFrequency(copy);
    }

    const validateNumberOfUniqueElements = () => {

        if (numberOfUniqueElements < 0 || numberOfUniqueElements > 20) {
            return {
                status: false,
                message: 'At most 20 elements'
            }
        }

        return {
            status: true,
            message: ''
        }
    }

    const validateElement = (index) => {

        const element = data[index];
        let duplicates = 0;

        data.forEach(el => {
            if (el === element) {
                duplicates += 1;
            }
        });

        if (duplicates === 1) {
            return {
                status: true,
                message: ''
            }
        }
        return {
            status: false,
            message: 'Element already declared.'
        }

    }

    const validateFrequency = (index) => {

        const fr = dataFrequency[index];
        const maxFrequency = max(dataFrequency);
        let sum = 0;

        if (fr === 0) {
            return {
                status: false,
                message: 'Can\'t be 0.'
            }
        }


        dataFrequency.forEach(el => {
            sum += el;
        })

        if (sum > 20) {
            return {
                status: false,
                message: `At most 20 elements allowed.`
            }
        }

        if (numberOfModes > 3 && numberOfModes < numberOfUniqueElements && fr === maxFrequency) {
            return {
                status: false,
                message: `At most 3 modes allowed.`
            }
        }


        return {
            status: true,
            message: ''
        }
    }

    const validateInput = () => {

        const len = numberOfUniqueElements;
        let validData = true;
        let validFrequencies = true;

        for (let i = 0; i < len; i += 1) {
            if (!validateElement(i).status) {
                validData = false;
            }
        }

        for (let i = 0; i < len; i += 1) {
            if (!validateFrequency(i).status) {
                validFrequencies = false;
            }
        }

        return !(exerciseType.length === 0 ||
            requirement.length === 0 ||
            validData === false ||
            validFrequencies === false ||
            validateNumberOfUniqueElements().status === false);
    }


    const close = () => {
        navigation.pop();
        navigation.navigate('Resources');
    }

    const buildRequestBody = () => {

        const requestData = [];


        for (let i = 0; i < dataFrequency.length; i += 1) {

            let ctr = dataFrequency[i];
            while (ctr > 0) {
                requestData.push(data[i]);
                ctr -= 1;
            }
        }

        const requestBody = {
            question: requirement,
            data: requestData,
            exerciseType: exerciseType,
            createdBy: userInfo.otherId,
            purpose: purpose,
        }

        return requestBody;
    }
    const seePreview = () => {
        navigation.navigate('PreviewScreen', {exerciseType: 'Statistics', exercise: buildRequestBody()})
    }
    const failOkAction = () => {
        navigation.pop();
    }

    const successOkAction = () => {
        navigation.navigate('Resources');
    }


    const submit = async () => {

        if (validateInput()) {
            const res = await createStatisticsExercise(userAccessToken, buildRequestBody());
            if (res === 200) {
                navigation.navigate('SuccessfulActionPopup', {
                    message: 'Exercise created successfully.',
                    okButtonAction: successOkAction,
                    okButtonTitle: 'Ok'
                });
            } else {
                navigation.navigate('FailedActionPopup', {
                    message: 'Failed to create the exercise.\n Please try again.',
                    okButtonAction: failOkAction,
                    okButtonTitle: 'Ok'
                });
            }
        } else {
            navigation.navigate('FailedActionPopup', {
                message: 'Some of the fields are invalid. Check again and resubmit.',
                okButtonAction: failOkAction,
                okButtonTitle: 'Ok'
            });
        }
    }

    useEffect(() => {
        createDataAndFrequencyArr(numberOfUniqueElements);
    }, [numberOfUniqueElements])

    useEffect(() => {
        modes();

    }, [dataFrequency]);


    // useEffect(() => {
    //     if (validateInput()) {
    //         setAllowPreview(true);
    //     } else {
    //         setAllowPreview(false);
    //     }
    // }, [numberOfUniqueElements, requirement, data, dataFrequency, exerciseType])

    return (

        <View style={styles.container}>
            <StatusBar barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}/>
            <SafeAreaView/>

            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Statistics</Text>
                </View>
                <TouchableOpacity style={styles.closeIcon} onPress={() => close()}>
                    <AntDesign
                        name="close"
                        size={25}
                        color="white"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.box}
                keyboardDismissMode="onDrag"
                keyboardShouldPersistTaps="never"
                showsVerticalScrollIndicator={false}
            >
                <Form
                    buttonText="Submit"
                    onButtonPress={() => submit()}
                    buttonStyle={styles.button}
                    buttonTextStyle={styles.buttonText}
                    style={styles.form}
                >


                    <FormItem
                        label="Requirement"
                        multiline
                        textArea
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        numberOfLines={2}
                        maxLength={165}
                        isRequired
                        value={requirement}
                        onChangeText={(input) => setRequirement(input)}
                    />

                    <FormItem
                        label="Number of unique elements:"
                        isRequired
                        keyboardType="numeric"
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        underneathTextStyle={styles.errorTextStyle}
                        maxLength={2}
                        customValidation={() => validateNumberOfUniqueElements()}
                        value={numberOfUniqueElements}
                        onChangeText={(input) => {
                            if (input.length === 0) {
                                setNumberOfUniqueElements(0);
                            } else {
                                setNumberOfUniqueElements(parseInt(input))
                            }
                        }}
                    />

                    {
                        numberOfUniqueElements === 0 || numberOfUniqueElements > 20 ? null
                            : data.length === 0 ? <Loading/>

                                : (
                                    <>
                                        <View style={styles.table}>
                                            <View style={styles.tableHeader}>
                                                <View style={[styles.headerCell]}>
                                                    <Text style={styles.data}>Element</Text>
                                                </View>
                                                <View style={styles.headerCell}>
                                                    <Text style={styles.data}>Absolute Frequency</Text>
                                                </View>
                                            </View>
                                            {data.map((val, index) => (
                                                <View style={styles.row} key={index}>
                                                    <View style={[styles.rowCell]}>
                                                        <FormItem
                                                            isRequired
                                                            label=" "
                                                            maxLength={4}
                                                            value={data[index]}
                                                            customValidation={() => validateElement(index)}
                                                            onChangeText={(input) => addData(index, parseInt(input))}
                                                            keyboardType="numeric"
                                                            style={styles.rowInputCell}
                                                            showErrorIcon={false}
                                                            textInputStyle={styles.rowInputCellText}
                                                            underneathTextStyle={styles.errorTextStyle}
                                                        />
                                                    </View>
                                                    <View style={styles.rowCell}>
                                                        <FormItem
                                                            isRequired
                                                            label=" "
                                                            value={dataFrequency[index]}
                                                            customValidation={() => validateFrequency(index)}
                                                            onChangeText={(input) => addFrequency(index, parseInt(input))}
                                                            keyboardType="numeric"
                                                            style={styles.rowInputCell}
                                                            showErrorIcon={false}
                                                            textInputStyle={styles.rowInputCellText}
                                                            underneathTextStyle={styles.errorTextStyle}
                                                        />
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                        <Picker
                                            label="Exercise type"
                                            items={[
                                                {
                                                    label: 'Central tendency measures(median,mean,mode)',
                                                    value: 'CENTRAL_TENDENCY_MEASURES'
                                                },
                                                {label: 'Absolute frequency table', value: 'ABSOLUTE_FREQUENCY_TABLE'},
                                                {label: 'Relative frequency table', value: 'RELATIVE_FREQUENCY_TABLE'}
                                            ]}
                                            selectedValue={exerciseType}
                                            onSelection={(item) => {
                                                setExerciseType(item.value)
                                            }}
                                            labelStyle={styles.formLabel}
                                            buttonStyle={styles.formField}
                                            iconWrapperStyle={styles.pickerIconStyle}
                                        />
                                    </>
                                )}

                    <Picker
                        label="Exercise purpose:"
                        items={[
                            {label: 'Practice', value: 'PRACTICE'},
                            {label: 'Quiz', value: 'QUIZ'},
                            {label: 'Helper example', value: 'HELPER'},
                        ]}
                        selectedValue={purpose}
                        onSelection={(item) => {
                            setPurpose(item.value)
                        }}
                        labelStyle={styles.formLabel}
                        buttonStyle={styles.formField}
                        iconWrapperStyle={styles.pickerIconStyle}
                    />

                    <TouchableOpacity disabled={!validateInput()} style={styles.button}
                                      onPress={seePreview}>
                        <Text style={styles.buttonText}>Preview</Text>
                    </TouchableOpacity>
                </Form>
            </ScrollView>
        </View>
    );
}