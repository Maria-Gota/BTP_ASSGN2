import React, {useContext, useEffect, useState,} from "react";
import {
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Platform,
    View,
    SafeAreaView,
    Text,
    ScrollView
} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {Form, FormItem, Picker} from "react-native-form-component";
import {AuthContext} from "../../context/AuthContext";
import {createLinearSignTableExercise} from "../../api/SignTableExerciseService";

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
        createdBy: userInfo.otherId,
        a: "",
        b: "",
        domainLowerBound: "- \u221E",
        domainUpperBound: "\u221E",
        firstIntervalSign: "-",
        secondIntervalSign: "-",
        purpose: "PRACTICE",
    })
    const [coeffDiv, setCoeffDiv] = useState("");
    const setExerciseField = (fieldName, value) => {
        const copy = {...exercise};
        copy[fieldName] = value;
        setExercise(copy);
    }


    useEffect(() => {
        if (exercise.a.length === 0 || exercise.b.length === 0) {
            setCoeffDiv("-b/a")
        } else {
            setCoeffDiv(`-${exercise.b}/${exercise.a}`)
        }
    }, [exercise.a, exercise.b])

    const seePreview = () => {
        navigation.navigate('PreviewScreen', {exerciseType: 'Linear function sign table', exercise: exercise})
    }


    const handleDomainLowerBoundInput = () => {
        if (exercise.domainLowerBound.length === 0) {
            setExerciseField('domainLowerBound', `- \u221E`);
        }
    }

    const handleDomainUpperBoundInput = () => {
        if (exercise.domainUpperBound.length === 0) {
            setExerciseField('domainUpperBound', `\u221E`);
        }
    }

    const handleDomainLowerBoundFocus = () => {
        if (exercise.domainLowerBound === '- \u221E') {
            setExerciseField('domainLowerBound', '')
        }
    }

    const handleDomainUpperBoundFocus = () => {
        if (exercise.domainUpperBound === '\u221E') {
            setExerciseField('domainUpperBound', '')
        }
    }


    const close = () => {
        navigation.pop();
    }

    const validateInput = () => {
        return exercise.a.length > 0 && exercise.b.length > 0;
    }

    const failOkAction = () => {
        navigation.pop();
    }

    const successOkAction = () => {
        navigation.pop();
        navigation.navigate('Resources');
    }

    const submit = async () => {

        if (validateInput()) {

            if (exercise.domainLowerBound === '- \u221E') {
                setExerciseField('domainLowerBound', '');
            }

            if (exercise.domainUpperBound === '\u221E') {
                setExerciseField('domainUpperBound', '');
            }

            const res = await createLinearSignTableExercise(userAccessToken, exercise);

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
                    <Text style={styles.titleText}>Linear function sign table</Text>
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
                <Text style={styles.note}>This form will yield a sign table exercise for a linear function of the form
                    ax + b.</Text>
                <Form
                    buttonText="Submit"
                    onButtonPress={submit}
                    buttonStyle={styles.button}
                    buttonTextStyle={styles.buttonText}
                    style={styles.form}
                >
                    <FormItem
                        label="Coefficient a"
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        isRequired
                        keyboardType="numeric"
                        value={exercise.a}
                        onChangeText={(input) => setExerciseField('a', input)}
                    />

                    <FormItem
                        label="Coefficient b"
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        isRequired
                        keyboardType="numeric"
                        value={exercise.b}
                        onChangeText={(input) => setExerciseField('b', input)}
                    />

                    <FormItem
                        label="Domain lower bound"
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        value={exercise.domainLowerBound}
                        keyboardType="default"
                        onFocus={handleDomainLowerBoundFocus}
                        onBlur={handleDomainLowerBoundInput}
                        onChangeText={(input) => setExerciseField('domainLowerBound', input)}
                    />

                    <FormItem
                        label="Domain upper bound"
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        value={exercise.domainUpperBound}
                        keyboardType="default"
                        onFocus={handleDomainUpperBoundFocus}
                        onBlur={handleDomainUpperBoundInput}
                        onChangeText={(input) => setExerciseField('domainUpperBound', input)}
                    />

                    <Picker
                        items={[
                            {label: '-', value: "-"},
                            {label: '+', value: "+"},
                        ]}
                        label={`Sign for interval [${exercise.domainLowerBound},${coeffDiv}]`}
                        labelStyle={styles.formLabel}
                        buttonStyle={styles.formField}
                        iconWrapperStyle={styles.pickerIconStyle}
                        selectedValue={exercise.firstIntervalSign}
                        onSelection={(item) => setExerciseField('firstIntervalSign', item.value)}
                    />
                    <Picker
                        items={[
                            {label: '-', value: "-"},
                            {label: '+', value: "+"},
                        ]}
                        label={`Sign for interval [${coeffDiv},${exercise.domainUpperBound}]`}
                        labelStyle={styles.formLabel}
                        buttonStyle={styles.formField}
                        iconWrapperStyle={styles.pickerIconStyle}
                        selectedValue={exercise.secondIntervalSign}
                        onSelection={(item) => setExerciseField('secondIntervalSign', item.value)}
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
                        onSelection={(item) => setExerciseField('purpose', item.value)}
                    />
                    <TouchableOpacity disabled={!validateInput()} style={styles.button} onPress={seePreview}>
                        <Text style={styles.buttonText}>Preview</Text>
                    </TouchableOpacity>
                </Form>
            </ScrollView>
        </View>
    );

}