import React, {useContext, useState} from "react";
import {
    SafeAreaView,
    Platform,
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    FlatList,
    Dimensions,
    StatusBar
} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {getQuizByCreatedByAndQuizType} from "../../api/QuizService";
import {AuthContext} from "../../context/AuthContext";
import {Loading} from "../universal/Loading";

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
        color: 'white',
    },
    title: {
        borderRadius: 20,
        justifyContent: 'center',
        padding: 5,
        backgroundColor: '#8DA9B6'
    },
    closeIcon: {
        padding: 10,
        backgroundColor: '#8DA9B6',
        borderRadius: 30,
    },
    listItem: {
        margin: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'lightblue'
    },
    addQuizButton: {
        margin: 5,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'lightblue',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    }
})

export const QuizListItem = ({item}) => {
    return (
        <View style={styles.listItem}>
            <Text style={{fontSize: 17, fontStyle: 'italic', fontWeight: 'bold'}}>{item.quizName}</Text>
        </View>
    )
}

export default ({navigation, route}) => {


    const quizType = route.params.quizType;
    const {userAccessToken, userInfo} = useContext(AuthContext);
    const [quizzes, setQuizzes] = useState([]);

    const getQuizzes = async () => {
        const res = await getQuizByCreatedByAndQuizType(userAccessToken, userInfo.otherId, quizType);
        setQuizzes(res);
    }
    getQuizzes();

    const goToAddQuiz = () => {
        navigation.navigate('QuizCreationModal', {quizType: quizType})
    }

    const close = () => {
        navigation.pop();
    }

    const viewSummary = (item) => {
        navigation.navigate('QuizSummary', {quiz: item})
    }

    return (

        <View style={styles.container}>
            <StatusBar barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}/>
            <SafeAreaView/>

            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{quizType} quizzes</Text>
                </View>
                <TouchableOpacity style={styles.closeIcon} onPress={() => close()}>
                    <AntDesign
                        name="close"
                        size={25}
                        color="white"
                    />
                </TouchableOpacity>
            </View>

            <View style={{margin: 10, height: screenHeight * 0.7}}>

                <TouchableOpacity style={styles.addQuizButton} onPress={goToAddQuiz}>
                    <AntDesign name="plus" size={24} color="black"/>
                    <Text style={{fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', margin: 5}}>Create a
                        quiz</Text>
                </TouchableOpacity>
                {quizzes.length > 0 ? (
                        <FlatList
                            data={quizzes}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={() => viewSummary(item)}>
                                    <QuizListItem item={item}/>
                                </TouchableOpacity>
                            )}
                        />
                    ) :
                    <Loading/>}
            </View>
        </View>
    );
}