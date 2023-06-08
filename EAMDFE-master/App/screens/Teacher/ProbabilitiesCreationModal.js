import React, {useContext, useState} from "react";
import {
    TouchableOpacity,
    StatusBar,
    View,
    SafeAreaView,
    Text,
    ScrollView,
    StyleSheet, Platform,
} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {Form, FormItem, Picker} from "react-native-form-component";
import {AuthContext} from "../../context/AuthContext";
import {createProbabilitiesExercise} from "../../api/ProbabilitiesExerciseService"

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

    const [exercise, setExercises] = useState({
        id: NaN,
        purpose: "PRACTICE",
        question: "",
        favorableOutcomes: NaN,
        possibleOutcomes: NaN,
        createdBy: userInfo.otherId
    })

    const updateField = (fieldName, value) => {

        const copy = {...exercise};
        copy[`${fieldName}`] = value;
        setExercises(copy);
    }

    const close = () => {
        navigation.pop();
        navigation.navigate('Resources');
    }

    const validateInput = () => {

        return !(exercise.question.length === 0 ||
            Number.isNaN(exercise.favorableOutcomes) || exercise.favorableOutcomes === 0 ||
            Number.isNaN(exercise.possibleOutcomes) || exercise.possibleOutcomes === 0);
    }

    const failOkAction = () => {
        navigation.pop();
    }

    const successOkAction = () => {
        navigation.navigate('Resources');
    }

    const seePreview = () => {
        navigation.navigate('PreviewScreen', {exerciseType: 'Probabilities', exercise: exercise})
    }

    const submit = async () => {

        if (validateInput()) {
            const response = await createProbabilitiesExercise(userAccessToken, exercise);

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
                    <Text style={styles.titleText}>Probabilities</Text>
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
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        multiline={true}
                        textArea
                        numberOfLines={5}
                        maxLength={200}
                        isRequired
                        value={exercise.question}
                        onChangeText={(input) => updateField('question', input)}
                    />

                    <FormItem
                        label="Favorable outcomes:"
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        isRequired
                        keyboardType="numeric"
                        value={exercise.favorableOutcomes}
                        onChangeText={(input) => updateField('favorableOutcomes', parseInt(input))}
                    />

                    <FormItem
                        label="Possible outcomes:"
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        isRequired
                        keyboardType="numeric"
                        value={exercise.possibleOutcomes}
                        onChangeText={(input) => updateField('possibleOutcomes', parseInt(input))}
                    />

                    <Picker
                        items={[
                            {label: 'Practice', value: "PRACTICE"},
                            {label: 'Quiz', value: "QUIZ"},
                            {label: 'Helper example', value: 'HELPER'},
                        ]}
                        label='Exercise purpose:'
                        labelStyle={styles.formLabel}
                        buttonStyle={styles.formField}
                        iconWrapperStyle={styles.pickerIconStyle}
                        selectedValue={exercise.purpose}
                        onSelection={(item) => updateField('purpose', item.value)}
                    />

                    <TouchableOpacity disabled={!validateInput()} style={styles.button} onPress={seePreview}>
                        <Text style={styles.buttonText}>Preview</Text>
                    </TouchableOpacity>

                </Form>
            </ScrollView>
        </View>
    );
}