import React from "react";
import {
    StyleSheet,
    Dimensions,
    SafeAreaView,
    View,
    StatusBar,
    Platform,
    Text
} from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
import {Separator} from "../../components/Separator";
import {Button} from "../../components/Button";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        paddingVertical: 100,
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontStyle: 'italic'
    },
    logo: {
        alignItems: "center",
    },
    question: {
        alignSelf: "center",
        fontWeight: "bold",
        fontStyle: 'italic',
        fontSize: 15,
    },
    choices: {
        justifyContent: "space-evenly",
        alignItems: "center",
        width: screen.width * 0.5,
        height: screen.height * 0.2,
    }
})

export default ({navigation}) => {

    const chooseAccountType = (input) => {
        if (input === "STUDENT") {
            navigation.navigate("StudentRegistration");
        } else {
            navigation.navigate("TeacherRegistration");
        }

    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle={Platform.OS === "android" ? "light-content" : "dark-content"}/>
            <SafeAreaView/>
            <View style={styles.logo}>
                <MaterialIcons name="design-services" size={87} color="black"/>
                <Text style={styles.title}>Create account</Text>
            </View>
            <View style={{paddingBottom: 40, paddingTop: 20, width: screen.width * 0.9, alignSelf: "center"}}>
                <Separator/>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                <Text style={styles.question}>What type of account would you like to create?</Text>
            </View>
            <View style={styles.choices}>
                <Button text="Student" onPress={() => chooseAccountType("STUDENT")}/>
                <Button text="Teacher" onPress={() => chooseAccountType("TEACHER")}/>
            </View>

        </View>
    );
}