import React, {useState, useEffect, useContext} from "react";
import {
    StatusBar,
    TouchableOpacity,
    Platform,
    Text,
    ScrollView,
    StyleSheet,
    View,
    SafeAreaView
} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {Form, FormItem, Picker} from "react-native-form-component";

import {AuthContext} from "../../context/AuthContext";
import {createQuiz} from "../../api/QuizService"
import {
    getLinearSignTableByCreatedByAndQuizPurpose,
    getQuadraticSignTableByCreatedByAndQuizPurpose
} from "../../api/SignTableExerciseService"
import {getMultipleChoiceByCreatedByAndQuizPurpose} from "../../api/MultipleChoiceExerciseService"
import {getProbabilitiesExerciseByCreatedByAndQuizPurpose} from "../../api/ProbabilitiesExerciseService"
import {getStatisticsExerciseByCreatedByAndQuizPurpose} from "../../api/StatisticsExerciseService"
import {getFinancialExerciseByCreatedByAndQuizPurpose} from "../../api/FinancialExerciseService";
import {
    ProbabilitiesListItem,
    LinearSignTableListItem,
    QuadraticSignTableListItem,
    MultipleChoiceListItem,
    StatisticsExerciseListItem,
    FinancialExerciseListItem, listItem,
} from "../../components/ListItem";

