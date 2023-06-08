import React, {useContext, useState} from "react";
import {StatusBar, Text, Dimensions, StyleSheet, Platform, View, ScrollView, SafeAreaView, Alert} from "react-native";
import {Form, FormItem} from "react-native-form-component";
import {MaterialIcons} from '@expo/vector-icons';

import Colors from "../../constants/Colors";
import {Separator} from "../../components/Separator";
import {AuthContext} from "../../context/AuthContext";

const screen = Dimensions.get('window');

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingTop: 20,
        justifyContent: "space-evenly",
        flex: 1,
    },
    main: {
        backgroundColor: Colors.background,
        flex: 1
    },
    safe: {
        backgroundColor: Colors.background,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        marginTop: 20,
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    buttonText: {
        fontSize: 20,

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontStyle: 'italic',
    },
    logo: {
        paddingTop: 10,
        alignItems: "center",

    },
    form: {
        padding: 10,
        width: screen.width * 0.8,
        flex: 1,
        alignSelf: "center",
        justifyContent: 'space-evenly',
        backgroundColor: 'lightblue',
    }
});

export default ({navigation}) => {

    const {registerStudent} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [teacherUsername, setTeacherUsername] = useState("");

    const emptyFields = () => {
        return username.length === 0 || password.length === 0 || confirmPassword.length === 0 ||
            emailAddress.length === 0 || firstName.length === 0 || lastName.length === 0 || teacherUsername.length === 0;
    }

    const passwordsMatch = () => {
        if (password !== confirmPassword) {
            return {
                status: false,
                message: 'Passwords don\'t match'
            }
        }
        return {
            status: true,
            message: ''
        }
    }

    const submit = () => {

        if (emptyFields()) {

            console.error("EMPTY FIELDS");
            Alert.alert("Registration failed", "All fields must be completed.");

        } else if (!passwordsMatch().status) {

            Alert.alert("Registration failed.", "The passwords do not match.");

        } else {

            registerStudent(username, password, "STUDENT", emailAddress, firstName, lastName, teacherUsername);
        }
    }


    return (
        <View style={styles.container}>
            <SafeAreaView>
                <StatusBar barStyle={Platform.OS === "android" ? "light-content" : "dark-content"}/>
            </SafeAreaView>
            <View style={styles.logo}>
                <MaterialIcons name="design-services" size={87} color="black"/>
                <Text style={styles.title}>Create account</Text>
            </View>
            <View style={{paddingBottom: 40}}>
                <Separator/>
            </View>
            <ScrollView keyboardShouldPersistTaps="never">
                <View style={styles.form}>
                    <Form
                        onButtonPress={() => submit()}
                        buttonStyle={styles.button}
                    >
                        <FormItem
                            label="Username"
                            isRequired
                            value={username}
                            onChangeText={(input) => setUsername(input)}
                        />

                        <FormItem
                            label="Password"
                            secureTextEntry
                            isRequired
                            value={password}
                            onChangeText={(input) => setPassword(input)}
                        />

                        <FormItem
                            label="Confirm password"
                            secureTextEntry
                            isRequired
                            customValidation={() => passwordsMatch()}
                            value={confirmPassword}
                            onChangeText={(input) => setConfirmPassword(input)}
                        />

                        <FormItem
                            label="Email address"
                            isRequired
                            value={emailAddress}
                            onChangeText={(input) => setEmailAddress(input)}
                        />

                        <FormItem
                            label="First Name"
                            isRequired
                            value={firstName}
                            onChangeText={(input) => setFirstName(input)}
                        />

                        <FormItem
                            label="Last name"
                            isRequired
                            value={lastName}
                            onChangeText={(input) => setLastName(input)}
                        />

                        <FormItem
                            label="Teacher username"
                            isRequired
                            value={teacherUsername}
                            onChangeText={(input) => setTeacherUsername(input)}
                        />
                    </Form>
                </View>
            </ScrollView>
        </View>
    );
}