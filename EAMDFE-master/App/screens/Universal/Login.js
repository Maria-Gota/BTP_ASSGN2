import React, {useContext, useState} from "react";
import {ScrollView, View, StyleSheet, Text, StatusBar, SafeAreaView, Alert, Platform, Dimensions} from "react-native";
import {Form, FormItem} from "react-native-form-component";
import {MaterialIcons} from '@expo/vector-icons';

import {Separator} from "../../components/Separator";
import {AuthContext} from "../../context/AuthContext";

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingTop: 20,
        justifyContent: 'center',
        flex: 1,
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    logo: {
        alignItems: "center",
    },
    form: {
        width: screen.width * 0.8,
        padding: 10,
        justifyContent: 'flex-start',
        alignSelf: "center",
        borderRadius: 20,
        backgroundColor: 'lightblue',
    }
})

export default ({navigation}) => {

    const {login} = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = () => {

        if (username.length === 0 || password.length === 0) {
            Alert.alert("Cannot proceed", "All fields are mandatory.");
        } else {
            login(username, password);
        }
    }

    return (
        <View style={styles.container}>

            <SafeAreaView>
                <StatusBar barStyle={Platform.OS === "android" ? "light-content" : "dark-content"}/>
            </SafeAreaView>
            <View style={styles.logo}>
                <MaterialIcons name="design-services" size={87} color="black"/>
                <Text style={styles.title}> Log in </Text>
            </View>
            <View style={{paddingBottom: 40}}>
                <Separator/>
            </View>
            <ScrollView keyboardDismissMode="on-drag" automaticallyAdjustKeyboardInsets={true}>
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
                    </Form>
                </View>
            </ScrollView>

        </View>
    );
};