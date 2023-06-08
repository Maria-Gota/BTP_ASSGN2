import React, {useContext, useEffect, useState} from "react";
import {
    Platform,
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    FlatList,
    Dimensions,
    StatusBar,
    SafeAreaView
} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {
    getQuizByCreatedByAndQuizTypeAndVisibility
} from "../../api/QuizService";
import {AuthContext} from "../../context/AuthContext";
import {Loading} from "../universal/Loading";
import {QuizListItem} from "../teacher/QuizzesList";

const screenHeight = Dimensions.get('window').height;
const navigationBarHeight = Dimensions.get('screen').height - screenHeight - StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        marginBottom: navigationBarHeight,
        flex: 1,
        top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    closeIcon: {
        padding: 10,
        backgroundColor: '#8DA9B6',
        borderRadius: 30,
    },
    listItem: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'lightblue'
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
    box: {
        justifyContent: 'space-evenly',
        borderRadius: 20,
    },
})

export default ({navigation, route}) => {

    const quizType = route.params.quizType;
    const {userAccessToken, userInfo} = useContext(AuthContext);
    const [quizzes, setQuizzes] = useState([]);

    const getQuizzes = async () => {
        const res = await getQuizByCreatedByAndQuizTypeAndVisibility(userAccessToken, userInfo.teacherId, quizType);
        setQuizzes(res);
    }

    useEffect(() => {
        getQuizzes();
    }, []);

    const close = () => {
        navigation.pop();
    }

    return (

        <View style={styles.container}>
            <StatusBar barStyle='dark-content'/>
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

            <View style={{margin: 5, borderBottomWidth: 2, borderColor: '#e6dfd9'}}/>

            <View style={styles.box}>

                {quizzes.length > 0 ? (
                        <FlatList
                            data={quizzes}
                            renderItem={({item}) => (
                                <View style={{flexDirection: 'column'}}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("StudentQuizSummary", {quiz: item})}>
                                        <QuizListItem item={item}/>
                                    </TouchableOpacity>
                                    <View style={{margin: 5, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>
                                </View>
                            )}
                        />
                    ) :
                    <Loading/>}
            </View>
        </View>
    );
}