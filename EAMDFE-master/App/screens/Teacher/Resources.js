import React from "react";
import {
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    View,
    ScrollView,
    Alert,
    Dimensions,
    Text,
    Platform
} from "react-native";
import ExpandableList from "@redbluenat/react-native-expandable-flatlist"
import {AntDesign} from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    category: {
        backgroundColor: 'lightblue',
        borderRadius: 15,
        padding: 10,
        width: screenWidth * 0.95,
        margin: 10,
    },
    categoryItem: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    categoryItemTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic',
        margin: 5
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        margin: 5
    },
})


export default ({navigation}) => {

    const d = [
        {
            it: 'Exercises',
            children: [
                "Linear function sign table",
                "Quadratic function sign table",
                "Multiple choice",
                "Probabilities",
                "Statistics",
                "Financial"
            ]
        }, {
            it: "Quizzes",
            children: [
                "Linear function sign table",
                "Quadratic function sign table",
                "Multiple choice",
                "Probabilities",
                "Statistics",
                "Financial",]
        }, {
            it: "Helpers",
            children: [
                "Linear function sign table",
                "Quadratic function sign table",
                "Probabilities",
                "Statistics",
                "Financial"
            ]
        }
    ]

    const goToAddQuiz = (type) => {
        navigation.navigate('QuizCreationModal', {quizType: type})

    }

    const goToAddHelper = (type) => {
        navigation.navigate('HelperCreationModal', {helperType: type});
    }

    const goToAddExercise = (exerciseType) => {
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

    const navigate = (item, index) => {
        if (item.it === "Exercises") {
            navigation.navigate('ExercisesList', {exerciseType: item.children[index]});
        } else if (item.it === "Quizzes") {
            navigation.navigate('QuizzesList', {quizType: item.children[index]});
        } else {
            navigation.navigate('HelpersList', {helperType: item.children[index]});
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}/>
            <ExpandableList
                sectionList={false}
                listData={d}
                initialNumToRender={2}
                listItemStyle={styles.category}
                renderExpandListItem={({item}) => (
                    <ScrollView>
                        {(item.children).map((el, index) => (

                            <TouchableOpacity
                                key={index}
                                onPress={() => navigate(item, index)}
                            >
                                <View style={styles.categoryItem}>

                                    <Text style={styles.categoryItemTitle}>{`${item.children[index]}`}</Text>

                                    {item.it === 'Exercises' ? (
                                        <AntDesign name="plus" size={24} color="black"
                                                   onPress={() => goToAddExercise(item.children[index])}/>
                                    ) : null}

                                    {item.it === 'Quizzes' ? (
                                        <AntDesign name="plus" size={24} color="black"
                                                   onPress={() => goToAddQuiz(item.children[index])}/>
                                    ) : null}
                                    {item.it === 'Helpers' ? (
                                        <AntDesign name="plus" size={24} color="black"
                                                   onPress={() => goToAddHelper(item.children[index])}/>
                                    ) : null}
                                </View>
                            </TouchableOpacity>
                        ))
                        }
                    </ScrollView>
                )}
                duration={500}
                defaultItemHeight={60}
                expandItemHeight={250}
                renderItem={({item}) => (
                    <View>
                        <Text style={styles.categoryTitle}>{`${item.it}`}</Text>
                    </View>
                )}
            />
        </View>
    );
}