import React, {useContext, useState} from "react";
import {Alert, ScrollView, SafeAreaView, Text, StyleSheet, View, StatusBar, Platform, Dimensions} from 'react-native';
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
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Apple SD Gothic Neo"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontFamily: Platform.OS === "android" ? "monospace" : "Courier New"
    },
    logo: {
        paddingTop: 10,
        alignItems: "center",

    },
    form: {
        padding: 10,
        backgroundColor: 'lightblue',
        width: screen.width * 0.8,
        flex: 1,
        alignSelf: "center",
        justifyContent: 'space-evenly'
    }
});

export default ({navigation}) => {


    const {registerTeacher} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const emptyFields = () => {
        return username.length === 0 || password.length === 0 || confirmPassword.length === 0 ||
            emailAddress.length === 0 || firstName.length === 0 || lastName.length === 0;

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

            registerTeacher(username, password, "TEACHER", emailAddress, firstName, lastName);
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
                            value={confirmPassword}
                            customValidation={() => passwordsMatch()}
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
                    </Form>
                </View>
            </ScrollView>
        </View>
    );
};