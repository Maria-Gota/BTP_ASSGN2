import React from "react";
import {StyleSheet, Text, View, TouchableOpacity, LogBox} from "react-native";
import Lottie from 'lottie-react-native';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        borderRadius: 40,
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
        padding: 20,
        margin: 20,
        borderRadius: 35,
        backgroundColor: '#ff0000',
    },
    okButtonTitle: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
})

export default ({navigation, route}) => {


    const message = route.params.message;

    const okButtonAction = route.params.okButtonAction;
    const okButtonTitle = route.params.okButtonTitle;


    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Lottie style={styles.questionMark} source={require("../../assets/animations/87558-red-cross.json")}
                        autoPlay/>
                <Text style={styles.message}>{message}</Text>
                <TouchableOpacity onPress={okButtonAction} style={styles.okButtonAction}>
                    <Text style={styles.okButtonTitle}>{okButtonTitle}</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}