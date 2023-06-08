import React, {useContext} from "react";
import {
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Platform,
    StatusBar,
    View,
    SafeAreaView,
    Text,
} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {getCorrectSolution} from "../student/ExerciseScreen";
import {Formula} from "../../components/Formula";
import {SolvedExercise} from "../student/ExerciseSolution";
import {AuthContext} from "../../context/AuthContext";
import {deleteHelperById} from "../../api/HelperService";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const navigationBarHeight = Dimensions.get('screen').height - screenHeight - StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B2EC7E',
        marginBottom: navigationBarHeight,
        flex: 1,
        top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    box: {
        justifyContent: 'space-evenly',
        borderRadius: 20,
        alignItems: 'center',
    },
    closeIcon: {
        padding: 10,
        backgroundColor: '#74DA1B',
        borderRadius: 30,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
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
        backgroundColor: '#74DA1B'
    },
    note: {
        fontSize: 15,
        fontStyle: 'italic',
        alignSelf: 'center',
        fontWeight: '500',
        margin: 5,
        color: 'white',
    },
    contentContainer: {
        margin: 10,
        backgroundColor: '#74DA1B',
        width: screenWidth * 0.9,
        padding: 15,
        borderRadius: 20,
        minHeight: screenHeight * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {},
    formula: {},
    example: {}
})

export default ({navigation, route}) => {

    const {userInfo, userAccessToken} = useContext(AuthContext);
    const helper = route.params.helper;
    const helperType = route.params.helper.type;
    const example = helper.example;
    const exampleSolution = example !== null ? getCorrectSolution(helperType, example) : null;

    const close = () => {
        navigation.pop();
    }

    const deleteHelper = async () => {
        const response = await deleteHelperById(userAccessToken, helper.id);
        if (response === 200) {
            navigation.navigate('Resources');
        } else {
            navigation.navigate('FailedActionPopup', {
                message: 'Failed to delete helper.\n Please try again.',
                okButtonAction: () => {
                    navigation.navigate('Resources')
                },
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
                    <Text style={styles.titleText}>{helper.name}</Text>
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
                <View style={{margin: 5, borderBottomWidth: 1, borderColor: 'white'}}/>


                <View style={styles.contentContainer}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '500',
                        fontStyle: 'italic',
                        color: 'white',
                        overflow: 'visible',
                        textAlign: 'justify'
                    }}>{helper.content}</Text>
                </View>

                <View style={{margin: 5, borderBottomWidth: 1, borderColor: 'white'}}/>


                {helper.formula !== null ? (

                    <View style={{margin: 10, flexDirection: 'column', width: screenWidth * 0.9}}>
                        <View style={{alignItems: 'center', backgroundColor: '#74DA1B', borderRadius: 20, margin: 5}}>
                            <Text style={{
                                fontSize: 15,
                                padding: 10,
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                color: 'white'
                            }}>Formula:</Text>
                        </View>
                        <Formula
                            formula={helper.formula}
                            backgroundColor='white'
                            textColor='#74DA1B'
                        />

                    </View>

                ) : null

                }
                <View style={{margin: 5, borderBottomWidth: 1, borderColor: 'white'}}/>
                {
                    helper.example !== null ? (
                        <View>
                            <View style={{margin: 10, flexDirection: 'column'}}>
                                <View style={{
                                    alignItems: 'center',
                                    backgroundColor: '#74DA1B',
                                    borderRadius: 20,
                                    margin: 5,
                                    width: screenWidth * 0.9
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        padding: 10,
                                        fontStyle: 'italic',
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}>Solved example</Text>
                                </View>
                                <SolvedExercise
                                    exerciseType={helperType}
                                    exercise={example}
                                    solvedExercise={exampleSolution}
                                    passToParent={() => {
                                    }}
                                />
                            </View>
                            <View style={{margin: 10, flexDirection: 'column'}}>
                                <View style={{
                                    alignItems: 'center',
                                    backgroundColor: '#74DA1B',
                                    borderRadius: 20,
                                    margin: 5,
                                    width: screenWidth * 0.9
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        padding: 10,
                                        fontStyle: 'italic',
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}>Example explanation</Text>
                                </View>
                                <View style={styles.contentContainer}>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: '500',
                                        fontStyle: 'italic',
                                        color: 'white',
                                        overflow: 'visible',
                                        textAlign: 'justify'
                                    }}>{helper.exampleExplanation}</Text>
                                </View>
                            </View>
                        </View>
                    ) : null
                }

                <View style={{margin: 5, borderBottomWidth: 1, borderColor: 'white'}}/>


                {userInfo.role !== 'TEACHER' ? null : (
                    <TouchableOpacity style={[{
                        margin: 10,
                        backgroundColor: 'red',
                        borderRadius: 25,
                        width: screenWidth * 0.4,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center'
                    }]} onPress={() => deleteHelper()}>
                        <Text style={{
                            fontSize: 15,
                            padding: 10,
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            color: 'white'
                        }}>Delete helper</Text>
                    </TouchableOpacity>
                )}

                <View style={{margin: 5, borderBottomWidth: 1, borderColor: 'white'}}/>


            </ScrollView>

        </View>

    );

}