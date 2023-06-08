import React, {useContext, useEffect, useState} from "react";
import {LogBox, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from "react-native";
import Lottie from 'lottie-react-native';
import {Form, FormItem} from "react-native-form-component";
import {increaseExerciseSolutionGrant, increaseQuizTryGrant} from "../../api/StudentStatsService";
import {AuthContext} from "../../context/AuthContext";

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column'
    },
    questionMark: {
        width: 110,
        height: 110
    },
    message: {
        fontSize: 15,
        margin: 20,
        marginBottom: 40,
        fontStyle: 'italic',
        fontWeight: '500',
        overflow: 'visible',
        color: 'white',
        textAlign: 'center',
    },
    okButtonAction: {
        borderWidth: 1,
        padding: 15,
        margin: 20,
        borderRadius: 35,
        backgroundColor: 'white',
    },
    okButtonTitle: {
        color: '#2B3151',
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
    },

    dismissButtonAction: {
        borderWidth: 1,
        padding: 15,
        margin: 20,
        borderRadius: 35,
        backgroundColor: '#2B3151',
    },

    dismissButtonTitle: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
    }
})

export default ({navigation, route}) => {

    const {userAccessToken} = useContext(AuthContext);
    const [number, setNumber] = useState("");
    const [numberValid, setNumberValid] = useState(false);
    const studentStats = route.params.studentStats;
    const purpose = route.params.purpose;
    const message = purpose === 'EXERCISE' ? 'Enter the number of peeks you want.' : 'Enter the number of quiz tries you want.';
    const max = purpose === 'EXERCISE' ? Math.floor(studentStats.effortPoints / 2) : Math.floor(studentStats.effortPoints / 4);

    const exchangeForSolutionPeeks = async (no) => {
        if (numberValid) {

            if (purpose === 'EXERCISE') {
                const response = await increaseExerciseSolutionGrant(userAccessToken, studentStats.id, no);
            } else {
                const response = await increaseQuizTryGrant(userAccessToken, studentStats.id, no);
            }

            navigation.navigate('StatsTab');
        }
    }

    const validateNumber = () => {

        if (parseInt(number) > max) {
            return {
                status: false,
                message: 'Not enough effort points'
            }
        }
        return {
            status: true,
            message: '',
        }
    }

    useEffect(() => {
        if (parseInt(number) > max) {
            setNumberValid(false);
        } else {
            setNumberValid(true);
        }
    }, [number]);


    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }}>
                <View style={styles.box}>
                    <Lottie style={styles.questionMark}
                            source={require("../../assets/animations/110246-transaction.json")} autoPlay/>
                    <Text style={styles.message}>{message}</Text>
                    <Text style={styles.message}>You currently have {studentStats.effortPoints} effort points.</Text>
                    <View style={{flexDirection: 'column', alignItems: 'center',}}>
                        <Form
                            buttonStyle={styles.okButtonAction}
                            buttonTextStyle={styles.okButtonTitle}
                            onButtonPress={() => exchangeForSolutionPeeks(number)}
                            buttonText="Exchange"
                        >
                            <FormItem
                                value={number}
                                keyboardType="numeric"
                                customValidation={validateNumber}
                                textAlign="center"
                                onChangeText={(input) => setNumber(input)}
                                textInputStyle={{color: 'white'}}
                                style={{backgroundColor: 'rgba(0,0,0,0.7)', borderColor: 'white', borderWidth: 1}}
                            />

                        </Form>


                        <TouchableOpacity onPress={() => navigation.navigate('StatsTab')}
                                          style={styles.dismissButtonAction}>
                            <Text style={styles.dismissButtonTitle}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}