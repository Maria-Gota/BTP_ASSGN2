import React, {useState, useContext} from "react";
import {TouchableOpacity, StatusBar, Text, ScrollView, StyleSheet, View, SafeAreaView, Platform} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {Form, FormItem, Picker} from "react-native-form-component";

import {AuthContext} from "../../context/AuthContext";
import {createMultipleChoiceExercise} from "../../api/MultipleChoiceExerciseService";

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
    note: {
        fontSize: 15,
        fontStyle: 'italic',
        alignSelf: 'center',
        fontWeight: '500',
        margin: 5,
        color: 'white',
    },
})


export default ({navigation}) => {

    const {userAccessToken, userInfo} = useContext(AuthContext);

    const [exercise, setExercise] = useState({
        id: NaN,
        purpose: "PRACTICE",
        question: "",
        choices: ["", "", "", ""],
        correctChoice: "",
        createdBy: userInfo.otherId
    })

    const updateField = (fieldName, value) => {

        const copy = {...exercise};
        copy[`${fieldName}`] = value;
        setExercise(copy);
    }

    const updateChoicesArr = (index, value) => {
        const copy = {...exercise};
        copy.choices[index] = value;
        setExercise(copy);
    }

    const close = () => {
        navigation.pop();
    }

    const differentFromOtherChoices = (index) => {

        const value = exercise.choices[index];
        let same = 0;

        if (value !== "") {
            exercise.choices.forEach(choice => {
                if (value === choice && choice !== "") {
                    same += 1;
                }
            });

            if (same === 1) {
                return {
                    status: true,
                    message: "",
                }
            }

            return {
                status: false,
                message: "Duplicate choice."
            }
        }
        return {
            status: true,
            message: "",
        }
    }

    const validateCorrectChoice = () => {


        if (exercise.correctChoice.length > 0) {
            let any = 0;

            exercise.choices.forEach(choice => {
                if (exercise.correctChoice === choice) {
                    any += 1;
                }
            })

            if (any === 0) {
                return {status: false, message: "Doesn't match any of the 4 choices."};
            }
            return {status: true, message: ""};
        }
        return {status: false, message: "Doesn't match any of the 4 choices."};
    }


    const validateAllInput = () => {

        if (validateCorrectChoice().status === true) {
            let any = 0;
            exercise.choices.forEach(choice => {
                if (choice.length > 0) {
                    any += 1;
                }
            })
            return any === 4;

        }
        return false;
    }

    const failOkAction = () => {
        navigation.pop();
    }

    const successOkAction = () => {
        navigation.navigate('Resources');
    }

    const seePreview = () => {
        navigation.navigate('PreviewScreen', {exerciseType: 'Multiple choice', exercise: exercise})
    }

    const submit = async () => {

        if (validateAllInput()) {

            const response = await createMultipleChoiceExercise(userAccessToken, exercise);

            if (response === 200) {
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
                    <Text style={styles.titleText}>Multiple choice</Text>
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
                    buttonText="Create exercise"
                    onButtonPress={() => submit()}
                    buttonStyle={[styles.button]}
                    buttonTextStyle={styles.buttonText}
                    style={styles.form}
                >


                    <FormItem
                        label="Question:"
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        multiline={true}
                        textArea
                        numberOfLines={5}
                        maxLength={150}
                        isRequired
                        value={exercise.question}
                        onChangeText={(input) => updateField('question', input)}
                    />

                    <FormItem
                        label="Choice 1:"
                        isRequired
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        value={exercise.choices[0]}
                        onChangeText={(input) => updateChoicesArr(0, input)}
                        customValidation={() => differentFromOtherChoices(0)}
                    />

                    <FormItem
                        label="Choice 2:"
                        isRequired
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        value={exercise.choices[1]}
                        onChangeText={(input) => updateChoicesArr(1, input)}
                        customValidation={() => differentFromOtherChoices(1)}
                    />

                    <FormItem
                        label="Choice 3:"
                        isRequired
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        value={exercise.choices[2]}
                        onChangeText={(input) => updateChoicesArr(2, input)}
                        customValidation={() => differentFromOtherChoices(2)}
                    />

                    <FormItem
                        label="Choice 4:"
                        isRequired
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        value={exercise.choices[3]}
                        onChangeText={(input) => updateChoicesArr(3, input)}
                        customValidation={() => differentFromOtherChoices(3)}
                    />

                    <FormItem
                        label="Correct choice:"
                        isRequired
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        value={exercise.correctChoice}
                        onChangeText={(input) => updateField('correctChoice', input)}
                        customValidation={() => validateCorrectChoice()}
                    />

                    <Picker
                        items={[
                            {label: 'Practice', value: "PRACTICE"},
                            {label: 'Quiz', value: "QUIZ"},
                        ]}
                        label='Exercise purpose:'
                        labelStyle={styles.formLabel}
                        buttonStyle={styles.formField}
                        iconWrapperStyle={styles.pickerIconStyle}
                        selectedValue={exercise.purpose}
                        onSelection={(item) => updateField('purpose', item.value)}
                    />

                    <TouchableOpacity disabled={!validateAllInput()} style={styles.button}
                                      onPress={seePreview}>
                        <Text style={styles.buttonText}>Preview</Text>
                    </TouchableOpacity>
                </Form>
            </ScrollView>

        </View>
    );
}