import {Loading} from "../universal/Loading";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FC8E43',
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
        backgroundColor: '#FC8E43'
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
        backgroundColor: '#EB6F1B',
        borderRadius: 30,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EB6F1B',
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
        backgroundColor: '#EB6F1B'
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
export default ({navigation, route}) => {

    const quizType = route.params.quizType;
    const [difficulty, setDifficulty] = useState("LOW");
    const [visibility, setVisibility] = useState(true);
    const [quizExercisesMap, setQuizContents] = useState(new Map());
    const {userAccessToken, userInfo} = useContext(AuthContext);
    const [numberOfExercises, setNumberOfExercises] = useState(0);
    const [quizName, setQuizName] = useState("");
    const [exercises, setExercises] = useState([]);
    const [colors, setColors] = useState([]);

    const close = () => {
        navigation.pop();
    }

    const validateNumberOfExercises = () => {

        if (numberOfExercises > 10 && exercises.length > 10) {
            return {
                status: false,
                message: 'At most 10 exercises.'
            }
        }

        if (numberOfExercises > exercises.length && exercises.length < 10) {
            return {
                status: false,
                message: `At most ${exercises.length} exercises.`
            }
        }

        if (numberOfExercises < 1) {
            return {
                status: false,
                message: 'At least 1 exercise.'
            }
        }

        return {
            status: true,
            message: ''
        }
    }

    const validateInput = () => {

        if (numberOfExercises === quizExercisesMap.size &&
            validateNumberOfExercises().status &&
            quizName.length > 0) {
            return true;
        }
        return false;
    }

    const buildRequestBody = () => {
        let exStr = "";
        const quizExercisesList = Array.from(quizExercisesMap.values())
        quizExercisesMap.forEach((el, key, map) => {
            exStr = exStr.concat(JSON.stringify(el.id)).concat(",");
        });

        return {
            quizType: quizType,
            exercises: quizExercisesList,
            createdBy: userInfo.otherId,
            quizName: quizName,
            difficulty: difficulty,
            visibility: visibility,
        }
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

            const res = await createQuiz(userAccessToken, buildRequestBody());

            if (res === 200) {
                navigation.navigate('SuccessfulActionPopup', {
                    message: 'Quiz created successfully.',
                    okButtonAction: successOkAction,
                    okButtonTitle: 'Ok'
                });

            } else {
                navigation.navigate('FailedActionPopup', {
                    message: 'Failed to create the quiz.\n Please try again.',
                    okButtonAction: failOkAction,
                    okButtonTitle: 'Ok'
                });
            }
        } else {
            navigation.navigate('FailedActionPopup', {
                message: 'Some of the fields are invalid.\n Check again and resubmit.',
                okButtonAction: failOkAction,
                okButtonTitle: 'Ok'
            });
        }
    }


    const getLinearSignTableExercises = async () => {
        const res = await getLinearSignTableByCreatedByAndQuizPurpose(userAccessToken, userInfo.otherId);
        setExercises(res);
    }

    const getQuadraticSignTableExercises = async () => {
        const res = await getQuadraticSignTableByCreatedByAndQuizPurpose(userAccessToken, userInfo.otherId);
        setExercises(res);
    }


    const getMultipleChoiceExercises = async () => {
        const res = await getMultipleChoiceByCreatedByAndQuizPurpose(userAccessToken, userInfo.otherId);
        setExercises(res);
    }

    const getProbabilitiesExercises = async () => {

        const res = await getProbabilitiesExerciseByCreatedByAndQuizPurpose(userAccessToken, userInfo.otherId);
        setExercises(res);
    }

    const getStatisticsExercises = async () => {

        const res = await getStatisticsExerciseByCreatedByAndQuizPurpose(userAccessToken, userInfo.otherId);
        setExercises(res);
    }

    const getFinancialExercises = async () => {
        const res = await getFinancialExerciseByCreatedByAndQuizPurpose(userAccessToken, userInfo.otherId);
        setExercises(res);
    }

    // what type of exercises to request from the server
    const getExercises = () => {
        switch (quizType) {
            case "Linear function sign table":
                getLinearSignTableExercises();
                break;

            case "Quadratic function sign table":
                getQuadraticSignTableExercises();
                break;

            case "Multiple choice":
                getMultipleChoiceExercises();
                break;

            case "Probabilities":
                getProbabilitiesExercises();
                break;

            case "Statistics":
                getStatisticsExercises();
                break;

            case "Financial":
                getFinancialExercises();
                break;

            default:
                break;
        }
    }


    const countPicked = () => {
        const count = colors.reduce((accumulator, value) => value ? accumulator + 1 : accumulator + 0, 0);
        return count;
    }

    const addQuizContents = (index, item) => {
        const copy = new Map(quizExercisesMap);
        copy.set(index, item.id);
        setQuizContents(copy);
    }

    const removeQuizContents = (index) => {
        const copy = new Map(quizExercisesMap);
        copy.delete(index);
        setQuizContents(copy);
    }

    const manage = (item, index) => {
        const copy = [...colors];
        if (copy[index]) {
            removeQuizContents(index);
            copy[index] = false;
        } else if (countPicked() < numberOfExercises) {
            copy[index] = true;
            addQuizContents(index, item);

        }
        setColors(copy);
    }

    useEffect(() => {
        getExercises();
        setColors(new Array(exercises.length).fill(false));
    }, []);

    return (

        <View style={styles.container}>
            <StatusBar barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}/>
            <SafeAreaView/>

            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{quizType} quiz</Text>
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
                        label="Quiz name:"
                        isRequired
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        value={quizName}
                        maxLength={50}
                        onChangeText={(input) => setQuizName(input)}
                    />

                    <Picker
                        label="Difficulty:"
                        items={[
                            {label: 'Low', value: 'LOW'},
                            {label: 'Medium', value: 'MEDIUM'},
                            {label: 'High', value: 'HIGH'}
                        ]}
                        labelStyle={styles.formLabel}
                        buttonStyle={styles.formField}
                        iconWrapperStyle={styles.pickerIconStyle}
                        selectedValue={difficulty}
                        onSelection={(item) => setDifficulty(item.value)}
                    />

                    <Picker
                        label="Visibility to students:"
                        items={[
                            {label: 'Locked', value: false},
                            {label: 'Unlocked', value: true},
                        ]}
                        labelStyle={styles.formLabel}
                        buttonStyle={styles.formField}
                        iconWrapperStyle={styles.pickerIconStyle}
                        selectedValue={visibility}
                        onSelection={(item) => setVisibility(item.value)}
                    />

                    <FormItem
                        label="Number of exercises:"
                        isRequired
                        keyboardType="numeric"
                        labelStyle={styles.formLabel}
                        style={styles.formField}
                        value={numberOfExercises}
                        onChangeText={(input) => setNumberOfExercises(parseInt(input))}
                        customValidation={() => validateNumberOfExercises()}
                    />

                    <Text style={styles.note}>Pick the exercises you want to include:</Text>

                    {exercises.length > 0 ? (
                            exercises.map((item, index) => (
                                <TouchableOpacity style={{margin: 5, borderRadius: 20}} key={index} onPress={() => {
                                    manage(item, index);
                                }}>
                                    {listItem(item, quizType, colors[index], 'white')}

                                </TouchableOpacity>
                            ))) :
                        <Loading/>}
                </Form>
            </ScrollView>

        </View>
    );
}
