import React, {useState} from "react";
import {StatusBar, Dimensions, StyleSheet, Platform, View, Text, ActivityIndicator} from "react-native";
import {MaterialIcons} from '@expo/vector-icons';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    content: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: screen.height * 0.01,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontStyle: 'italic'
    },
    logo: {
        paddingTop: 10,
        alignItems: "center",

    }
});


export default ({navigation}) => {

    const [animated, setAnimated] = useState(true);

    return (

        <View style={styles.container}>
            <StatusBar barStyle={Platform.OS === "android" ? "light-content" : "dark-content"}/>
            <View style={styles.logo}>
                <MaterialIcons name="design-services" size={87} color="black"/>
                <Text style={styles.title}>Title incoming</Text>
            </View>
            <View style={styles.content}>
                <ActivityIndicator color="black" size="large" animating={animated}/>
            </View>
        </View>
    );


}