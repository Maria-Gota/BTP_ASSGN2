// noinspection JSValidateTypes

import React, {useContext, useState} from "react";
import {
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet, Platform,
} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {Form, FormItem, Picker} from "react-native-form-component";
import {AuthContext} from "../../context/AuthContext";

import {createFinancialExercise} from "../../api/FinancialExerciseService";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6E99AD',
        flex: 1,
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
})

export default ({navigation}) => {

    const {userAccessToken, userInfo} = useContext(AuthContext);

    const [exercise, setExercise] = useState({
        id: NaN,
        exerciseType: 'SIMPLE_INTEREST',
        createdBy: userInfo.otherId,
        purpose: 'PRACTICE',
        question: '',
        capital: NaN,
        interest: NaN,
        interestType: 'simple',
        interestRate: NaN,
        timePeriod: NaN,
    });

    const setExerciseField = (fieldName, value) => {
        const copy = {...exercise};
        copy[fieldName] = value;
        setExercise(copy);
    }


    const close = () => {
        navigation.pop();
        navigation.navigate('Resources');
    }

    const validateInput = () => {

        return !(exercise.question.length === 0 ||
            exercise.interest === 0 || Number.isNaN(exercise.interest) ||
            exercise.interestRate === 0 || Number.isNaN(exercise.interestRate) ||
            exercise.timePeriod === 0 || Number.isNaN(exercise.timePeriod) ||
            exercise.capital === 0 || Number.isNaN(exercise.capital) ||
            exercise.exerciseType.length === 0);

    }

    const validateInterestRate = () => {

        if (exercise.interestRate >= 100) {
            return {
                status: false,
                message: "Cannot exceed 100%."
            }
        }
        return {
            status: true,
            message: ""
        }
    }

    const failOkAction = () => {
        navigation.pop();
    }

    const successOkAction = () => {
        navigation.navigate('Resources');
    }

    const seePreview = () => {
        navigation.navigate('PreviewScreen', {exerciseType: 'Financial', exercise: exercise})
    }

    const submit = async () => {
        if (validateInput()) {

            const res = await createFinancialExercise(userAccessToken, exercise);

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

    return (
        <View style={styles.container}>
            <StatusBar barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}/>
            <SafeAreaView/>

            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Financial</Text>
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
                        label="Question:"
                        multiline
                        textArea
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        numberOfLines={2}
                        maxLength={165}
                        isRequired
                        value={exercise.question}
                        onChangeText={(input) => setExerciseField('question', input)}
                    />

                    <FormItem
                        label="Capital:"
                        isRequired
                        keyboardType="numeric"
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        value={exercise.capital}
                        onChangeText={(input) => {
                            setExerciseField('capital', parseInt(input))
                        }}
                    />

                    <FormItem
                        label="Interest rate(%):"
                        isRequired
                        keyboardType="numeric"
                        customValidation={() => validateInterestRate()}
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        value={exercise.interestRate}
                        onChangeText={(input) => setExerciseField('interestRate', parseInt(input))}
                    />


                    <Text style={[styles.formLabel, {marginBottom: 10}]}>Interest</Text>
                    <Picker
                        label="Type:"
                        items={[
                            {label: 'Simple interest', value: 'simple'},
                            {label: 'Compound interest', value: 'compound'},
                        ]}
                        selectedValue={exercise.interestType}
                        onSelection={(item) => {
                            setExerciseField('interestType', item.value)
                        }}
                        labelStyle={[styles.formLabel, {marginLeft: 30}]}
                        buttonStyle={[styles.formField, {marginLeft: 20}]}
                        iconWrapperStyle={styles.pickerIconStyle}
                        itemLabelStyle={{overflow: 'visible'}}
                    />
                    <FormItem
                        label="Value:"
                        isRequired
                        keyboardType="numeric"
                        labelStyle={[styles.formLabel, {marginLeft: 30}]}
                        style={[styles.formField, {marginLeft: 20}]}
                        value={exercise.interest}
                        onChangeText={(input) => setExerciseField('interest', parseInt(input))}
                    />

                    <FormItem
                        label={exercise.interestType === 'simple' ? 'Time period(months):' : 'Time period(years):'}
                        isRequired
                        keyboardType="numeric"
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        value={exercise.timePeriod}
                        onChangeText={(input) => setExerciseField('timePeriod', parseInt(input))}
                    />

                    <Picker
                        label="Exercise type:"
                        items={
                            exercise.interestType === 'simple' ? [
                                    {label: 'Simple interest computation', value: 'SIMPLE_INTEREST'},
                                    {label: 'Interest rate computation', value: 'INTEREST_RATE'},
                                    {label: 'Capital computation', value: 'CAPITAL'}]
                                : [
                                    {label: 'Compound interest computation', value: 'COMPOUND_INTEREST'}]
                        }
                        selectedValue={exercise.exerciseType}
                        onSelection={(item) => {
                            setExerciseField('exerciseType', item.value)
                        }}
                        labelStyle={styles.formLabel}
                        buttonStyle={styles.formField}
                        iconWrapperStyle={styles.pickerIconStyle}
                        itemLabelStyle={{
                            overflow: 'visible'
                        }}
                    />

                    <Picker
                        label="Exercise purpose:"
                        items={[
                            {label: 'Practice', value: 'PRACTICE'},
                            {label: 'Quiz', value: 'QUIZ'},
                            {label: 'Helper example', value: 'HELPER'},
                        ]}
                        selectedValue={exercise.purpose}
                        onSelection={(item) => {
                            setExerciseField('purpose', item.value)
                        }}
                        labelStyle={styles.formLabel}
                        buttonStyle={styles.formField}
                        iconWrapperStyle={styles.pickerIconStyle}
                        itemLabelStyle={{overflow: 'visible'}}
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