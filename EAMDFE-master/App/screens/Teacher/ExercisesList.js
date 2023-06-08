import React, {useContext, useEffect, useState} from "react";
import {
    SafeAreaView,
    Platform,
    Alert,
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    FlatList,
    Dimensions,
    StatusBar
} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {
    getLinearSignTableByCreatedBy,
    getQuadraticSignTableByCreatedBy,
    getLinearSignTableByCreatedByAndQuizPurpose,
    getLinearSignTableByCreatedByAndPracticePurpose,
    getQuadraticSignTableByCreatedByAndPracticePurpose,
    getQuadraticSignTableByCreatedByAndQuizPurpose
} from "../../api/SignTableExerciseService"
import {
    getProbabilitiesExerciseByCreatedBy,
    getProbabilitiesExerciseByCreatedByAndPracticePurpose,
    getProbabilitiesExerciseByCreatedByAndQuizPurpose
} from "../../api/ProbabilitiesExerciseService"
import {
    getStatisticsExerciseByCreatedBy,
    getStatisticsExerciseByCreatedByAndPracticePurpose,
    getStatisticsExerciseByCreatedByAndQuizPurpose
} from "../../api/StatisticsExerciseService"
import {
    getFinancialExerciseByCreatedBy,
    getFinancialExerciseByCreatedByAndPracticePurpose,
    getFinancialExerciseByCreatedByAndQuizPurpose
} from "../../api/FinancialExerciseService"
import {
    getMultipleChoiceByCreatedBy,
    getMultipleChoiceByCreatedByAndPracticePurpose,
    getMultipleChoiceByCreatedByAndQuizPurpose
} from "../../api/MultipleChoiceExerciseService";
import {AuthContext} from "../../context/AuthContext";
import {Loading} from "../universal/Loading";
import {listItem} from "../../components/ListItem";


const screenHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic',
        // color:'white',
    },
    title: {
        borderRadius: 20,
        justifyContent: 'center',
        padding: 5,
        backgroundColor: '#90bae0'
    },
    closeIcon: {
        padding: 10,
        backgroundColor: '#90bae0',
        borderRadius: 30,
    },
    listItem: {
        margin: 10,
        padding: 5,
        borderRadius: 30,
        flexDirection: 'column',
    },
    purposeButton: {
        margin: 5,
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%'
    },
    purposeButtonText: {
        fontSize: 13,
        fontWeight: 'bold',
        fontStyle: 'italic',
        margin: 5
    },
    contents: {
        margin: 10,
        height: screenHeight * 0.8,
    },
    addExerciseButton: {
        margin: 5,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#90bae0',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    addExerciseButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic',
        margin: 5
    },
    exercisesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
})

