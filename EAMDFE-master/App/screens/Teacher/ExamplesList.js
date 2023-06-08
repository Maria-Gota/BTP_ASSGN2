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
    getLinearSignTableByCreatedByAndHelperPurpose,
    getQuadraticSignTableByCreatedByAndHelperPurpose
} from "../../api/SignTableExerciseService"
import {getProbabilitiesExerciseByCreatedByAndHelperPurpose} from "../../api/ProbabilitiesExerciseService"
import {getStatisticsExerciseByCreatedByAndHelperPurpose} from "../../api/StatisticsExerciseService"
import {getFinancialExerciseByCreatedByAndHelperPurpose} from "../../api/FinancialExerciseService"

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

    const exerciseType = route.params.exerciseType;
    const {userAccessToken, userInfo} = useContext(AuthContext);

    const [exercises, setExercises] = useState([]);

    const getLinearSignTableExercises = async () => {
        const res = await getLinearSignTableByCreatedByAndHelperPurpose(userAccessToken, userInfo.otherId);
        setExercises(res);
    }

    const getQuadraticSignTableExercises = async () => {
        const res = await getQuadraticSignTableByCreatedByAndHelperPurpose(userAccessToken, userInfo.otherId);
        setExercises(res);
    }

    const getProbabilitiesExercises = async () => {

        const res = await getProbabilitiesExerciseByCreatedByAndHelperPurpose(userAccessToken, userInfo.otherId);
        setExercises(res);
    }

    const getStatisticsExercises = async () => {

        const res = await getStatisticsExerciseByCreatedByAndHelperPurpose(userAccessToken, userInfo.otherId);
        setExercises(res);
    }

    const getFinancialExercises = async () => {
        const res = await getFinancialExerciseByCreatedByAndHelperPurpose(userAccessToken, userInfo.otherId);
        setExercises(res);
    }

    // what type of exercises to request from the server
    const getExercises = () => {
        switch (exerciseType) {
            case "Linear function sign table":
                getLinearSignTableExercises();
                break;

            case "Quadratic function sign table":
                getQuadraticSignTableExercises();
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
                        // color="white"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.contents}>

                <TouchableOpacity style={styles.addExerciseButton} onPress={() => goToAddExercise()}>
                    <AntDesign name="plus" size={30} color="black"/>
                    <Text style={styles.addExerciseButtonText}>Add an exercise</Text>
                </TouchableOpacity>

                {exercises.length > 0 ? (
                        <FlatList
                            data={exercises}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={() => {
                                    console.log(`NAVIGATE BACK TO HELPER CREATION WITH EXERCISE ${item}`);
                                    navigation.navigate('HelperCreationModal', {
                                        picked: {
                                            exercise: item,
                                            slide: route.params.slide
                                        }
                                    })
                                }}>
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