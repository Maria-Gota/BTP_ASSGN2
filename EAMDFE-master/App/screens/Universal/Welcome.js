import React from "react";
import {View, StyleSheet, Text, StatusBar, Dimensions, Platform, SafeAreaView} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {Button} from "../../components/Button";

import {Separator} from "../../components/Separator";

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        paddingVertical: 100,
        alignItems: 'center',
        flex: 1,
    },
    content: {
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    logo: {
        alignItems: "center",
    }
});


export default ({navigation}) => {


    const toAccountType = () => {
        navigation.navigate('AccountType');
    }

    const toLogin = () => {
        navigation.navigate('Login')
    }

    return (

        <View style={styles.container}>
            <StatusBar barStyle={Platform.OS === "android" ? "light-content" : "dark-content"}/>
            <SafeAreaView/>
            <View style={styles.logo}>

                <MaterialIcons name="design-services" size={87} color="black"/>
                <Text style={styles.title}>
                    Title incoming
                </Text>
            </View>
            <View style={{paddingBottom: 40, paddingTop: 20, width: screen.width * 0.9, alignSelf: "center"}}>
                <Separator/>
            </View>
            <View style={styles.content}>
                <Button text="Log in" onPress={toLogin}/>
                <Button text="Register" onPress={toAccountType}/>
            </View>
        </View>
    );
}