export default ({navigation, route}) => {


    const [practice, setPractice] = useState(false);
    const [quiz, setQuiz] = useState(false);
    const [all, setAll] = useState(true);

    const exerciseType = route.params.exerciseType;

    const {userAccessToken, userInfo} = useContext(AuthContext);

    const [exercises, setExercises] = useState([]);
    const [practiceExercises, setPracticeExercises] = useState([]);
    const [quizExercises, setQuizExercises] = useState([]);

    const changeForPractice = () => {

        if (practice) {
            setPractice(false);
        } else {
            setPractice(true);
            if (quiz) {
                setQuiz(false);
            }
        }
    }

    const changeForQuiz = () => {

        if (quiz) {
            setQuiz(false);
        } else {
            setQuiz(true);
            if (practice) {
                setPractice(false);
            }
        }
    }

    useEffect(() => {
        setAll(!(quiz ^ practice))
    }, [practice, quiz])

    const getLinearSignTableExercises = async () => {
        const res = await getLinearSignTableByCreatedBy(userAccessToken, userInfo.otherId);
        setExercises(res);
    }

    const getPracticeLinearSignTableExercises = async () => {
        const res = await getLinearSignTableByCreatedByAndPracticePurpose(userAccessToken, userInfo.otherId);
        setPracticeExercises(res);
    }

    const getQuizLinearSignTableExercises = async () => {
        const res = await getLinearSignTableByCreatedByAndQuizPurpose(userAccessToken, userInfo.otherId);
        setQuizExercises(res);
    }

    const getQuadraticSignTableExercises = async () => {
        const res = await getQuadraticSignTableByCreatedBy(userAccessToken, userInfo.otherId);
        setExercises(res);
    }

    const getPracticeQuadraticSignTableExercises = async () => {
        const res = await getQuadraticSignTableByCreatedByAndPracticePurpose(userAccessToken, userInfo.otherId);
        setPracticeExercises(res);
    }

    const getQuizQuadraticSignTableExercises = async () => {
        const res = await getQuadraticSignTableByCreatedByAndQuizPurpose(userAccessToken, userInfo.otherId);
        setQuizExercises(res);
    }


    const getMultipleChoiceExercises = async () => {
        const res = await getMultipleChoiceByCreatedBy(userAccessToken, userInfo.otherId);
        setExercises(res);
    }

    const getPracticeMultipleChoiceExercises = async () => {
        const res = await getMultipleChoiceByCreatedByAndPracticePurpose(userAccessToken, userInfo.otherId);
        setPracticeExercises(res);
    }

    const getQuizMultipleChoiceExercises = async () => {
        const res = await getMultipleChoiceByCreatedByAndQuizPurpose(userAccessToken, userInfo.otherId);
        setQuizExercises(res);
    }

    const getProbabilitiesExercises = async () => {

        const res = await getProbabilitiesExerciseByCreatedBy(userAccessToken, userInfo.otherId);
        setExercises(res);
    }

    const getPracticeProbabilitiesExercises = async () => {

        const res = await getProbabilitiesExerciseByCreatedByAndPracticePurpose(userAccessToken, userInfo.otherId);
        setPracticeExercises(res);
    }

    const getQuizProbabilitiesExercises = async () => {

        const res = await getProbabilitiesExerciseByCreatedByAndQuizPurpose(userAccessToken, userInfo.otherId);
        setQuizExercises(res);
    }

    const getStatisticsExercises = async () => {

        const res = await getStatisticsExerciseByCreatedBy(userAccessToken, userInfo.otherId);
        setExercises(res);
    }

    const getPracticeStatisticsExercises = async () => {

        const res = await getStatisticsExerciseByCreatedByAndPracticePurpose(userAccessToken, userInfo.otherId);
        setPracticeExercises(res);
    }

    const getQuizStatisticsExercises = async () => {

        const res = await getStatisticsExerciseByCreatedByAndQuizPurpose(userAccessToken, userInfo.otherId);
        setQuizExercises(res);
    }

    const getFinancialExercises = async () => {
        const res = await getFinancialExerciseByCreatedBy(userAccessToken, userInfo.otherId);
        setExercises(res);
    }

    const getPracticeFinancialExercises = async () => {
        const res = await getFinancialExerciseByCreatedByAndPracticePurpose(userAccessToken, userInfo.otherId);
        setPracticeExercises(res);
    }

    const getQuizFinancialExercises = async () => {
        const res = await getFinancialExerciseByCreatedByAndQuizPurpose(userAccessToken, userInfo.otherId);
        setQuizExercises(res);
    }

    // what type of exercises to request from the server
    const getExercises = () => {
        switch (exerciseType) {
            case "Linear function sign table":
                getLinearSignTableExercises();
                getPracticeLinearSignTableExercises();
                getQuizLinearSignTableExercises();
                break;

            case "Quadratic function sign table":
                getQuadraticSignTableExercises();
                getPracticeQuadraticSignTableExercises();
                getQuizQuadraticSignTableExercises();
                break;

            case "Multiple choice":
                getMultipleChoiceExercises();
                getPracticeMultipleChoiceExercises();
                getQuizMultipleChoiceExercises();
                break;

            case "Probabilities":
                getProbabilitiesExercises();
                getPracticeProbabilitiesExercises();
                getQuizProbabilitiesExercises();
                break;

            case "Statistics":
                getStatisticsExercises();
                getPracticeStatisticsExercises();
                getQuizStatisticsExercises();
                break;

            case "Financial":
                getFinancialExercises();
                getPracticeFinancialExercises();
                getQuizFinancialExercises();
                break;

            default:
                break;
        }
    }

    // to which exercise creation modal to navigate 
    const goToAddExercise = () => {
        switch (exerciseType) {
            case "Linear function sign table":
                navigation.navigate('LinSignTableCreationModal');
                break;

            case "Quadratic function sign table":
                navigation.navigate('QuadSignTableCreationModal');
                break;

            case "Multiple choice":
                navigation.navigate('MultipleChoiceCreationModal');
                break;

            case "Probabilities":
                navigation.navigate('ProbabilitiesCreationModal');
                break;

            case "Statistics":
                navigation.navigate('StatisticsExerciseCreationModal');
                break;

            case "Financial":
                navigation.navigate('FinancialExerciseCreationModal');
                break;

            default:
                Alert.alert("NOT YET", "TO DO");
                break;
        }
    }

    useEffect(() => {
        getExercises();
    }, []);

    const close = () => {
        navigation.pop();
    }

    const seePreview = (exerciseType, exercise) => {
        navigation.navigate('PreviewScreen', {exerciseType: exerciseType, exercise: exercise})
    }

    return (

        <View style={styles.container}>
            <StatusBar barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}/>
            <SafeAreaView/>
            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{exerciseType}</Text>
                </View>
                <TouchableOpacity style={styles.closeIcon} onPress={() => close()}>
                    <AntDesign
                        name="close"
                        size={25}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.contents}>

                <TouchableOpacity style={styles.addExerciseButton} onPress={() => goToAddExercise()}>
                    <AntDesign name="plus" size={30} color="black"/>
                    <Text style={styles.addExerciseButtonText}>Add an exercise</Text>
                </TouchableOpacity>

                <View style={styles.exercisesContainer}>
                    <TouchableOpacity
                        style={[styles.purposeButton, {backgroundColor: quiz ? "#C8A2C8" : '#90bae0'}]}
                        onPress={() => changeForQuiz()}
                    >

                        <Text style={styles.purposeButtonText}>Quiz exercises</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.purposeButton, {backgroundColor: practice ? "#C8A2C8" : '#90bae0'}]}
                        onPress={() => changeForPractice()}
                    >
                        <Text style={styles.purposeButtonText}>Practice exercises</Text>
                    </TouchableOpacity>

                </View>

                {exercises.length > 0 ? (
                        <FlatList
                            data={all ? exercises : quiz ? quizExercises : practiceExercises}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={() => seePreview(exerciseType, item)}>
                                    {listItem(item, exerciseType, false, undefined)}
                                </TouchableOpacity>
                            )}
                        />
                    ) :
                    <Loading/>}
            </View>
        </View>
    );
}