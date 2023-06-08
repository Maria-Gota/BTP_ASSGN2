import React from "react";
import {SectionList, TouchableOpacity, StyleSheet, View, Dimensions, Text} from "react-native";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    categoryItem: {
        backgroundColor: 'lightblue',
        borderRadius: 15,
        padding: 10,
        width: screenWidth * 0.8,
        margin: 15,
    },
    category: {
        backgroundColor: '#90bae0',
        borderRadius: 20,
        padding: 10,
        width: screenWidth * 0.9,
        margin: 5,
    },

    categoryItemTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'italic',
        margin: 5
    },
    categoryTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic',
        margin: 5
    },

})

export default ({navigation}) => {


    const exerciseTypes = [
        {
            title: "Exercises",
            data: [
                "Linear function sign table",
                "Quadratic function sign table",
                "Multiple choice",
                "Probabilities",
                "Statistics",
                "Financial"
            ]
        },
        {
            title: "Quizzes",
            data: [
                "Linear function sign table",
                "Quadratic function sign table",
                "Multiple choice",
                "Probabilities",
                "Statistics",
                "Financial",]
        },
        {
            title: "Helpers",
            data: [
                "Linear function sign table",
                "Quadratic function sign table",
                "Probabilities",
                "Statistics",
                "Financial"
            ]
        }
    ];

    const navigate = (index, section) => {
        if (section.title === "Exercises") {

            navigation.navigate('StudentExercisesList', {exerciseType: section.data[index]});
        } else if (section.title === "Quizzes") {
            navigation.navigate('StudentQuizzesList', {quizType: section.data[index]});
        } else {
            navigation.navigate('HelpersList', {helperType: section.data[index]});

        }
    }

    return (

        <View style={styles.container}>
            <SectionList
                sections={exerciseTypes}
                stickySectionHeadersEnabled={false}
                keyExtractor={(item, index) => item + index}
                renderItem={({item, index, section}) => (
                    <TouchableOpacity onPress={() => {
                        navigate(index, section)
                    }}>
                        <View style={styles.categoryItem}>
                            <Text style={styles.categoryItemTitle}>{item}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                renderSectionHeader={({section}) =>
                    (
                        <View style={styles.category}>
                            <Text style={styles.categoryTitle}>{section.title}</Text>
                        </View>
                    )
                }
            />
        </View>
    );
}