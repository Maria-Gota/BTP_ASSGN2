import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import Lottie from 'lottie-react-native';

import {AuthContext} from "../../context/AuthContext";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
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
        color: '#f3b041',
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    dismissButtonAction: {
        borderWidth: 1,
        padding: 15,
        margin: 20,
        borderRadius: 35,
        backgroundColor: '#f3b041',
    },
    dismissButtonTitle: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'italic',
    }
})


export default ({navigation}) => {

    const {userInfo, logout} = useContext(AuthContext);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(true);
    }, [visible])

    const okButtonAction = () => {
        logout();
    }

    const dismissButtonAction = () => {

        if (userInfo.role === "TEACHER") {
            navigation.navigate('TeacherBottomTab');
        } else {
            navigation.navigate('StudentBottomTab');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Lottie style={styles.questionMark} source={require("../../assets/animations/4975-question-mark.json")}
                        autoPlay/>
                <Text style={styles.message}>Are you sure you want to exit?</Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={okButtonAction} style={styles.okButtonAction}>
                        <Text style={styles.okButtonTitle}>Exit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={dismissButtonAction} style={styles.dismissButtonAction}>
                        <Text style={styles.dismissButtonTitle}>Stay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}