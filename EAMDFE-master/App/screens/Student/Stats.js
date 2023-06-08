import React, {useContext, useState, useEffect} from "react";
import {
    ScrollView,
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    Platform,
    TouchableOpacity
} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {getStudentStatsByStudentId} from "../../api/StudentStatsService";
import {AuthContext} from "../../context/AuthContext";

import {Loading} from "../universal/Loading";

const screenWidth = Dimensions.get('window').width;
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
    listItem: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
    }
})

export default ({navigation}) => {

    const {userAccessToken, userInfo} = useContext(AuthContext);
    const [studentStats, setStudentStats] = useState(undefined);
    const isFocused = useIsFocused();

    const getStudentStats = async () => {

        const response = await getStudentStatsByStudentId(userAccessToken, userInfo.otherId);
        setStudentStats(response);
    }

    useEffect(() => {
        getStudentStats();
    }, [isFocused])

    const goToExchangeEffortPoints = (purpose) => {

        navigation.navigate('ExchangeEffortPointsPopup', {studentStats: studentStats, purpose: purpose});
    }
    return (

        <View style={styles.container}>
            <StatusBar barStyle='dark-content'/>
            <SafeAreaView/>
            {studentStats === undefined ? (
                <Loading/>
            ) : (

                <ScrollView
                    showsVerticalScrollIndicator={false}
                >

                    <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                    <View style={{margin: 10, flexDirection: 'column'}}>
                        <View style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                            <Text style={{
                                fontSize: 17,
                                padding: 10,
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                            }}>Rank:</Text>
                        </View>
                        <View style={[{backgroundColor: '#a8e0ca', borderRadius: 20, marginLeft: 20, marginRight: 20}]}>
                            <Text style={[{
                                fontSize: 15,
                                padding: 10,
                                fontStyle: 'italic',
                                fontWeight: '500',
                                textAlign: 'center'
                            }]}>-</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                    <View style={{margin: 10, flexDirection: 'column'}}>
                        <View style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                            <Text style={{fontSize: 17, padding: 10, fontStyle: 'italic', fontWeight: 'bold',}}>Effort
                                points:</Text>
                        </View>
                        <View style={[{backgroundColor: '#a8e0ca', borderRadius: 20, marginLeft: 20, marginRight: 20}]}>
                            <Text style={[{
                                fontSize: 15,
                                padding: 10,
                                fontStyle: 'italic',
                                fontWeight: '500',
                                textAlign: 'center'
                            }]}>{studentStats.effortPoints}</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>

                    <View style={{margin: 10, flexDirection: 'column'}}>
                        <View style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                            <Text style={{fontSize: 17, padding: 10, fontStyle: 'italic', fontWeight: 'bold',}}>Assessment
                                points:</Text>
                        </View>
                        <View style={[{backgroundColor: '#a8e0ca', borderRadius: 20, marginLeft: 20, marginRight: 20}]}>
                            <Text style={[{
                                fontSize: 15,
                                padding: 10,
                                fontStyle: 'italic',
                                fontWeight: '500',
                                textAlign: 'center'
                            }]}>{studentStats.assessmentPoints}</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>


                    <View style={{margin: 10, flexDirection: 'column'}}>
                        <View style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                            <Text style={{fontSize: 17, padding: 10, fontStyle: 'italic', fontWeight: 'bold',}}>Exercise
                                solution peeks:</Text>
                        </View>
                        <View style={[{backgroundColor: '#a8e0ca', borderRadius: 20, marginLeft: 20, marginRight: 20}]}>
                            <Text style={[{
                                fontSize: 15,
                                padding: 10,
                                fontStyle: 'italic',
                                fontWeight: '500',
                                textAlign: 'center'
                            }]}>{studentStats.exerciseSolutionGrant}</Text>
                        </View>
                        <TouchableOpacity style={[{
                            margin: 5,
                            backgroundColor: '#90bae0',
                            borderRadius: 25,
                            width: screenWidth * 0.45,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center'
                        }]} onPress={() => goToExchangeEffortPoints('EXERCISE')}>
                            <Text style={{
                                fontSize: 13,
                                padding: 10,
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                color: 'white'
                            }}>Get more</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>


                    <View style={{margin: 10, flexDirection: 'column'}}>
                        <View style={{alignItems: 'center', backgroundColor: '#90bae0', borderRadius: 20, margin: 5}}>
                            <Text style={{fontSize: 17, padding: 10, fontStyle: 'italic', fontWeight: 'bold',}}>Quiz try
                                grants:</Text>
                        </View>
                        <View style={[{backgroundColor: '#a8e0ca', borderRadius: 20, marginLeft: 20, marginRight: 20}]}>
                            <Text style={[{
                                fontSize: 15,
                                padding: 10,
                                fontStyle: 'italic',
                                fontWeight: '500',
                                textAlign: 'center'
                            }]}>{studentStats.quizTryGrant}</Text>
                        </View>
                        <TouchableOpacity style={[{
                            margin: 5,
                            backgroundColor: '#90bae0',
                            borderRadius: 25,
                            width: screenWidth * 0.45,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center'
                        }]} onPress={() => goToExchangeEffortPoints('QUIZ')}>
                            <Text style={{
                                fontSize: 13,
                                padding: 10,
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                color: 'white'
                            }}>Get more</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#e6dfd9'}}/>
                </ScrollView>
            )}
        </View>
    );
}